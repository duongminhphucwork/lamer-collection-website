import type { Metadata } from "next";
import HeroSection from "@/components/ui/hero-section";
import SectionHeading from "@/components/ui/section-heading";
import ScrollReveal from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "Câu Chuyện",
  description:
    "Câu chuyện về La Mer Collection - hành trình bảo tồn di sản và cộng đồng tại Vĩnh Hy Bay.",
};

const COMMUNITY_ITEMS = [
  {
    title: "Ngư Dân",
    desc: "Cùng ngư dân ra khơi đánh bắt mỗi sáng sớm, tìm hiểu nghề biển truyền thống đã tồn tại hàng trăm năm tại Vĩnh Hy.",
    iconBg: "linear-gradient(180deg, #2c8fa0 0%, #1a4a63 100%)",
    iconPath: "M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0M5 17V9a7 7 0 0114 0v8",
  },
  {
    title: "Ẩm Thực",
    desc: "Hải sản tươi sống từ biển Vĩnh Hy, chế biến theo công thức gia truyền của những gia đình ngư dân lâu đời tại vịnh.",
    iconBg: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
    iconPath:
      "M3 12h18M5 12a7 7 0 0114 0M5 12v4a7 7 0 0014 0v-4M12 8V5m-3 3V6m6 2V6",
  },
  {
    title: "Văn Hóa",
    desc: "Trải nghiệm văn hóa Chăm Pa và Raglai bản địa qua lễ hội, âm nhạc và những câu chuyện kể từ cộng đồng địa phương.",
    iconBg: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
    iconPath:
      "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export default function StoryPage() {
  return (
    <>
      <HeroSection
        subtitle="Our Story"
        title="Câu Chuyện"
        backgroundStyle="linear-gradient(135deg, #0d2b3e 0%, #1a4a63 40%, #c9a87c 100%)"
      />

      {/* Origin */}
      <section
        className="container-padding"
        style={{ paddingBlock: "var(--space-24)" }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 max-w-container mx-auto items-center"
          style={{ gap: "var(--space-8)" }}
        >
          <ScrollReveal>
            <SectionHeading subtitle="Khởi Nguồn" title="Nơi Tất Cả Bắt Đầu" />
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-light)",
                lineHeight: 1.8,
                marginBottom: "var(--space-6)",
              }}
            >
              La Mer Collection ra đời từ một tình yêu sâu sắc dành cho Vĩnh Hy
              &mdash; vịnh biển nhỏ bé nằm giữa núi rừng và đại dương, nơi cuộc
              sống trôi chậm theo nhịp thở của sóng.
            </p>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-light)",
                lineHeight: 1.8,
                marginBottom: "var(--space-6)",
              }}
            >
              Chúng tôi không xây dựng một khu resort biệt lập. Thay vào đó,
              chúng tôi tìm kiếm, trùng tu và tái sinh những ngôi nhà có lịch sử
              &mdash; biến chúng thành không gian nghỉ dưỡng sang trọng mà vẫn
              giữ nguyên linh hồn của nơi chốn.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div
              className="rounded-sm"
              style={{
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, #1a4a63 0%, #c9a87c 100%)",
              }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Heritage */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: "60vh",
          background:
            "linear-gradient(135deg, #0d2b3e 0%, #1a4a63 40%, #b8945a 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(13,43,62,0.55)" }}
        />
        <div
          className="relative z-[2] text-center text-white container-padding"
          style={{ maxWidth: "700px", paddingBlock: "var(--space-24)" }}
        >
          <ScrollReveal>
            <SectionHeading
              subtitle="Di Sản"
              title="Bảo Tồn Kiến Trúc Bản Địa"
              center
              light
              subtitleColor="text-sand"
            />
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.8,
              }}
            >
              Mỗi căn villa trong bộ sưu tập đều mang dấu ấn thời gian. Những
              ngôi nhà cổ của cư dân địa phương được trùng tu tỉ mỉ, giữ nguyên
              kết cấu gỗ, mái ngói và khoảng sân vườn &mdash; đồng thời nâng cấp
              tiện nghi đạt chuẩn quốc tế.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Community */}
      <section
        className="container-padding"
        style={{ paddingBlock: "var(--space-24)" }}
      >
        <ScrollReveal
          className="text-center"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <SectionHeading
            subtitle="Cộng Đồng"
            title="Sống Cùng Vĩnh Hy"
            center
          />
        </ScrollReveal>
        <div
          className="grid grid-cols-1 md:grid-cols-3 max-w-container mx-auto"
          style={{ gap: "var(--space-8)" }}
        >
          {COMMUNITY_ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div
                className="text-center"
                style={{
                  paddingBlock: "var(--space-8)",
                  paddingInline: "var(--space-6)",
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center mx-auto text-white"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: item.iconBg,
                    marginBottom: "var(--space-6)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width="28"
                    height="28"
                  >
                    <path d={item.iconPath} />
                  </svg>
                </div>
                <h3
                  className="font-heading font-medium"
                  style={{
                    fontSize: "var(--text-lg)",
                    color: "var(--color-ocean)",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-light)",
                    lineHeight: 1.8,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section
        className="container-padding text-center"
        style={{
          paddingBlock: "var(--space-32)",
          backgroundColor: "var(--color-ivory)",
        }}
      >
        <ScrollReveal>
          <blockquote
            className="font-heading italic font-normal mx-auto"
            style={{
              fontSize: "var(--text-xl)",
              color: "var(--color-ocean)",
              maxWidth: "800px",
              lineHeight: 1.6,
              marginBottom: "var(--space-6)",
            }}
          >
            &ldquo;Chúng tôi tin rằng du lịch bền vững không phải là cách ly du
            khách khỏi cộng đồng, mà là kết nối họ &mdash; để mỗi chuyến đi đều
            để lại giá trị cho cả hai phía.&rdquo;
          </blockquote>
          <p
            className="uppercase"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-sand)",
              letterSpacing: "0.15em",
            }}
          >
            La Mer Collection
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
