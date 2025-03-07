import { mistral } from '@ai-sdk/mistral';
import { Message, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const prompt = [
  {
    role: "system",
    content: `AI assistant is a usefull help bot for Life-Work Balancea like a human-like artificial intelligence..
  The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
  AI is a well-behaved and well-mannered individual.
  AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
  AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
  `,
  },
];


export async function POST(req: Request) {
  const { messages } = await req.json();

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