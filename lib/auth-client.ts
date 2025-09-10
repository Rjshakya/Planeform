import { useUserStore } from "@/stores/useUserStore";
import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3005",
});
export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });

  const session = await authClient.getSession();
  console.log(session);

  useUserStore.setState({ user: session?.data?.user });
};

export const signOut = async () => {
  await authClient.signOut({});
  redirect("/");
};
