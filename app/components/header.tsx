import { Button } from "@/components/ui/button";
import React from "react";

function Header() {
  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='font-bold text-xl'>EmailedAI</div>
        <div className='flex gap-4'>
          <Button variant='ghost'>Se connecter</Button>
          <Button>S&apos;inscrire</Button>
        </div>
      </div>
    </header>
  );
}

export { Header };
