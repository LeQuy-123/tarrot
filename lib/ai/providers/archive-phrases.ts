import type { Lang } from "@/lib/i18n/lang";
import { MESSAGES } from "@/lib/i18n/messages";
import type { Element, Orientation } from "@/types/tarot";

/** Sentence templates for the offline archive reading, per language. */
export interface ArchivePhrases {
  orientation: (o: Orientation) => string;
  element: (e: Element) => string;
  theme: (archetype: string, spread: string, card: string, orientation: string, question: string) => string;
  relationship: (a: string, posA: string, b: string, posB: string, kwA: string, kwB: string) => string;
  sharedElement: (count: number, element: string) => string;
  majors: (majors: number, total: number) => string;
  reversed: (count: number) => string;
  singleImage: (a: string, b: string) => string;
  card: (name: string, orientation: string, position: string, lead: string, outlook: string) => string;
  questionFeel: (keyword: string) => string;
  questionTrust: (card: string) => string;
  fallbackStep: (keyword: string) => string;
  summarySingle: (card: string, reversed: boolean, outlook: string) => string;
  summaryMulti: (card: string, reversed: boolean, position: string, outlook: string) => string;
}

const lowerFirst = (text: string) => (text ? text[0].toLowerCase() + text.slice(1) : text);

const en: ArchivePhrases = {
  orientation: (o) => MESSAGES.en.common.orientation[o].toLowerCase(),
  element: (e) => e,
  theme: (archetype, spread, card, orientation, question) =>
    `${archetype}: ${spread} centred on ${card} (${orientation})${question ? `, read in light of "${question}"` : ""}.`,
  relationship: (a, posA, b, posB, kwA, kwB) =>
    `${a} in ${posA} leads into ${b} in ${posB}: a movement from ${kwA} toward ${kwB}.`,
  sharedElement: (count, element) => `${count} cards share the element of ${element}, colouring the reading with its qualities.`,
  majors: (majors, total) =>
    `${majors} of ${total} cards ${majors === 1 ? "is a" : "are"} Major Arcana${majors === 1 ? " card" : ""}, suggesting larger life themes are in motion.`,
  reversed: (count) =>
    `${count} reversed card${count > 1 ? "s point" : " points"} to energy that is blocked, internal, or still forming.`,
  singleImage: (a, b) => `The spread rests on a single image: ${a} and ${b}.`,
  card: (name, orientation, position, lead, outlook) => `${name}, ${orientation}, in the ${position} position. ${lead} ${outlook}`,
  questionFeel: (keyword) => `Where in your life do you already feel ${keyword}?`,
  questionTrust: (card) => `What would change if you trusted the message of ${card}?`,
  fallbackStep: (keyword) => `Choose one small action aligned with "${keyword}".`,
  summarySingle: (card, reversed, outlook) =>
    `Carry ${card}${reversed ? ", reversed," : ""} with you as a lens for what comes next. ${outlook} Treat this as a possibility to notice, not a verdict.`,
  summaryMulti: (card, reversed, position, outlook) =>
    `Looking ahead, ${card}${reversed ? " reversed" : ""} in ${position} sets the tone: ${lowerFirst(outlook)} The other cards describe how you might get there; test them against your own experience.`,
};

const vi: ArchivePhrases = {
  orientation: (o) => MESSAGES.vi.common.orientation[o].toLowerCase(),
  element: (e) => MESSAGES.vi.common.elements[e],
  theme: (archetype, spread, card, orientation, question) =>
    `${archetype}: trải bài ${spread} xoay quanh ${card} (chiều ${orientation})${question ? `, soi chiếu câu hỏi “${question}”` : ""}.`,
  relationship: (a, posA, b, posB, kwA, kwB) =>
    `${a} ở vị trí ${posA} dẫn tới ${b} ở vị trí ${posB}: một chuyển động từ “${kwA}” hướng đến “${kwB}”.`,
  sharedElement: (count, element) => `${count} lá cùng thuộc nguyên tố ${element}, nhuộm màu cho cả trải bài bằng phẩm chất ấy.`,
  majors: (majors, total) => `${majors} trên ${total} lá thuộc Ẩn Chính, gợi ý những chủ đề lớn của cuộc sống đang chuyển động.`,
  reversed: (count) => `${count} lá ngược cho thấy năng lượng đang bị chặn lại, hướng vào bên trong hoặc vẫn đang hình thành.`,
  singleImage: (a, b) => `Trải bài dựa trên một hình ảnh duy nhất: ${a} và ${b}.`,
  card: (name, orientation, position, lead, outlook) => `${name}, chiều ${orientation}, ở vị trí ${position}. ${lead} ${outlook}`,
  questionFeel: (keyword) => `Bạn đã cảm nhận được “${keyword}” ở đâu trong cuộc sống của mình?`,
  questionTrust: (card) => `Điều gì sẽ thay đổi nếu bạn tin vào thông điệp của ${card}?`,
  fallbackStep: (keyword) => `Chọn một hành động nhỏ phù hợp với “${keyword}”.`,
  summarySingle: (card, reversed, outlook) =>
    `Hãy mang ${card}${reversed ? " (chiều ngược)" : ""} theo bên mình như một lăng kính cho những gì sắp đến. ${outlook} Hãy xem đây là một khả năng để quan sát, không phải một phán quyết.`,
  // Vietnamese keeps the outlook as its own sentence: lower-casing it could break a card name.
  summaryMulti: (card, reversed, position, outlook) =>
    `Nhìn về phía trước, ${card}${reversed ? " chiều ngược" : ""} ở vị trí ${position} định hình giai điệu chung. ${outlook} Các lá còn lại mô tả cách bạn có thể đi đến đó; hãy đối chiếu chúng với trải nghiệm của chính bạn.`,
};

export const ARCHIVE_PHRASES: Record<Lang, ArchivePhrases> = { en, vi };
