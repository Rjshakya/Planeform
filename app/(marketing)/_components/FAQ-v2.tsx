"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Planetform differ from Typeform or Google Forms?",
    answer:
      "Planetform offers a block-based visual editor with deeper customization, real-time collaboration, advanced analytics with conversion funnels, and native integrations. Unlike Typeform's linear flow, Planetform gives you full layout control. Unlike Google Forms, you get unlimited forms, submissions, and powerful insights.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! Planetform offers a generous free plan with unlimited forms and submissions. You can start building immediately without any credit card required.",
  },
  {
    question: "Can I customize the design of my forms?",
    answer:
      "Absolutely. Planetform provides extensive customization options including custom themes, fonts, colors, animations, and media embeds. You have full control over the visual design to match your brand perfectly.",
  },
  {
    question: "What integrations are available?",
    answer:
      "Planetform integrates with Google Sheets, Notion, Zapier, Make.com, custom webhooks, Slack, email notifications, and many more. We're constantly adding new integrations based on user feedback.",
  },
  {
    question: "Can multiple team members collaborate on forms?",
    answer:
      "Yes! Planetform supports real-time collaboration with live co-editing, role-based permissions, and comment threads. Your team can work together seamlessly on form creation and iteration.",
  },
  {
    question: "What kind of analytics do you provide?",
    answer:
      "Planetform offers comprehensive analytics including conversion funnels, drop-off heatmaps, completion rates, response exports, and detailed insights about form performance. You'll understand exactly how users interact with your forms.",
  },
];

export const FAQV2 = () => {
  return (
    <section
      id="faq"
      className="relative z-10 border-x max-w-5xl mx-auto pt-36 pb-24"
    >
      <div className="">
        <div className="text-left w-full space-y-4 mb-16 px-4 md:px-6">
          <Badge className="outline-1" variant={"outline"}>
            FAQ
          </Badge>
          <h2
            style={{ fontFamily: "var(--font-insturment-serif)" }}
            className="max-w-lg text-3xl md:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="max-w-lg text-sm md:text-base text-muted-foreground">
            {`Everything you need to know about Planetform. Can't find the answer
            you're looking for? Contact us.`}
          </p>
        </div>

        <div className="border-y">
          <Accordion  type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b">
                <AccordionTrigger className="  text-left text-sm md:text-base font-semibold px-6 py-6 hover:bg-accent/20 transition">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
