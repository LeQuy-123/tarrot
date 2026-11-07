import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { LegalNotice } from "@/components/legal/LegalNotice";

export const metadata: Metadata = pageMetadata({
  title: "Legal Notice, Privacy & Terms · Pháp lý & Quyền riêng tư",
  description: "ARCANA is a tool for self-reflection, culture and entertainment — not fortune-telling or prediction.",
  path: "/legal",
});

export default function LegalPage() {
  return <LegalNotice />;
}
