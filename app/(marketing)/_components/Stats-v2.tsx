"use client";

import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, FileText, Zap } from "lucide-react";

const stats = [
  {
    label: "Active Users",
    value: "10K+",
    description: "Teams building forms",
    icon: Users,
  },
  {
    label: "Forms Created",
    value: "50K+",
    description: "Forms published",
    icon: FileText,
  },
  {
    label: "Submissions",
    value: "1M+",
    description: "Responses collected",
    icon: TrendingUp,
  },
  {
    label: "Uptime",
    value: "99.9%",
    description: "Reliable infrastructure",
    icon: Zap,
  },
];

export const StatsV2 = () => {
  return (
    <section
      id="stats"
      className="relative z-10 border-x max-w-5xl mx-auto pt-36 pb-24"
    >
      <div className="">
        <div className="text-left w-full space-y-4 mb-16 px-4 md:px-6">
          <Badge className="outline-1" variant={"outline"}>
            Trusted by teams
          </Badge>
          <h2
            style={{ fontFamily: "var(--font-insturment-serif)" }}
            className="max-w-lg text-3xl md:text-4xl"
          >
            Join thousands of teams building better forms
          </h2>
          <p className="max-w-lg text-sm md:text-base text-muted-foreground">
            Planetform is trusted by teams of all sizes to create, analyze, and
            optimize their form experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-r">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`group relative border-l ${
                  i !== 0 && "border-t md:border-t-0"
                } py-8 w-full text-center transition hover:border-primary/40`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative space-y-3">
                  <div className="flex justify-center">
                    <div className="size-12 flex items-center justify-center text-primary rounded-full bg-primary/10">
                      <Icon className="size-6" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl md:text-4xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
