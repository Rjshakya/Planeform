import { authClient, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const useUser = () => {
  const router = useRouter();
  const { data, error, isPending } = authClient.useSession();

  if (error) {
    signOut();
    router.push("/auth");
  
  }
  return { user: data?.user, isPending, error };
};
