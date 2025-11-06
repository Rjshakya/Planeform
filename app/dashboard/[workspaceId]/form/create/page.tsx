"use client";

import { FormEditor } from "../_components/FormEditor";
import { useEditorStore } from "@/stores/useEditorStore";
import { useUser } from "@/hooks/use-User";

export default function Page() {
  // const [content, setContent] = useState<JsonDoc>();
  // useEffect(() => {
  //   useEditorStore.setState({ content: defaultEditorContent });
  // }, []);
  // @ts-ignore
  return (
    <FormEditor
      content={
        useEditorStore.getState().editedContent ||
        useEditorStore.getState().content || {
          type: "doc",
          attrs: {},
          content: [],
        }
      }
      isEditable={true}
      className=""
    />
  );
}
