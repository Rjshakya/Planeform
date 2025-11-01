import { spaceGrotesk } from "@/app/layout";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Asterisk } from "lucide-react";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="col-span-1 rounded-lg my-2 py-2 w-full max-w-4xl mx-auto bg-accent/35 backdrop-blur-lg border   ">
      <div className="wrapper flex justify-between items-center ">
        <Logo />

        <div className=" menu hidden md:flex gap-3 items-center px-2">
          <Button variant={"ghost"}>Pricing</Button>
          <Button asChild className="" variant={"outline"}>
            <Link href={"/auth"}>Sign In</Link>
          </Button>
        </div>

        <div className=" menu flex md:hidden gap-3 items-center px-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_4418_6187)">
                    <path
                      d="M3 7H21"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      opacity="0.34"
                      d="M3 12H21"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 17H21"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_6187">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className={`${spaceGrotesk.className} `}
            >
              <SheetHeader>
                <SheetTitle className="text-xl px-2 tracking-tighter text-accent-foreground/60">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className=" w-full grid grid-cols-1 px-2 gap-1 pt-2 pb-20 mt-2 ">
                <div className="col-span-full w-full ">
                  <Button
                    variant={"link"}
                    className=" text-xl font-medium w-full h-10 justify-start"
                  >
                    Pricing
                  </Button>
                </div>
                <div className="col-span-full w-full ">
                  <Button
                    className=" text-xl w-full  font-medium h-10 justify-start"
                    variant={"link"}
                  >
                    <Link href={"/auth"}>Sign In</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
