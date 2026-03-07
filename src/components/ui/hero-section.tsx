interface HeroSectionProps {
  subtitle: string;
  title: string;
  backgroundStyle?: string;
  backgroundImage?: string;
}

export default function HeroSection({
  subtitle,
  title,
  backgroundStyle,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "60vh", minHeight: "400px" }}
    >
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: backgroundStyle ?? "var(--color-ocean)" }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--color-overlay)" }}
      />
      <div className="relative z-[2] text-center text-white">
        <p
          className="uppercase"
          style={{
            fontSize: "var(--text-sm)",
            letterSpacing: "0.2em",
            color: "var(--color-sand)",
            marginBottom: "var(--space-4)",
          }}
        >
          {subtitle}
        </p>
        <h1
          className="font-heading font-normal"
          style={{
            fontSize: "var(--text-3xl)",
            fontWeight: 400,
            letterSpacing: "0.1em",
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
