import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import { Hero } from "./_components/Hero";
import { Nav } from "./_components/Nav";
import bg from "@/public/grad-1.jpg";
import Image from "next/image";

export default function Landing() {
  return (
    <main className="grid grid-cols-1 px-3 md:px-1 relative">
      <div className=" col-span-full h-[500px] md:h-[600px] relative grid grid-cols-1">
        {/* <div className=" absolute top-0 inset-x-0 w-full h-full  -z-0">
          <Image src={bg} alt="bg" className=" relative h-full " />
        </div> */}
        <div className="w-full  px-2 fixed top-0 z-50 inset-x-0 overflow-hidden ">
          <Nav />
        </div>

        <Hero />
      </div>

      <div className=" w-16 h-16 fixed bottom-1 right-1 z-30">
        <ThemeToggle />
      </div>
    </main>
  );
}
