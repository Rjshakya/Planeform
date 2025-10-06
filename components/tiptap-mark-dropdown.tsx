import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MarkButton } from "./tiptap-ui/mark-button";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const marksArray = [
  {
    type: "bold",
    select: false,
  },
  {
    type: "italic",
    select: false,
  },
  {
    type: "strike",
    select: false,
  },
  {
    type: "code",
    select: false,
  },
  {
    type: "underline",
    select: false,
  },
];

export const TiptapMarkDropdown = () => {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              B
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Marks</TooltipContent>
      </Tooltip>

      <DropdownMenuContent className="">
        <Card className=" py-1  border-0 shadow-none">
          <CardContent className=" px-1 flex flex-row items-center gap-1">
            {marksArray.map((m, i) => {
              return (
                <DropdownMenuItem key={i} asChild>
                  <MarkButton type={m.type as any} />
                </DropdownMenuItem>
              );
            })}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
