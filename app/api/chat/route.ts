import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const prompt = await req.json();
  const result = await streamObject({
    model: openai("gpt-4"),
    schema: EmailSchema,
    system:
      "Vous êtes un expert en rédaction d'e-mails marketing. Votre rôle est de créer des e-mails percutants et convaincants, adaptés aux demandes de l'utilisateur. Répondez uniquement aux requêtes spécifiquement liées aux écritures d'e-mail marketing.",
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
