import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "La Mer Studio",
  robots: "noindex",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const dynamic = "force-dynamic";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="sanity"
      style={{
        height: "100vh",
        maxHeight: "100dvh",
        overscrollBehavior: "none",
      }}
    >
      {children}
    </div>
  );
}
