import type { Metadata } from "next";
import { Ornament } from "@/components/ui/Sigil";

export const metadata: Metadata = {
  title: "Legal Notice · Thông báo pháp lý",
  description: "ARCANA is a tool for self-reflection, culture and entertainment — not fortune-telling or prediction.",
};

interface Section {
  id: string;
  en: { title: string; body: string[] };
  vi: { title: string; body: string[] };
}

const SECTIONS: Section[] = [
  {
    id: "purpose",
    en: {
      title: "1. Purpose: reflection, culture and entertainment",
      body: [
        "ARCANA is a digital tool for self-reflection, for exploring the cultural and artistic tradition of tarot, and for entertainment.",
        "It is not a fortune-telling service and does not claim any supernatural, spiritual or predictive power.",
      ],
    },
    vi: {
      title: "1. Mục đích: chiêm nghiệm, văn hóa và giải trí",
      body: [
        "ARCANA là công cụ kỹ thuật số giúp bạn tự chiêm nghiệm, tìm hiểu truyền thống văn hóa và nghệ thuật của bài tarot, và để giải trí.",
        "Đây không phải là dịch vụ xem bói và không khẳng định có bất kỳ năng lực siêu nhiên, tâm linh hay tiên đoán nào.",
      ],
    },
  },
  {
    id: "no-prediction",
    en: {
      title: "2. No predictions or guarantees",
      body: [
        "Cards are drawn by a random process. Card meanings, \"outlooks\" and interpretations are reflective prompts written for contemplation. They do not predict, determine or guarantee any future event.",
        "Do not make important decisions about your health, relationships, money, education, work or legal matters based on a reading. You remain fully responsible for your own choices.",
      ],
    },
    vi: {
      title: "2. Không tiên đoán, không bảo đảm",
      body: [
        "Các lá bài được rút ngẫu nhiên. Ý nghĩa lá bài, phần \"triển vọng\" và các diễn giải chỉ là gợi ý để suy ngẫm. Chúng không tiên đoán, quyết định hay bảo đảm bất kỳ sự việc nào trong tương lai.",
        "Không đưa ra các quyết định quan trọng về sức khỏe, các mối quan hệ, tài chính, học tập, công việc hay pháp lý dựa trên một lần trải bài. Bạn hoàn toàn chịu trách nhiệm về các lựa chọn của mình.",
      ],
    },
  },
  {
    id: "no-advice",
    en: {
      title: "3. Not professional advice",
      body: [
        "Nothing on this site is medical, psychological, legal, financial or other professional advice. Please consult a qualified professional for those needs.",
        "If you are in distress or thinking about harming yourself, please contact local emergency services or a mental health support line right away.",
      ],
    },
    vi: {
      title: "3. Không phải tư vấn chuyên môn",
      body: [
        "Không nội dung nào trên trang này là tư vấn y tế, tâm lý, pháp lý, tài chính hay tư vấn chuyên môn khác. Vui lòng tìm đến chuyên gia có chuyên môn khi cần.",
        "Nếu bạn đang gặp khủng hoảng hoặc có ý nghĩ làm hại bản thân, hãy liên hệ ngay dịch vụ cấp cứu (115) hoặc đường dây hỗ trợ sức khỏe tinh thần tại địa phương.",
      ],
    },
  },
  {
    id: "no-paid-services",
    en: {
      title: "4. No paid readings, rituals or \"giải hạn\" — beware of scams",
      body: [
        "ARCANA is free. We do not sell predictions, and we do not offer rituals, offerings, amulets, \"giải hạn\" (bad-luck removal), \"cúng sao\" or any similar service.",
        "We will never ask you to transfer money, buy items, or share bank details, passwords or identity documents in connection with a reading. Anyone who does so in ARCANA's name is not us — please treat it as a scam and report it to the authorities.",
      ],
    },
    vi: {
      title: "4. Không thu phí xem bài, không cúng bái hay \"giải hạn\" — cảnh giác lừa đảo",
      body: [
        "ARCANA hoàn toàn miễn phí. Chúng tôi không bán lời tiên đoán và không cung cấp dịch vụ cúng bái, lễ vật, bùa chú, \"giải hạn\", \"cúng sao\" hay bất kỳ dịch vụ tương tự nào.",
        "Chúng tôi sẽ không bao giờ yêu cầu bạn chuyển tiền, mua vật phẩm, hoặc cung cấp thông tin ngân hàng, mật khẩu hay giấy tờ tùy thân liên quan đến việc trải bài. Bất kỳ ai nhân danh ARCANA để làm điều đó đều không phải chúng tôi — hãy coi đó là lừa đảo và trình báo cơ quan chức năng.",
      ],
    },
  },
  {
    id: "lawful-use",
    en: {
      title: "5. Lawful use",
      body: [
        "You agree to use ARCANA only for personal reflection and entertainment, and in compliance with the laws where you live.",
        "In particular, you must not use the site, its content or its readings to organise superstitious activities, to provide paid fortune-telling, or to deceive or take money or property from others.",
      ],
    },
    vi: {
      title: "5. Sử dụng hợp pháp",
      body: [
        "Bạn đồng ý chỉ sử dụng ARCANA cho mục đích chiêm nghiệm cá nhân và giải trí, tuân thủ pháp luật nơi bạn sinh sống.",
        "Đặc biệt, bạn không được sử dụng trang web, nội dung hay kết quả trải bài để tổ chức hoạt động mê tín dị đoan, cung cấp dịch vụ xem bói có thu phí, hoặc để lừa dối, chiếm đoạt tiền hay tài sản của người khác.",
      ],
    },
  },
  {
    id: "ai",
    en: {
      title: "6. AI-generated and automated content",
      body: [
        "Interpretations are generated automatically — either composed from card meanings in your browser, or, when you turn on AI interpretation, written by a third-party AI model. Automated text can be inaccurate, generic or inappropriate, and does not reflect the views of any person.",
      ],
    },
    vi: {
      title: "6. Nội dung do AI và hệ thống tự động tạo ra",
      body: [
        "Các diễn giải được tạo tự động — hoặc được ghép từ ý nghĩa lá bài ngay trên trình duyệt của bạn, hoặc, khi bạn bật diễn giải bằng AI, được viết bởi một mô hình AI của bên thứ ba. Văn bản tự động có thể không chính xác, chung chung hoặc không phù hợp, và không đại diện cho quan điểm của bất kỳ cá nhân nào.",
      ],
    },
  },
  {
    id: "privacy",
    en: {
      title: "7. Your data and privacy",
      body: [
        "There are no accounts. Your reading history and settings are stored only in your own browser (localStorage) and can be deleted at any time from the History and Settings pages.",
        "When AI interpretation is off (the default), nothing about your reading leaves your device. When it is on, your question, the drawn cards and the chosen tone are sent to our server and to the AI provider solely to generate the interpretation. Please do not include sensitive personal information (full names, ID numbers, health or financial details) in your questions.",
      ],
    },
    vi: {
      title: "7. Dữ liệu và quyền riêng tư",
      body: [
        "Trang web không yêu cầu tài khoản. Lịch sử trải bài và cài đặt chỉ được lưu trên trình duyệt của bạn (localStorage) và có thể xóa bất cứ lúc nào tại trang Lịch sử và Cài đặt.",
        "Khi tắt diễn giải bằng AI (mặc định), không có thông tin nào về lần trải bài rời khỏi thiết bị của bạn. Khi bật, câu hỏi, các lá bài đã rút và giọng điệu bạn chọn sẽ được gửi đến máy chủ của chúng tôi và nhà cung cấp AI chỉ để tạo phần diễn giải. Vui lòng không đưa thông tin cá nhân nhạy cảm (họ tên đầy đủ, số giấy tờ tùy thân, thông tin sức khỏe hay tài chính) vào câu hỏi.",
      ],
    },
  },
  {
    id: "age",
    en: {
      title: "8. Age and responsibility",
      body: [
        "ARCANA is intended for adults. Minors should use it only with the guidance of a parent or guardian. The site is provided \"as is\", without warranties, and to the extent permitted by law we are not liable for decisions made or losses incurred on the basis of its content.",
      ],
    },
    vi: {
      title: "8. Độ tuổi và trách nhiệm",
      body: [
        "ARCANA dành cho người trưởng thành. Người chưa thành niên chỉ nên sử dụng khi có sự hướng dẫn của cha mẹ hoặc người giám hộ. Trang web được cung cấp \"nguyên trạng\", không kèm bảo đảm, và trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về các quyết định hay thiệt hại phát sinh từ việc dựa vào nội dung trên trang.",
      ],
    },
  },
  {
    id: "ip",
    en: {
      title: "9. Artwork and content",
      body: [
        "All card artwork is original and generated procedurally for ARCANA; no images from published tarot decks are used. Card texts are original writing inspired by the general symbolic tradition of tarot.",
      ],
    },
    vi: {
      title: "9. Hình ảnh và nội dung",
      body: [
        "Toàn bộ hình ảnh lá bài là sáng tác gốc, được tạo bằng thuật toán dành riêng cho ARCANA; không sử dụng hình ảnh từ các bộ bài tarot đã xuất bản. Nội dung ý nghĩa lá bài là văn bản gốc, lấy cảm hứng từ truyền thống biểu tượng chung của tarot.",
      ],
    },
  },
];

