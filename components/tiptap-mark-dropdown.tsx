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
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          B
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0 w-14">
        <Card className=" py-1 ">
          <CardContent className=" px-1 flex flex-col items-center gap-1">
            {marksArray.map((m, i) => {
              return (
                <DropdownMenuItem key={i} asChild>
                  <MarkButton
                    
                    type={m.type as any}
                  />
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
