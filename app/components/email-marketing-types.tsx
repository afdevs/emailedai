"use client";
import { Button } from "@/components/ui/button";
import useEmailMarketingTypes from "@/hooks/useEmailMarketingTypes";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function EmailMarketingTypes() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const { types } = useEmailMarketingTypes();
  return (
    <div className='flex flex-wrap gap-3 justify-center'>
      {types.map((type) => (
        <Button
          key={type.label}
          variant='outline'
          className={cn(
            "rounded-full font-normal text-sm text-black bg-white hover:bg-black hover:text-white",
            type.value === params.get("type") && "bg-black text-white"
          )}
          onClick={() => router.push(`${pathname}?type=${type.value}`)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
}

export default EmailMarketingTypes;
