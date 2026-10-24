import type { Orientation } from "@/types/tarot";

/** Generic outlooks for the suit of Swords (air: thought, truth, conflict). */
export const swordsPredictions: Record<string, Record<Orientation, string>> = {
  "ace-of-swords": {
    upright:
      "A breakthrough in understanding is near. Expect a clear idea, decision or truth to cut through confusion and give you a powerful new direction.",
    reversed:
      "Confusion or miscommunication may cloud your judgement for a time. Expect clarity to return once you gather the facts and slow your racing thoughts.",
  },
  "two-of-swords": {
    upright:
      "A difficult decision may stay unresolved for a little while. Expect the stalemate to break once you remove the blindfold and look honestly at both options.",
    reversed:
      "Information you have been avoiding is likely to come to light. Expect relief once the decision is made, even if it is not perfect.",
  },
  "three-of-swords": {
    upright:
      "A painful truth, disappointment or heartache may surface. It is likely to hurt, but facing it honestly will begin the healing sooner.",
    reversed:
      "Recovery from an old hurt is likely to progress. Expect forgiveness, release and lighter days as you let the pain move through you.",
  },
  "four-of-swords": {
    upright:
      "A period of rest and recovery is needed and likely to help. Expect a pause to restore your strength before the next challenge.",
    reversed:
      "Restlessness or burnout may push you back into action before you are ready. Expect better results by taking real rest instead of pushing through.",
  },
  "five-of-swords": {
    upright:
      "A conflict may end with a hollow victory, or someone may act in their own interest. Expect to weigh whether winning is worth the cost to relationships.",
    reversed:
      "An argument is likely to cool down and make room for reconciliation. Expect the chance to apologise, forgive, or simply walk away from a pointless fight.",
  },
  "six-of-swords": {
    upright:
      "A transition toward calmer waters is underway. Expect to leave a difficult situation behind, physically or mentally, and find steadier ground ahead.",
    reversed:
      "Moving on may feel slow or resisted for a time. Expect progress once unfinished business is addressed rather than carried along.",
  },
  "seven-of-swords": {
    upright:
      "Strategy, discretion or a hidden agenda may come into play. Expect to need careful planning, and stay alert to anyone not being fully honest.",
    reversed:
      "Secrets are likely to come out, or a guilty conscience may prompt a confession. Expect integrity to serve you better than shortcuts.",
  },
  "eight-of-swords": {
    upright:
      "You may feel trapped by circumstances or your own thoughts. Expect to discover that the restrictions are looser than they seem once you take one small step.",
    reversed:
      "Release from a limiting situation or belief is likely. Expect new options to appear as you stop accepting the stories that kept you stuck.",
  },
  "nine-of-swords": {
    upright:
      "Worry or sleepless nights may weigh on you for a while. Expect many fears to prove larger in your mind than in reality; sharing them will lighten the load.",
    reversed:
      "Anxiety is likely to ease and the worst fears to fade. Expect hope to return as you seek support and see the situation more clearly.",
  },
  "ten-of-swords": {
    upright:
      "A painful ending or rock-bottom moment may arrive, but it marks the end of the struggle. Expect the only way forward to be up, with a fresh start near.",
    reversed:
      "Recovery after a hard ending is likely to begin. Expect to rise slowly but surely, carrying lessons that make you stronger.",
  },
  "page-of-swords": {
    upright:
      "News, a new idea or a learning opportunity is on its way. Expect curiosity and sharp questions to lead you to useful discoveries.",
    reversed:
      "Gossip, hasty words or scattered thinking may cause small problems. Expect to benefit from listening more and speaking with care.",
  },
  "knight-of-swords": {
    upright:
      "Things may move fast, driven by ambition or a strong opinion. Expect swift progress if you act decisively, though tact will keep others on your side.",
    reversed:
      "Rushing ahead without a plan may lead to mistakes or conflict. Expect better results by pausing to think before you charge in.",
  },
  "queen-of-swords": {
    upright:
      "Clear thinking and honest communication will serve you well. Expect to cut through confusion and set boundaries with fairness and wit.",
    reversed:
      "Words may come out sharper or colder than intended. Expect relationships to improve when honesty is paired with warmth.",
  },
  "king-of-swords": {
    upright:
      "A fair, rational decision or expert advice is likely to settle an important matter. Expect logic, integrity and clear rules to work in your favour.",
    reversed:
      "Someone may use authority or intellect in a cold or controlling way. Expect fairness to return when power is balanced with compassion.",
  },
};
