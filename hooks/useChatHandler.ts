import React from "react";
import useEmailMarketingTypes from "./useEmailMarketingTypes";
import { useSearchParams } from "next/navigation";

function useChatHandler() {
  const params = useSearchParams();
  const paramsType = params.get("type");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { types: emailTypes } = useEmailMarketingTypes();
  const [prompt, setPrompt] = React.useState("");
  const [generatedEmail, setGeneratedEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await fetch("api/chat", {
        method: "POST",
        body: JSON.stringify({
          prompt,
        }),
      });
      const { text } = await result.json();
      setGeneratedEmail(text);
      setPrompt("");
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (paramsType) {
      const emailTypeFound = emailTypes?.find((el) => el?.value === paramsType);
      if (emailTypeFound) {
        setPrompt(emailTypeFound.purpose);
      }
    }
  }, [emailTypes, paramsType]);

  return {
    inputRef,
    prompt,
    generatedEmail,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
}

export default useChatHandler;
