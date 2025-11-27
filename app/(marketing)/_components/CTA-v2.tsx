"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTAV2 = ({className}:{className?:string}) => {
  return (
    <section className={cn(`relative z-10 border-x max-w-5xl mx-auto pt-36 pb-24` , className)}>
      <div className="">
        <div className="border-y py-24 md:py-32">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2
              style={{ fontFamily: "var(--font-insturment-serif)" }}
              className="text-4xl md:text-5xl lg:text-6xl"
            >
              Ready to build forms effortlessly?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
              Join thousands of teams using Planetform to create beautiful,
              modern forms with powerful analytics and seamless integrations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-3xl ">
              <Button size="lg" asChild className="gap-2 ">
                <Link href="/auth">
                  Start for free
                  <ArrowRight className="size-3" />
                </Link>
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

