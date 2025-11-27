"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu, Github } from "lucide-react";
import Link from "next/link";

export const NavV2 = () => {
  return (
    <nav className=" relative w-full max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between border backdrop-blur-3xl">
      <div className="flex items-center gap-2">
        <Logo />
      </div>

      {/* Right side actions */}
      <div className="hidden md:flex items-center gap-3">
        <Link href={"/pricing"}>
          <Button variant="ghost" className="gap-2">
            <span className="text-sm">Pricing</span>
          </Button>
        </Link>
        <Link href={"/auth"}>
          <Button variant={"secondary"} asChild>
            <span className="text-sm">Sign Up</span>
          </Button>
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center gap-2 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="font-sans" side="top">
            <SheetHeader>
              <SheetTitle>
                <Logo className="justify-start" />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-6">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/pricing">Pricing</Link>
              </Button>

              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/auth">Sign up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
