import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean via-ocean-light to-ocean text-white text-center container-padding">
      <div>
        <p className="text-fluid-sm tracking-[0.2em] uppercase text-sand mb-4">
          404
        </p>
        <h1 className="font-heading text-fluid-3xl font-normal mb-6">
          Trang Không Tìm Thấy
        </h1>
        <p className="text-fluid-base text-white/70 mb-8 max-w-[500px] mx-auto">
          Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          className="inline-block text-fluid-xs font-medium tracking-[0.15em] uppercase py-4 px-8 border border-sand text-sand transition-all duration-[400ms] ease-smooth hover:bg-sand hover:text-ocean"
        >
          Về Trang Chủ
        </Link>
      </div>
    </section>
  );
}
