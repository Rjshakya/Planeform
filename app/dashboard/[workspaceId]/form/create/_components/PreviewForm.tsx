import React, { useCallback, useMemo, useState } from "react";
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

export const PreviewForm = () => {
  const [jsonContent, setJsonContent] = useState<JsonDoc>();
  const { editor } = useCurrentEditor();
  const [docs, setDocs] = useState<JsonDoc[]>([]);

  const handlePreview = useCallback(() => {
    if (!editor) return;
    const json = editor.getJSON();
    console.log(json);

    setJsonContent(json);
  }, [editor]);

  const steps = useMemo(() => {
    if (!jsonContent) return [];
    const copy = [...jsonContent?.content];

    const alldocs = [] as any[];
    const breaks = [0] as any[];
    copy?.forEach((c, i) => {
      if (c.type === "horizontalRule") {
        breaks?.push(i);
      }
    });

    breaks.push(copy?.length - 1);

    breaks.forEach((b, i) => {
      if (!breaks[i + 1]) {
        return;
      }

      const stepContent = copy
        ?.slice(breaks[i], breaks[i + 1])
        ?.filter((n) => n?.type !== "horizontalRule");
      alldocs.push({ type: "doc", content: stepContent });
    });
    setDocs(alldocs);
  }, [ jsonContent]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handlePreview} variant={"outline"} size={"sm"}>
          Preview
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className=" sm:max-w-full w-full h-full overflow-auto"
      >
        <SheetHeader>
          <SheetTitle>Preview form</SheetTitle>
          {/* <FormEditor
            className=" mx-auto max-w-lg w-full rounded-2xl bg-accent/40 dark:bg-accent/15 "
            isEditable={false}
            content={jsonContent}
          />
          <FormEditor
            className=" mx-auto max-w-lg w-full rounded-2xl bg-accent/40 dark:bg-accent/15 "
            isEditable={false}
            content={jsonContent}
          /> */}
          {docs?.map((d, i) => {
            return (
              <FormEditor
                key={i}
                className=" mx-auto max-w-lg w-full rounded-2xl  dark:bg-accent/0 "
                isEditable={false}
                content={d}
              />
            );
          })}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
