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

      {/* Desktop Navigation */}
      {/* <div className="hidden md:flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-1">
              Products
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/products">All Products</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/products/forms">Forms</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" asChild>
          <Link href="/playground">Playground</Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link href="/docs">Docs</Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link href="/pricing">Pricing</Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link href="/blog">Blog</Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-1">
              Extract
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Extract Data</DropdownMenuItem>
            <DropdownMenuItem>API</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-1">
              Resources
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem>Community</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

      {/* Right side actions */}
      <div className="hidden md:flex items-center gap-3">
        <Button variant="ghost" className="gap-2">
          <span className="text-sm">Pricing</span>
        </Button>
        <Button variant={"secondary"} asChild>
          <Link href="/auth">Sign up</Link>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center gap-2 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="font-sans -z-0" side="top">
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
