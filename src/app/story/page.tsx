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
  },
  {
    title: "Ẩm Thực",
    desc: "Hải sản tươi sống từ biển Vĩnh Hy, chế biến theo công thức gia truyền của những gia đình ngư dân lâu đời tại vịnh.",
    iconBg: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
  },
  {
    title: "Văn Hóa",
    desc: "Trải nghiệm văn hóa Chăm Pa và Raglai bản địa qua lễ hội, âm nhạc và những câu chuyện kể từ cộng đồng địa phương.",
    iconBg: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
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
      <section className="py-24 container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-container mx-auto items-center">
          <ScrollReveal>
            <SectionHeading subtitle="Khởi Nguồn" title="Nơi Tất Cả Bắt Đầu" />
            <p
              className="text-fluid-base leading-relaxed mb-6"
              style={{ color: "var(--color-text-light)" }}
            >
              La Mer Collection ra đời từ một tình yêu sâu sắc dành cho Vĩnh Hy
              &mdash; vịnh biển nhỏ bé nằm giữa núi rừng và đại dương, nơi cuộc
              sống trôi chậm theo nhịp thở của sóng.
            </p>
            <p
              className="text-fluid-base leading-relaxed mb-6"
              style={{ color: "var(--color-text-light)" }}
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
        <div className="relative z-[2] text-center max-w-[700px] py-24 container-padding text-white">
          <ScrollReveal>
            <SectionHeading
              subtitle="Di Sản"
              title="Bảo Tồn Kiến Trúc Bản Địa"
              center
              light
              subtitleColor="text-sand"
            />
            <p
              className="text-fluid-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
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
      <section className="py-24 container-padding">
        <ScrollReveal className="text-center mb-12">
          <SectionHeading
            subtitle="Cộng Đồng"
            title="Sống Cùng Vĩnh Hy"
            center
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-container mx-auto">
          {COMMUNITY_ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.15}>
              <div className="text-center py-8 px-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
                  style={{ background: item.iconBg }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width="28"
                    height="28"
                  >
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <h3 className="font-heading text-fluid-lg text-ocean font-medium mb-4">
                  {item.title}
                </h3>
                <p
                  className="text-fluid-sm leading-relaxed"
                  style={{ color: "var(--color-text-light)" }}
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
        className="py-32 container-padding text-center"
        style={{ backgroundColor: "var(--color-ivory)" }}
      >
        <ScrollReveal>
          <blockquote className="font-heading text-fluid-xl italic font-normal text-ocean max-w-[800px] mx-auto leading-relaxed mb-6">
            &ldquo;Chúng tôi tin rằng du lịch bền vững không phải là cách ly du
            khách khỏi cộng đồng, mà là kết nối họ &mdash; để mỗi chuyến đi đều
            để lại giá trị cho cả hai phía.&rdquo;
          </blockquote>
          <p
            className="text-fluid-sm tracking-[0.15em] uppercase"
            style={{ color: "var(--color-sand)" }}
          >
            La Mer Collection
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
