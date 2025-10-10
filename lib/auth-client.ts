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
      callbackURL: `${clientUrl}/dashboard`,
    });

    const session = await authClient.getSession();
    useUserStore.setState({ user: session?.data?.user });
  } catch (e) {
    toast("failed to initiate sign in");
  }
};

export const signOut = async () => {
  await authClient.signOut({});
  redirect("/");
};

export const linkGoogleSheet = async () => {
  try {
    await authClient.linkSocial({
      provider: "google",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch (e) {}
};
