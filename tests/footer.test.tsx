import { describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

import { SiteFooter } from "@/components/ui/SiteFooter";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { langStore } from "@/lib/i18n/lang";

describe("SiteFooter disclaimer", () => {
  it("shows the disclaimer and links to the legal notice", () => {
    pathname.current = "/deck";
    render(<SiteFooter />);
    expect(screen.getByText(/For reflection, culture and entertainment only/)).toBeInTheDocument();
    expect(screen.getByText(/not predictions/)).toHaveTextContent(/giải hạn/);
    expect(screen.getByRole("link", { name: /Full legal notice/ })).toHaveAttribute("href", "/legal");
  });

  it("stays out of the full-screen reading chamber", () => {
    pathname.current = "/reading";
    const { container } = render(<SiteFooter />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("language toggle", () => {
  it("switches header and footer to Vietnamese and remembers the choice", async () => {
    pathname.current = "/deck";
    render(
      <>
        <SiteHeader />
        <SiteFooter />
      </>,
    );
    expect(screen.getByRole("link", { name: "Deck" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "vi" }));
    expect(screen.getByRole("button", { name: "vi" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Bộ bài" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByText(/Chỉ dành cho mục đích chiêm nghiệm/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Thông báo pháp lý đầy đủ" })).toBeInTheDocument();
    expect(langStore.get()).toBe("vi");

    await userEvent.click(screen.getByRole("button", { name: "en" }));
    expect(screen.getByRole("link", { name: "Deck" })).toBeInTheDocument();
    act(() => langStore.set(null));
  });
});
