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
import { useMultiDialogStore } from "@/stores/useMultiDialogStore";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export const CustomInputsDropdown = () => {
  const { setOpenMultiChoiceInput } = useMultiDialogStore();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState("");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"sm"}>
            inputs
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Card className="py-1">
            <CardContent className="px-1">
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
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {dialog === "multiple" && <InsertMultipleChoice setOpen={setOpen} />}
          {dialog === "short" && <InsertShortInput  setOpen={setOpen}/>}
          {dialog === "long" && <InsertLongInput setOpen={setOpen}/>}
        </DialogContent>
      </Dialog>
    </>
  );
};
