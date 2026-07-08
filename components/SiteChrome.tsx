"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NewsletterBar from "@/components/NewsletterBar";
import ScrollToTop from "@/components/ScrollToTop";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <NewsletterBar />
      <Footer />
      <ScrollToTop />
    </>
  );
}
