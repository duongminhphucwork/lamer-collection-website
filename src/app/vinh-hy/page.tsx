import type { Metadata } from "next";
import HeroSection from "@/components/ui/hero-section";
import SectionHeading from "@/components/ui/section-heading";
import ScrollReveal from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "Vĩnh Hy Bay",
  description:
    "Khám phá Vĩnh Hy Bay - một trong bốn vịnh đẹp nhất Việt Nam tại Ninh Thuận.",
};

const HIGHLIGHTS = [
  {
    title: "Biển Xanh",
    desc: "Làn nước trong vắt nhìn thấy đáy, thích hợp bơi lội và lặn ngắm",
    bg: "linear-gradient(180deg, #2c8fa0 0%, #1a4a63 100%)",
  },
  {
    title: "Rạn San Hô",
    desc: "Hệ sinh thái san hô phong phú với hàng trăm loài cá nhiệt đới",
    bg: "linear-gradient(180deg, #1a6a8a 0%, #0d2b3e 100%)",
  },
  {
    title: "Làng Chài",
    desc: "Làng chài truyền thống với cuộc sống bình dị bên bờ vịnh",
    bg: "linear-gradient(180deg, #c97a4a 0%, #8a4a2a 100%)",
  },
  {
    title: "Núi Rừng",
    desc: "Rừng nguyên sinh bao quanh vịnh, tuyệt đẹp khi nhìn từ biển",
    bg: "linear-gradient(180deg, #3a7a5a 0%, #1a4a3a 100%)",
  },
];

const TRANSPORT = [
  {
    title: "Sân Bay Cam Ranh",
    distance: "~60 km",
    desc: "Khoảng 1.5 giờ lái xe qua cung đường biển tuyệt đẹp",
  },
  {
    title: "TP. Phan Rang",
    distance: "~40 km",
    desc: "Khoảng 45 phút lái xe từ trung tâm thành phố Phan Rang",
  },
  {
    title: "Đón Tận Nơi",
    distance: "La Mer",
    desc: "Dịch vụ đưa đón từ sân bay hoặc ga tàu với xe riêng",
  },
];

export default function VinhHyPage() {
  return (
    <>
      <HeroSection
        subtitle="Destination"
        title="Vĩnh Hy Bay"
        backgroundStyle="linear-gradient(135deg, #1a4a63 0%, #2c8fa0 50%, #0d2b3e 100%)"
      />

      {/* Intro */}
      <section
        className="container-padding text-center"
        style={{ paddingBlock: "var(--space-24)" }}
      >
        <ScrollReveal className="mx-auto" style={{ maxWidth: "700px" }}>
          <h2
            className="font-heading font-normal"
            style={{
              fontSize: "var(--text-2xl)",
              color: "var(--color-ocean)",
              marginBottom: "var(--space-4)",
            }}
          >
            Viên Ngọc Của Ninh Thuận
          </h2>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-light)",
              lineHeight: 1.8,
            }}
          >
            Vĩnh Hy là một trong bốn vịnh đẹp nhất Việt Nam, nơi núi rừng ôm
            trọn lấy biển xanh. Với vẻ đẹp hoang sơ chưa bị thương mại hóa, Vĩnh
            Hy mang đến sự yên bình hiếm có giữa thiên nhiên hùng vĩ.
          </p>
        </ScrollReveal>
      </section>

      {/* Highlights */}
      <section
        className="container-padding"
        style={{
          paddingBlock: "var(--space-24)",
          backgroundColor: "var(--color-ivory)",
        }}
      >
        <ScrollReveal
          className="text-center"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <SectionHeading
            subtitle="Điểm Nổi Bật"
            title="Thiên Nhiên Vĩnh Hy"
            center
          />
        </ScrollReveal>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-container mx-auto"
          style={{ gap: "var(--space-6)" }}
        >
          {HIGHLIGHTS.map((h, i) => (
            <ScrollReveal key={h.title} delay={i * 0.15}>
              <div
                className="group relative overflow-hidden rounded-sm"
                style={{ aspectRatio: "3/4" }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-[800ms] ease-smooth group-hover:scale-[1.08]"
                  style={{ background: h.bg }}
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
                    {h.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {h.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Getting There */}
      <section
        className="container-padding"
        style={{ paddingBlock: "var(--space-24)" }}
      >
        <ScrollReveal
          className="text-center"
          style={{ marginBottom: "var(--space-12)" }}
        >
          <SectionHeading
            subtitle="Di Chuyển"
            title="Đường Đến Vĩnh Hy"
            center
          />
        </ScrollReveal>
        <div
          className="grid grid-cols-1 md:grid-cols-3 max-w-container mx-auto"
          style={{ gap: "var(--space-6)" }}
        >
          {TRANSPORT.map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 0.15}>
              <div
                className="text-center rounded-sm"
                style={{
                  paddingBlock: "var(--space-8)",
                  paddingInline: "var(--space-6)",
                  border: "1px solid rgba(201, 168, 124, 0.3)",
                }}
              >
                <h3
                  className="font-heading font-medium"
                  style={{
                    fontSize: "var(--text-lg)",
                    color: "var(--color-ocean)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {t.title}
                </h3>
                <p
                  className="font-heading"
                  style={{
                    fontSize: "var(--text-xl)",
                    color: "var(--color-sand)",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  {t.distance}
                </p>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-light)",
                    lineHeight: 1.6,
                  }}
                >
                  {t.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Local Cuisine */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: "60vh",
          background:
            "linear-gradient(135deg, #c97a4a 0%, #8a4a2a 40%, #0d2b3e 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(13,43,62,0.5)" }}
        />
        <div
          className="relative z-[2] text-center text-white container-padding"
          style={{ maxWidth: "700px", paddingBlock: "var(--space-24)" }}
        >
          <ScrollReveal>
            <SectionHeading
              subtitle="Ẩm Thực Địa Phương"
              title="Hương Vị Ninh Thuận"
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
              Ninh Thuận nổi tiếng với hải sản tươi sống từ biển Vĩnh Hy, nho
              Ninh Thuận ngọt thanh, thịt cừu Ninh Thuận thơm nức &mdash; và vô
              số đặc sản khác chỉ có thể thưởng thức tại vùng đất đầy nắng gió
              này.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
