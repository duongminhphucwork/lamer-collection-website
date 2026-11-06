import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
// Self-hosted fonts via Fontsource — no build-time fetch to Google Fonts.
// Inter is a variable font (full weight range); Cormorant Garamond is static,
// so we load the weights/styles actually used for headings (incl. italic).
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/cormorant-garamond/700-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Vĩnh Hy Bay`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL("https://lamercollection.com"),
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: SITE.name,
  description: SITE.description,
  url: "https://lamercollection.com",
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vĩnh Hy",
    addressRegion: "Ninh Thuận",
    addressCountry: "VN",
  },
  openingHours: "Mo-Su 07:00-22:00",
};

/** Root layout - fonts and globals only, no nav/footer */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
