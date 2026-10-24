"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sigil } from "./Sigil";

const NAV = [
  { href: "/reading", label: "Read" },
  { href: "/deck", label: "Deck" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="relative z-30 border-b border-hairline bg-void/60 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="ARCANA home">
          <Sigil className="h-7 w-7 text-gold transition-transform duration-700 group-hover:rotate-45" />
          <span className="hidden font-display text-xl tracking-[0.28em] text-gold-light min-[440px]:inline">ARCANA</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-0.5 sm:gap-2">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-2.5 py-1.5 text-sm transition-colors sm:px-3.5 sm:tracking-wide ${
                      active ? "bg-gold/15 text-gold-light" : "text-muted hover:text-parchment"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
