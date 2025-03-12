import { mistral } from "@ai-sdk/mistral";
import { generateObject } from "ai";
import { z } from 'zod';

export const getObject = async (message: any, context: any) => {

    console.log('message', message); 
    console.log('context', context);

    const { object } = await generateObject({
        model: mistral('mistral-large-latest'),
        schema: z.object({
          result: z.object({
            name: z.string(),
            descriptionByModel: z.string().describe('The ai model description like "based on the information you\'ve provided:"'),
            list: z.array(z.object({ name: z.string(), amount: z.string() })),
            steps: z.array(z.string()),
          }),
        }),
        prompt: `Accordig to this context: ${context} Based on this information requested for the user: ${message}`,
      });

    console.log(' ${messages.last().content}', object)
    return object;
};