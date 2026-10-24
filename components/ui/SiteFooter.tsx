"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, useMessages } from "@/lib/i18n";

/**
 * Site-wide disclaimer in the active language. Hidden inside the full-screen reading chamber,
 * which carries its own short notice and link to /legal.
 */
export function SiteFooter() {
  const pathname = usePathname();
  const [lang] = useLang();
  const m = useMessages();
  if (pathname === "/reading") return null;

  return (
    <footer className="mt-auto border-t border-hairline px-4 py-8 text-xs text-muted sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-base tracking-[0.3em] text-gold/80">ARCANA · THE ASTRAL ARCHIVE</p>
        <p lang={lang} className="mt-4 leading-relaxed">
          <strong className="text-parchment/90">{m.footer.title}</strong> {m.footer.body}
        </p>
        <p className="mt-4">
          <Link href="/legal" className="text-gold-light underline underline-offset-4 hover:text-parchment">
            {m.footer.legal}
          </Link>
          <span aria-hidden="true"> · </span>
          <span>{m.footer.artwork}</span>
        </p>
      </div>
    </footer>
  );
}
