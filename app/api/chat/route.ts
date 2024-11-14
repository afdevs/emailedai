import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  try {
    const result = await generateText({
      model: openai("gpt-4"),
      system:
        "Vous êtes un expert en rédaction d'e-mails marketing. Votre mission est de créer des e-mails percutants et convaincants, adaptés aux besoins de l'utilisateur. Répondez uniquement aux requêtes, questions ou demandes spécifiquement liées à la rédaction d'e-mails marketing. Veuillez ignorer toutes les requêtes ou questions qui ne sont pas liées à la rédaction d'e-mails marketing.",
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
