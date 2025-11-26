import React from "react";
import FormCard from "./FormCard";
import { ItemGroup, ItemSeparator } from "@/components/ui/item";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { File, Folder } from "lucide-react";

interface Iform {
  shortId: string;
  name: string;
}

export const FormsTab = ({ forms }: { forms: Iform[] }) => {
  return (
    <ItemGroup className=" w-full gap-4">
      {forms?.length > 0 &&
        forms?.map((f: { name: string; shortId: string }) => {
          return (
            <FormCard name={f?.name} shortId={f?.shortId} key={f?.shortId} />
          );
        })}

      {forms?.length === 0 && <EmptyForm />}
    </ItemGroup>
  );
};

export const EmptyForm = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`size-5 fill-red-500`}
              viewBox="0 0 24 24"
              fill="#fffcfc"
            >
              <g clipPath="url(#clip0_4418_4828)">
                <path
                  opacity="0.4"
                  d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                  fill="white"
                  style={{ fill: "var(--fillg" }}
                />
                <path
                  d="M18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z"
                  fill="white"
                  style={{ fill: "var(--fillg" }}
                />
                <path
                  d="M12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75Z"
                  fill="white"
                  style={{ fill: "var(--fillg" }}
                />
                <path
                  d="M16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75Z"
                  fill="white"
                  style={{ fill: "var(--fillg" }}
                />
              </g>
              <defs>
                <clipPath id="clip0_4418_4828">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </EmptyMedia>
        <EmptyTitle>No Forms Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any forms yet. Get started by creating your
          first form.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
