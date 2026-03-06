import { fetchPageContent } from "@/sanity/fetch-page-content";
import { fetchSiteSettings } from "@/sanity/fetch-site-settings";
import ContactClient from "./contact-client";

export default async function ContactPage() {
  const [cms, settings] = await Promise.all([
    fetchPageContent("lien-he"),
    fetchSiteSettings(),
  ]);

  return (
    <ContactClient
      heroSubtitle={cms?.heroSubtitle || "Contact"}
      heroTitle={cms?.heroTitle || "Liên Hệ"}
      heroImage={cms?.heroBackground?.asset?.url}
      siteSettings={
        settings
          ? {
              phone: settings.phone,
              email: settings.email,
              zalo: settings.zaloUrl,
              address: settings.address?.vi,
              hours: settings.hours,
            }
          : undefined
      }
    />
  );
}
