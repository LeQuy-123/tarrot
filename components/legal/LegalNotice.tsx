"use client";

import { useLang } from "@/lib/i18n";
import { Ornament } from "@/components/ui/Sigil";

// Operator details are configured per deployment (see .env.example); never hard-coded.
const OPERATOR = process.env.NEXT_PUBLIC_ARCANA_OPERATOR ?? "";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_ARCANA_CONTACT_EMAIL ?? "";
const ADDRESS = process.env.NEXT_PUBLIC_ARCANA_ADDRESS ?? "";
const LAST_UPDATED = { en: "25 October 2026", vi: "25 tháng 10 năm 2026" };

function contactLines(lang: "en" | "vi"): string[] {
  const lines = [OPERATOR, CONTACT_EMAIL, ADDRESS].filter(Boolean);
  if (lines.length > 0) return lines;
  return [
    lang === "en"
      ? "The operator of this website has not published contact details yet."
      : "Đơn vị vận hành trang web này chưa công bố thông tin liên hệ.",
  ];
}

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
      title: "6. How readings are generated",
      body: [
        "By default (AI interpretation off), each reading is composed in your browser from the card meanings written for ARCANA; nothing about it is sent anywhere.",
        "If you turn on AI interpretation in Settings and the website operator has configured an AI provider, the interpretation is written by a third-party AI model. Automated text can be inaccurate, generic or inappropriate. It interprets cards symbolically, is not verified, and does not reflect the views of any person.",
      ],
    },
    vi: {
      title: "6. Cách tạo ra bài đọc",
      body: [
        "Theo mặc định (tắt diễn giải bằng AI), mỗi bài đọc được soạn ngay trên trình duyệt của bạn từ ý nghĩa lá bài do ARCANA biên soạn; không có thông tin nào được gửi đi.",
        "Nếu bạn bật diễn giải bằng AI trong Cài đặt và đơn vị vận hành trang web đã cấu hình nhà cung cấp AI, phần diễn giải sẽ do một mô hình AI của bên thứ ba viết. Văn bản tự động có thể không chính xác, chung chung hoặc không phù hợp. Nội dung diễn giải lá bài theo tính biểu tượng, chưa được kiểm chứng và không đại diện cho quan điểm của bất kỳ cá nhân nào.",
      ],
    },
  },
  {
    id: "anonymous",
    en: {
      title: "7. Anonymous use and technical data",
      body: [
        "You can use ARCANA without creating an account, and ARCANA does not ask for your name, email or other contact details.",
        "Like any website, the server and its hosting provider receive limited technical information needed to deliver, secure and troubleshoot the service, such as your IP address, browser type and request times, which may appear in hosting or security logs. To prevent abuse, the reading service keeps your IP address in memory for about one minute to rate-limit requests; it is not written to a database. Error logs record the type of failure, not the content of your question.",
        "ARCANA itself sets no cookies, and its fonts and artwork are served from the website itself, without calls to outside font or image services.",
      ],
    },
    vi: {
      title: "7. Sử dụng ẩn danh và dữ liệu kỹ thuật",
      body: [
        "Bạn có thể sử dụng ARCANA mà không cần tạo tài khoản, và ARCANA không yêu cầu họ tên, email hay thông tin liên hệ khác của bạn.",
        "Như mọi trang web, máy chủ và nhà cung cấp dịch vụ lưu trữ nhận một số thông tin kỹ thuật hạn chế cần thiết để vận hành, bảo mật và khắc phục sự cố, chẳng hạn địa chỉ IP, loại trình duyệt và thời điểm truy cập; các thông tin này có thể xuất hiện trong nhật ký của nhà cung cấp lưu trữ hoặc bảo mật. Để chống lạm dụng, dịch vụ trải bài lưu địa chỉ IP của bạn trong bộ nhớ khoảng một phút để giới hạn số lượt yêu cầu; địa chỉ này không được ghi vào cơ sở dữ liệu. Nhật ký lỗi chỉ ghi loại lỗi, không ghi nội dung câu hỏi của bạn.",
        "Bản thân ARCANA không đặt cookie; phông chữ và hình ảnh được phục vụ trực tiếp từ trang web, không gọi đến dịch vụ phông chữ hay hình ảnh bên ngoài.",
      ],
    },
  },
  {
    id: "browser-data",
    en: {
      title: "8. Data stored in your browser",
      body: [
        "Your reading history (questions, drawn cards, orientations and interpretations), your settings and your language choice are stored only in your browser's local storage on this device, not in an ARCANA account or on our server.",
        "You can delete saved readings on the History page, or remove all ARCANA data from this device with “Clear all data on this device” in Settings. This removes the records ARCANA saved; it does not necessarily remove browser caches or backups, logs already held by the hosting provider, or information already sent to an AI provider.",
      ],
    },
    vi: {
      title: "8. Dữ liệu lưu trên trình duyệt của bạn",
      body: [
        "Lịch sử trải bài (câu hỏi, các lá bài đã rút, chiều bài và phần diễn giải), cài đặt và lựa chọn ngôn ngữ của bạn chỉ được lưu trong bộ nhớ cục bộ (localStorage) của trình duyệt trên thiết bị này, không lưu trong tài khoản ARCANA hay trên máy chủ của chúng tôi.",
        "Bạn có thể xóa các lần trải bài đã lưu tại trang Lịch sử, hoặc xóa toàn bộ dữ liệu ARCANA khỏi thiết bị này bằng nút “Xóa toàn bộ dữ liệu trên thiết bị này” trong Cài đặt. Thao tác này xóa các bản ghi do ARCANA lưu; nó không nhất thiết xóa bộ nhớ đệm hay bản sao lưu của trình duyệt, nhật ký mà nhà cung cấp lưu trữ đã ghi, hoặc thông tin đã được gửi đến nhà cung cấp AI.",
      ],
    },
  },
  {
    id: "ai-processing",
    en: {
      title: "9. AI processing",
      body: [
        "Only when AI interpretation is on, ARCANA sends your question, the spread, the drawn cards and their orientations, your chosen tone and language, and the card information needed for the interpretation to our server, which forwards them to the AI provider (currently Anthropic, maker of Claude). This information is used only to generate the reading you requested.",
        "The provider processes it under its own commercial terms and privacy policy (anthropic.com/legal), which govern its retention and logging practices; the provider may process data in countries other than your own, including the United States. ARCANA does not use your questions to train AI models.",
        "Please avoid including names, contact details, identity numbers, financial account information, health information or other sensitive personal data in your question.",
      ],
    },
    vi: {
      title: "9. Xử lý bằng AI",
      body: [
        "Chỉ khi bật diễn giải bằng AI, ARCANA mới gửi câu hỏi, kiểu trải bài, các lá bài đã rút và chiều bài, giọng điệu và ngôn ngữ bạn chọn, cùng thông tin lá bài cần cho phần diễn giải đến máy chủ của chúng tôi; máy chủ chuyển tiếp chúng đến nhà cung cấp AI (hiện là Anthropic, đơn vị phát triển Claude). Thông tin này chỉ được dùng để tạo bài đọc bạn yêu cầu.",
        "Nhà cung cấp xử lý dữ liệu theo điều khoản thương mại và chính sách quyền riêng tư của họ (anthropic.com/legal), trong đó quy định việc lưu giữ và ghi nhật ký; nhà cung cấp có thể xử lý dữ liệu tại quốc gia khác với quốc gia của bạn, bao gồm Hoa Kỳ. ARCANA không dùng câu hỏi của bạn để huấn luyện mô hình AI.",
        "Vui lòng không đưa họ tên, thông tin liên hệ, số giấy tờ tùy thân, thông tin tài khoản tài chính, thông tin sức khỏe hay dữ liệu cá nhân nhạy cảm khác vào câu hỏi.",
      ],
    },
  },
  {
    id: "advertising",
    en: {
      title: "10. Advertising and analytics",
      body: [
        "ARCANA currently shows no advertising and uses no analytics or tracking services.",
        "If advertising or analytics are introduced, this notice will be updated first, any consent required by law will be requested, and the contents of your questions and saved readings will not be shared with advertising providers for targeted advertising.",
      ],
    },
    vi: {
      title: "10. Quảng cáo và phân tích",
      body: [
        "Hiện tại ARCANA không hiển thị quảng cáo và không sử dụng dịch vụ phân tích hay theo dõi nào.",
        "Nếu sau này có quảng cáo hoặc công cụ phân tích, thông báo này sẽ được cập nhật trước, mọi sự đồng ý mà pháp luật yêu cầu sẽ được xin ý kiến, và nội dung câu hỏi cũng như lịch sử trải bài của bạn sẽ không được chia sẻ với nhà cung cấp quảng cáo để nhắm mục tiêu quảng cáo.",
      ],
    },
  },
  {
    id: "retention",
    en: {
      title: "11. Retention, deletion and your rights",
      body: [
        "ARCANA's server does not keep a copy of your readings. Data in your browser stays until you delete it. Information handled by the hosting provider or the AI provider is subject to their own retention periods and legal obligations.",
        "Where applicable law gives you rights over your personal data, such as access, correction, deletion, or withdrawing consent (including under Vietnam's personal data protection regulations), you can exercise them by contacting the operator using the details below. Requests will be handled in accordance with applicable law.",
      ],
    },
    vi: {
      title: "11. Lưu giữ, xóa dữ liệu và quyền của bạn",
      body: [
        "Máy chủ ARCANA không lưu bản sao các lần trải bài của bạn. Dữ liệu trên trình duyệt được giữ cho đến khi bạn xóa. Thông tin do nhà cung cấp lưu trữ hoặc nhà cung cấp AI xử lý tuân theo thời hạn lưu giữ và nghĩa vụ pháp lý riêng của họ.",
        "Trong phạm vi pháp luật cho phép bạn có quyền đối với dữ liệu cá nhân của mình, như quyền truy cập, chỉnh sửa, xóa hoặc rút lại sự đồng ý (bao gồm theo quy định về bảo vệ dữ liệu cá nhân của Việt Nam), bạn có thể thực hiện bằng cách liên hệ với đơn vị vận hành theo thông tin bên dưới. Các yêu cầu sẽ được xử lý theo quy định của pháp luật.",
      ],
    },
  },
  {
    id: "age",
    en: {
      title: "12. Age and responsibility",
      body: [
        "ARCANA is intended for adults. Minors should use it only with the guidance of a parent or guardian. The site is provided \"as is\", without warranties, and to the extent permitted by law we are not liable for decisions made or losses incurred on the basis of its content.",
      ],
    },
    vi: {
      title: "12. Độ tuổi và trách nhiệm",
      body: [
        "ARCANA dành cho người trưởng thành. Người chưa thành niên chỉ nên sử dụng khi có sự hướng dẫn của cha mẹ hoặc người giám hộ. Trang web được cung cấp \"nguyên trạng\", không kèm bảo đảm, và trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về các quyết định hay thiệt hại phát sinh từ việc dựa vào nội dung trên trang.",
      ],
    },
  },
  {
    id: "ip",
    en: {
      title: "13. Artwork and content",
      body: [
        "All card artwork is original and generated procedurally for ARCANA; no images from published tarot decks are used. Card texts are original writing inspired by the general symbolic tradition of tarot.",
      ],
    },
    vi: {
      title: "13. Hình ảnh và nội dung",
      body: [
        "Toàn bộ hình ảnh lá bài là sáng tác gốc, được tạo bằng thuật toán dành riêng cho ARCANA; không sử dụng hình ảnh từ các bộ bài tarot đã xuất bản. Nội dung ý nghĩa lá bài là văn bản gốc, lấy cảm hứng từ truyền thống biểu tượng chung của tarot.",
      ],
    },
  },
  {
    id: "contact",
    en: {
      title: "14. Contact",
      body: [
        "For questions, complaints, or requests concerning this notice or your personal data, contact the operator of this website:",
        ...contactLines("en"),
      ],
    },
    vi: {
      title: "14. Liên hệ",
      body: [
        "Mọi câu hỏi, khiếu nại hoặc yêu cầu liên quan đến thông báo này hay dữ liệu cá nhân của bạn, vui lòng liên hệ đơn vị vận hành trang web:",
        ...contactLines("vi"),
      ],
    },
  },
  {
    id: "updates",
    en: {
      title: "15. Updates to this notice",
      body: [
        "This notice may be updated when ARCANA's features, service providers or legal obligations change. Material changes will be announced on this page, and any consent required by law will be requested before they take effect.",
        `Last updated: ${LAST_UPDATED.en}.`,
      ],
    },
    vi: {
      title: "15. Cập nhật thông báo",
      body: [
        "Thông báo này có thể được cập nhật khi tính năng, nhà cung cấp dịch vụ hoặc nghĩa vụ pháp lý của ARCANA thay đổi. Những thay đổi quan trọng sẽ được thông báo trên trang này, và mọi sự đồng ý mà pháp luật yêu cầu sẽ được xin ý kiến trước khi có hiệu lực.",
        `Cập nhật lần cuối: ${LAST_UPDATED.vi}.`,
      ],
    },
  },
];

