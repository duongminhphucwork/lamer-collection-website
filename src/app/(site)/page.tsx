import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/scroll-reveal";
import SectionHeading from "@/components/ui/section-heading";
import {
  fetchPageContent,
  getSection,
  type ContentItem,
} from "@/sanity/fetch-page-content";

export const metadata: Metadata = {
  description:
    "La Mer Collection - Bộ sưu tập nghỉ dưỡng sang trọng tại Vĩnh Hy Bay, Ninh Thuận. Heritage villas, Mediterranean villas và phòng khách sạn hướng biển.",
  openGraph: {
    title: "La Mer Collection | Vĩnh Hy Bay",
    description:
      "Bộ sưu tập nghỉ dưỡng sang trọng tại Vĩnh Hy Bay, Ninh Thuận.",
  },
};

export default async function HomePage() {
  const cms = await fetchPageContent("home");
  const intro = getSection(cms, "intro");
  const collection = getSection(cms, "collection");
  const experience = getSection(cms, "experience");
  const location = getSection(cms, "location");

  const DEFAULT_COLLECTION_CARDS: ContentItem[] = [
    {
      title: "Heritage Villa",
      extraField: "Villa Di Sản",
      description: "Kiến trúc truyền thống Việt Nam, hồn cốt Vĩnh Hy",
      gradient: "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 100%)",
    },
    {
      title: "Mediterranean Villa",
      extraField: "Villa Địa Trung Hải",
      description: "Phong cách Địa Trung Hải giữa lòng vịnh biển",
      gradient: "linear-gradient(180deg, #c9a87c 0%, #b8945a 100%)",
    },
    {
      title: "Ocean View Room",
      extraField: "Phòng Khách Sạn",
      description: "Tầm nhìn trọn vẹn ra đại dương xanh thẳm",
      gradient: "linear-gradient(180deg, #2c5f7a 0%, #1a4a63 100%)",
    },
  ];

  const collectionCards = collection?.items?.length
    ? collection.items
    : DEFAULT_COLLECTION_CARDS;

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
        {cms?.heroBackground?.asset?.url && (
          <img
            src={cms.heroBackground.asset.url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: cms?.heroBackground?.asset?.url
              ? "linear-gradient(to bottom, rgba(10,31,46,0.4) 0%, rgba(13,43,62,0.7) 100%)"
              : "radial-gradient(ellipse at 50% 80%, rgba(26,74,99,0.4) 0%, rgba(13,43,62,0.8) 70%)",
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
            {cms?.heroTitle || "La Mer Collection"}
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
            {cms?.heroSubtitle || "Sống Trong Lòng Vịnh"}
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
          padding: "var(--space-32) var(--container-padding) var(--space-16)",
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
            {intro?.body ||
              "Một tập hợp những không gian nghỉ dưỡng hoà quyện với đời sống và di sản của Vĩnh Hy \u2014 không phải một khu resort biệt lập, mà là một bộ sưu tập trải nghiệm sống."}
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
            subtitle={collection?.subtitle || "Bộ Sưu Tập"}
            title={collection?.title || "Những Không Gian Đặc Biệt"}
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
          {collectionCards.map((item, idx) => (
            <ScrollReveal key={item.title || idx} delay={idx * 0.15}>
              <div
                className="group relative overflow-hidden"
                style={{ borderRadius: "2px" }}
              >
                <div
                  className="w-full transition-transform duration-[800ms] group-hover:scale-105 relative"
                  style={{
                    aspectRatio: "3/4",
                    background:
                      item.gradient ||
                      "linear-gradient(180deg, #1a4a63 0%, #0d2b3e 100%)",
                    transitionTimingFunction: "var(--ease-out)",
                  }}
                >
                  {(item.image?.asset?.url ||
                    collection?.images?.[idx]?.asset?.url) && (
                    <img
                      src={
                        item.image?.asset?.url ||
                        collection?.images?.[idx]?.asset?.url
                      }
                      alt={item.title || ""}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <div
                  className="absolute inset-0 flex flex-col justify-end"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,43,62,0.95) 0%, rgba(13,43,62,0.55) 25%, transparent 48%)",
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
                    {item.extraField}
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
                    {item.description}
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
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, #1a4a63 0%, #c9a87c 100%)",
                borderRadius: "2px",
              }}
            >
              {experience?.image?.asset?.url && (
                <img
                  src={experience.image.asset.url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div style={{ padding: "var(--space-8) 0" }}>
              <SectionHeading
                subtitle={experience?.subtitle || "Trải Nghiệm"}
                title={experience?.title || "Ẩm Thực & Nghỉ Dưỡng"}
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
                {experience?.body ||
                  "Từ nhà hàng hải sản tươi sống bên bờ vịnh đến spa thư giãn với liệu pháp truyền thống \u2014 mỗi khoảnh khắc tại La Mer đều là một trải nghiệm đáng nhớ."}
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
        {location?.image?.asset?.url && (
          <img
            src={location.image.asset.url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {location?.image?.asset?.url && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,43,62,0.7) 0%, rgba(13,43,62,0.85) 100%)",
            }}
          />
        )}
        <ScrollReveal
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "900px",
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
            {location?.subtitle || "Vĩnh Hy Bay"}
          </p>
          <h2
            className="font-heading font-normal"
            style={{
              fontSize: "var(--text-2xl)",
              marginBottom: "var(--space-6)",
            }}
          >
            {location?.title || "Viên Ngọc Ẩn Mình Của Ninh Thuận"}
          </h2>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "rgba(255,255,255,0.75)",
              lineHeight: "1.8",
              marginBottom: "var(--space-8)",
            }}
          >
            {location?.body ||
              "Nằm giữa những ngọn núi và biển xanh, Vĩnh Hy là một trong bốn vịnh đẹp nhất Việt Nam \u2014 nơi thiên nhiên còn giữ nguyên vẻ hoang sơ và quyến rũ."}
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
