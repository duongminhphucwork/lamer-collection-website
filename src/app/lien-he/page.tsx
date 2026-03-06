"use client";

import { useState, type FormEvent } from "react";
import HeroSection from "@/components/ui/hero-section";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { SITE, ROOM_TYPE_OPTIONS } from "@/lib/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <HeroSection
        subtitle="Contact"
        title="Liên Hệ"
        backgroundStyle="linear-gradient(135deg, #0d2b3e 0%, #1a4a63 60%, #c9a87c 100%)"
      />

      <section className="py-24 container-padding">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 max-w-container mx-auto">
          {/* Form */}
          <ScrollReveal>
            <h2 className="font-heading text-fluid-2xl font-normal text-ocean mb-4">
              Đặt Phòng
            </h2>
            <p className="text-fluid-base text-[#6b6b6b] leading-relaxed mb-8">
              Vui lòng điền thông tin bên dưới, đội ngũ của chúng tôi sẽ liên hệ
              lại trong vòng 24 giờ.
            </p>

            {submitted ? (
              <div className="py-12 text-center">
                <p className="font-heading text-fluid-xl text-ocean">
                  Cảm ơn bạn!
                </p>
                <p className="text-fluid-base text-[#6b6b6b] mt-2">
                  Chúng tôi sẽ liên hệ lại sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Họ tên" name="name" type="text" required />
                  <FormField label="Email" name="email" type="email" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Số điện thoại" name="phone" type="tel" />
                  <FormField label="Số khách" name="guests" type="number" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Ngày đến" name="checkin" type="date" />
                  <FormField label="Ngày đi" name="checkout" type="date" />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-fluid-xs text-[#6b6b6b] tracking-[0.1em] uppercase mb-2">
                    Loại phòng
                  </label>
                  <select
                    name="room-type"
                    className="font-body text-fluid-sm py-3 px-4 border border-sand/30 rounded-sm bg-white text-[#2c2c2c] focus:outline-none focus:border-sand transition-colors"
                  >
                    {ROOM_TYPE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-fluid-xs text-[#6b6b6b] tracking-[0.1em] uppercase mb-2">
                    Tin nhắn
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="font-body text-fluid-sm py-3 px-4 border border-sand/30 rounded-sm bg-white text-[#2c2c2c] focus:outline-none focus:border-sand transition-colors resize-y min-h-[100px]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block text-fluid-xs font-medium tracking-[0.15em] uppercase py-4 px-8 bg-sand text-ocean border border-sand transition-all duration-[400ms] ease-smooth hover:bg-gold"
                >
                  Gửi Yêu Cầu
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal delay={0.2}>
            <div className="p-8 bg-ivory rounded-sm self-start">
              <h3 className="font-heading text-fluid-xl text-ocean font-normal mb-8">
                Thông Tin Liên Hệ
              </h3>
              <InfoItem
                label="Điện thoại"
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                value={SITE.phone}
              />
              <InfoItem
                label="Email"
                href={`mailto:${SITE.email}`}
                value={SITE.email}
              />
              <InfoItem label="Zalo" value={SITE.zalo} />
              <InfoItem label="Địa chỉ" value={SITE.address} />
              <div className="mt-8 pt-6 border-t border-sand/30">
                <h4 className="font-heading text-fluid-lg text-ocean font-medium mb-3">
                  Giờ Làm Việc
                </h4>
                <p className="text-fluid-sm text-[#6b6b6b]">{SITE.hours}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Map Placeholder */}
      <section
        className="h-[300px] flex items-center justify-center text-center"
        style={{
          background:
            "linear-gradient(135deg, #1a4a63 0%, #2c8fa0 40%, #0d2b3e 100%)",
        }}
      >
        <div>
          <p className="font-heading text-fluid-2xl text-white font-normal mb-2">
            Vĩnh Hy Bay
          </p>
          <p className="text-fluid-sm text-sand tracking-[0.15em] uppercase">
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
    <div className="flex flex-col mb-4">
      <label className="text-fluid-xs text-[#6b6b6b] tracking-[0.1em] uppercase mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="font-body text-fluid-sm py-3 px-4 border border-sand/30 rounded-sm bg-white text-[#2c2c2c] focus:outline-none focus:border-sand transition-colors"
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
    <div className="mb-6">
      <span className="block text-fluid-xs text-[#6b6b6b] tracking-[0.1em] uppercase mb-1">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className="text-fluid-base text-ocean hover:text-sand transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-fluid-base text-ocean">{value}</span>
      )}
    </div>
  );
}
