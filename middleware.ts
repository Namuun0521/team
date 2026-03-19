import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/courses(.*)",
  "/api/availability(.*)",
  "/api/webhook(.*)",
  "/api/payment-confirm(.*)", // ← нэмэх
  "/about(.*)",
  "/courses(.*)",
  "/course-details(.*)",
  "/freelancers(.*)",
  "/payment-success(.*)", // ← нэмэх
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
