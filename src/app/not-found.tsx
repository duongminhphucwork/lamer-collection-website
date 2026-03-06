import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-white text-center"
      style={{
        background:
          "linear-gradient(135deg, var(--color-ocean) 0%, var(--color-ocean-light) 50%, var(--color-ocean) 100%)",
        paddingInline: "var(--container-padding)",
      }}
    >
      <div>
        <p
          className="uppercase"
          style={{
            fontSize: "var(--text-sm)",
            letterSpacing: "0.2em",
            color: "var(--color-sand)",
            marginBottom: "var(--space-4)",
          }}
        >
          404
        </p>
        <h1
          className="font-heading font-normal"
          style={{
            fontSize: "var(--text-3xl)",
            marginBottom: "var(--space-6)",
          }}
        >
          Trang Không Tìm Thấy
        </h1>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "var(--space-8)",
            maxWidth: "500px",
            marginInline: "auto",
          }}
        >
          Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          className="inline-block font-medium uppercase transition-all hover:bg-sand hover:text-ocean"
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            paddingBlock: "var(--space-4)",
            paddingInline: "var(--space-8)",
            border: "1px solid var(--color-sand)",
            color: "var(--color-sand)",
            transitionDuration: "var(--duration-normal)",
            transitionTimingFunction: "var(--ease-out)",
          }}
        >
          Về Trang Chủ
        </Link>
      </div>
    </section>
  );
}
