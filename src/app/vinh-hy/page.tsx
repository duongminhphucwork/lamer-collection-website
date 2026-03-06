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
      <section className="py-24 container-padding text-center">
        <ScrollReveal className="max-w-[700px] mx-auto">
          <h2 className="font-heading text-fluid-2xl font-normal text-ocean mb-4">
            Viên Ngọc Của Ninh Thuận
          </h2>
          <p
            className="text-fluid-base leading-relaxed"
            style={{ color: "var(--color-text-light)" }}
          >
            Vĩnh Hy là một trong bốn vịnh đẹp nhất Việt Nam, nơi núi rừng ôm
            trọn lấy biển xanh. Với vẻ đẹp hoang sơ chưa bị thương mại hóa, Vĩnh
            Hy mang đến sự yên bình hiếm có giữa thiên nhiên hùng vĩ.
          </p>
        </ScrollReveal>
      </section>

      {/* Highlights */}
      <section
        className="py-24 container-padding"
        style={{ backgroundColor: "var(--color-ivory)" }}
      >
        <ScrollReveal className="text-center mb-12">
          <SectionHeading
            subtitle="Điểm Nổi Bật"
            title="Thiên Nhiên Vĩnh Hy"
            center
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-container mx-auto">
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
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-[2]">
                  <h3 className="font-heading text-fluid-lg font-medium mb-2">
                    {h.title}
                  </h3>
                  <p
                    className="text-fluid-sm"
                    style={{ color: "rgba(255,255,255,0.7)" }}
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
      <section className="py-24 container-padding">
        <ScrollReveal className="text-center mb-12">
          <SectionHeading
            subtitle="Di Chuyển"
            title="Đường Đến Vĩnh Hy"
            center
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-container mx-auto">
          {TRANSPORT.map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 0.15}>
              <div
                className="text-center py-8 px-6 rounded-sm"
                style={{ border: "1px solid rgba(201, 168, 124, 0.3)" }}
              >
                <h3 className="font-heading text-fluid-lg text-ocean font-medium mb-3">
                  {t.title}
                </h3>
                <p
                  className="font-heading text-fluid-xl mb-4"
                  style={{ color: "var(--color-sand)" }}
                >
                  {t.distance}
                </p>
                <p
                  className="text-fluid-sm leading-relaxed"
                  style={{ color: "var(--color-text-light)" }}
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
        <div className="relative z-[2] text-center max-w-[700px] py-24 container-padding text-white">
          <ScrollReveal>
            <SectionHeading
              subtitle="Ẩm Thực Địa Phương"
              title="Hương Vị Ninh Thuận"
              center
              light
              subtitleColor="text-sand"
            />
            <p
              className="text-fluid-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.8)" }}
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
