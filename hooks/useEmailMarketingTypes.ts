import { useMemo } from "react";

function useEmailMarketingTypes() {
  const types: EmailType[] = useMemo(
    () => [
      {
        label: "E-mails de bienvenue",
        purpose:
          "Introduire les nouveaux abonnés ou clients à votre marque, produits ou services.",
        value: "welcome",
      },
      {
        label: "E-mails promotionnels",
        purpose:
          "Encourager les achats avec des offres spéciales, des soldes ou des annonces de produits.",
        value: "onboarding",
      },
      {
        label: "E-mails de lancement de produit",
        purpose:
          "Annoncer un nouveau produit ou une nouvelle fonctionnalité pour susciter de l’intérêt et de l'engagement.",
        value: "product_launching",
      },
      {
        label: "E-mails d'invitation à un événement",
        purpose:
          "Inviter des prospects à des webinaires, événements de lancement de produits, ou démonstrations pour les engager davantage.",
        value: "event_inviting",
      },
      {
        label: "E-mails éducatifs ou informatifs",
        purpose:
          "Fournir des informations utiles pour éduquer les prospects sur votre produit ou secteur, et créer de la valeur sans approche commerciale directe.",
        value: "educationnal",
      },
      {
        label: "E-mails de retargeting de contenu",
        purpose:
          "Réengager des prospects ayant montré un intérêt pour certains contenus (par exemple, une page produit) mais qui n’ont pas encore converti.",
        value: "retargeting",
      },
      {
        label:
          "E-mails de preuve sociale et contenu généré par les utilisateurs",
        purpose:
          "Partager des témoignages ou des avis de clients pour renforcer la crédibilité auprès de nouveaux prospects.",
        value: "social_proof",
      },
      {
        label: "E-mails pour VIP ou offres exclusives",
        purpose:
          "Offrir aux nouveaux prospects des offres exclusives ou des promotions temporaires pour encourager leur conversion.",
        value: "promo",
      },
    ],
    []
  );
  return {
    types,
  };
}

export type EmailType = {
  label: string;
  purpose: string;
  value: string;
};

export default useEmailMarketingTypes;
