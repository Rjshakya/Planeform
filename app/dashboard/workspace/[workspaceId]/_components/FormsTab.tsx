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
          <File />
        </EmptyMedia>
        <EmptyTitle>No Forms Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any forms yet. Get started by creating your
          first form.
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent>
        <div className="flex gap-2">
          <Button variant={"ghost"} onClick={() => setOpen(true)}>
            Create workspace
          </Button>
          <Button variant={"secondary"} onClick={handleCreateForm}>
            Create form
          </Button>
        </div>
      </EmptyContent> */}
    </Empty>
  );
};
