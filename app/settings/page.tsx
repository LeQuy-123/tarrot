import type { Metadata } from "next";
import { SettingsView } from "@/components/ui/SettingsView";

export const metadata: Metadata = {
  title: "Settings",
  description: "Sound, animation, and accessibility preferences.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
