"use client";
import * as React from "react";
import { ArrowUp, Loader2, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailMarketingTypes from "./email-marketing-types";
import { Textarea } from "@/components/ui/textarea";
import useChatHandler from "@/hooks/useChatHandler";
import EmailContentGenerated from "./email-content-generated";

function ChatInterface() {
  const {
    emailTypeSelected,
    handleInputChange,
    isLoading,
    object,
    submit,
    inputRef,
  } = useChatHandler();

  return (
    <div className='min-h-[80vh] flex flex-col'>
      <main className='flex-1 flex flex-col items-center justify-center p-4'>
        <div className='max-w-3xl w-full space-y-8'>
          <h1 className='text-4xl font-bold text-center'>
            Quel e-mail souhaitez-vous générer ?
          </h1>

          <EmailMarketingTypes />

          {object && (
            <EmailContentGenerated
              subject={object.subject || ""}
              content={object.content || ""}
            />
          )}

          <div className='relative w-full'>
            <Textarea
              ref={inputRef}
              className='w-full min-h-[68px] max-h-[200px] pl-12 pr-24 py-3 rounded-lg border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none overflow-hidden'
              placeholder='Exemple: Rédige-moi un e-mail professionnel pour proposer...'
              value={emailTypeSelected.purpose}
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
                disabled={!Boolean(emailTypeSelected?.purpose) || isLoading}
                onClick={async () => {
                  submit(emailTypeSelected.purpose);
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
