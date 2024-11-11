import React from "react";
import useEmailMarketingTypes from "./useEmailMarketingTypes";
import { useSearchParams } from "next/navigation";
import { EmailSchema } from "@/app/api/chat/route";
import { experimental_useObject } from "ai/react";

function useChatHandler() {
  const params = useSearchParams();
  const paramsType = params.get("type");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { types: emailTypes } = useEmailMarketingTypes();
  const [prompt, setPrompt] = React.useState("");

  const { object, isLoading, submit } = experimental_useObject({
    schema: EmailSchema,
    api: "api/chat",
  });
  console.log('object', object)
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
    object,
    submit,
    isLoading,
  };
}

export default useChatHandler;
