import "client-only";
import { useUserStore } from "@/stores/useUserStore";
import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { dodopaymentsClient } from "@dodopayments/better-auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

export const authClient = createAuthClient({
  baseURL: baseUrl,
  plugins: [
    dodopaymentsClient(),
    inferAdditionalFields({
      user: {
        dodoCustomerId: { type: "string" },
        subsriptionPlan: { type: "string" },
        subsriptionStatus: { type: "string" },
      },
    }),
  ],
});
export const signIn = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${clientUrl}/dashboard`,
      requestSignUp: true,
    });

    const session = await authClient.getSession();
    useUserStore.setState({ user: session?.data?.user });
  } catch (e) {
    toast("failed to initiate sign in");
  }
};

export const signOut = async () => {
  await authClient.signOut({});
};

export const linkGoogleSheet = async () => {
  try {
    await authClient.linkSocial({
      provider: "google",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch (e) {}
};

export const checkout = async ({
  email,
  name,
  city,
  country,
  state,
  street,
  zipcode,
}: {
  email: string;
  name: string;
  city: string;
  country: string;
  state: string;
  street: string;
  zipcode: string;
}) => {
  try {
    const res = await authClient.dodopayments.checkout({
      slug: "free-plan",
      customer: {
        email,
        name,
      },
      billing: {
        city,
        country,
        state,
        street,
        zipcode,
      },
      allowed_payment_method_types: [
        "apple_pay",
        "google_pay",
        "credit",
        "debit",
        "upi_collect",
        "upi_intent",
      ],
    });

    console.log(res);
    if (res.data?.url) {
      window.location.href = res.data.url;
    }
  } catch (e) {}
};

export const customerPortal = async () => {
  const { data: customerPortal, error } =
    await authClient.dodopayments.customer.portal();
  if (customerPortal && customerPortal.redirect) {
    window.location.href = customerPortal.url;
  }
};
