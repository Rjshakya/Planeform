import Image from "next/image";
import React from "react";
import bg from "@/public/bg-gr.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const Hero = () => {
  return (
    <div className=" col-span-1 min-h-[400px] h-full  mx-2 mt-4 ">
      <div className="hero grid w-full  h-full relative">
        <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-12 text-center px-4 md:px-2">
          <span className="w-full text-xl md:text-8xl tracking-tighter font-semibold inline-flex md:justify-center text-pretty text-left md:text-center">
            Clean forms<div className=" px-1.5 md:flex md:items-center">*</div>{" "}
            Powerful insights
            <div className=" px-1.5 md:flex md:items-center">*</div>
          </span>

          <p className="w-full  md:w-lg text-sm md:text-lg text-muted-foreground font-medium text-pretty text-left md:text-center md:text-balance ">
            create clean & modern forms effortless with notion like interface
            and turn responses into deep insights.
          </p>

          <div className="w-full cta flex justify-start md:hidden md:pl-0 mt-4 ">
            <Button className="h-14 px-8">
              <Link href={"/auth"}>Start for free</Link>
            </Button>
          </div>
        </div>

        {/* <div className="w-full min-h-[600px] h-full absolute top-0 left-0 -z-10 object-contain">
          <Image src={bg} alt="bg" className=" rounded-xl relative " />
        </div> */}
      </div>
    </div>
  );
};
