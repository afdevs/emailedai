import { useMemo } from "react";

function useEmailMarketingTypes() {
  const types: EmailType[] = useMemo(
    () => [
      {
        label: "E-mail de bienvenue",
        purpose:
          "Rédige-moi un e-mail pour introduire les nouveaux abonnés ou clients à ma marque, nos produits ou services.",
        value: "welcome",
      },
      {
        label: "E-mail promotionnel",
        purpose:
          "Rédige-moi un e-mail pour encourager les achats avec des offres spéciales, des soldes ou des annonces de produits.",
        value: "promotion",
      },
      {
        label: "E-mail de lancement de produit",
        purpose:
          "Rédige-moi un e-mail pour annoncer un nouveau produit ou une nouvelle fonctionnalité afin de susciter de l'intérêt et de l'engagement.",
        value: "product_launch",
      },
      {
        label: "E-mail pour une collaboration",
        purpose:
          "Rédige-moi un e-mail pour proposer une collaboration ou un partenariat afin d'élargir les opportunités d'affaires.",
        value: "collaboration",
      },
      {
        label: "E-mail d'invitation à un événement",
        purpose:
          "Rédige-moi un e-mail pour inviter des prospects à des webinaires, événements de lancement de produits, ou démonstrations pour les engager davantage.",
        value: "event_invitation",
      },
      {
        label: "E-mail de prestation de service",
        purpose:
          "Rédige-moi un e-mail professionnel pour proposer mes services à un client potentiel, en mettant en avant mes compétences et mon expertise pour répondre à ses besoins spécifiques.",
        value: "service_offer",
      },
      {
        label: "E-mail éducatif ou informatif",
        purpose:
          "Rédige-moi un e-mail pour fournir des informations utiles afin d'éduquer les prospects sur votre produit ou secteur et créer de la valeur sans approche commerciale directe.",
        value: "educational",
      },
      {
        label: "E-mail de retargeting de contenu",
        purpose:
          "Rédige-moi un e-mail pour réengager des prospects ayant montré un intérêt pour certains contenus (par exemple, une page produit) mais qui n'ont pas encore converti.",
        value: "retargeting",
      },
      {
        label: "E-mail pour VIP ou offre exclusive",
        purpose:
          "Rédige-moi un e-mail pour offrir aux nouveaux prospects des offres exclusives ou des promotions temporaires pour encourager leur conversion.",
        value: "exclusive_offer",
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
