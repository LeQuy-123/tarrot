import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

import { SiteFooter } from "@/components/ui/SiteFooter";

describe("SiteFooter disclaimer", () => {
  it("shows the bilingual disclaimer and links to the legal notice", () => {
    pathname.current = "/deck";
    render(<SiteFooter />);
    expect(screen.getByText(/For reflection, culture and entertainment only/)).toBeInTheDocument();
    expect(screen.getByText(/Chỉ dành cho mục đích chiêm nghiệm/)).toBeInTheDocument();
    expect(screen.getByText(/not predictions/)).toHaveTextContent(/giải hạn/);
    expect(screen.getByRole("link", { name: /Full legal notice/ })).toHaveAttribute("href", "/legal");
  });

  it("stays out of the full-screen reading chamber", () => {
    pathname.current = "/reading";
    const { container } = render(<SiteFooter />);
    expect(container).toBeEmptyDOMElement();
  });
});
