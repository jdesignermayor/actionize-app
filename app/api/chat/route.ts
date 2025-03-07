import { getEmbeddings } from '@/app/utils/embeddings';
import { getMatchesFromEmbeddings, Metadata } from '@/app/utils/pinecone';
import { mistral } from '@ai-sdk/mistral';
import { ScoredVector } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/db_data';
import { Message, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


const getContext = async (
  message: string,
  namespace: string,
  maxTokens = 3000,
  minScore = 0.7,
  getOnlyText = true
): Promise<string | ScoredVector[]> => {
  // Get the embeddings of the input message
  const embedding = await getEmbeddings(message);

  // Retrieve the matches for the embeddings from the specified namespace
  const matches = await getMatchesFromEmbeddings(embedding, 3, namespace);

  // Filter out the matches that have a score lower than the minimum score
  const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);

  // If the `getOnlyText` flag is false, we'll return the matches
  if (!getOnlyText) {
    return qualifyingDocs;
  }

  let docs = matches
    ? qualifyingDocs.map((match) => (match.metadata as Metadata).chunk)
    : [];
  // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
  return docs.join("\n").substring(0, maxTokens);
};


export async function POST(req: Request) {
  
  const { messages } = await req.json();

  // Get the last message
  const lastMessage = messages[messages.length - 1];

  // Get the context from the last message
  const context = await getContext(lastMessage.content, "");

  const prompt = [
    {
      role: "system",
      content: `AI assistant is a usefull help bot for Life-Work Balancea like a human-like artificial intelligence..
    The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
    AI is a well-behaved and well-mannered individual.
    AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
    AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
    START CONTEXT BLOCK
    ${context}
    END OF CONTEXT BLOCK
    AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    AI assistant will not invent anything that is not drawn directly from the context.
    `,
    },
  ];
  

  const result = streamText({
    model: mistral('mistral-large-latest'),
    system: 'You are a helpful assistant.',
    messages: [
      ...prompt,
      ...messages.filter((m: Message) => m.role === 'user'),
    ],
  });

  return result.toDataStreamResponse();
}