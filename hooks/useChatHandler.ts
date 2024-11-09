import React from "react";
import useEmailMarketingTypes, { EmailType } from "./useEmailMarketingTypes";
import { useSearchParams } from "next/navigation";
import { EmailSchema } from "@/app/api/chat/route";
import { experimental_useObject } from "ai/react";

function useChatHandler() {
  const params = useSearchParams();
  const paramsType = params.get("type");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { types: emailTypes } = useEmailMarketingTypes();
  const [emailTypeSelected, setEmailTypeSelected] = React.useState<
    Partial<EmailType>
  >({});

  const { object, isLoading, submit } = experimental_useObject({
    schema: EmailSchema,
    api: "api/chat",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailTypeSelected((prev) => ({
      ...prev,
      purpose: event.target.value,
    }));
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    if (paramsType) {
      const emailTypeFound = emailTypes?.find((el) => el?.value === paramsType);
      if (emailTypeFound) {
        setEmailTypeSelected(emailTypeFound);
      }
    }
  }, [emailTypes, paramsType]);

  return {
    inputRef,
    emailTypeSelected,
    handleInputChange,
    object,
    submit,
    isLoading,
  };
}

export default useChatHandler;
