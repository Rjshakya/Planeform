import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { session } from "./app/db/schema/auth-schema";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

type Session = typeof session.$inferSelect;

// export async function middleware(request: NextRequest) {
//   console.log("🔥 Middleware triggered for:", request.nextUrl.pathname);

//   if (request.nextUrl.pathname.startsWith("/auth")) {
//     return NextResponse.next();
//   }

//   const { data: session } = await betterFetch<Session>(
//     "/api/auth/get-session",
//     {
//       baseURL: request.nextUrl.origin,
//       headers: {
//         cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
//       },
//     }
//   );
//   if (!session) {
//     return NextResponse.redirect(new URL("/auth", request.url));
//   }
//   const response = NextResponse.next()
//   return response;
// }

// export const config = {
//   //   runtime: "nodejs",
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - / (root/home page)
//      * - /auth (auth pages)
//      * - /api/auth/[...all] (auth API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      */
//     "/((?!$|auth|api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };
