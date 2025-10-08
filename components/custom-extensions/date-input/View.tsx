import { useFormStore } from "@/stores/useformStore";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { NodeViewProps } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export const DateInputView = (props: NodeViewProps) => {
  const form = useFormStore.getState().getHookForm();
  const { id, label } = props?.node?.attrs;

  return (
    <NodeViewWrapper as={"div"}>
      <FormField
        control={form?.control}
        name={id}
        render={({ field }) => (
          <FormItem
            className={`mt-4 field ${
              props?.selected && "outline-2 outline-primary"
            }`}
          >
            <FormLabel
              htmlFor={label}
              aria-label={label}
              className=" text-2xl"
              id={id}
            >
              <NodeViewContent
                onKeyDown={(e) => e?.key === "Enter" && e?.preventDefault()}
                as="div"
                className="outline-none focus:outline-none inline-block min-w-[20px] w-full"
              />
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Your date of birth is used to calculate your age.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </NodeViewWrapper>
  );
};
