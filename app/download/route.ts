import { NextRequest, NextResponse } from "next/server";

const appStoreUrl = "https://redirect.appmetrica.yandex.com/serve/317784602498366130";
const googlePlayUrl = "https://redirect.appmetrica.yandex.com/serve/245723835301644591";

export function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const destination = /android/i.test(userAgent) ? googlePlayUrl : appStoreUrl;

  return NextResponse.redirect(destination);
}
