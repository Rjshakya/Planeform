"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTAV2 = () => {
  return (
    <section className="relative z-10 border-x max-w-5xl mx-auto pt-36 pb-24">
      <div className="px-4 md:px-6">
        <div className="border-y py-24 md:py-32">
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <h2
              style={{ fontFamily: "var(--font-insturment-serif)" }}
              className="text-4xl md:text-5xl lg:text-6xl"
            >
              Ready to build forms that convert?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
              Join thousands of teams using Planetform to create beautiful,
              modern forms with powerful analytics and seamless integrations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/auth">
                  Start for free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">View features</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

