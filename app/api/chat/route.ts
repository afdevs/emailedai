import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  try {
    const result = await generateText({
      model: openai("gpt-4"),
      system:
        "Vous êtes un expert en rédaction d'e-mails marketing. Votre rôle est de créer des e-mails percutants et convaincants, adaptés aux demandes de l'utilisateur. Répondez uniquement aux requêtes spécifiquement liées aux écritures d'e-mail marketing.",
      prompt,
    });

    return Response.json({
      text: result.text,
    });
  } catch (error) {
    return Response.json(
      {
        text: "",
      },
      { status: 400 }
    );
  }
}
