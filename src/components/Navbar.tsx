import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Generator", href: "/#generator" },
  { label: "Text Styles", href: "/#styles" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Bold Text Generator home">
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <span className="font-serif text-[15px] leading-none">B</span>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        Bold<span className="text-muted-foreground">Text</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 animate-fade px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "container-page flex h-14 items-center justify-between rounded-full border transition-all duration-500",
          scrolled || open
            ? "border-border bg-background/80 shadow-nav backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href="/#generator"
            className="hidden h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] md:inline-flex"
          >
            Try Generator
          </a>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-accent md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "container-page mt-2 overflow-hidden rounded-3xl border bg-background/95 shadow-nav backdrop-blur-xl transition-all duration-400 ease-out-expo md:hidden",
          open ? "max-h-96 border-border opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0",
        )}
      >
        <ul className="flex flex-col py-3">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-3 text-lg font-medium tracking-tight"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 pb-2">
            <a
              href="/#generator"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            >
              Try Generator
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
