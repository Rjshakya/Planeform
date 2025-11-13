"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { JsonDoc } from "@/lib/types";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";
import { useFormStore } from "@/stores/useformStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEditorStore } from "@/stores/useEditorStore";
import { useLandingStore } from "@/stores/useLandingStore";

// Demo form content for landing page
const demoFormContent: JsonDoc = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: null,
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Get Started Today",
          attrs: {},
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "Join thousands of teams building better forms. Start creating in seconds.",
          attrs: {},
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
    },
    {
      type: "shortInput",
      attrs: {
        id: v4(),
        label: "Full Name",
        placeholder: "Enter your full name",
        type: "text",
        isRequired: true,
      },
      content: [
        {
          type: "text",
          text: "Full Name",
          attrs: {},
        },
      ],
    },
    {
      type: "shortInput",
      attrs: {
        id: v4(),
        label: "Email Address",
        placeholder: "you@example.com",
        type: "email",
        isRequired: true,
      },
      content: [
        {
          type: "text",
          text: "Email Address",
          attrs: {},
        },
      ],
    },
    {
      type: "longInput",
      attrs: {
        id: v4(),
        label: "Tell us about your project",
        placeholder: "Describe what you're building...",
        isRequired: false,
      },
      content: [
        {
          type: "text",
          text: "Tell us about your project",
          attrs: {},
        },
      ],
    },
    {
      type: "actionButton",
      attrs: {
        id: v4(),
        type: "submit",
        text: "Get Started",
      },
      content: [
        {
          type: "text",
          text: "Get Started",
          attrs: {},
        },
      ],
    },
  ],
  attrs: {},
} satisfies JsonDoc;

// Component to track editor content from the store


export const HeroV2 = () => {
  const form = useForm();
  const [showPreview, setShowPreview] = useState(true);
  const { landingEditorContent } = useLandingStore((s) => s);

  useEffect(() => {
    // Initialize form store for demo
    useFormStore.setState({
      form,
      activeStep: 0,
      maxStep: 0,
      isLastStep: true,
      isSingleForm: true,
    });

  }, [form]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pt-48 pb-24  border-x">
      {/* Promo Badge */}
      <div className="flex justify-center mb-10">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full hover:bg-primary/80 hover:text-white dark:hover:bg-primary/80 bg-primary ring-primary text-background dark:bg-primary dark:text-foreground "
        >
          <Link href={"/auth"} className="flex items-center gap-2">
            <span className="pl-1">Start for free</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      {/* Main Headline */}
      <div className="text-center mb-12">
        <h1
          className={cn(
            "text-6xl md:text-7xl mb-10 leading-tighter transition-opacity duration-1000"
          )}
          style={{ fontFamily: "var(--font-insturment-serif)" }}
        >
          <span className="block italic tracking-tight font-light ">
            Build forms that
          </span>
          <span className="block font-medium tracking-tighter italic">
            Actually convert
          </span>
        </h1>
        <p className="text-sm md:text-lg text-muted-foreground max-w-md mx-auto text-balance">
          Create beautiful, modern forms with an intuitive block-based editor.
          Simple to build, powerful to analyze.
        </p>
      </div>

      {/* Interactive Form Editor Section */}
      <div className=" relative mt-16 w-full max-w-4xl mx-auto ">
        {/* Floating Preview Toggle Button - Firecrawl style */}
        <div className="absolute top-8 right-8 z-10 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2 "
          >
            <Zap className="size-3 text-primary" />
            <span>Live Editor</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            // onClick={() => setShowPreview(!showPreview)}
            className="gap-2"
          >
            {/* <Eye className="size-4" /> */}
            <Link href={"/dashboard"}>
              <span className="">Publish</span>
            </Link>
          </Button>
        </div>

        {/* Main Container with Grid Layout - Firecrawl inspired */}
        <div className="grid grid-cols-1 w-full  rounded-md bg-card ring-[10px] ring-ring/10 shadow-foreground dark:shadow-foreground dark:shadow-2xl shadow-2xl  border-[6px] border-border/30 ">
          {/* Form Editor*/}
          <div className="col-span-1 relative h-full md:mt-16 mt-8  ">
            <div
              style={{ scrollbarWidth: "none" }}
              className="relative max-h-[400px] sm:max-h-[400px] h-full overflow-x-auto   "
            >
              <FormEditor
                isEditable={true}
                content={landingEditorContent!}
                className="max-w-none h-full "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
