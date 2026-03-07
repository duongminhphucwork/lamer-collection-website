import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="vi" className={`${cormorant.variable} ${inter.variable}`}>
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
