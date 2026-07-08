"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function YoutubeModalTrigger({
  embedUrl,
  className,
  children,
}: {
  embedUrl: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ backgroundColor: "rgba(6,32,40,.92)" }}
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 flex items-center justify-center text-[rgba(245,239,230,.7)] hover:text-[#E8795A] transition-colors"
          >
            <X size={22} />
          </button>
          <div
            className="relative w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="Video"
            />
          </div>
        </div>
      )}
    </>
  );
}
