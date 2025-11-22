"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { useForm } from "react-hook-form";
import { useFormStore } from "@/stores/useformStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLandingStore } from "@/stores/useLandingStore";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

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
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pt-36 pb-36  border-x relative ">
      <div
        className="dark:absolute inset-0 z-0 opacity-45"
        style={{
          background:
            "repeating-linear-gradient(45deg, #000 0px, #111 2px, #000 4px, #222 6px)",
        }}
      />

      {/* Zigzag Lightning - Light Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
        repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
        repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
        repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
      `,
        }}
      />

      {/* Promo Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex justify-center mb-10  "
      >
        <Link href={"/auth"} className=" ">
          <Badge className="relative overflow-hidden border-0">
            <div className="flex items-center gap-1 py-1.5 w-full h-full ">
              <span className="pl-1">Start for free</span>
              <ArrowRight className="size-3" />
            </div>

            <div className=" absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-r from-transparent to-white/40 " />
          </Badge>
        </Link>
      </motion.div>

      {/* Main Headline */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-sm md:text-lg text-muted-foreground max-w-md mx-auto text-balance"
        >
          Create beautiful, modern forms with an intuitive block-based editor.
          Simple to build, powerful to analyze.
        </motion.p>
      </div>

      {/* Interactive Form Editor Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className=" relative mt-16 w-full max-w-4xl mx-auto bg-gradient-to-tr from-transparent via-primary to-transparent p-2  "
      >
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
        <div className="bg-card grid grid-cols-1 w-full rounded-2xl shadow-foreground dark:shadow-foreground dark:shadow-2xl shadow-2xl  border-[7px] ">
          {/* Form Editor*/}
          <div className="col-span-1 relative h-full md:mt-16 mt-8  ">
            <div
              style={{ scrollbarWidth: "none" }}
              className="relative max-h-[400px] sm:max-h-[400px] h-full overflow-x-auto "
            >
              <FormEditor
                isEditable={true}
                content={landingEditorContent!}
                className="max-w-none h-full "
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
