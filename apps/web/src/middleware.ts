import { NextResponse, type NextRequest } from "next/server";
import { pickLocale } from "@/i18n/config";

export function middleware(req: NextRequest) {
  const locale = pickLocale(req.headers.get("accept-language"));
  return NextResponse.redirect(new URL(`/${locale}`, req.url));
}

// runtime nodejs: Vercel Services no admite Edge Functions, que es el runtime por defecto del middleware.
export const config = { matcher: ["/"], runtime: "nodejs" };
