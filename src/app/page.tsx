import Link from "next/link";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeading from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: "100vh",
          minHeight: "600px",
          background:
            "linear-gradient(135deg, #0a1f2e 0%, #0d2b3e 30%, #1a4a63 60%, #0d2b3e 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, rgba(26,74,99,0.4) 0%, rgba(13,43,62,0.8) 70%)",
          }}
        />
        <div
          className="relative text-center text-white"
          style={{ zIndex: 2, padding: "var(--space-8)" }}
        >
          <h1
            className="font-heading font-normal uppercase"
            style={{
              fontSize: "var(--text-3xl)",
              letterSpacing: "0.2em",
              marginBottom: "var(--space-6)",
            }}
          >
            La Mer Collection
          </h1>
          <p
            className="font-heading font-normal italic"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-sand)",
              letterSpacing: "0.05em",
              marginBottom: "var(--space-2)",
            }}
          >
            Sống Trong Lòng Vịnh
          </p>
          <p
            className="uppercase"
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Vĩnh Hy Bay &mdash; Ninh Thuận
          </p>
        </div>
        {/* Scroll indicator — fixed center + custom bounce that preserves translateX(-50%) */}
        <div
          className="absolute animate-scroll-bounce flex flex-col items-center"
          style={{
            bottom: "var(--space-12)",
            left: "50%",
            zIndex: 2,
            gap: "var(--space-3)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span
            className="uppercase"
            style={{ fontSize: "var(--text-xs)", letterSpacing: "0.2em" }}
          >
            Khám phá
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
            }}
          />
        </div>
      </section>

      {/* Story Intro */}
      <section
        className="text-center"
        style={{
          padding: "var(--space-32) var(--container-padding)",
        }}
      >
        <ScrollReveal>
          <p
            className="font-heading font-normal"
            style={{
              fontSize: "var(--text-xl)",
              lineHeight: "1.6",
              color: "var(--color-ocean)",
              maxWidth: "800px",
              marginInline: "auto",
            }}
          >
            Một tập hợp những không gian nghỉ dưỡng hoà quyện với đời sống và di
            sản của Vĩnh Hy &mdash; không phải một khu resort biệt lập, mà là
            một bộ sưu tập trải nghiệm sống.
          </p>
          <span
            style={{
              display: "block",
              width: "60px",
              height: "1px",
              backgroundColor: "var(--color-sand)",
              margin: "var(--space-8) auto",
            }}
          />
        </ScrollReveal>
      </section>

      {/* Collection Preview */}
      <section
        style={{
          padding: "var(--space-24) var(--container-padding)",
        }}
      >
        <ScrollReveal className="text-center">
          <SectionHeading
            subtitle="Bộ Sưu Tập"
            title="Những Không Gian Đặc Biệt"
            center
          />
        </ScrollReveal>
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            gap: "var(--space-6)",
            maxWidth: "var(--container-max)",
            marginInline: "auto",
            marginTop: "var(--space-12)",
          }}
        >
          {[
            {
              cat: "Villa Di Sản",
              title: "Heritage Villa",
              desc: "Kiến trúc truyền thống Việt Nam, hồn cốt Vĩnh Hy",
              bg: "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 100%)",
              delay: 0,
            },
            {
              cat: "Villa Địa Trung Hải",
              title: "Mediterranean Villa",
              desc: "Phong cách Địa Trung Hải giữa lòng vịnh biển",
              bg: "linear-gradient(180deg, #c9a87c 0%, #b8945a 100%)",
              delay: 0.15,
            },
            {
              cat: "Phòng Khách Sạn",
              title: "Ocean View Room",
              desc: "Tầm nhìn trọn vẹn ra đại dương xanh thẳm",
              bg: "linear-gradient(180deg, #2c5f7a 0%, #1a4a63 100%)",
              delay: 0.3,
            },
          ].map((item) => (
            <ScrollReveal key={item.title} delay={item.delay}>
              <div
                className="group relative overflow-hidden"
                style={{ borderRadius: "2px" }}
              >
                <div
                  className="w-full transition-transform duration-[800ms] group-hover:scale-105"
                  style={{
                    aspectRatio: "3/4",
                    background: item.bg,
                    transitionTimingFunction: "var(--ease-out)",
                  }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,43,62,0.7), transparent 60%)",
                    padding: "var(--space-6)",
                  }}
                >
                  <span
                    className="uppercase"
                    style={{
                      fontSize: "var(--text-xs)",
                      letterSpacing: "0.15em",
                      color: "var(--color-sand)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {item.cat}
                  </span>
                  <h3
                    className="font-heading font-medium"
                    style={{
                      fontSize: "var(--text-lg)",
                      color: "var(--color-white)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "rgba(255,255,255,0.8)",
                      marginTop: "var(--space-2)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Experience Teaser */}
      <section
        style={{
          padding: "var(--space-24) var(--container-padding)",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 items-center"
          style={{
            gap: "var(--space-8)",
            maxWidth: "var(--container-max)",
            marginInline: "auto",
          }}
        >
          <ScrollReveal direction="left">
            <div
              style={{
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, #1a4a63 0%, #c9a87c 100%)",
                borderRadius: "2px",
              }}
            />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div style={{ padding: "var(--space-8) 0" }}>
              <SectionHeading
                subtitle="Trải Nghiệm"
                title="Ẩm Thực & Nghỉ Dưỡng"
                subtitleColor="text-sand"
              />
              <p
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-light)",
                  lineHeight: "1.8",
                  marginBottom: "var(--space-8)",
                }}
              >
                Từ nhà hàng hải sản tươi sống bên bờ vịnh đến spa thư giãn với
                liệu pháp truyền thống &mdash; mỗi khoảnh khắc tại La Mer đều là
                một trải nghiệm đáng nhớ.
              </p>
              <Link
                href="/experience"
                className="inline-block font-medium uppercase transition-all hover:bg-sand hover:text-ocean"
                style={{
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.15em",
                  padding: "var(--space-4) var(--space-8)",
                  border: "1px solid var(--color-sand)",
                  color: "var(--color-sand)",
                  transitionDuration: "var(--duration-normal)",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              >
                Khám Phá
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Location Teaser */}
      <section
        className="relative text-white text-center overflow-hidden"
        style={{
          padding: "var(--space-32) var(--container-padding)",
          background:
            "linear-gradient(135deg, #0d2b3e 0%, #1a4a63 50%, #0d2b3e 100%)",
        }}
      >
        <ScrollReveal
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "700px",
            marginInline: "auto",
          }}
        >
          <p
            className="uppercase"
            style={{
              fontSize: "var(--text-sm)",
              letterSpacing: "0.15em",
              color: "var(--color-sand)",
              marginBottom: "var(--space-4)",
            }}
          >
            Vĩnh Hy Bay
          </p>
          <h2
            className="font-heading font-normal"
            style={{
              fontSize: "var(--text-2xl)",
              marginBottom: "var(--space-6)",
              whiteSpace: "nowrap",
            }}
          >
            Viên Ngọc Ẩn Mình Của Ninh Thuận
          </h2>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "rgba(255,255,255,0.75)",
              lineHeight: "1.8",
              marginBottom: "var(--space-8)",
            }}
          >
            Nằm giữa những ngọn núi và biển xanh, Vĩnh Hy là một trong bốn vịnh
            đẹp nhất Việt Nam &mdash; nơi thiên nhiên còn giữ nguyên vẻ hoang sơ
            và quyến rũ.
          </p>
          <Link
            href="/vinh-hy"
            className="inline-block font-medium uppercase transition-all hover:bg-white hover:text-ocean"
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "0.15em",
              padding: "var(--space-4) var(--space-8)",
              border: "1px solid var(--color-white)",
              color: "var(--color-white)",
              transitionDuration: "var(--duration-normal)",
              transitionTimingFunction: "var(--ease-out)",
            }}
          >
            Tìm Hiểu Thêm
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
