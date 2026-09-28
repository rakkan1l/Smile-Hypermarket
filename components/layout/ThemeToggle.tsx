"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

/**
 * Light / dark switch. The initial theme is applied by the inline script in
 * app/layout.tsx before paint, so this only has to read it back on mount.
 */
export function ThemeToggle({ transparent = false }: { transparent?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("smile-theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300",
        transparent
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-line text-ink-soft hover:border-smile-blue hover:text-smile-blue",
      )}
    >
      {/* Render nothing until mounted so SSR and client agree. */}
      {mounted && (
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {isDark ? <Moon className="size-[18px]" strokeWidth={1.7} /> : <Sun className="size-[18px]" strokeWidth={1.7} />}
        </motion.span>
      )}
    </button>
  );
}
