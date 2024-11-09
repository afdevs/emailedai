import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const result = await generateText({
    model: openai("gpt-4"),
    system:
      "Vous êtes un expert en rédaction d'e-mails marketing. Votre rôle est de créer des e-mails percutants et convaincants, adaptés aux demandes de l'utilisateur. Répondez uniquement aux requêtes spécifiquement liées au marketing par e-mail.",
    prompt,
  });

  return Response.json(
    {
      text: result.text,
    },
    { status: 200 }
  );
}