export default function LegalPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <p className="text-xs tracking-[0.2em] text-gold uppercase sm:tracking-[0.4em]">Legal notice · Thông báo pháp lý</p>
        <h1 className="engraved mt-2 font-display text-4xl sm:text-5xl">A Tool for Reflection</h1>
        <p className="mt-2 font-display text-xl text-parchment/85 italic">Một công cụ để chiêm nghiệm</p>
        <Ornament className="mx-auto mt-3 w-52 text-gold/50" />
      </header>

      <nav aria-label="Sections" className="panel mt-8 rounded-2xl p-5 text-sm">
        <ol className="grid gap-1.5 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted hover:text-gold-light">
                {s.en.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 space-y-6">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="panel scroll-mt-20 rounded-2xl p-5 sm:p-7">
            <div className="grid gap-6 md:grid-cols-2">
              <div lang="en">
                <h2 className="font-display text-2xl text-gold-light">{s.en.title}</h2>
                {s.en.body.map((p, i) => (
                  <p key={i} className="mt-2 text-sm leading-relaxed text-parchment/90">
                    {p}
                  </p>
                ))}
              </div>
              <div lang="vi" className="border-t border-hairline pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                <h2 className="font-display text-2xl text-gold-light">{s.vi.title}</h2>
                {s.vi.body.map((p, i) => (
                  <p key={i} className="mt-2 text-sm leading-relaxed text-parchment/90">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        This notice may be updated as the service changes. · Thông báo này có thể được cập nhật khi dịch vụ thay đổi.
      </p>
    </div>
  );
}
