import { NextRequest, NextResponse } from "next/server";

const appStoreUrl = "https://redirect.appmetrica.yandex.com/serve/317784602498366130";
const googlePlayUrl = "https://redirect.appmetrica.yandex.com/serve/245723835301644591";

export function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const isAndroid = /android/i.test(userAgent);
  const isAppleMobile = /iPhone|iPad|iPod/i.test(userAgent);
  const destination = isAndroid
    ? googlePlayUrl
    : isAppleMobile
      ? appStoreUrl
      : new URL("/download/select", request.url);

  const response = NextResponse.redirect(destination);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "User-Agent");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  return response;
}
