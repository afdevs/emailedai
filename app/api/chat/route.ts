import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai("gpt-4"),
    messages: [
      {
        role: "system",
        content:
          "Vous êtes un expert en rédaction d'e-mails marketing. Votre mission est de créer des e-mails percutants et convaincants, adaptés aux besoins de l'utilisateur. Répondez uniquement aux requêtes, questions ou demandes spécifiquement liées à la rédaction d'e-mails marketing. Veuillez ignorer toutes les requêtes ou questions qui ne sont pas liées à la rédaction d'e-mails marketing.",
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
