import ScrollReveal from "@/components/shared/scroll-reveal";

interface PricingTableProps {
  priceWeekday?: number;
  priceWeekend?: number;
  priceHoliday?: number;
}

function formatVnd(price?: number): string {
  if (!price) return "—";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

const COLUMNS = [
  {
    period: "Ngày thường",
    days: "Thứ 2 – Thứ 5",
    key: "priceWeekday" as const,
  },
  {
    period: "Cuối tuần",
    days: "Thứ 6 – Chủ Nhật",
    key: "priceWeekend" as const,
  },
  { period: "Lễ / Tết", days: "Ngày lễ & Tết", key: "priceHoliday" as const },
];

export default function PricingTable(props: PricingTableProps) {
  return (
    <ScrollReveal>
      <div style={{ width: "100%", marginBottom: "var(--space-8)" }}>
        <h2
          className="font-heading font-normal"
          style={{
            fontSize: "var(--text-xl)",
            color: "var(--color-ocean)",
            marginBottom: "var(--space-6)",
          }}
        >
          Bảng Giá
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-4)",
          }}
          className="md:!grid-cols-3"
        >
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              style={{
                border: "1px solid rgba(13,43,62,0.1)",
                padding: "var(--space-6)",
                textAlign: "center",
                transition: "border-color var(--duration-fast)",
              }}
              className="hover:!border-[var(--color-sand)]"
            >
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-light)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {col.period}
              </div>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-light)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {col.days}
              </div>
              <div
                className="font-heading"
                style={{
                  fontSize: "var(--text-xl)",
                  fontWeight: 500,
                  color: "var(--color-ocean)",
                }}
              >
                {formatVnd(props[col.key])}
              </div>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-light)",
                  marginTop: "var(--space-1)",
                }}
              >
                / đêm
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
