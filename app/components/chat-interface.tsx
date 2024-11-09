"use client";
import * as React from "react";
import { ArrowUp, Copy, Loader2, Paperclip } from "lucide-react";
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
  const [isLoading, setIsLoading] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [emailType, setEmailType] = React.useState<Partial<EmailType>>({});
  const [emailGenerated, setEmailGenerated] = React.useState<string>("");
  const divRef = React.useRef<HTMLDivElement>(null);

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

  console.log("emailType", emailType);

  return (
    <div className='min-h-[80vh] flex flex-col'>
      <main className='flex-1 flex flex-col items-center justify-center p-4'>
        <div className='max-w-3xl w-full space-y-8'>
          <h1 className='text-4xl font-bold text-center'>
            Quel e-mail souhaitez-vous générer ?
          </h1>

          <EmailMarketingTypes />
          {emailGenerated.length > 0 && (
            <div className='w-full relative'>
              <Button
                className='h-8 w-8 p-0 absolute top-1 right-1'
                variant='ghost'
                size='icon'
                onClick={async () => {
                  if (divRef.current?.textContent) {
                    await navigator.clipboard.writeText(
                      divRef.current?.textContent
                    );
                  }
                }}
              >
                <Copy />
              </Button>
              <div
                className='email-generated bg-slate-100 p-5 rounded-md mt-0'
                ref={divRef}
                dangerouslySetInnerHTML={{
                  __html: emailGenerated.replace(/\n/g, "<br>"),
                }}
              />
            </div>
          )}
          <div className='relative w-full'>
            <Textarea
              ref={textareaRef}
              className='w-full min-h-[68px] max-h-[200px] pl-12 pr-24 py-3 rounded-lg border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none overflow-hidden'
              placeholder='Exemple: Rédige-moi un e-mail professionnel pour proposer...'
              value={emailType.purpose || ""}
              onChange={handleInputChange}
              rows={1}
            />
            <div className='absolute left-4 top-3'>
              <Paperclip className='h-5 w-5 text-muted-foreground' />
            </div>

            {
              <Button
                className='absolute right-2 bottom-2 h-8 w-8 p-0'
                size='icon'
                disabled={!Boolean(emailType?.purpose) || isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  const result = await fetch("api/chat", {
                    method: "POST",
                    body: JSON.stringify({
                      prompt: emailType.purpose,
                    }),
                  });
                  const { text } = await result.json();
                  setEmailType({});
                  setEmailGenerated(text);

                  setIsLoading(false);
                }}
              >
                {isLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <>
                    <ArrowUp className='h-4 w-4' />
                    <span className='sr-only'>Generer l&apos;email</span>
                  </>
                )}
              </Button>
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export { ChatInterface };
