import React from "react";
import useEmailMarketingTypes from "./useEmailMarketingTypes";
import { useSearchParams } from "next/navigation";
import { useChat } from "ai/react";

function useChatHandler() {
  const params = useSearchParams();
  const paramsType = params.get("type");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { types: emailTypes } = useEmailMarketingTypes();
  const { messages, isLoading, append, input, setInput } = useChat({
    api: "api/chat",
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    if (paramsType) {
      const emailTypeFound = emailTypes?.find((el) => el?.value === paramsType);
      if (emailTypeFound) {
        setInput(emailTypeFound.purpose);
      }
    }
  }, [emailTypes, paramsType]);

  return {
    inputRef,
    handleChange,
    messages,
    isLoading,
    append,
    input,
    setInput,
  };
}

export default useChatHandler;
