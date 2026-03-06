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
    <div className={center ? "text-center" : ""}>
      <p
        className={`text-fluid-sm tracking-[0.15em] uppercase mb-4 ${
          subtitleColor ?? (light ? "text-sand" : "text-[#6b6b6b]")
        }`}
      >
        {subtitle}
      </p>
      <h2
        className={`font-heading text-fluid-2xl font-normal mb-4 ${
          light ? "text-white" : "text-ocean"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
