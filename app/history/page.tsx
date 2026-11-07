import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { HistoryView } from "@/components/reading/HistoryView";

export const metadata: Metadata = pageMetadata({
  title: "History",
  description: "Your past readings, saved on this device.",
  path: "/history",
  index: false,
});

export default function HistoryPage() {
  return <HistoryView />;
}
