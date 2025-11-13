"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";

import { toast } from "sonner";
import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/axios";
import { mutate } from "swr";

export const LiveConnection = ({
  metaData,
  id,
}: {
  metaData: any;
  id: string;
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { formId } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/api/integration/${id}`);
      mutate(`/api/form/${formId}/meta_data`);
    } catch (e) {
      toast.error("failed to delete integration");
    }
  };

  return (
    <div className="relative  flex items-center gap-3">
      <Input
        ref={inputRef}
        className="pe-9"
        type="text"
        defaultValue={metaData?.url || "url"}
        readOnly
      />

      <div className="relative flex items-center gap-1">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleCopy}
                // className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed"
                variant={"ghost"}
                size={"icon"}
                aria-label={copied ? "Copied" : "Copy to clipboard"}
                disabled={copied}
              >
                <div
                  className={cn(
                    "transition-all",
                    copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  )}
                >
                  <CheckIcon
                    className="stroke-emerald-500"
                    size={16}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  )}
                >
                  <CopyIcon size={16} aria-hidden="true" />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Copy to clipboard
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button size={"sm"} variant={"ghost"}>
          sync
        </Button>
        <Button
          onClick={() => handleDelete(id)}
          size={"icon"}
          variant={"ghost"}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" size-5 fill-destructive"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <g clipPath="url(#clip0_4418_4925)">
                <path
                  d="M21.0702 5.23C19.4602 5.07 17.8502 4.95 16.2302 4.86V4.85L16.0102 3.55C15.8602 2.63 15.6402 1.25 13.3002 1.25H10.6802C8.35016 1.25 8.13016 2.57 7.97016 3.54L7.76016 4.82C6.83016 4.88 5.90016 4.94 4.97016 5.03L2.93016 5.23C2.51016 5.27 2.21016 5.64 2.25016 6.05C2.29016 6.46 2.65016 6.76 3.07016 6.72L5.11016 6.52C10.3502 6 15.6302 6.2 20.9302 6.73C20.9602 6.73 20.9802 6.73 21.0102 6.73C21.3902 6.73 21.7202 6.44 21.7602 6.05C21.7902 5.64 21.4902 5.27 21.0702 5.23Z"
                  fill="white"
                  style={{ fill: "var(--fillg)" }}
                />
                <path
                  opacity="0.3991"
                  d="M19.2302 8.14C18.9902 7.89 18.6602 7.75 18.3202 7.75H5.68024C5.34024 7.75 5.00024 7.89 4.77024 8.14C4.54024 8.39 4.41024 8.73 4.43024 9.08L5.05024 19.34C5.16024 20.86 5.30024 22.76 8.79024 22.76H15.2102C18.7002 22.76 18.8402 20.87 18.9502 19.34L19.5702 9.09C19.5902 8.73 19.4602 8.39 19.2302 8.14Z"
                  fill="white"
                  style={{ fill: "var(--fillg)" }}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.58008 17C9.58008 16.5858 9.91586 16.25 10.3301 16.25H13.6601C14.0743 16.25 14.4101 16.5858 14.4101 17C14.4101 17.4142 14.0743 17.75 13.6601 17.75H10.3301C9.91586 17.75 9.58008 17.4142 9.58008 17Z"
                  fill="white"
                  style={{ fill: "var(--fillg)" }}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.75 13C8.75 12.5858 9.08579 12.25 9.5 12.25H14.5C14.9142 12.25 15.25 12.5858 15.25 13C15.25 13.4142 14.9142 13.75 14.5 13.75H9.5C9.08579 13.75 8.75 13.4142 8.75 13Z"
                  fill="white"
                  style={{ fill: "var(--fillg)" }}
                />
              </g>
              <defs>
                <clipPath id="clip0_4418_4925">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
};
