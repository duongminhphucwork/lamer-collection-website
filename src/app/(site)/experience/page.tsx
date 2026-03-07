import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/ui/hero-section";
import SectionHeading from "@/components/ui/section-heading";
import ScrollReveal from "@/components/shared/scroll-reveal";
import CtaBanner from "@/components/ui/cta-banner";
import {
  fetchPageContent,
  getSection,
  type ContentItem,
} from "@/sanity/fetch-page-content";

export const metadata: Metadata = {
  title: "Trải Nghiệm",
  description:
    "Trải nghiệm ẩm thực, spa và hoạt động ngoài trời tại La Mer Collection, Vĩnh Hy Bay.",
};

const DEFAULT_ACTIVITIES: ContentItem[] = [
  {
    title: "Chèo SUP",
    description: "Khám phá vịnh trên ván SUP",
    gradient: "linear-gradient(180deg, #2c8fa0 0%, #1a4a63 100%)",
    iconPath: "M3 17l2-2h14l2 2M5 15V9a7 7 0 0114 0v6",
  },
  {
    title: "Lặn Ngắm San Hô",
    description: "Thế giới dưới đáy biển Vĩnh Hy",
    gradient: "linear-gradient(180deg, #1a6a8a 0%, #0d2b3e 100%)",
    iconPath: "M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0M12 16V4m-4 4l4-4 4 4",
  },
  {
    title: "Câu Cá",
    description: "Câu cá cùng ngư dân địa phương",
    gradient: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
    iconPath: "M18 4l-4 8h6l-4 8M6 4v16M6 12c3 0 5-2 5-4S9 4 6 4",
  },
  {
    title: "Du Thuyền Hoàng Hôn",
    description: "Ngắm hoàng hôn trên thuyền gỗ",
    gradient: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
    iconCircle: "12,12,4",
    iconPath:
      "M3 20h18M12 2v2m7.07 2.93l-1.41 1.41M22 12h-2M4 12H2m3.34-5.66L3.93 4.93",
  },
];

const DINING_GALLERY_BG = [
  "linear-gradient(135deg, #c9a87c 0%, #b8945a 100%)",
  "linear-gradient(135deg, #1a4a63 0%, #2c5f7a 100%)",
  "linear-gradient(135deg, #b8945a 0%, #8a6d3b 100%)",
  "linear-gradient(135deg, #0d2b3e 0%, #1a4a63 100%)",
  "linear-gradient(135deg, #d4b088 0%, #c9a87c 100%)",
];

