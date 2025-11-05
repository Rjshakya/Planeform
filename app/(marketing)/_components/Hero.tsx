import Image from "next/image";
import React from "react";
import bg from "@/public/grad-1.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
const playFair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const Hero = () => {
  return (
    <div className=" col-span-1  h-full  mx-2  z-10 mt-24  md:mt-36">
      <div className="hero grid grid-cols-1 w-full  h-full relative md:gap-6 ">
        <div className="w-full flex flex-col md:items-center items-start justify-center md:px-0 px-2 gap-4 md:gap-8 text-center ">
          <span
            className={`w-full max-w-sm md:max-w-2xl text-2xl md:text-5xl tracking-tighter font-bold text-pretty text-left md:text-center `}
          >
            Forms that don’t just collect data — they tell{" "}
            <span className={``}>stories.</span>
          </span>

          <p className="w-full max-w-sm md:max-w-lg text-sm md:text-lg text-muted-foreground font-medium text-pretty text-left md:text-center md:text-pretty ">
            {/* Create clean & modern forms effortless with notion like interface
            and turn responses into deep insights. */}
            Build modern forms in a notion-like editor — simple to create,
            beautiful to share, and powerful to understand.
          </p>

          <div className="w-full cta flex justify-start md:justify-center md:mt-2 ">
            <Button className=" md:w-48 md:h-10 shadow-inner shadow-amber-600">
              <Link className="flex items-center gap-2" href={"/auth"}>
                <p>Start for free</p>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 12H20.33"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </Button>
          </div>
        </div>

        <div className="w-full max-w-3xl  h-full object-contain mx-auto">
          <Image src={bg} alt="bg" className=" rounded-xl relative " />
        </div>
      </div>
    </div>
  );
};
