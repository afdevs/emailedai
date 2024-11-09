import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React from "react";

function EmailContentGenerated({
  content,
  subject,
}: EmailContentGeneratedProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className='w-full relative'>
      <Button
        className='h-8 w-8 p-0 absolute top-1 right-1'
        variant='ghost'
        size='icon'
        onClick={async () => {
          if (contentRef.current?.innerText) {
            await navigator.clipboard.writeText(contentRef.current?.innerText);
          }
        }}
      >
        <Copy />
      </Button>
      <div
        className='email-generated bg-slate-100 p-5 rounded-md mt-0'
        ref={contentRef}
      >
        <div className='subject flex flex-row mb-3'>
          <h2 className='mr-2'>Subjet:</h2>
          <span className='font-bold'> {subject}</span>
        </div>
        <div
          className='content'
          dangerouslySetInnerHTML={{
            __html: content?.replace(/\n/g, "<br>") || "",
          }}
        />
      </div>
    </div>
  );
}

type EmailContentGeneratedProps = {
  subject: string;
  content: string;
};
export default EmailContentGenerated;
