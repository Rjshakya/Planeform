import { betterAuth } from "better-auth";
import { getDB } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  account,
  session,
  user,
  verification,
} from "@/app/db/schema/auth-schema";

const db = await getDB();
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user: user, session: session, account: account, verification },
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process?.env?.GOOGLE_CLIENT_SECRET,
      prompt: "select_account consent",
      accessType: "offline",
    },
  },
});
