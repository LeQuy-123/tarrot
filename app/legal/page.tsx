import type { Metadata } from "next";
import { LegalNotice } from "@/components/legal/LegalNotice";

export const metadata: Metadata = {
  title: "Legal Notice, Privacy & Terms · Pháp lý & Quyền riêng tư",
  description: "ARCANA is a tool for self-reflection, culture and entertainment — not fortune-telling or prediction.",
};

export default function LegalPage() {
  return <LegalNotice />;
}