export default async function ExperiencePage() {
  const cms = await fetchPageContent("experience");
  const dining = getSection(cms, "dining");
  const spa = getSection(cms, "spa");
  const activities = getSection(cms, "activities");
  const activityItems = activities?.items?.length
    ? activities.items
    : DEFAULT_ACTIVITIES;

  return (
    <>
      <HeroSection
        subtitle={cms?.heroSubtitle || "Experiences"}
        title={cms?.heroTitle || "Trải Nghiệm"}
        backgroundImage={cms?.heroBackground?.asset?.url}
        backgroundStyle="linear-gradient(135deg, #1a4a63 0%, #c9a87c 60%, #0d2b3e 100%)"
      />

      {/* Dining */}
      <section
        className="container-padding"
        style={{ paddingBlock: "var(--space-24)" }}
      >
        <ScrollReveal
          className="max-w-container mx-auto"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <SectionHeading
            subtitle={dining?.subtitle || "Ẩm Thực"}
            title={dining?.title || "Hương Vị Vĩnh Hy"}
          />
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-light)",
              lineHeight: 1.8,
              maxWidth: "600px",
              marginBottom: "var(--space-8)",
            }}
          >
            {dining?.body ||
              "Nhà hàng và quán cà phê của La Mer mang đến những hương vị tươi ngon nhất từ biển cả \u2014 hải sản đánh bắt mỗi sáng, rau xanh từ vườn địa phương, và cà phê rang xay thủ công."}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div
            className="flex overflow-x-auto snap-x snap-mandatory"
            style={{
              gap: "var(--space-4)",
              paddingBottom: "var(--space-4)",
              scrollbarWidth: "thin" as const,
              scrollbarColor: "var(--color-sand) transparent",
            }}
          >
            {((dining?.images?.length ?? 0) >= 3
              ? dining!.images!
              : DINING_GALLERY_BG.map((bg) => ({ bg }))
            ).map((item, i) => (
              <div
                key={i}
                className="flex-none w-[280px] md:w-[400px] snap-start rounded-sm overflow-hidden relative"
                style={{
                  aspectRatio: "3/2",
                  background:
                    "bg" in item
                      ? (item as { bg: string }).bg
                      : "var(--color-ocean)",
                }}
              >
                {"asset" in item && item.asset?.url && (
                  <img
                    src={item.asset.url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Spa */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: "70vh",
          background:
            "linear-gradient(135deg, #1a4a63 0%, #0d2b3e 40%, #c9a87c 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(13,43,62,0.5)" }}
        />
        <div
          className="relative z-[2] container-padding"
          style={{ maxWidth: "600px", paddingBlock: "var(--space-24)" }}
        >
          <ScrollReveal className="text-white">
            <SectionHeading
              subtitle={spa?.subtitle || "Spa & Wellness"}
              title={spa?.title || "Thư Giãn Toàn Diện"}
              light
              subtitleColor="text-sand"
            />
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.8,
                marginBottom: "var(--space-8)",
              }}
            >
              {spa?.body ||
                "Spa tại La Mer kết hợp liệu pháp truyền thống Việt Nam với kỹ thuật hiện đại. Hãy để cơ thể hòa mình vào nhịp thở của sóng biển và hương thảo mộc tự nhiên."}
            </p>
            <Link
              href="#"
              className="inline-block font-medium uppercase border border-white text-white transition-all duration-[400ms] ease-smooth hover:bg-white hover:text-ocean"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "0.15em",
                paddingBlock: "var(--space-4)",
                paddingInline: "var(--space-8)",
              }}
            >
              Đặt Lịch Spa
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Activities */}
      <section
        className="container-padding"
        style={{ paddingBlock: "var(--space-24)" }}
      >
        <ScrollReveal
          className="text-center"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <SectionHeading
            subtitle={activities?.subtitle || "Hoạt Động"}
            title={activities?.title || "Khám Phá Vĩnh Hy"}
            center
          />
        </ScrollReveal>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-container mx-auto"
          style={{ gap: "var(--space-6)" }}
        >
          {activityItems.map((a, i) => {
            const circle = a.iconCircle?.split(",").map(Number);
            return (
              <ScrollReveal key={a.title || i} delay={i * 0.15}>
                <div
                  className="group relative overflow-hidden rounded-sm"
                  style={{ aspectRatio: "3/4" }}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-[800ms] ease-smooth group-hover:scale-[1.08]"
                    style={{
                      background:
                        a.gradient ||
                        "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 100%)",
                    }}
                  />
                  {a.image?.asset?.url && (
                    <img
                      src={a.image.asset.url}
                      alt={a.title || ""}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,43,62,0.8) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 text-white z-[2]"
                    style={{ padding: "var(--space-6)" }}
                  >
                    {a.iconPath && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        width="32"
                        height="32"
                        style={{ marginBottom: "var(--space-3)" }}
                      >
                        {circle && circle.length === 3 && (
                          <circle cx={circle[0]} cy={circle[1]} r={circle[2]} />
                        )}
                        <path d={a.iconPath} />
                      </svg>
                    )}
                    <h3
                      className="font-heading font-medium"
                      style={{
                        fontSize: "var(--text-lg)",
                        marginBottom: "var(--space-2)",
                      }}
                    >
                      {a.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {a.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <CtaBanner
        title="Bắt Đầu Hành Trình"
        text="Liên hệ với chúng tôi để lên kế hoạch cho kỳ nghỉ hoàn hảo tại Vĩnh Hy Bay."
        href="/lien-he"
        linkLabel="Liên Hệ Ngay"
      />
    </>
  );
}
