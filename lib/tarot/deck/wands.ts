import type { MinorRank, TarotCardData } from "@/types/tarot";

type WandsEntry = Pick<
  TarotCardData,
  "archetype" | "keywords" | "symbols" | "upright" | "reversed" | "lenses"
> & { rank: MinorRank; number: number; label: string };

function wand(entry: WandsEntry): TarotCardData {
  const { rank, number, label, ...rest } = entry;
  return {
    id: `${rank}-of-wands`,
    name: `${label} of Wands`,
    arcana: "minor",
    number,
    suit: "wands",
    rank,
    element: "fire",
    ...rest,
  };
}

export const wands: TarotCardData[] = [
  wand({
    rank: "ace",
    number: 1,
    label: "Ace",
    archetype: "The Kindled Meteor",
    keywords: {
      upright: ["inspiration", "creative spark", "potential", "enthusiasm"],
      reversed: ["delays", "lack of motivation", "false starts", "creative block"],
    },
    symbols: ["a sprouting wand held by a hand from a cloud", "a meteor trailing gold", "fresh green leaves", "a castle on a far hill"],
    upright:
      "The Ace of Wands offers a bright spark of inspiration, the kind that makes a new idea feel alive. This card invites you to catch that flame while it is fresh and give it something to burn. It may point to the beginning of a creative project, passion or adventure.",
    reversed:
      "Reversed, the spark may be there but struggling to catch, smothered by doubt or poor timing. You might feel restless without knowing where to direct your energy. The card suggests protecting the ember gently until conditions are right for it to grow.",
    lenses: {
      self: "You are holding a fresh spark of enthusiasm, eager to begin something that excites you.",
      obstacle: "An exciting idea may lack the focus or fuel needed to get off the ground.",
      guidance: "Act on your inspiration with a small, concrete first step today.",
      outcome: "If you nurture this spark, a lively new venture is likely to take hold.",
    },
  }),
  wand({
    rank: "two",
    number: 2,
    label: "Two",
    archetype: "The Horizon Planner",
    keywords: {
      upright: ["planning", "future vision", "decisions", "discovery"],
      reversed: ["fear of the unknown", "playing it safe", "poor planning", "restlessness"],
    },
    symbols: ["a small globe held in one hand", "a battlement overlooking the sea", "two wands, one fixed to the wall", "a rose and lily cross"],
    upright:
      "The Two of Wands stands at the edge of familiar territory, surveying a wider world. This card invites you to plan boldly and consider where your ambitions could take you. It may point to a choice between staying within known walls or setting out to explore.",
    reversed:
      "Reversed, the view from the battlements may feel daunting rather than inviting. You might be holding back from a larger plan out of comfort or uncertainty. The card encourages you to take one modest step beyond the wall and see how it feels.",
    lenses: {
      self: "You are weighing up your options and imagining a bigger future.",
      obstacle: "Reluctance to leave the comfort zone may be limiting how far your plans can reach.",
      guidance: "Map out your next move with vision, then commit to a direction.",
      outcome: "If you follow through on your plans, new horizons are likely to open for you.",
    },
  }),
  wand({
    rank: "three",
    number: 3,
    label: "Three",
    archetype: "The Signal Fire Beyond the Sea",
    keywords: {
      upright: ["expansion", "foresight", "progress", "opportunities abroad"],
      reversed: ["obstacles to growth", "frustration", "unexpected delays", "limited outlook"],
    },
    symbols: ["ships with golden sails on the horizon", "three wands planted on a cliff", "a lighthouse glow at dusk", "a figure watching from behind"],
    upright:
      "The Three of Wands watches ships head out across the water, carrying plans already set in motion. This card invites you to look ahead with confidence as your efforts begin to expand. It may point to growth, wider reach and opportunities that arrive from further afield.",
    reversed:
      "Reversed, the ships may seem slow to return, or the horizon may feel narrower than hoped. Delays might be testing your patience or confidence. The card asks you to revisit your plans, adapt where needed, and keep faith in your longer view.",
    lenses: {
      self: "You are seeing early signs of progress and looking toward wider possibilities.",
      obstacle: "Delays or a short-sighted view may be making progress feel slower than it is.",
      guidance: "Keep your gaze on the long game and prepare for opportunities that are on their way.",
      outcome: "If things continue, your efforts are likely to extend into broader territory.",
    },
  }),
  wand({
    rank: "four",
    number: 4,
    label: "Four",
    archetype: "The Lantern Festival",
    keywords: {
      upright: ["celebration", "homecoming", "harmony", "milestones"],
      reversed: ["transition", "tension at home", "postponed celebration", "lack of belonging"],
    },
    symbols: ["a garlanded canopy on four wands", "paper lanterns under a starlit sky", "dancers with raised bouquets", "a castle gate in the distance"],
    upright:
      "The Four of Wands gathers people beneath a garland to honour something worth celebrating. This card invites you to recognise a milestone and enjoy a sense of welcome and belonging. It may point to a joyful gathering, a homecoming or a moment of shared stability.",
    reversed:
      "Reversed, the celebration may be quieter than expected, or tension could be clouding a sense of home. You might be in transition, not yet settled enough to feel fully at ease. The card encourages finding small ways to mark progress even while things are still in flux.",
    lenses: {
      self: "You are reaching a happy milestone or enjoying a time of harmony with others.",
      obstacle: "Unsettled relationships or an unfinished transition may be dampening the celebration.",
      guidance: "Take time to honour what you have achieved, and share it with people who matter.",
      outcome: "If things continue, a joyful and stable chapter is likely to unfold.",
    },
  }),
  wand({
    rank: "five",
    number: 5,
    label: "Five",
    archetype: "The Clashing Flares",
    keywords: {
      upright: ["competition", "conflict", "friction", "differing opinions"],
      reversed: ["avoiding conflict", "inner tension", "resolution", "suppressed disagreement"],
    },
    symbols: ["five figures brandishing wands", "solar flares colliding", "mismatched tunics", "an open, dusty field"],
    upright:
      "The Five of Wands is a lively scuffle, where many voices and ambitions compete for space. This card may point to friction that, while frustrating, can sharpen ideas and reveal strengths. It invites you to engage in healthy debate without losing sight of the shared goal.",
    reversed:
      "Reversed, conflict may be going underground, avoided or turned inward as restless tension. Alternatively, it can suggest the scuffle beginning to settle as people find common ground. The card invites you to address disagreement openly so it can resolve rather than simmer.",
    lenses: {
      self: "You are in the midst of competing interests, voices or demands.",
      obstacle: "Petty disputes or a scattered group effort may be draining your energy.",
      guidance: "Welcome constructive disagreement, but channel it toward a common purpose.",
      outcome: "If things continue, friction is likely to persist until clear roles or agreements are found.",
    },
  }),
  wand({
    rank: "six",
    number: 6,
    label: "Six",
    archetype: "The Victory Ascendant",
    keywords: {
      upright: ["recognition", "success", "confidence", "public acclaim"],
      reversed: ["self-doubt", "fall from grace", "lack of recognition", "ego"],
    },
    symbols: ["a laurel wreath atop a wand", "a rider on a white horse", "a cheering crowd", "a rising star in Leo"],
    upright:
      "The Six of Wands rides through the crowd with a laurel wreath, recognised for a hard-won success. This card invites you to accept praise graciously and let your confidence grow. It may point to a public acknowledgment of your efforts or a well-earned sense of victory.",
    reversed:
      "Reversed, recognition may be slow to arrive, or you might be relying too heavily on others' approval. There may also be worry about how a success will be seen. The card encourages you to value your achievement from the inside, whether or not applause follows.",
    lenses: {
      self: "You are enjoying, or close to, a moment of success and recognition.",
      obstacle: "Dependence on external validation or fear of failure may be shaking your confidence.",
      guidance: "Own your accomplishments with humility and let them fuel your next step.",
      outcome: "If things continue, your efforts are likely to be noticed and celebrated.",
    },
  }),
  wand({
    rank: "seven",
    number: 7,
    label: "Seven",
    archetype: "The Ridge Defender",
    keywords: {
      upright: ["perseverance", "standing your ground", "challenge", "conviction"],
      reversed: ["exhaustion", "giving up", "overwhelm", "defensiveness"],
    },
    symbols: ["a figure on a high ridge", "six wands rising from below", "mismatched shoes", "a red sky at dusk"],
    upright:
      "The Seven of Wands holds the high ground against pressures coming from below. This card invites you to stand firm in your convictions and defend what you have built. It may point to a challenge that, while demanding, rewards persistence and self-belief.",
    reversed:
      "Reversed, the effort of holding your position may be wearing you down, or defensiveness may be making every remark feel like an attack. You might wonder if this battle is worth the cost. The card invites you to choose which ground truly matters and to rest where you can.",
    lenses: {
      self: "You are protecting your position or beliefs in the face of challenge.",
      obstacle: "Constant pressure or opposition may be testing your stamina.",
      guidance: "Hold to what you believe in, but pick your battles wisely.",
      outcome: "If you persevere, you are likely to maintain your position and earn respect.",
    },
  }),
  wand({
    rank: "eight",
    number: 8,
    label: "Eight",
    archetype: "The Swift Comet Shower",
    keywords: {
      upright: ["speed", "momentum", "swift action", "news arriving"],
      reversed: ["delays", "frustration", "scattered energy", "rushing"],
    },
    symbols: ["eight wands flying through clear air", "a shower of comets", "a river valley below", "an open blue sky"],
    upright:
      "The Eight of Wands sends energy flying, with everything suddenly moving at once. This card may point to rapid developments, news or opportunities that require quick responses. It invites you to ride the momentum while it lasts.",
    reversed:
      "Reversed, the wands may seem stuck mid-air, with messages or plans held up. Alternatively, things might be moving so fast that details are being missed. The card encourages you to find the right pace, neither forcing nor stalling.",
    lenses: {
      self: "You are caught up in fast-moving events, with things accelerating around you.",
      obstacle: "Hasty decisions or unexpected holdups may be throwing off your rhythm.",
      guidance: "Act promptly and keep lines of communication clear.",
      outcome: "If things continue, rapid progress and swift developments are likely.",
    },
  }),
  wand({
    rank: "nine",
    number: 9,
    label: "Nine",
    archetype: "The Last Watchfire",
    keywords: {
      upright: ["resilience", "persistence", "boundaries", "last stretch"],
      reversed: ["fatigue", "paranoia", "stubbornness", "depleted reserves"],
    },
    symbols: ["a bandaged figure leaning on a wand", "eight wands like a palisade", "a watchfire burning low", "a grey hillside"],
    upright:
      "The Nine of Wands has been through much, yet remains on guard with determination intact. This card invites you to draw on hard-won resilience as you approach the final stretch. It may point to the strength of boundaries that have been tested and still hold.",
    reversed:
      "Reversed, weariness may be making every challenge feel bigger, or wariness may have turned into suspicion. You might be holding on long after it would be wise to ask for help. The card encourages you to rest and to let trusted others share the watch.",
    lenses: {
      self: "You are tired but resolute, close to completing a long effort.",
      obstacle: "Exhaustion or guardedness may be making it hard to keep going or to trust others.",
      guidance: "Keep going, but pace yourself and protect your energy.",
      outcome: "If you persevere a little longer, you are likely to reach the end of this challenge.",
    },
  }),
  wand({
    rank: "ten",
    number: 10,
    label: "Ten",
    archetype: "The Burdened Torchbearer",
    keywords: {
      upright: ["burden", "responsibility", "overcommitment", "hard work"],
      reversed: ["delegation", "release", "collapse under strain", "refusing help"],
    },
    symbols: ["ten wands carried in a tight bundle", "a bowed back", "a village ahead", "a dimming torch"],
    upright:
      "The Ten of Wands carries a heavy bundle toward a destination that is almost in reach. This card may point to responsibilities that have grown too large for one person. It invites you to consider what you might set down, share or simplify.",
    reversed:
      "Reversed, the load may finally be too much, or you may be starting to put some of it down. It can reflect the relief of delegation, or a stubborn refusal to let anyone help. The card encourages you to release what was never yours alone to carry.",
    lenses: {
      self: "You are carrying a great deal of responsibility, perhaps more than is sustainable.",
      obstacle: "Overcommitment may be blocking your view of what really matters.",
      guidance: "Prioritise, delegate and lighten your load where you can.",
      outcome: "If nothing changes, the strain is likely to increase, so easing the burden now can shift the outcome.",
    },
  }),
  wand({
    rank: "page",
    number: 11,
    label: "Page",
    archetype: "The Ember Messenger",
    keywords: {
      upright: ["exploration", "enthusiasm", "free spirit", "new ideas"],
      reversed: ["impatience", "lack of direction", "unfocused energy", "hesitant creativity"],
    },
    symbols: ["a young figure gazing at a budding wand", "salamanders on a tunic", "a desert of golden dunes", "a feather in the cap"],
    upright:
      "The Page of Wands is full of eager curiosity, ready to explore an idea just to see where it leads. This card invites playful experimentation and a fearless approach to learning. It may point to exciting news or a fresh interest that sparks your imagination.",
    reversed:
      "Reversed, the enthusiasm may be scattered across too many ideas, or held back by fear of looking foolish. You might start things and lose interest before they take shape. The card suggests choosing one spark to follow a little further.",
    lenses: {
      self: "You are curious and eager, exploring new interests with a youthful energy.",
      obstacle: "Restlessness or lack of follow-through may be scattering your efforts.",
      guidance: "Explore with enthusiasm, and stay with one idea long enough to learn from it.",
      outcome: "If you keep exploring, a promising new passion or opportunity is likely to emerge.",
    },
  }),
  wand({
    rank: "knight",
    number: 12,
    label: "Knight",
    archetype: "The Solar Flare Rider",
    keywords: {
      upright: ["action", "adventure", "passion", "boldness"],
      reversed: ["haste", "impulsiveness", "frustration", "burnout"],
    },
    symbols: ["a rearing chestnut horse", "flame-like plumes on a helmet", "pyramids on the horizon", "a solar flare arcing overhead"],
    upright:
      "The Knight of Wands charges forward, fuelled by passion and a love of adventure. This card invites you to act boldly and follow your fire with confidence. It may point to a period of energetic pursuit, travel or daring initiative.",
    reversed:
      "Reversed, that fire may be burning too fast, leading to rash moves or abandoned projects. Frustration could arise when momentum stalls unexpectedly. The card encourages you to keep your passion but add a little planning to your route.",
    lenses: {
      self: "You are full of energy and ready to take bold, adventurous action.",
      obstacle: "Impulsive decisions or impatience may be leading you off course.",
      guidance: "Move with confidence and enthusiasm, while keeping an eye on where you are headed.",
      outcome: "If things continue, a burst of exciting activity and change is likely.",
    },
  }),
  wand({
    rank: "queen",
    number: 13,
    label: "Queen",
    archetype: "The Sunflower Sovereign",
    keywords: {
      upright: ["confidence", "warmth", "determination", "charisma"],
      reversed: ["insecurity", "jealousy", "demanding", "self-neglect"],
    },
    symbols: ["a sunflower held in one hand", "a black cat at her feet", "lions carved into the throne", "a golden sun on a midnight banner"],
    upright:
      "The Queen of Wands radiates warmth and self-assurance, drawing others into her vibrant presence. This card invites you to step fully into your confidence and lead with heart. It may point to a time to be seen, to inspire and to take charge of your creative life.",
    reversed:
      "Reversed, that radiance may be dimmed by self-doubt, or turned into a need to dominate attention. You might be pouring energy into everyone else while neglecting your own spark. The card encourages you to rekindle confidence that does not depend on being the brightest in the room.",
    lenses: {
      self: "You are confident, warm and capable of inspiring those around you.",
      obstacle: "Insecurity or comparison with others may be dimming your natural glow.",
      guidance: "Lead with courage and generosity, and let your passion be visible.",
      outcome: "If you continue in this spirit, you are likely to gain influence and creative fulfilment.",
    },
  }),
  wand({
    rank: "king",
    number: 14,
    label: "King",
    archetype: "The Flame-Crowned Visionary",
    keywords: {
      upright: ["vision", "leadership", "entrepreneurship", "boldness"],
      reversed: ["impulsiveness", "overbearing", "unrealistic expectations", "arrogance"],
    },
    symbols: ["a throne carved with lions and salamanders", "a blossoming staff", "a crown shaped like flames", "a salamander biting its tail"],
    upright:
      "The King of Wands sees what could be and has the conviction to make it real. This card invites visionary leadership, inspiring others toward a bold shared goal. It may point to a time to take the lead in a venture you believe in.",
    reversed:
      "Reversed, vision may run ahead of practicality, or leadership might slip into impatience with others. You may expect more than is realistic from yourself or your team. The card encourages you to pair big ideas with patience and genuine listening.",
    lenses: {
      self: "You are in a position to lead with vision and set the direction for others.",
      obstacle: "Overconfidence or a forceful style may be alienating those you need on your side.",
      guidance: "Share your vision clearly and let your enthusiasm empower others.",
      outcome: "If things continue, your initiative is likely to drive a significant venture forward.",
    },
  }),
];
