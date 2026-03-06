import Link from "next/link";
import ScrollReveal from "@/components/shared/scroll-reveal";

interface CtaBannerProps {
  title: string;
  text: string;
  href: string;
  linkLabel: string;
}

export default function CtaBanner({
  title,
  text,
  href,
  linkLabel,
}: CtaBannerProps) {
  return (
    <section
      className="text-center text-white"
      style={{
        padding: "var(--space-24) var(--container-padding)",
        background:
          "linear-gradient(135deg, var(--color-ocean) 0%, var(--color-ocean-light) 100%)",
      }}
    >
      <ScrollReveal>
        <h2
          className="font-heading font-normal"
          style={{
            fontSize: "var(--text-2xl)",
            marginBottom: "var(--space-4)",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "var(--space-8)",
            maxWidth: "500px",
            marginInline: "auto",
          }}
        >
          {text}
        </p>
        <Link
          href={href}
          className="inline-block font-medium uppercase"
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            padding: "var(--space-4) var(--space-8)",
            border: "1px solid var(--color-white)",
            color: "var(--color-white)",
            transition: "all var(--duration-normal) var(--ease-out)",
          }}
        >
          {linkLabel}
        </Link>
      </ScrollReveal>
    </section>
  );
}
