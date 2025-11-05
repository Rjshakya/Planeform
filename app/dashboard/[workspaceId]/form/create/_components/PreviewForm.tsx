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

export const PreviewForm = () => {
  const [jsonContent, setJsonContent] = useState<JsonDoc>();
  const { editor } = useCurrentEditor();
  const [docs, setDocs] = useState<JsonDoc[]>([]);

  const { data: session } = authClient.useSession();
  const { activeStep, isLastStep, maxStep } = useFormStore((s) => s);

  const handlePreview = useCallback(() => {
    if (!editor) return;
    const json = editor.getJSON();
    console.log(json);

    setJsonContent(json);
  }, [editor]);

  const handleActiveIndex = useCallback(
    (idx: number) => {
      const index = idx < 0 ? 0 : Math.min(maxStep, idx);
      console.log(index, idx);
      console.log(maxStep === index);

      useFormStore.setState({
        activeStep: index,
        isLastStep: maxStep === index,
      });
    },
    [activeStep, isLastStep, maxStep]
  );

  useEffect(() => {
    if (!jsonContent?.content) {
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

    // console.log(parsedDocs);
    setDocs(parsedDocs);

    if (parsedDocs?.length === 1) {
      useFormStore.setState({
        isSingleForm: true,
        creator: session?.user?.id,
        customerId: session?.user?.dodoCustomerId,
        isLastStep: true,
        maxStep: parsedDocs?.length - 1,
      });
    } else {
      useFormStore.setState({
        isSingleForm: false,
        creator: session?.user?.id,
        customerId: session?.user?.dodoCustomerId,
        isLastStep: false,
        maxStep: parsedDocs?.length - 1,
      });
    }

    useFormStore.setState({ activeStep: 0 });
  }, [jsonContent]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handlePreview} variant={"outline"} size={"sm"}>
          Preview
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className=" sm:max-w-full w-full h-full grid overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Preview form</SheetTitle>
          {docs?.length > 1 && activeStep !== 0 && (
            <div className="w-full max-w-lg mx-auto">
              <Button
                onClick={() => handleActiveIndex(activeStep - 1)}
                variant={"secondary"}
                size={"icon"}
              >
                <ArrowLeft size={16} />
              </Button>
            </div>
          )}

          {docs?.map((d, i) => {
            if (activeStep === i) {
              return (
                <FormEditor
                  key={i}
                  className=" mx-auto max-w-xl   w-full rounded-2xl  dark:bg-accent/0 "
                  isEditable={false}
                  content={d}
                />
              );
            }
            return null;
          })}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
