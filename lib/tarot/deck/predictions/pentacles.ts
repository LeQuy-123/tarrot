import type { Orientation } from "@/types/tarot";

/** Generic outlooks for the suit of Pentacles (earth: body, work, resources). */
export const pentaclesPredictions: Record<string, Record<Orientation, string>> = {
  "ace-of-pentacles": {
    upright:
      "A practical opportunity is on its way, perhaps a new job, income source or chance to build something solid. Plant the seed carefully and it is likely to grow.",
    reversed:
      "A promising opportunity may slip by or need more groundwork first. Expect better results by planning carefully before committing time or money.",
  },
  "two-of-pentacles": {
    upright:
      "You are likely to juggle several responsibilities at once. Expect to stay balanced by remaining flexible and keeping priorities clear.",
    reversed:
      "Overcommitment may lead to dropped balls or financial disorder. Expect relief once you simplify and focus on what matters most.",
  },
  "three-of-pentacles": {
    upright:
      "Teamwork and skilled collaboration are likely to bring success. Expect your effort to be noticed and valued as part of a shared project.",
    reversed:
      "Miscommunication or poor coordination may slow a group effort. Expect progress once roles and expectations are clarified.",
  },
  "four-of-pentacles": {
    upright:
      "Financial stability is likely, though you may feel the urge to hold on tightly. Expect security to grow, provided caution does not turn into fear.",
    reversed:
      "You may be prompted to loosen your grip on money, possessions or control. Expect generosity or a wise investment to open new doors.",
  },
  "five-of-pentacles": {
    upright:
      "A period of hardship or feeling left out in the cold may arise. Expect help to be closer than it seems; asking for support will make a real difference.",
    reversed:
      "Recovery from a difficult period is likely to begin. Expect improved circumstances and renewed hope as support arrives.",
  },
  "six-of-pentacles": {
    upright:
      "Generosity is likely to flow, whether you give or receive. Expect fair exchanges, gifts or help that restore balance.",
    reversed:
      "An imbalance in giving and receiving may surface, or help may come with strings attached. Expect fairness to return when expectations are made clear.",
  },
  "seven-of-pentacles": {
    upright:
      "Patience is needed as you wait for long-term efforts to pay off. Expect a moment to assess progress and decide where to invest your energy next.",
    reversed:
      "Frustration with slow results may tempt you to give up. Expect better returns by adjusting your approach rather than abandoning the effort.",
  },
  "eight-of-pentacles": {
    upright:
      "Dedicated work and skill-building are likely to bring steady progress. Expect diligence and attention to detail to lead to mastery and recognition.",
    reversed:
      "Repetitive work may feel uninspiring, or quality may slip. Expect improvement once you reconnect with why the work matters.",
  },
  "nine-of-pentacles": {
    upright:
      "Independence, comfort and the rewards of hard work are on the horizon. Expect to enjoy the stability and self-sufficiency you have built.",
    reversed:
      "Overspending or relying too much on others may threaten your security. Expect stability to return with careful planning and self-reliance.",
  },
  "ten-of-pentacles": {
    upright:
      "Lasting security, family support or a legacy is likely to grow. Expect long-term plans and investments to provide a solid foundation for the future.",
    reversed:
      "Family disagreements or financial setbacks may surface around money or inheritance. Expect resolution through open communication and fair arrangements.",
  },
  "page-of-pentacles": {
    upright:
      "A new study, job offer or practical opportunity is likely to appear. Expect steady progress if you approach it with curiosity and diligence.",
    reversed:
      "Procrastination or a lack of focus may delay progress. Expect better results once you set realistic goals and take the first concrete step.",
  },
  "knight-of-pentacles": {
    upright:
      "Slow, steady effort is likely to bring reliable results. Expect consistency and responsibility to pay off, even if progress feels gradual.",
    reversed:
      "Things may feel stuck, either from too much caution or from cutting corners. Expect momentum to return once you find a healthy rhythm.",
  },
  "queen-of-pentacles": {
    upright:
      "Comfort, nurturing and practical abundance are likely to grow. Expect to balance work and home life well and to create a welcoming space for others.",
    reversed:
      "Neglecting yourself while caring for others may leave you depleted. Expect balance to return once you give your own needs the same attention.",
  },
  "king-of-pentacles": {
    upright:
      "Financial success and practical leadership are likely. Expect your reliability and good judgement to bring security and respect.",
    reversed:
      "Material focus or stubbornness may create problems. Expect better outcomes by valuing people and flexibility as much as results.",
  },
};
