import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const prompt = await req.json();
  const result = await streamObject({
    model: openai("gpt-4"),
    schema: EmailSchema,
    system:
      "Vous êtes un expert en rédaction d'e-mails marketing. Votre mission est de créer des e-mails percutants et convaincants, adaptés aux besoins de l'utilisateur. Répondez uniquement aux requêtes, questions ou demandes spécifiquement liées à la rédaction d'e-mails marketing. Veuillez ignorer toutes les requêtes ou questions qui ne sont pas liées à la rédaction d'e-mails marketing.",
    prompt,
  });

  return result.toTextStreamResponse();
}

export const EmailSchema = z.object({
  subject: z
    .string()
    .describe("The subject of the email should be added here."),
  content: z.string().describe("The written email should be placed here"),
});