const HEADER = {
  en: {
    eyebrow: "Legal notice",
    title: "Legal Notice, Privacy & Terms",
    sections: "Sections",
    lastUpdated: "Last updated:",
  },
  vi: {
    eyebrow: "Thông báo pháp lý",
    title: "Pháp Lý, Quyền Riêng Tư & Điều Khoản",
    sections: "Các mục",
    lastUpdated: "Cập nhật lần cuối:",
  },
};

export function LegalNotice() {
  const [lang] = useLang();
  const h = HEADER[lang];
  return (
    <div lang={lang} className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <p className="text-xs tracking-[0.3em] text-gold uppercase sm:tracking-[0.4em]">{h.eyebrow}</p>
        <h1 className="engraved mt-2 font-display text-4xl sm:text-5xl">{h.title}</h1>
        <p className="mt-2 text-xs text-muted">{h.lastUpdated} {LAST_UPDATED[lang]}</p>
        <Ornament className="mx-auto mt-3 w-52 text-gold/50" />
      </header>

      <nav aria-label={h.sections} className="panel mt-8 rounded-2xl p-5 text-sm">
        <ol className="grid gap-1.5 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted hover:text-gold-light">
                {s[lang].title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 space-y-5">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="panel scroll-mt-20 rounded-2xl p-5 sm:p-7">
            <h2 className="font-display text-2xl text-gold-light">{s[lang].title}</h2>
            {s[lang].body.map((p, i) => (
              <p key={i} className="mt-2 text-sm leading-relaxed text-parchment/90">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

    </div>
  );
}
