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
    prompt,
    setPrompt,
    handleInputChange,
    isLoading,
    messages,
    append,
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

          {messages.length > 0 &&
            messages.map((message) => (
              <div className='flex flex-col gap-2' key={message.id}>
                {message.role === "user" && (
                  <>
                    <span className='text-right font-medium mb-2 inline-block'>
                      Vous
                    </span>
                    <div className='bg-blue-500 text-white p-5 rounded-md mt-0 max-w-[75%] ml-auto'>
                      {message.content}
                    </div>
                  </>
                )}
                {message.role === "assistant" && (
                  <EmailContentGenerated content={message.content || ""} />
                )}
              </div>
            ))}

          <div className='relative w-full'>
            <Textarea
              ref={inputRef}
              className='w-full min-h-[68px] max-h-[200px] pl-12 pr-24 py-3 rounded-lg border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none overflow-hidden'
              placeholder='Exemple: Rédige-moi un e-mail professionnel pour proposer...'
              value={prompt}
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
                disabled={!Boolean(prompt) || isLoading}
                onClick={async () => {
                  append({ role: "user", content: prompt }).then(() => {
                    setPrompt("");
                  });
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
