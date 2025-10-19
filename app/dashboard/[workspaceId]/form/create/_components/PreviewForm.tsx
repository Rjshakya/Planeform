"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { ButtonGroup } from "@/components/ui/button-group";
import { useFormStore } from "@/stores/useformStore";

export const PreviewForm = () => {
  const [jsonContent, setJsonContent] = useState<JsonDoc>();
  const { editor } = useCurrentEditor();
  const [docs, setDocs] = useState<JsonDoc[]>([]);
  const { activeStep } = useFormStore((s) => s);
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePreview = useCallback(() => {
    if (!editor) return;
    const json = editor.getJSON();
    console.log(json);

    setJsonContent(json);
  }, [editor]);

  // const steps = useMemo(() => {
  //   if (!jsonContent) return [];
  //   const copy = [...jsonContent?.content];

  //   const alldocs = [] as any[];
  //   const breaks = [0] as any[];
  //   copy?.forEach((c, i) => {
  //     if (c.type === "horizontalRule") {
  //       breaks?.push(i);
  //     }
  //   });

  //   breaks.push(copy?.length - 1);

  //   breaks.forEach((b, i) => {
  //     if (!breaks[i + 1]) {
  //       return;
  //     }

  //     const stepContent = copy
  //       ?.slice(breaks[i], breaks[i + 1])
  //       ?.filter((n) => n?.type !== "horizontalRule");
  //     alldocs.push({ type: "doc", content: stepContent });
  //   });
  //   setDocs(alldocs);
  // }, [jsonContent]);

  const handleActiveIndex = (idx: number) => {
    const index = idx < 0 ? 0 : Math.min(docs?.length - 1, idx);
    setActiveIdx(index);
  };

  useEffect(() => {
    // if (activeIdx !== undefined) return;

    useFormStore?.setState({
      maxStep: docs?.length - 1,
      setActiveStep: setActiveIdx,
    });
  }, [docs]);

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

    setDocs(parsedDocs);
    setActiveIdx(0); // Reset to first step
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
          {docs?.length > 1 && (
            <div className="w-full max-w-sm mx-auto">
              <ButtonGroup>
                <Button
                  onClick={() => handleActiveIndex(activeIdx - 1)}
                  variant={"secondary"}
                >
                  p
                </Button>
                <Button
                  onClick={() => handleActiveIndex(activeIdx + 1)}
                  variant={"secondary"}
                >
                  n
                </Button>
              </ButtonGroup>
            </div>
          )}

          {docs?.map((d, i) => {
            if (activeIdx === i) {
              return (
                <FormEditor
                  key={i}
                  className=" mx-auto max-w-lg w-full rounded-2xl  dark:bg-accent/0 "
                  isEditable={false}
                  content={d}
                  isLast={docs?.length - 1 === activeIdx}
                  activeStep={i}
                  maxStep={docs?.length - 1}
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
