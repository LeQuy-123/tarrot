"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Site-wide disclaimer. Hidden inside the full-screen reading chamber, which carries its own
 * short notice and link to /legal.
 */
export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/reading") return null;

  return (
    <footer className="mt-auto border-t border-hairline px-4 py-8 text-xs text-muted sm:px-6">
      <div className="mx-auto max-w-4xl">
        <p className="text-center font-display text-base tracking-[0.3em] text-gold/80">ARCANA · THE ASTRAL ARCHIVE</p>
        <div className="mt-4 grid gap-4 leading-relaxed md:grid-cols-2">
          <p lang="en">
            <strong className="text-parchment/90">For reflection, culture and entertainment only.</strong> Readings are
            drawn at random and are not predictions; nothing here guarantees any future event. This is not medical,
            psychological, legal or financial advice. ARCANA is free: we do not offer paid readings, rituals or
            &ldquo;giải hạn&rdquo; services and will never ask you for money or bank details; anyone who does in
            our name is a scammer. Your readings stay in your browser; if you turn on AI interpretation, your question
            and cards are sent to an AI provider.
          </p>
          <p lang="vi">
            <strong className="text-parchment/90">Chỉ dành cho mục đích chiêm nghiệm, tìm hiểu văn hóa và giải trí.</strong>{" "}
            Các lá bài được rút ngẫu nhiên, không phải lời tiên đoán và không bảo đảm điều gì về tương lai. Nội dung
            không thay thế tư vấn y tế, tâm lý, pháp lý hay tài chính. ARCANA miễn phí: chúng tôi không xem bói có thu
            phí, không cúng bái hay &ldquo;giải hạn&rdquo;, và không bao giờ yêu cầu bạn chuyển tiền hay cung cấp thông
            tin ngân hàng; hãy cảnh giác với lừa đảo xem bói trực tuyến. Lịch sử trải bài chỉ lưu trên trình duyệt
            của bạn; khi bật diễn giải bằng AI, câu hỏi và các lá bài sẽ được gửi đến nhà cung cấp AI.
          </p>
        </div>
        <p className="mt-4 text-center">
          <Link href="/legal" className="text-gold-light underline underline-offset-4 hover:text-parchment">
            Full legal notice · Thông báo pháp lý đầy đủ
          </Link>
          <span aria-hidden="true"> · </span>
          <span>Original procedurally generated artwork.</span>
        </p>
      </div>
    </footer>
  );
}
