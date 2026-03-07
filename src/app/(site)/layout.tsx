import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";

/** Site layout - wraps all public pages with nav and footer */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-ocean focus:text-white focus:outline-2 focus:outline-sand"
      >
        Chuyển đến nội dung chính
      </a>
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
