"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Card, CardContent } from "./ui/card";
import { InsertShortInput } from "./custom-extensions/shortinput/Insert";
import { InsertLongInput } from "./custom-extensions/longinput/Insert";
import { InsertMultipleChoice } from "./custom-extensions/multiple-choices/Insert";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { InsertActionBtn } from "./custom-extensions/action-btn/Insert";
import { InsertPhoneInput } from "./custom-extensions/phoneinput/Insert";
import { InsertDateInput } from "./custom-extensions/date-input/Insert";

import { TextCursorInput } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const CustomInputsDropdown = () => {

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState("");

  return (
    <>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                <TextCursorInput />
                Inputs
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Input fields</TooltipContent>
        </Tooltip>

        <DropdownMenuContent>
          <Card className="py-1 border-0 shadow-none">
            <CardContent className="px-1 grid gap-1">
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                  setDialog("short");
                }}
              >
                Short Input
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                  setDialog("long");
                }}
              >
                Long Input
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                  setDialog("multiple");
                }}
              >
                Multiple choice
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                  setDialog("Date");
                }}
              >
                Date input
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <InsertPhoneInput />
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <InsertActionBtn />
              </DropdownMenuItem>
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {dialog === "multiple" && <InsertMultipleChoice setOpen={setOpen} />}
          {dialog === "short" && <InsertShortInput setOpen={setOpen} />}
          {dialog === "long" && <InsertLongInput setOpen={setOpen} />}
          {dialog === "Date" && <InsertDateInput setOpen={setOpen} />}
        </DialogContent>
      </Dialog>
    </>
  );
};
