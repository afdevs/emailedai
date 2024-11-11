import React from "react";
import useEmailMarketingTypes from "./useEmailMarketingTypes";
import { useSearchParams } from "next/navigation";
import { useChat } from "ai/react";

function useChatHandler() {
  const params = useSearchParams();
  const paramsType = params.get("type");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { types: emailTypes } = useEmailMarketingTypes();
  const [prompt, setPrompt] = React.useState("");
  const { messages, isLoading, append } = useChat({
    api: "api/chat",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
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
    setPrompt,
    prompt,
    handleInputChange,
    messages,
    isLoading,
    append,
  };
}

export default useChatHandler;
