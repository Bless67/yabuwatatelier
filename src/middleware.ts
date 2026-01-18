import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check if sessionId cookie exists
  let sessionId = request.cookies.get("sessionId")?.value;

  // If not, generate new one
  if (!sessionId) {
    sessionId = uuid();
    response.cookies.set("sessionId", sessionId, {
      maxAge: 2592000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
