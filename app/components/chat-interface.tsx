"use client";
import * as React from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailMarketingTypes from "./email-marketing-types";
import useEmailMarketingTypes, {
  EmailType,
} from "@/hooks/useEmailMarketingTypes";
import { useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

function ChatInterface() {
  const { types: emailTypes } = useEmailMarketingTypes();
  const params = useSearchParams();
  const paramsType = params.get("type");

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [emailType, setEmailType] = React.useState<Partial<EmailType>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailType((prev) => ({
      ...prev,
      purpose: event.target.value,
    }));
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    if (paramsType) {
      const emailTypeFound = emailTypes?.find((el) => el?.value === paramsType);
      if (emailTypeFound) {
        setEmailType(emailTypeFound);
      }
    }
  }, [emailTypes, paramsType]);

  return (
    <div className='min-h-[80vh] flex flex-col'>
      <main className='flex-1 flex flex-col items-center justify-center p-4'>
        <div className='max-w-3xl w-full space-y-8'>
          <h1 className='text-4xl font-bold text-center'>
            Quel e-mail souhaitez-vous générer ?
          </h1>

          <EmailMarketingTypes />

          <div className='relative w-full'>
            <Textarea
              ref={textareaRef}
              className='w-full min-h-[68px] max-h-[200px] pl-12 pr-24 py-3 rounded-lg border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none overflow-hidden'
              placeholder='Ask v0 a question...'
              value={emailType.purpose}
              onChange={handleInputChange}
              rows={1}
            />
            <div className='absolute left-4 top-3'>
              <Paperclip className='h-5 w-5 text-muted-foreground' />
            </div>

            {emailType.purpose && (
              <Button
                className='absolute right-2 bottom-2 h-8 w-8 p-0'
                size='icon'
              >
                <ArrowUp className='h-4 w-4' />
                <span className='sr-only'>Send message</span>
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export { ChatInterface };
