import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/organization";

const appStoreUrl = "https://redirect.appmetrica.yandex.com/serve/317784602498366130";
const googlePlayUrl = "https://redirect.appmetrica.yandex.com/serve/245723835301644591";

function selectPageUrl(request: NextRequest): URL {
  // Custom server.js binds localhost:3000 behind Passenger, so request.url leaks localhost in prod.
  if (process.env.NODE_ENV === "production") {
    return new URL("/download/select", SITE_URL);
  }
  const host = request.headers.get("host");
  if (host) {
    const hostname = host.split(":")[0].toLowerCase();
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return new URL("/download/select", `http://${host}`);
    }
  }
  return new URL("/download/select", request.url);
}

export function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const isAndroid = /android/i.test(userAgent);
  const isAppleMobile = /iPhone|iPad|iPod/i.test(userAgent);
  const destination = isAndroid
    ? googlePlayUrl
    : isAppleMobile
      ? appStoreUrl
      : selectPageUrl(request);

  const response = NextResponse.redirect(destination);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "User-Agent");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  return response;
}
