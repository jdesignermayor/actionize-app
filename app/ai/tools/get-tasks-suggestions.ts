import { tool } from "ai";
import { z } from "zod";

export const getTasksSuggestions = tool({
    description: 'Get the tasks suggestions from model',
    parameters: z.object({
        total: z.number(),
        tasks: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
            })
        ),
    }),
    execute: async ({ tasks }) => {
        // await data = tasks.json();
        return tasks;
    },
});