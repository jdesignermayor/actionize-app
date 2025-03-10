import { getContext } from '@/app/utils/context';
import { mistral } from '@ai-sdk/mistral';
import { Message, streamText, tool } from 'ai';
import { z } from 'zod';

  
const mockUserId = '123';
const mockUserPreviousTaskRates = {
  done: 15,
  opened: 10,
  closed: 5,
  total: 30,
  tasks: [
    {
      id: '1',
      title: 'Finish the project',
    },
    {
      id: '2',
      title: 'spent time on the side project',
    },
    {
      id: '3',
      title: 'spent time with family',
    },
  ],
}

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

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
    Do not include "Based on the information you've provided" in your response.
    AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    AI assistant will not invent anything that is not drawn directly from the context.
    `,
    },
    {
      role: 'system',
      content: 'What are your previous rates for id: 123 ?',
    },
  ];

  const result = streamText({
    model: mistral('mistral-large-latest'),
    system: 'You are a helpful assistant.',
    messages: [
      ...prompt,
      ...messages.filter((m: Message) => m.role === 'user'),
    ],
    tools: {
      getUserPreviousRates: tool({
        description: 'Get the user\'s previous rates',
        parameters: z.object({
          userId: z.string().describe('The user ID'),
        }),
        execute: async ({ userId }) => {
          console.log('userId', userId);
          return mockUserPreviousTaskRates;
        }
      }),
    },
  });

  return result.toDataStreamResponse();
}