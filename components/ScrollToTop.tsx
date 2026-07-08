"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center transition-all duration-300"
      style={{
        backgroundColor: "#0E3D45",
        color: "#F5EFE6",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D4573A")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0E3D45")}
    >
      <ArrowUp size={17} />
    </button>
  );
}
