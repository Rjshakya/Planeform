"use client";
import { cn } from "@/lib/utils";
import { RenderForm } from "./_components/RenderForm";
import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/useformStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm({
    
  });
  useEffect(() => {
    useFormStore.setState({ activeStep: 0, form: form });
  }, []);
  return (
    <div className=" w-full relative">
      <div className="w-fit fixed bottom-4 right-1 z-30 ">
        {/* <ButtonGroup className=" ring-[4px] rounded-md ring-ring/60">
          <Button variant={"outline"}>
            <span className=" font-bold flex items-start gap-2 ">
              <p className="text-lg text-primary">*</p>
              <p className=" text-lg">Formly</p>
            </span>
          </Button>
          <ThemeToggle variant={"outline"} />
        </ButtonGroup> */}
        <ThemeToggle variant={"outline"} />
      </div>
      <div className={cn(` max-w-6xl w-full mx-auto px-2`)}>
        <RenderForm />
      </div>
    </div>
  );
}
