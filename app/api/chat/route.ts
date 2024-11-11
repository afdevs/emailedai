import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai("gpt-4"),
    system:
      "Vous êtes un expert en rédaction d'e-mails marketing. Votre rôle est de créer des e-mails percutants et convaincants, adaptés aux demandes de l'utilisateur. Répondez uniquement aux requêtes spécifiquement liées aux écritures d'e-mail marketing.",
    messages: [
      {
        role: "assistant",
        content:
          "Vous êtes un expert en rédaction d'e-mails marketing. Votre rôle est de créer des e-mails percutants et convaincants, adaptés aux demandes de l'utilisateur. Répondez uniquement aux requêtes spécifiquement liées aux écritures d'e-mail marketing.",
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
