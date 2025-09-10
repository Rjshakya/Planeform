import { auth } from "@/lib/auth";
import { insertWorkspaceType, validateInputs } from "@/lib/table-types";
import { getWorkspaces } from "@/lib/data/workspace/data";
import { headers } from "next/headers";
import { ZodError } from "zod";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ user: string }> }
) {
  try {
    const { user } = await params;
    const userId = (await headers()).get("x-user-id")
    console.log(userId);
    
    const workspaces = await getWorkspaces(user);
    if (!workspaces) {
      return Response.json({ message: "Internal error" }, { status: 500 });
    }

    return Response?.json({ message: "ok", workspaces }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req?.json();
    await validateInputs(insertWorkspaceType, body);

    console.log(body);
  } catch (e) {
    if (e instanceof ZodError) {
      return new Response(e?.message, { status: 400 });
    }
  }
}
