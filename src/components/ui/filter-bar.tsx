"use client";

interface FilterBarProps {
  filters: readonly { readonly value: string; readonly label: string }[];
  active: string;
  onChange: (value: string) => void;
  variant?: "square" | "pill";
}

export default function FilterBar({
  filters,
  active,
  onChange,
  variant = "pill",
}: FilterBarProps) {
  const isSquare = variant === "square";

  return (
    <div
      className="flex flex-wrap justify-center"
      style={{
        padding: isSquare
          ? "var(--space-8) var(--container-padding)"
          : "var(--space-12) var(--container-padding) var(--space-8)",
        gap: "var(--space-3)",
        maxWidth: "var(--container-max)",
        marginInline: "auto",
      }}
    >
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "var(--space-2) var(--space-6)",
            whiteSpace: "nowrap",
            cursor: "pointer",
            borderRadius: isSquare ? "0" : "100px",
            transition: "all var(--duration-fast) var(--ease-out)",
            ...(isSquare
              ? active === f.value
                ? {
                    backgroundColor: "var(--color-ocean)",
                    border: "1px solid var(--color-ocean)",
                    color: "var(--color-white)",
                  }
                : {
                    border: "1px solid var(--color-ocean-light)",
                    color: "var(--color-ocean)",
                    background: "transparent",
                  }
              : active === f.value
                ? {
                    backgroundColor: "var(--color-sand)",
                    border: "1px solid var(--color-sand)",
                    color: "var(--color-ocean)",
                  }
                : {
                    border: "1px solid rgba(201, 168, 124, 0.4)",
                    color: "var(--color-text-light)",
                    background: "none",
                  }),
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
