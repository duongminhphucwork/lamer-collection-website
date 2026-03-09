import Link from "next/link";

interface BackLinkProps {
  href: string;
  label: string;
}

export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="detail-back"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        fontSize: "var(--text-sm)",
        color: "var(--color-ocean)",
        letterSpacing: "0.05em",
        padding: "var(--space-6) var(--container-padding)",
        maxWidth: "var(--container-max)",
        marginInline: "auto",
        width: "100%",
        transition: "color var(--duration-fast)",
      }}
    >
      &larr; {label}
    </Link>
  );
}
