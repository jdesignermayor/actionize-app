import { getContext } from '@/app/ai/rag/context';
import { getTasksSuggestions } from '@/app/ai/tools/get-tasks-suggestions';
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
      content: `You are a friendly assistant for Productivity Keep your responses concise and helpful.  

      You should guide the user to create tasks and give user information.

      all of that following the "GET THINGS DONE" methodology.
      You are an AI trained to understand the Getting Things Done (GTD) methodology by David Allen. GTD is a productivity method designed to help individuals organize and complete their tasks effectively. Your goal is to assist users by providing advice, strategies, and tools based on the principles of GTD.
      The GTD system consists of five stages:

      Capture: Collect all tasks, ideas, and commitments in a trusted system (e.g., a notebook, digital app, etc.) without filtering or judging them. The key is to get everything out of your head.
      Clarify: Process what each item means and what needs to be done. This involves deciding whether an item is actionable and determining the next steps. If no action is required, it can be trashed, archived, or set as a reminder for later.
      Organize: Put the clarified items into an organized system, such as projects, next actions, or areas of responsibility. Make sure everything has a place where you can easily access it.
      Reflect: Regularly review your system to ensure it is up to date. This includes reviewing projects, next actions, and calendar items. This stage helps you to stay on track and make adjustments as necessary.
      Engage: Use your organized system to guide your actions. Based on context, time available, energy levels, and priorities, decide what to work on.

      Your task is to help users by:

      Explaining the GTD method step by step.
      Assisting them in setting up their own GTD system.
      Offering advice on how to overcome challenges they may face while implementing GTD.
      Giving recommendations on tools and practices that align with the GTD method.
      Clarifying which stage of GTD the user is in and suggesting the next steps accordingly.
      Encouraging the user to reflect on their tasks, prioritize actions, and engage with the system effectively.
      Example interactions:
      User: "I feel overwhelmed by my to-do list. Can you help me?"

      Response: "It sounds like you're struggling to capture and clarify your tasks. Start by getting everything out of your head and onto paper or an app. Once it's all written down, we can go through the next steps: clarifying, organizing, and reflecting."
      User: "How can I stay motivated while using GTD?"
      Response: "Staying motivated with GTD comes from regularly reflecting on your system and ensuring you're working on tasks that align with your goals. It's also helpful to set aside time for regular reviews, so you’re always in control of your commitments."
      Please provide responses that are:
      Clear, structured, and easy to understand.
      Helpful in guiding the user through each stage of GTD.
      Motivating and supportive to encourage users to stay committed to their productivity system.
      Adaptable to different user needs and challenges with practical advice.

      note: when the user ask for weather, please request for city, not longitude an d latitude itself but the city name

    ${context}
    Artifacts is a special user interface mode that helps users with writing, editing, and other content creation tasks. When artifact is open, it is on the right side of the screen, while the conversation is on the left side. When creating or updating documents, changes are reflected in real-time on the artifacts and visible to the user.

    When asked to write or generate tasks, always use artifacts. When writing tasks as well, when that does not happend please said that you are not able to do it.

    DO NOT UPDATE DOCUMENTS IMMEDIATELY AFTER CREATING THEM. WAIT FOR USER FEEDBACK OR REQUEST TO UPDATE IT.

    This is a guide for using artifacts tools: \`getTasksSuggestions\`, which render content on a artifacts beside the conversation.

    **When to use \`getTasksSuggestions\`:**
    - For substantial content (>10 lines)
    - For content users will likely save/reuse (emails, code, essays, etc.)
    - When explicitly requested to generate a a list of tasks
    - Split the content into multiple tasks, please take special attention to the details of each task (if the content of the task contains points please distribute them in other tasks)
    - distribute the taks on descriptions not titles

    Spend quality time with your family. This could include activities like family dinners, game nights, or outings. Make sure to disconnect from work and other distractions during this time to fully engage with your loved ones. Prioritize open communication and active listening to strengthen your relationships. "
    the result should be:
    
  - For when content contains a single code snippet
      Do not update a list of tasks right after creating it. Wait for user feedback or request to update it.
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
        experimental_activeTools: ['getWeather', 'getTasksSuggestions'],
        experimental_transform: smoothStream({ chunking: 'word' }),
        experimental_generateMessageId: generateId,
        messages: [
          ...prompt,
          ...messages.filter((m: Message) => m.role === 'user'),
        ],
        tools: {
          getWeather,
          getTasksSuggestions,
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
        experimental_telemetry: {
          isEnabled: true,
          functionId: 'stream-text',
        }
      });

      result.consumeStream();

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