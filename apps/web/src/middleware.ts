import { NextResponse, type NextRequest } from "next/server";
import { pickLocale } from "@/i18n/config";

export function middleware(req: NextRequest) {
  const locale = pickLocale(req.headers.get("accept-language"));
  return NextResponse.redirect(new URL(`/${locale}`, req.url));
}

export const config = { matcher: ["/"] };
