import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Alexandra Rossi",
  description: "Lifestyle, cultura italiana y diseño de interiores.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F5EFE6]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
