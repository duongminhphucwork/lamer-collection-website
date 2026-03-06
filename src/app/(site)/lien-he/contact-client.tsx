"use client";

import { useState, type FormEvent } from "react";
import HeroSection from "@/components/ui/hero-section";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { SITE, ROOM_TYPE_OPTIONS } from "@/lib/constants";

interface CmsSiteInfo {
  phone?: string;
  email?: string;
  zalo?: string;
  address?: string;
  hours?: string;
}

export default function ContactClient({
  heroSubtitle,
  heroTitle,
  heroImage,
  siteSettings,
}: {
  heroSubtitle: string;
  heroTitle: string;
  heroImage?: string;
  siteSettings?: CmsSiteInfo;
}) {
  const phone = siteSettings?.phone || SITE.phone;
  const email = siteSettings?.email || SITE.email;
  const zalo = siteSettings?.zalo || SITE.zalo;
  const address = siteSettings?.address || SITE.address;
  const hours = siteSettings?.hours || SITE.hours;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <HeroSection
        subtitle={heroSubtitle}
        title={heroTitle}
        backgroundImage={heroImage}
        backgroundStyle="linear-gradient(135deg, #0d2b3e 0%, #1a4a63 60%, #c9a87c 100%)"
      />

      <section
        className="container-padding"
        style={{ paddingBlock: "var(--space-24)" }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr] max-w-container mx-auto"
          style={{ gap: "var(--space-12)" }}
        >
          {/* Form */}
          <ScrollReveal>
            <h2
              className="font-heading font-normal"
              style={{
                fontSize: "var(--text-2xl)",
                color: "var(--color-ocean)",
                marginBottom: "var(--space-4)",
              }}
            >
              Đặt Phòng
            </h2>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-light)",
                lineHeight: 1.6,
                marginBottom: "var(--space-8)",
              }}
            >
              Vui lòng điền thông tin bên dưới, đội ngũ của chúng tôi sẽ liên hệ
              lại trong vòng 24 giờ.
            </p>

            {submitted ? (
              <div
                className="text-center"
                style={{ paddingBlock: "var(--space-12)" }}
              >
                <p
                  className="font-heading"
                  style={{
                    fontSize: "var(--text-xl)",
                    color: "var(--color-ocean)",
                  }}
                >
                  Cảm ơn bạn!
                </p>
                <p
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--color-text-light)",
                    marginTop: "var(--space-2)",
                  }}
                >
                  Chúng tôi sẽ liên hệ lại sớm nhất.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                }}
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-2"
                  style={{ gap: "var(--space-4)" }}
                >
                  <FormField label="Họ tên" name="name" type="text" required />
                  <FormField label="Email" name="email" type="email" required />
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2"
                  style={{ gap: "var(--space-4)" }}
                >
                  <FormField label="Số điện thoại" name="phone" type="tel" />
                  <FormField label="Số khách" name="guests" type="number" />
                </div>
                <div
                  className="grid grid-cols-1 md:grid-cols-2"
                  style={{ gap: "var(--space-4)" }}
                >
                  <FormField label="Ngày đến" name="checkin" type="date" />
                  <FormField label="Ngày đi" name="checkout" type="date" />
                </div>
                <div
                  className="flex flex-col"
                  style={{ marginBottom: "var(--space-4)" }}
                >
                  <label
                    className="uppercase"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-light)",
                      letterSpacing: "0.1em",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    Loại phòng
                  </label>
                  <select
                    name="room-type"
                    className="font-body rounded-sm bg-white focus:outline-none transition-colors"
                    style={{
                      fontSize: "var(--text-sm)",
                      paddingBlock: "var(--space-3)",
                      paddingInline: "var(--space-4)",
                      border: "1px solid rgba(201, 168, 124, 0.3)",
                      color: "var(--color-text)",
                    }}
                  >
                    {ROOM_TYPE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="flex flex-col"
                  style={{ marginBottom: "var(--space-4)" }}
                >
                  <label
                    className="uppercase"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-light)",
                      letterSpacing: "0.1em",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    Tin nhắn
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="font-body rounded-sm bg-white focus:outline-none transition-colors resize-y"
                    style={{
                      fontSize: "var(--text-sm)",
                      paddingBlock: "var(--space-3)",
                      paddingInline: "var(--space-4)",
                      border: "1px solid rgba(201, 168, 124, 0.3)",
                      color: "var(--color-text)",
                      minHeight: "100px",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block font-medium uppercase border transition-all duration-[400ms] ease-smooth hover:bg-gold"
                  style={{
                    fontSize: "var(--text-xs)",
                    letterSpacing: "0.15em",
                    paddingBlock: "var(--space-4)",
                    paddingInline: "var(--space-8)",
                    backgroundColor: "var(--color-sand)",
                    color: "var(--color-ocean)",
                    borderColor: "var(--color-sand)",
                  }}
                >
                  Gửi Yêu Cầu
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal delay={0.2}>
            <div
              className="rounded-sm self-start"
              style={{
                padding: "var(--space-8)",
                backgroundColor: "var(--color-ivory)",
              }}
            >
              <h3
                className="font-heading font-normal"
                style={{
                  fontSize: "var(--text-xl)",
                  color: "var(--color-ocean)",
                  marginBottom: "var(--space-8)",
                }}
              >
                Thông Tin Liên Hệ
              </h3>
              <InfoItem
                label="Điện thoại"
                href={`tel:${phone.replace(/\s/g, "")}`}
                value={phone}
              />
              <InfoItem label="Email" href={`mailto:${email}`} value={email} />
              <InfoItem
                label="Zalo"
                href={
                  zalo.startsWith("http")
                    ? zalo
                    : `https://zalo.me/${zalo.replace(/\s/g, "")}`
                }
                value={
                  zalo.startsWith("http")
                    ? zalo.replace(/https?:\/\/zalo\.me\//, "")
                    : zalo
                }
              />
              <InfoItem label="Địa chỉ" value={address} />
              <div
                style={{
                  marginTop: "var(--space-8)",
                  paddingTop: "var(--space-6)",
                  borderTop: "1px solid rgba(201, 168, 124, 0.3)",
                }}
              >
                <h4
                  className="font-heading font-medium"
                  style={{
                    fontSize: "var(--text-lg)",
                    color: "var(--color-ocean)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Giờ Làm Việc
                </h4>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-light)",
                  }}
                >
                  {hours}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Map Placeholder */}
      <section
        className="flex items-center justify-center text-center"
        style={{
          height: "300px",
          background:
            "linear-gradient(135deg, #1a4a63 0%, #2c8fa0 40%, #0d2b3e 100%)",
        }}
      >
        <div>
          <p
            className="font-heading font-normal"
            style={{
              fontSize: "var(--text-2xl)",
              color: "var(--color-white)",
              marginBottom: "var(--space-2)",
            }}
          >
            Vĩnh Hy Bay
          </p>
          <p
            className="uppercase"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-sand)",
              letterSpacing: "0.15em",
            }}
          >
            Ninh Thuận, Việt Nam
          </p>
        </div>
      </section>
    </>
  );
}

function FormField({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col" style={{ marginBottom: "var(--space-4)" }}>
      <label
        className="uppercase"
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--color-text-light)",
          letterSpacing: "0.1em",
          marginBottom: "var(--space-2)",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="font-body rounded-sm bg-white focus:outline-none transition-colors"
        style={{
          fontSize: "var(--text-sm)",
          paddingBlock: "var(--space-3)",
          paddingInline: "var(--space-4)",
          border: "1px solid rgba(201, 168, 124, 0.3)",
          color: "var(--color-text)",
        }}
      />
    </div>
  );
}

function InfoItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      <span
        className="block uppercase"
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--color-text-light)",
          letterSpacing: "0.1em",
          marginBottom: "var(--space-1)",
          display: "block",
        }}
      >
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className="transition-colors hover:text-sand"
          style={{ fontSize: "var(--text-base)", color: "var(--color-ocean)" }}
        >
          {value}
        </a>
      ) : (
        <span
          style={{ fontSize: "var(--text-base)", color: "var(--color-ocean)" }}
        >
          {value}
        </span>
      )}
    </div>
  );
}
