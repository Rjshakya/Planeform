import { NodeViewProps } from "@tiptap/core";
import { InsertFileUploadParams } from "./node";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFormStore } from "@/stores/useformStore";
import FileUploadComp from "@/components/comp-547";
// import { Input } from "react-aria-components";

export const FIleUploadInputView = (props: NodeViewProps) => {
  const { id, isRequired, label, type, maxFiles, maxSize } = props?.node
    ?.attrs as InsertFileUploadParams;

  const form = useFormStore.getState().getHookForm();

  return (
    <NodeViewWrapper as={"div"}>
      <FormField
        control={form?.control}
        name={id}
        render={({
          field: { name, onBlur, onChange, ref, value, disabled },
        }) => (
          <FormItem className={`mt-4 field gap-3`}>
            <FormLabel
              htmlFor={label}
              aria-label={label}
              className=" text-md pl-1"
              id={id}
            >
              {/* {field?.} */}
              <NodeViewContent
                onKeyDown={(e) => e?.key === "Enter" && e?.preventDefault()}
                as="div"
                className=" min-w-[20px] w-full"
              />
            </FormLabel>
            <FormControl>
              <FileUploadComp
                options={{
                  accept: "*",
                  maxFiles: maxFiles || 1,
                  maxSize: maxSize || 5 * 1024 * 1024,
                  multiple: type === "multiple",
                  onFilesChange(files) {
                    const filesWithPreviewOnly = files?.map((f) => f.preview);
                    onChange(filesWithPreviewOnly);
                  },
                  // onFilesAdded(addedFiles) {},
                }}
              />
              {/* <Input type="file" multiple={type==="multiple"} onChange={(e) => {
                  
              }}/> */}
            </FormControl>
          </FormItem>
        )}
      />
    </NodeViewWrapper>
  );
};
