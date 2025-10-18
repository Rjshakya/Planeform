import Image from "next/image";
import React from "react";
import bg from "@/public/bg-gr.jpg";
import { Button } from "@/components/ui/button";
export const Hero = () => {
  return (
    <div className=" col-span-1 min-h-[400px] h-full  mx-2 mt-4 ">
      <div className="hero grid w-full  h-full relative">
        <div className="w-full flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-full">
            <span className="text-xl md:text-5xl tracking-tighter font-semibold md:p-0  inline-flex">
              Clean forms<p className=" px-1">*</p> Powerful insights
              <p className=" px-1">*</p>
            </span>
          </div>
          <div className="w-full text-left">
            <p className="w-2xs md:w-sm text-sm md:text-lg text-muted-foreground font-medium  mx-auto ">
              Formly make forms effortless with notion like interface and turn
              forms into deep insights.
            </p>
          </div>
          <div className="w-full cta flex items-start md:hidden pl-1 md:pl-0 mt-4 ">
            <Button className=" ">Start for free</Button>
          </div>
        </div>

        {/* <div className="w-full min-h-[600px] h-full absolute top-0 left-0 -z-10 object-contain">
          <Image src={bg} alt="bg" className=" rounded-xl relative " />
        </div> */}
      </div>
    </div>
  );
};
