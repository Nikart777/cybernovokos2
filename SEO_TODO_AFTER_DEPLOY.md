# SEO TODO: After Deployment

Follow these steps to complete the SEO setup for CyberX Novokosino.

## 1. Console Verification
- **Google Search Console**: If not verified, add the site. I've added support for the token in `app/layout.tsx`. You can set `NEXT_PUBLIC_GOOGLE_VERIFICATION` in your environment variables.
- **Yandex.Webmaster**: Same for Yandex. Use `NEXT_PUBLIC_YANDEX_VERIFICATION`.

## 2. Maps & NAP Consistency
- **Yandex.Maps**: Ensure the address exactly matches: `г. Москва, ул. Новокосинская, 32, ТЦ "Новокосино", 2 этаж`.
- **Google Maps**: Verify your business listing if you haven't already.

## 3. IndexNow Submission
- To notify Bing/Yandex about changes faster, you can ping them using this URL (replace with your domain):
  `https://www.bing.com/indexnow?url=https://cyberx-novokosino.ru/&key=d4e5f6a1b2c37e8a9b0c1d2e3f4a5b6c`
- The key file is already located at `/d4e5f6a1b2c37e8a9b0c1d2e3f4a5b6c.txt`.

## 4. Check New Pages
- Verify the following pages load correctly:
    - [https://cyberx-novokosino.ru/contacts](https://cyberx-novokosino.ru/contacts)
    - [https://cyberx-novokosino.ru/sitemap.xml](https://cyberx-novokosino.ru/sitemap.xml)
    - [https://cyberx-novokosino.ru/robots.txt](https://cyberx-novokosino.ru/robots.txt)
