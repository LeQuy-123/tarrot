"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGS } from "@/lib/i18n/lang";
import { useLang, useMessages } from "@/lib/i18n";
import { Sigil } from "./Sigil";

const NAV = [
  { href: "/reading", key: "read" },
  { href: "/deck", key: "deck" },
  { href: "/history", key: "history" },
  { href: "/settings", key: "settings" },
] as const;

function LanguageToggle() {
  const [lang, setLang] = useLang();
  const m = useMessages();
  return (
    <div role="group" aria-label={m.nav.language} className="flex shrink-0 rounded-full border border-hairline p-0.5 text-[11px]">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          title={l === "en" ? "English" : "Tiếng Việt"}
          className={`rounded-full px-2 py-1 font-semibold tracking-wider uppercase transition-colors ${
            lang === l ? "bg-gold/20 text-gold-light" : "text-muted hover:text-parchment"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const m = useMessages();
  return (
    <header className="relative z-30 border-b border-hairline bg-void/60 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label={m.nav.home}>
          <Sigil className="h-7 w-7 text-gold transition-transform duration-700 group-hover:rotate-45" />
          <span className="hidden font-display text-xl tracking-[0.28em] text-gold-light lg:inline">ARCANA</span>
        </Link>
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
          <nav aria-label={m.nav.primary} className="min-w-0">
            <ul className="flex items-center gap-0 sm:gap-1.5">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-2 py-1.5 text-[13px] whitespace-nowrap transition-colors sm:px-3 sm:text-sm ${
                        active ? "bg-gold/15 text-gold-light" : "text-muted hover:text-parchment"
                      }`}
                    >
                      {m.nav[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
