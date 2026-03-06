import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/ui/hero-section";
import SectionHeading from "@/components/ui/section-heading";
import ScrollReveal from "@/components/shared/scroll-reveal";
import CtaBanner from "@/components/ui/cta-banner";

export const metadata: Metadata = {
  title: "Trải Nghiệm",
  description:
    "Trải nghiệm ẩm thực, spa và hoạt động ngoài trời tại La Mer Collection, Vĩnh Hy Bay.",
};

const ACTIVITIES = [
  {
    title: "Chèo Kayak",
    desc: "Khám phá vịnh trên thuyền kayak",
    bg: "linear-gradient(180deg, #2c8fa0 0%, #1a4a63 100%)",
  },
  {
    title: "Lặn Ngắm San Hô",
    desc: "Thế giới dưới đáy biển Vĩnh Hy",
    bg: "linear-gradient(180deg, #1a6a8a 0%, #0d2b3e 100%)",
  },
  {
    title: "Câu Cá",
    desc: "Câu cá cùng ngư dân địa phương",
    bg: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
  },
  {
    title: "Du Thuyền Hoàng Hôn",
    desc: "Ngắm hoàng hôn trên thuyền gỗ",
    bg: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
  },
];

const DINING_GALLERY_BG = [
  "linear-gradient(135deg, #c9a87c 0%, #b8945a 100%)",
  "linear-gradient(135deg, #1a4a63 0%, #2c5f7a 100%)",
  "linear-gradient(135deg, #b8945a 0%, #8a6d3b 100%)",
  "linear-gradient(135deg, #0d2b3e 0%, #1a4a63 100%)",
  "linear-gradient(135deg, #d4b088 0%, #c9a87c 100%)",
];

export default function ExperiencePage() {
  return (
    <>
      <HeroSection
        subtitle="Experiences"
        title="Trải Nghiệm"
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
          <SectionHeading subtitle="Ẩm Thực" title="Hương Vị Vĩnh Hy" />
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-light)",
              lineHeight: 1.8,
              maxWidth: "600px",
              marginBottom: "var(--space-8)",
            }}
          >
            Nhà hàng và quán cà phê của La Mer mang đến những hương vị tươi ngon
            nhất từ biển cả &mdash; hải sản đánh bắt mỗi sáng, rau xanh từ vườn
            địa phương, và cà phê rang xay thủ công.
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
            {DINING_GALLERY_BG.map((bg, i) => (
              <div
                key={i}
                className="flex-none w-[280px] md:w-[400px] snap-start rounded-sm overflow-hidden"
                style={{ aspectRatio: "3/2", background: bg }}
              />
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
              subtitle="Spa & Wellness"
              title="Thư Giãn Toàn Diện"
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
              Spa tại La Mer kết hợp liệu pháp truyền thống Việt Nam với kỹ
              thuật hiện đại. Hãy để cơ thể hòa mình vào nhịp thở của sóng biển
              và hương thảo mộc tự nhiên.
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
            subtitle="Hoạt Động"
            title="Khám Phá Vĩnh Hy"
            center
          />
        </ScrollReveal>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-container mx-auto"
          style={{ gap: "var(--space-6)" }}
        >
          {ACTIVITIES.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 0.15}>
              <div
                className="group relative overflow-hidden rounded-sm"
                style={{ aspectRatio: "3/4" }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-[800ms] ease-smooth group-hover:scale-[1.08]"
                  style={{ background: a.bg }}
                />
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
                    {a.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
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
