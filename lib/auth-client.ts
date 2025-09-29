import "client-only";
import { useUserStore } from "@/stores/useUserStore";
import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

export const authClient = createAuthClient({
  baseURL: baseUrl,
});
export const signIn = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `https://nextformly.rajshakya631.workers.dev//dashboard`,
    });

    const session = await authClient.getSession();
    useUserStore.setState({ user: session?.data?.user });
  } catch (e) {
    toast("failed to authenticate");
  }
};

export const signOut = async () => {
  await authClient.signOut({});
  redirect("/");
};
