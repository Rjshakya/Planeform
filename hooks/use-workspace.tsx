import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Iworkspace {
  id: string;
  name: string;
}
const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export const useWorkspace = () => {
  const { data: session } = authClient?.useSession();
  const { data, error, isLoading, mutate } = useSWR(
    () => `/api/workspace/` + session?.user?.id,
    fetcher
  );

  return { workspace: data?.workspace as Iworkspace[], isLoading, error, mutate , userId:session?.user?.id };
};
