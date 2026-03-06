interface SectionHeadingProps {
  subtitle: string;
  title: string;
  center?: boolean;
  light?: boolean;
  subtitleColor?: string;
}

export default function SectionHeading({
  subtitle,
  title,
  center = false,
  light = false,
  subtitleColor,
}: SectionHeadingProps) {
  return (
    <div style={{ textAlign: center ? "center" : undefined }}>
      <p
        style={{
          fontSize: "var(--text-sm)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "var(--space-4)",
          color: subtitleColor
            ? undefined
            : light
              ? "var(--color-sand)"
              : "var(--color-text-light)",
        }}
        className={subtitleColor ?? ""}
      >
        {subtitle}
      </p>
      <h2
        className="font-heading"
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: 400,
          marginBottom: "var(--space-4)",
          color: light ? "var(--color-white)" : "var(--color-ocean)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
