import Link from "next/link";
import { SITE, FOOTER_LINKS } from "@/lib/constants";
import { fetchSiteSettings } from "@/sanity/fetch-site-settings";

export default async function Footer() {
  const settings = await fetchSiteSettings();

  const siteName = settings?.siteName || SITE.name;
  const phone = settings?.phone || SITE.phone;
  const email = settings?.email || SITE.email;
  const address = settings?.address?.vi || SITE.address;

  return (
    <footer
      style={{
        backgroundColor: "var(--color-ocean)",
        color: "var(--color-ivory)",
        padding: "var(--space-24) var(--container-padding) var(--space-8)",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] mx-auto"
        style={{
          gap: "var(--space-12)",
          maxWidth: "var(--container-max)",
        }}
      >
        <div>
          <p
            className="font-heading"
            style={{
              fontSize: "var(--text-xl)",
              letterSpacing: "0.15em",
              marginBottom: "var(--space-4)",
            }}
          >
            {siteName}
          </p>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "rgba(247, 242, 234, 0.7)",
              lineHeight: "1.8",
              maxWidth: "360px",
            }}
          >
            {SITE.tagline} &mdash; Bộ sưu tập nghỉ dưỡng độc đáo tại Vĩnh Hy,
            Ninh Thuận, Việt Nam.
          </p>
        </div>

        <div>
          <h4
            className="font-heading"
            style={{
              fontSize: "var(--text-lg)",
              marginBottom: "var(--space-6)",
              color: "var(--color-sand)",
            }}
          >
            Liên Kết
          </h4>
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                fontSize: "var(--text-sm)",
                color: "rgba(247, 242, 234, 0.7)",
                marginBottom: "var(--space-3)",
                transition: "color var(--duration-fast)",
              }}
              className="hover:text-sand"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h4
            className="font-heading"
            style={{
              fontSize: "var(--text-lg)",
              marginBottom: "var(--space-6)",
              color: "var(--color-sand)",
            }}
          >
            Liên Hệ
          </h4>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            style={{
              display: "block",
              fontSize: "var(--text-sm)",
              color: "rgba(247, 242, 234, 0.7)",
              marginBottom: "var(--space-3)",
              transition: "color var(--duration-fast)",
            }}
            className="hover:text-sand"
          >
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            style={{
              display: "block",
              fontSize: "var(--text-sm)",
              color: "rgba(247, 242, 234, 0.7)",
              marginBottom: "var(--space-3)",
              transition: "color var(--duration-fast)",
            }}
            className="hover:text-sand"
          >
            {email}
          </a>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "rgba(247, 242, 234, 0.7)",
              marginBottom: "var(--space-3)",
            }}
          >
            {address}
          </p>
        </div>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(247, 242, 234, 0.1)",
          marginTop: "var(--space-16)",
        }}
      />
      <p
        style={{
          textAlign: "center",
          fontSize: "var(--text-xs)",
          color: "rgba(247, 242, 234, 0.4)",
          marginTop: "var(--space-6)",
        }}
      >
        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
      </p>
    </footer>
  );
}
