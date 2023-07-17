// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware";

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "Administrator"
    ) {
      return NextResponse.rewrite(new URL("/", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/lecturer") &&
      request.nextauth.token?.role !== "Wykladowca"
    ) {
      return NextResponse.rewrite(new URL("/", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/student") &&
      request.nextauth.token?.role !== "Student"
    ) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }
);

export const config = {
  matcher: [
    "/",
    "/admin",
    "/admin/users",
    "/admin/users/add",
    "/admin/courses",
    "/admin/courses/add",
    "/lecturer",
    "/lecturer/courses",
    "/lecturer/courses/add",
    "/student",
    "/student/courses",
  ],
};

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/extra", "/client", "/dashboard"] };
