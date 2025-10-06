import React from "react";
import FormCard from "./FormCard";

interface Iform {
  shortId: string;
  name: string;
}

export const FormsTab = ({ forms }: { forms: Iform[] }) => {
  return (
    <div className=" w-full grid md:grid-cols-3  gap-4 mt-4">
      {forms?.length > 0 &&
        forms?.map((f: { name: string; shortId: string }) => {
          return (
            <FormCard name={f?.name} shortId={f?.shortId} key={f?.shortId} />
          );
        })}

      {forms?.length === 0 && (
        <div className=" col-span-3 text-center ">
          <p className=" text-2xl text-muted-foreground">
            You dont have any forms , please create one
          </p>
        </div>
      )}
    </div>
  );
};
