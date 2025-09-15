import { cn } from "@/lib/utils";
import { RenderForm } from "./_components/RenderForm";

export default function Page() {
  return (
    <div className=" w-full ">
      <div className={cn(` max-w-6xl w-full mx-auto`)}>
         <RenderForm/>
      </div>
    </div>
  );
}
