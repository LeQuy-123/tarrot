import type { MinorRank, TarotCardData } from "@/types/tarot";

type SwordsEntry = Pick<
  TarotCardData,
  "archetype" | "keywords" | "symbols" | "upright" | "reversed" | "lenses"
> & { rank: MinorRank; number: number; label: string };

function sword(entry: SwordsEntry): TarotCardData {
  const { rank, number, label, ...rest } = entry;
  return {
    id: `${rank}-of-swords`,
    name: `${label} of Swords`,
    arcana: "minor",
    number,
    suit: "swords",
    rank,
    element: "air",
    ...rest,
  };
}

export const swords: TarotCardData[] = [
  sword({
    rank: "ace",
    number: 1,
    label: "Ace",
    archetype: "The Blade of First Light",
    keywords: {
      upright: ["clarity", "breakthrough", "truth", "new ideas"],
      reversed: ["confusion", "miscommunication", "clouded judgement", "harsh words"],
    },
    symbols: ["an upright sword piercing a crown", "olive and palm branches", "grey mountain peaks", "a cold white dawn"],
    upright:
      "The Ace of Swords cuts through fog with a single clear thought. This card invites you to embrace honesty and mental clarity, even when the truth is sharp. It may point to a breakthrough idea, a clarifying conversation or a decisive new perspective.",
    reversed:
      "Reversed, the blade may be dulled by confusion, or swung too carelessly in words that wound. You might be struggling to articulate what you know, or receiving mixed messages. The card encourages you to slow down and seek clarity before you speak or decide.",
    lenses: {
      self: "You are gaining clarity, ready to see a situation for what it truly is.",
      obstacle: "Confusion or harsh communication may be blocking real understanding.",
      guidance: "Speak and think with honesty, and let the truth cut away what is unclear.",
      outcome: "If things continue, a clarifying breakthrough is likely to reshape your thinking.",
    },
  }),
  sword({
    rank: "two",
    number: 2,
    label: "Two",
    archetype: "The Blindfolded Truce",
    keywords: {
      upright: ["indecision", "stalemate", "difficult choices", "avoidance"],
      reversed: ["information revealed", "overwhelm", "decision made", "lesser of two evils"],
    },
    symbols: ["a blindfolded figure with crossed swords", "a crescent moon above the sea", "rocky islands", "a stone bench"],
    upright:
      "The Two of Swords holds two blades in careful balance, blindfolded to avoid choosing. This card may point to a stalemate or a decision you have been putting off. It invites you to remove the blindfold, gently, and look at what you have been avoiding.",
    reversed:
      "Reversed, the balance may be tipping as new information makes the choice harder to ignore. You might feel pulled in too many directions at once. The card encourages you to make the best decision you can with what you now know.",
    lenses: {
      self: "You are caught between options, holding a delicate balance to avoid choosing.",
      obstacle: "Avoidance or denial may be prolonging a difficult stalemate.",
      guidance: "Gather the facts and allow both reason and intuition to inform your decision.",
      outcome: "If things continue, the stalemate is likely to persist until you choose a direction.",
    },
  }),
  sword({
    rank: "three",
    number: 3,
    label: "Three",
    archetype: "The Pierced Heart Storm",
    keywords: {
      upright: ["heartbreak", "sorrow", "painful truth", "grief"],
      reversed: ["healing", "forgiveness", "releasing pain", "lingering hurt"],
    },
    symbols: ["a crimson heart pierced by three swords", "rain from grey clouds", "a storm across a midnight sky", "falling silver drops"],
    upright:
      "The Three of Swords acknowledges pain plainly, like rain that has to fall before skies clear. This card invites you to recognise hurt without minimising it. It may point to a painful truth or loss that, once faced, can begin to heal.",
    reversed:
      "Reversed, the storm may be easing as you begin to forgive and move through the hurt. Alternatively, old sorrow might still be lingering because it was never fully expressed. The card encourages you to let the healing process unfold at its own pace.",
    lenses: {
      self: "You are feeling the sting of heartbreak or a difficult realisation.",
      obstacle: "Unresolved grief or hurtful words may be weighing heavily on you.",
      guidance: "Allow yourself to feel the pain honestly, and seek comfort where you can.",
      outcome: "If things continue, the hurt is likely to give way to understanding and gradual healing.",
    },
  }),
  sword({
    rank: "four",
    number: 4,
    label: "Four",
    archetype: "The Silent Vigil",
    keywords: {
      upright: ["rest", "recovery", "contemplation", "retreat"],
      reversed: ["restlessness", "burnout", "stagnation", "reawakening"],
    },
    symbols: ["a resting figure on a stone tomb", "three swords hung on the wall", "a stained-glass window", "a quiet chapel lit by starlight"],
    upright:
      "The Four of Swords lies still in a quiet chapel, taking a necessary rest. This card invites you to step back, recover your strength and let your mind settle. It may point to a time for retreat and contemplation before returning to the fray.",
    reversed:
      "Reversed, rest may be overdue, with exhaustion pushing toward burnout. It can also suggest emerging from a long pause, sometimes before you feel quite ready. The card encourages you to honour your need for recovery, however brief.",
    lenses: {
      self: "You are in need of rest or have stepped away to recover your energy.",
      obstacle: "Mental fatigue or a refusal to pause may be wearing you down.",
      guidance: "Take a deliberate break, and allow stillness to restore you.",
      outcome: "If you allow yourself rest, renewed clarity and strength are likely to follow.",
    },
  }),
  sword({
    rank: "five",
    number: 5,
    label: "Five",
    archetype: "The Hollow Victory",
    keywords: {
      upright: ["conflict", "defeat", "winning at all costs", "tension"],
      reversed: ["reconciliation", "making amends", "lingering resentment", "moving on"],
    },
    symbols: ["a smirking figure gathering swords", "two figures walking away", "jagged clouds", "a turbulent sea"],
    upright:
      "The Five of Swords shows a victory that leaves little to celebrate, with relationships damaged along the way. This card invites you to consider whether winning is worth what it costs. It may point to conflict, tension or a need to step back from a fight.",
    reversed:
      "Reversed, the conflict may be easing, with a chance to make peace or let go. Resentment might still linger, but there is room to choose reconciliation. The card encourages you to set down weapons and look for common ground.",
    lenses: {
      self: "You are involved in, or recovering from, a tense conflict.",
      obstacle: "A need to be right may be costing more than it gives.",
      guidance: "Choose your battles wisely, and value peace over a hollow win.",
      outcome: "If things continue, tension is likely to linger until someone chooses to let go.",
    },
  }),
  sword({
    rank: "six",
    number: 6,
    label: "Six",
    archetype: "The Ferry Across Still Water",
    keywords: {
      upright: ["transition", "moving forward", "leaving behind", "calmer waters"],
      reversed: ["resistance to change", "unfinished business", "emotional baggage", "stalled journey"],
    },
    symbols: ["a ferryman poling a small boat", "six swords standing in the hull", "rough water behind and calm ahead", "a distant shore under twilight"],
    upright:
      "The Six of Swords carries you away from turbulence toward calmer waters. This card invites a transition that, though tinged with sadness, can bring relief. It may point to moving on from a difficult situation toward a more peaceful place.",
    reversed:
      "Reversed, the boat may be held at the shore by unfinished business or reluctance to leave. Emotional baggage might be making the journey heavier. The card encourages you to resolve what you can and to travel more lightly.",
    lenses: {
      self: "You are in transition, moving away from difficulty toward something gentler.",
      obstacle: "Unresolved issues may be keeping you from fully moving on.",
      guidance: "Accept the journey, and focus on the calmer shore ahead.",
      outcome: "If things continue, you are likely to reach a more peaceful and stable place.",
    },
  }),
  sword({
    rank: "seven",
    number: 7,
    label: "Seven",
    archetype: "The Midnight Stratagem",
    keywords: {
      upright: ["strategy", "deception", "stealth", "going it alone"],
      reversed: ["confession", "conscience", "getting caught", "rethinking approach"],
    },
    symbols: ["a figure tiptoeing away with five swords", "two swords left behind", "a camp of tents", "a moonless sky"],
    upright:
      "The Seven of Swords slips quietly away with an armful of blades, acting on a private plan. This card may point to strategy, cleverness or the temptation to cut corners. It invites you to check whether your approach is wise, honest and sustainable.",
    reversed:
      "Reversed, a hidden plan may be coming to light, or conscience may be urging you to come clean. It can also suggest realising that going it alone is not working. The card encourages honesty and a more transparent approach.",
    lenses: {
      self: "You are acting strategically, perhaps keeping some plans to yourself.",
      obstacle: "Secrecy or a lack of integrity may be undermining your efforts.",
      guidance: "Think carefully about your methods, and favour honesty over shortcuts.",
      outcome: "If things continue, hidden motives are likely to surface sooner or later.",
    },
  }),
  sword({
    rank: "eight",
    number: 8,
    label: "Eight",
    archetype: "The Self-Woven Cage",
    keywords: {
      upright: ["restriction", "feeling trapped", "self-limiting beliefs", "powerlessness"],
      reversed: ["release", "new perspective", "self-acceptance", "freedom"],
    },
    symbols: ["a bound and blindfolded figure", "eight swords planted around her", "a marshy ground", "a castle on a cliff"],
    upright:
      "The Eight of Swords stands surrounded by blades, bound more by fear than by real walls. This card invites you to question the beliefs that make you feel trapped. It may point to a situation where freedom is closer than it appears.",
    reversed:
      "Reversed, the bindings may be loosening as you see your situation more clearly. You might be releasing a limiting belief or stepping out of a self-imposed cage. The card affirms that your perspective can be a key to freedom.",
    lenses: {
      self: "You are feeling restricted or uncertain of how to move forward.",
      obstacle: "Self-limiting thoughts may be keeping you from seeing your options.",
      guidance: "Challenge the story that says you are stuck, and take one small step.",
      outcome: "If things continue, the sense of restriction is likely to remain until you shift your perspective.",
    },
  }),
  sword({
    rank: "nine",
    number: 9,
    label: "Nine",
    archetype: "The Sleepless Constellation",
    keywords: {
      upright: ["anxiety", "worry", "nightmares", "overthinking"],
      reversed: ["hope", "reaching out", "despair easing", "inner turmoil"],
    },
    symbols: ["a figure sitting up in bed", "nine swords across the dark", "a quilt embroidered with zodiac signs", "a black night sky"],
    upright:
      "The Nine of Swords sits awake in the dark, as worries multiply in the small hours. This card acknowledges anxiety and overthinking, inviting you to notice how the mind can amplify fear. It may point to a need for comfort, support and gentle perspective.",
    reversed:
      "Reversed, the worst of the worry may be passing, or you might be ready to reach out for help. It can also suggest inner turmoil that is being kept private. The card encourages you to share your burdens and to remember that night always ends.",
    lenses: {
      self: "You are carrying worries that feel especially heavy right now.",
      obstacle: "Anxious thoughts may be making challenges seem larger than they are.",
      guidance: "Speak your fears aloud to someone you trust, and be gentle with yourself.",
      outcome: "If you seek support, the weight of worry is likely to ease over time.",
    },
  }),
  sword({
    rank: "ten",
    number: 10,
    label: "Ten",
    archetype: "The Darkest Hour Before Dawn",
    keywords: {
      upright: ["painful ending", "rock bottom", "release", "exhaustion"],
      reversed: ["recovery", "regeneration", "resisting an ending", "lessons learned"],
    },
    symbols: ["a figure lying beneath ten swords", "a dark sky lifting to gold at the horizon", "still water", "a red cloth"],
    upright:
      "The Ten of Swords marks an ending that feels final, yet dawn is already breaking on the horizon. This card invites you to acknowledge that a painful chapter has reached its limit. It may point to release, as there is nowhere left to go but toward recovery.",
    reversed:
      "Reversed, you might be slowly rising after a difficult ending, or resisting the conclusion that things are over. The card can indicate recovery, as lessons from hardship begin to take shape. It encourages you to let the old story end so a new one can begin.",
    lenses: {
      self: "You are at, or near, the end of a challenging period.",
      obstacle: "Holding on to a painful situation may be prolonging the hurt.",
      guidance: "Let the ending be complete, and turn your attention to the light ahead.",
      outcome: "If things continue, this chapter is likely to close, making way for renewal.",
    },
  }),
  sword({
    rank: "page",
    number: 11,
    label: "Page",
    archetype: "The Watchful Scout",
    keywords: {
      upright: ["curiosity", "new ideas", "vigilance", "communication"],
      reversed: ["gossip", "scattered thoughts", "defensiveness", "all talk"],
    },
    symbols: ["a young figure holding a raised sword", "wind-tossed clouds", "birds in flight", "a hilltop under shifting skies"],
    upright:
      "The Page of Swords stands alert on a windy hill, eager to learn and quick to question. This card invites curiosity, research and honest communication. It may point to a fresh idea or news that sharpens your thinking.",
    reversed:
      "Reversed, curiosity may turn into gossip or scattered thinking. You might be talking more than acting, or feeling defensive under scrutiny. The card encourages you to focus your mind and use words with care.",
    lenses: {
      self: "You are mentally curious and alert, gathering information and ideas.",
      obstacle: "Hasty words or unfocused thinking may be causing misunderstanding.",
      guidance: "Ask thoughtful questions and seek the truth before acting.",
      outcome: "If things continue, new insights or messages are likely to sharpen your perspective.",
    },
  }),
  sword({
    rank: "knight",
    number: 12,
    label: "Knight",
    archetype: "The Gale Charger",
    keywords: {
      upright: ["ambition", "swift action", "determination", "assertiveness"],
      reversed: ["recklessness", "impatience", "aggression", "scattered focus"],
    },
    symbols: ["a knight charging into the wind", "trees bent by the gale", "a raised sword", "storm clouds parting"],
    upright:
      "The Knight of Swords races forward with conviction, determined to act on ideas without delay. This card invites decisive action guided by clear thinking. It may point to a time to pursue a goal with focus and courage.",
    reversed:
      "Reversed, that speed may become recklessness, or determination may slip into aggression. You might be rushing ahead without considering the impact on others. The card encourages you to temper urgency with thoughtfulness.",
    lenses: {
      self: "You are driven and focused, ready to act swiftly on your ideas.",
      obstacle: "Impatience or bluntness may be causing unnecessary conflict.",
      guidance: "Pursue your goals boldly, but think before you charge.",
      outcome: "If things continue, rapid and assertive progress is likely, though not without some friction.",
    },
  }),
  sword({
    rank: "queen",
    number: 13,
    label: "Queen",
    archetype: "The Clear-Eyed Arbiter",
    keywords: {
      upright: ["clarity", "independence", "honesty", "perceptiveness"],
      reversed: ["coldness", "bitterness", "harsh judgement", "emotional distance"],
    },
    symbols: ["a raised sword held upright", "a throne carved with butterflies", "a single bird in clear sky", "Libra's scales on the crown"],
    upright:
      "The Queen of Swords sees clearly and speaks plainly, guided by experience and discernment. This card invites honest boundaries and independent thinking. It may point to a time to trust your judgement and communicate with directness and fairness.",
    reversed:
      "Reversed, clarity may harden into coldness, or past hurts may sharpen into bitterness. You might be keeping others at a distance to protect yourself. The card encourages you to keep your honesty while softening it with compassion.",
    lenses: {
      self: "You are perceptive and independent, seeing through confusion with clear eyes.",
      obstacle: "Emotional distance or harshness may be isolating you.",
      guidance: "Speak truthfully, set firm boundaries, and lead with fairness.",
      outcome: "If things continue, your clear perspective is likely to bring resolution.",
    },
  }),
  sword({
    rank: "king",
    number: 14,
    label: "King",
    archetype: "The Sovereign of Reason",
    keywords: {
      upright: ["intellectual authority", "truth", "fairness", "clear thinking"],
      reversed: ["manipulation", "abuse of power", "rigidity", "cold logic"],
    },
    symbols: ["a sword tilted slightly to the right", "a throne with butterflies and crescent moons", "a stark blue sky", "two birds in flight"],
    upright:
      "The King of Swords rules through clear thinking, sound judgement and a commitment to truth. This card invites you to make decisions based on reason and integrity. It may point to a time to lead with intellect, or to seek counsel from someone with expertise.",
    reversed:
      "Reversed, intellect may be used to dominate or to justify unfair ends. Logic might become rigid, leaving no room for nuance or empathy. The card encourages you to wield authority with honesty and care.",
    lenses: {
      self: "You are approaching the situation with logic, authority and a commitment to fairness.",
      obstacle: "Rigid thinking or misuse of power may be creating imbalance.",
      guidance: "Let reason guide you, but remember the human impact of your decisions.",
      outcome: "If things continue, a fair and well-reasoned resolution is likely.",
    },
  }),
];
