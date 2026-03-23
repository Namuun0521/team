import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/courses(.*)",
  "/api/availability(.*)",
  "/api/webhook(.*)",
  "/api/payment-confirm(.*)",
  "/about(.*)",
  "/courses(.*)",
  "/course-details(.*)",
  "/freelancers(.*)",
  "/payment-success(.*)",
  "/api/ably-auth(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const ADMIN_EMAILS =
  process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (isAdminRoute(req)) {
    if (!userId) {
      if (pathname.startsWith("/api")) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        });
      }

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);

      const email = user.emailAddresses.find(
        (e) => e.id === user.primaryEmailAddressId,
      )?.emailAddress;

      console.log("EMAIL:", email);
      console.log("ADMIN_EMAILS:", ADMIN_EMAILS);

      if (!email || !ADMIN_EMAILS.includes(email)) {
        if (pathname.startsWith("/api")) {
          return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
          });
        }

        return NextResponse.redirect(new URL("/not-authorized", req.url));
      }
    } catch (error) {
      console.error("ADMIN CHECK ERROR:", error);

      if (pathname.startsWith("/api")) {
        return new NextResponse(JSON.stringify({ error: "Server error" }), {
          status: 500,
        });
      }

      return NextResponse.redirect(new URL("/error", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
