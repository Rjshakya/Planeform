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
import { AlignLeftIcon, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const textAligns = [
  { align: "left" },
  { align: "center" },
  { align: "right" },
  { align: "justify" },
];

export const TiptapTextAlignDropdown = () => {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"sm"}>
              <AlignLeftIcon />

              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Text align</TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="start"
        className=" rounded-sm p-1 flex flex-row gap-1 "
      >
        {textAligns.map((m, i) => {
          return (
            <DropdownMenuItem className="" key={i} asChild>
              <TextAlignButton align={m.align as any} />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
