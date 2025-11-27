"use client";

import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Database,
  Webhook,
  FileSpreadsheet,
  Mail,
  Github,
  Slack,
  Settings,
} from "lucide-react";

const integrations = [
  {
    name: "Google Sheets",
    icon: FileSpreadsheet,
    description: "Sync submissions directly to your spreadsheets",
  },
  {
    name: "Notion",
    icon: Database,
    description: "Create pages in Notion from form submissions",
  },
  {
    name: "Webhooks",
    icon: Webhook,
    description: "Custom webhooks for any integration",
  },
  // {
  //   name: "Zapier",
  //   icon: Zap,
  //   description: "Connect to 5000+ apps via Zapier",
  // },
  // {
  //   name: "Make",
  //   icon: Settings,
  //   description: "Automate workflows with Make.com",
  // },
  {
    name: "Email",
    icon: Mail,
    description: "Get instant email notifications",
  },
  // {
  //   name: "Slack",
  //   icon: Slack,
  //   description: "Send submissions to Slack channels",
  // },
  // {
  //   name: "GitHub",
  //   icon: Github,
  //   description: "Create issues from form submissions",
  // },
];

export const IntegrationsV2 = () => {
  return (
    <section
      id="integrations"
      className="relative z-10 border-x max-w-5xl mx-auto pt-36 pb-24"
    >
      <div className="">
        <div className="text-left w-full space-y-4 mb-16 px-4 md:px-6">
          <Badge className="outline-1" variant={"outline"}>
            Integrations
          </Badge>
          <h2
            style={{ fontFamily: "var(--font-insturment-serif)" }}
            className="max-w-lg text-3xl md:text-4xl"
          >
            Connect with your favorite tools
          </h2>
          <p className="max-w-lg text-sm md:text-base text-muted-foreground">
            Planetform integrates seamlessly with the tools you already use.
            Connect forms to your workflow in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 border-y border-r">
          {integrations.map((integration, i) => {
            const Icon = integration.icon;
            return (
              <div
                key={integration.name}
                className={`group relative border-l ${
                  i !== 0 && "border-t"
                } p-8 transition hover:border-primary/40`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative space-y-3">
                  <div className="size-10 flex items-center justify-center text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {integration.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
