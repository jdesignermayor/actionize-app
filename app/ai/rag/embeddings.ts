import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});


export async function getEmbeddings(input: string) {
  try {
    const { data } = await mistral.embeddings.create({
      model: "mistral-embed",
      inputs: input.replace(/\n/g, ' ')
    })

    const result = data[0].embedding as number[]
    return result;

  } catch (e) {
    console.log("Error calling OpenAI embedding API: ", e);
    throw new Error(`Error calling OpenAI embedding API: ${e}`);
  }
}