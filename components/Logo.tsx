import { cn } from "@/lib/utils";
import React from "react";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`logo pl-1`)}>
      <span
        className={cn(
          `font-bold flex items-center justify-center gap-2`,
          className
        )}
      >
        <div className="size-5 text-primary">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className=" text-lg">Planetform</p>
      </span>
    </div>
  );
};
