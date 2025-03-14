import { getContext } from '@/app/ai/rag/context';
import { getWeather } from '@/app/ai/tools/get-weather';
import { mistral } from '@ai-sdk/mistral';
import { createDataStreamResponse, generateId, Message, smoothStream, streamText } from 'ai';

export async function POST(req: Request) {

  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];
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
    the use
    ${context}
    END OF CONTEXT BLOCK
    IF THE USER REQUEST FOR IDEAS THAT SHOULD BE BASE ON ATOMIC HABITS BOOK, GTD METHOD.
    Do not include "Based on the information you've provided" in your response.
    AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    AI assistant will not invent anything that is not drawn directly from the context.
    `,
    },
  ];

  const selectedChatModel = 'mistral-large-latest';

  return createDataStreamResponse({
    execute: dataStream => {
      dataStream.writeData('initialized call');

      const result = streamText({
        model: mistral(selectedChatModel),
        system: 'You are a helpful assistant.',
        toolCallStreaming: true,
        maxSteps: 5,
        experimental_activeTools: ['getWeather'],
        experimental_transform: smoothStream({ chunking: 'word' }),
        experimental_generateMessageId: generateId,
        messages: [
          ...prompt,
          ...messages.filter((m: Message) => m.role === 'user'),
        ],

        tools: {
          getWeather,
        },
        onChunk() {
          dataStream.writeMessageAnnotation({ chunk: '123' });
        },
        onFinish() {
          dataStream.writeMessageAnnotation({
            id: generateId(),
            other: 'information',
          });
          dataStream.writeData('call completed');
        },
      });

      result.mergeIntoDataStream(dataStream, {
        sendReasoning: true,
      });
    },
    onError: error => {
      return error instanceof Error ? error.message : String(error);
    },
  });



  // const result = streamText({
  //   model: mistral('mistral-large-latest'),
  //   system: 'You are a helpful assistant.',
  //   toolCallStreaming: true,
  //   messages: [
  //     ...prompt,
  //     ...messages.filter((m: Message) => m.role === 'user'),
  //   ],
  //   tools: {
  //     getUserPreviousRates: tool({
  //       description: 'Get the user\'s previous rates',
  //       parameters: z.object({
  //         userId: z.string().describe('The user ID'),
  //       }),
  //       execute: async ({ userId }) => {
  //         console.log('userId', userId);
  //         return mockUserPreviousTaskRates;
  //       }
  //     }),
  //     checkboxOptions: tool({
  //       description: 'When i need a list of options',
  //       parameters: z.object({
  //         userId: z.string().describe('The user ID'),

  //       }),
  //       execute: async ({ userId }, { toolCallId }) => { 
  //         console.log('messages:', messages);
  //         const object = await getObject(messages.pop());
  //         return object;
  //       }
  //     }),
  //   },
  // });

  // return result.toDataStreamResponse({ sendReasoning: true });
}