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
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
