import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { TextAlignButton } from "./tiptap-ui/text-align-button";
import { AlignLeftIcon } from "lucide-react";

const textAligns = [
  { align: "left" },
  { align: "center" },
  { align: "right" },
  { align: "justify" },
];

export const TiptapTextAlignDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <AlignLeftIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0 w-14">
        <Card className=" py-1 ">
          <CardContent className=" px-1 flex flex-col items-center gap-1">
            {textAligns.map((m, i) => {
              return (
                <DropdownMenuItem key={i} asChild>
                  <TextAlignButton align={m.align as any} />
                </DropdownMenuItem>
              );
            })}

            {/* <DropdownMenuItem asChild>
                  <MarkButton type="italic" />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <MarkButton type="strike" />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <MarkButton type="code" />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <MarkButton type="underline" />
                </DropdownMenuItem> */}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
