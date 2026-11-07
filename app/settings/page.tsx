import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { SettingsView } from "@/components/ui/SettingsView";

export const metadata: Metadata = pageMetadata({
  title: "Settings",
  description: "Sound, animation, and accessibility preferences.",
  path: "/settings",
  index: false,
});

export default function SettingsPage() {
  return <SettingsView />;
}
