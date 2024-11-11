import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React from "react";

function EmailContentGenerated({ content }: EmailContentGeneratedProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className='w-full relative'>
      <Button
        className='h-8 w-8 p-0 absolute top-10 right-1'
        variant='ghost'
        size='icon'
        onClick={async () => {
          if (contentRef.current?.innerText) {
            await navigator?.clipboard?.writeText?.(
              contentRef?.current?.innerText
            );
          }
        }}
      >
        <Copy />
      </Button>
      <span className='font-medium mb-2 inline-block'>Assistant IA</span>
      <div
        className='email-generated bg-slate-100 p-5 rounded-md mt-0'
        ref={contentRef}
        dangerouslySetInnerHTML={{
          __html: content?.replace(/\n/g, "<br>") || "",
        }}
      ></div>
    </div>
  );
}

type EmailContentGeneratedProps = {
  content: string;
};
export default EmailContentGenerated;
