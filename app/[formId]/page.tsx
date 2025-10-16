"use client";
import { cn } from "@/lib/utils";
import { RenderForm } from "./_components/RenderForm";
import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";

export default function Page() {
  return (
    <div className=" w-full relative">
      <div className="w-fit fixed bottom-4 right-1 z-30 ">
        <ThemeToggle variant={"secondary"} />
      </div>
      <div className={cn(` max-w-6xl w-full mx-auto px-2`)}>
        <RenderForm />
      </div>
    </div>
  );
}
