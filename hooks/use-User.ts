
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";


export const useUser = () => {
  const { data, error, isPending } = authClient.useSession();
  // const router = useRouter()
  if (!data) {
    redirect('/auth')
  }

  return { user: data?.user, isPending, error };
};
