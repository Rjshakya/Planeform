import { use } from "react";
import { FormEditor } from "../_components/FormEditor";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <FormEditor isEditable={true} />;
}
