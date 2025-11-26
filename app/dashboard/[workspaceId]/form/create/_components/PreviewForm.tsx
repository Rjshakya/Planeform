"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormEditor } from "@/app/dashboard/[workspaceId]/form/_components/FormEditor";
import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import { JsonDoc } from "@/lib/types";
import { useFormStore } from "@/stores/useformStore";
import { ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { useEditorStore } from "@/stores/useEditorStore";
import { motion } from "motion/react";

export const PreviewForm = () => {
  const [jsonContent, setJsonContent] = useState<JsonDoc>();
  const { editor } = useCurrentEditor();
  const [docs, setDocs] = useState<JsonDoc[]>([]);
  const form = useForm({});

  const { data: session } = authClient.useSession();
  const { activeStep } = useFormStore((s) => s);
  const { formBackgroundColor } = useEditorStore((s) => s);

  const handlePreview = useCallback(() => {
    if (!editor) return;
    const json = editor.getJSON();
    setJsonContent(json);
    useFormStore.setState({ activeStep: 0, form });
  }, [editor]);

  useEffect(() => {
    if (!jsonContent?.content || !form) {
      setDocs([]);
      return;
    }

    const content = [...jsonContent?.content];
    const breakIndices: number[] = [0];

    content?.forEach((node, i) => {
      if (node.type === "horizontalRule") {
        breakIndices.push(i);
      }
    });

    breakIndices?.push(content?.length - 1);

    const parsedDocs = [] as any[];
    for (let i = 0; i < breakIndices.length - 1; i++) {
      const stepContent = content
        .slice(breakIndices[i], breakIndices[i + 1])
        .filter((n) => n?.type !== "horizontalRule");

      if (stepContent.length > 0) {
        parsedDocs.push({ type: "doc", content: stepContent });
      }
    }

    setDocs(parsedDocs);

    if (parsedDocs?.length === 1) {
      useFormStore.setState({
        isSingleForm: true,
        creator: session?.user?.id,
        customerId: session?.user?.dodoCustomerId,
        isLastStep: activeStep === parsedDocs?.length - 1,
        maxStep: parsedDocs?.length - 1,
      });
    } else {
      useFormStore.setState({
        isSingleForm: false,
        creator: session?.user?.id,
        customerId: session?.user?.dodoCustomerId,
        isLastStep: activeStep === parsedDocs?.length - 1,
        maxStep: parsedDocs?.length - 1,
      });
    }
  }, [jsonContent, form , handlePreview]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handlePreview} variant={"outline"} size={"sm"}>
          Preview
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className=" font-sans h-full grid overflow-auto"
        style={{
          backgroundColor: formBackgroundColor || undefined,
        }}
      >
        <SheetHeader>
          <SheetTitle>Preview form</SheetTitle>
        </SheetHeader>
        <RenderPreviewForm docs={docs} />
      </SheetContent>
    </Sheet>
  );
};

export const RenderPreviewForm = ({ docs }: { docs: JsonDoc[] }) => {
  const { activeStep, maxStep } = useFormStore((s) => s);
  const handleActiveIndex = useCallback(
    (idx: number) => {
      const index = idx < 0 ? 0 : Math.min(docs?.length - 1, idx);
      useFormStore.setState({
        activeStep: index,
        isLastStep: maxStep === index,
      });
    },
    [maxStep, docs?.length]
  );

  return (
    <div className="pt-2 pb-4">
      {docs?.length > 1 && activeStep !== 0 && (
        <div className="w-full max-w-3xl mx-auto">
          <Button
            onClick={() => handleActiveIndex(activeStep - 1)}
            variant={"secondary"}
            size={"icon"}
          >
            <ArrowLeft size={16} />
          </Button>
        </div>
      )}

      {docs?.length > 0 && activeStep === docs?.length && (
        <div className="max-w-3xl mx-auto text-center">
          <p>Thankyou</p>
        </div>
      )}

      {docs?.map((content, i) => {
        if (activeStep === i) {
          return (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: -700, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full"
            >
              <FormEditor
                key={activeStep}
                className="max-w-xl mx-auto  w-full rounded-2xl  dark:bg-accent/0 "
                isEditable={false}
                content={content}
              />
            </motion.div>
          );
        }
        return null;
      })}
    </div>
  );
};
