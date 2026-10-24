import type { Metadata } from "next";
import { HistoryView } from "@/components/reading/HistoryView";

export const metadata: Metadata = {
  title: "History",
  description: "Your past readings, saved on this device.",
};

export default function HistoryPage() {
  return <HistoryView />;
}
