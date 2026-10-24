import type { MinorRank, TarotCardData } from "@/types/tarot";

type PentaclesEntry = Pick<
  TarotCardData,
  "archetype" | "keywords" | "symbols" | "upright" | "reversed" | "lenses"
> & { rank: MinorRank; number: number; label: string };

function pentacle(entry: PentaclesEntry): TarotCardData {
  const { rank, number, label, ...rest } = entry;
  return {
    id: `${rank}-of-pentacles`,
    name: `${label} of Pentacles`,
    arcana: "minor",
    number,
    suit: "pentacles",
    rank,
    element: "earth",
    ...rest,
  };
}

export const pentacles: TarotCardData[] = [
  pentacle({
    rank: "ace",
    number: 1,
    label: "Ace",
    archetype: "The Golden Seed",
    keywords: {
      upright: ["opportunity", "prosperity", "manifestation", "new venture"],
      reversed: ["missed opportunity", "poor planning", "scarcity mindset", "instability"],
    },
    symbols: ["a golden coin offered from a cloud", "a garden gate of roses", "lilies along a path", "distant mountains"],
    upright:
      "The Ace of Pentacles offers a seed of tangible opportunity, rooted in the physical world. This card invites you to nurture practical beginnings with care and patience. It may point to a new venture, resource or chance to build something lasting.",
    reversed:
      "Reversed, an opportunity may be slipping past, or plans might lack a solid foundation. A sense of scarcity could be making it hard to invest in your own growth. The card encourages you to ground your intentions in practical steps.",
    lenses: {
      self: "You are holding the seed of a practical opportunity, ready to plant and grow.",
      obstacle: "Hesitation or poor preparation may be keeping a promising opportunity from taking root.",
      guidance: "Invest your time and energy wisely in something with long-term potential.",
      outcome: "If you tend this seed, steady growth and material stability are likely.",
    },
  }),
  pentacle({
    rank: "two",
    number: 2,
    label: "Two",
    archetype: "The Juggler of Tides",
    keywords: {
      upright: ["balance", "adaptability", "multitasking", "flexibility"],
      reversed: ["overwhelm", "disorganisation", "overcommitment", "imbalance"],
    },
    symbols: ["two coins in a looping ribbon", "ships riding high waves", "a dancing figure", "the infinity loop"],
    upright:
      "The Two of Pentacles keeps two priorities in motion with playful skill. This card invites flexibility and adaptability as you balance competing demands. It may point to a time of juggling responsibilities, handled with grace and good humour.",
    reversed:
      "Reversed, the juggling act may be faltering, with too many things in the air at once. You might feel stretched thin or disorganised. The card encourages you to simplify, prioritise and let something drop if needed.",
    lenses: {
      self: "You are balancing several responsibilities, staying flexible as things shift.",
      obstacle: "Overcommitment may be making it hard to keep everything in balance.",
      guidance: "Prioritise what matters most, and adapt with a light touch.",
      outcome: "If things continue, you are likely to find a workable rhythm amid changing demands.",
    },
  }),
  pentacle({
    rank: "three",
    number: 3,
    label: "Three",
    archetype: "The Master Builders' Guild",
    keywords: {
      upright: ["teamwork", "collaboration", "craftsmanship", "learning"],
      reversed: ["lack of teamwork", "misalignment", "poor quality", "working in isolation"],
    },
    symbols: ["a stonemason in a cathedral", "two figures holding plans", "three coins in a carved arch", "a vaulted ceiling"],
    upright:
      "The Three of Pentacles brings skilled people together to build something greater than any could alone. This card invites collaboration, shared expertise and respect for good work. It may point to a project where everyone's contribution matters.",
    reversed:
      "Reversed, the team may be pulling in different directions, or quality might be suffering from rushed work. You could feel unrecognised or isolated in your efforts. The card encourages clearer communication and renewed commitment to the shared goal.",
    lenses: {
      self: "You are working with others, contributing your skills to a shared effort.",
      obstacle: "Poor coordination or a lack of shared vision may be holding the project back.",
      guidance: "Value the input of others and commit to doing quality work together.",
      outcome: "If things continue, collaboration is likely to produce a well-crafted result.",
    },
  }),
  pentacle({
    rank: "four",
    number: 4,
    label: "Four",
    archetype: "The Clenched Treasury",
    keywords: {
      upright: ["security", "saving", "control", "conservation"],
      reversed: ["greed", "overspending", "letting go", "financial insecurity"],
    },
    symbols: ["a figure clutching a coin", "coins beneath both feet", "a coin balanced on a crown", "a city behind closed walls"],
    upright:
      "The Four of Pentacles holds tightly to what it has, building a sense of security. This card invites you to consider the balance between protecting resources and staying open. It may point to careful planning, or to a grip that has grown a little too tight.",
    reversed:
      "Reversed, the grip may be loosening, either through generous release or careless spending. It can also reflect anxiety about loss that makes it hard to enjoy what you have. The card encourages a healthier relationship with security and generosity.",
    lenses: {
      self: "You are focused on security, holding on to what you value.",
      obstacle: "Fear of loss may be making you overly controlling or closed.",
      guidance: "Protect what matters, but allow room for flow and generosity.",
      outcome: "If things continue, stability is likely, though it may come at the cost of flexibility.",
    },
  }),
  pentacle({
    rank: "five",
    number: 5,
    label: "Five",
    archetype: "The Wanderers in the Snow",
    keywords: {
      upright: ["hardship", "isolation", "worry", "feeling left out"],
      reversed: ["recovery", "reaching out", "spiritual renewal", "help arriving"],
    },
    symbols: ["two figures walking through snow", "a lit stained-glass window", "crutches and ragged clothing", "a cold grey sky"],
    upright:
      "The Five of Pentacles walks through the snow, unaware of the warm window just above. This card acknowledges hardship, worry or a sense of exclusion. It may also point toward help that is closer than it seems, if you are willing to look up and ask.",
    reversed:
      "Reversed, the cold season may be easing, with support beginning to arrive. It can also suggest a spiritual or emotional renewal after a difficult time. The card encourages you to accept help and to recognise the warmth that remains.",
    lenses: {
      self: "You are going through a lean or lonely time, feeling on the outside.",
      obstacle: "Isolation or reluctance to seek help may be deepening the struggle.",
      guidance: "Reach out for support, and notice where care is being offered.",
      outcome: "If things continue, the hardship may linger unless you seek the help available.",
    },
  }),
  pentacle({
    rank: "six",
    number: 6,
    label: "Six",
    archetype: "The Balanced Ledger",
    keywords: {
      upright: ["generosity", "giving and receiving", "charity", "fairness"],
      reversed: ["strings attached", "debt", "imbalanced giving", "self-care neglected"],
    },
    symbols: ["a merchant holding scales", "coins given to kneeling figures", "a red cloak", "six coins in the night sky"],
    upright:
      "The Six of Pentacles weighs giving and receiving with care, sharing resources in a fair way. This card invites generosity, and an openness to receive when it is your turn. It may point to support flowing through relationships or community.",
    reversed:
      "Reversed, the exchange may be uneven, with gifts that carry hidden obligations. You might be giving too much, or struggling to accept help without guilt. The card encourages balance and honesty in how resources move between people.",
    lenses: {
      self: "You are involved in giving or receiving support in some form.",
      obstacle: "An imbalance in giving, or conditions on help, may be creating tension.",
      guidance: "Give generously and receive gracefully, keeping exchanges fair.",
      outcome: "If things continue, a fair and supportive flow of resources is likely.",
    },
  }),
  pentacle({
    rank: "seven",
    number: 7,
    label: "Seven",
    archetype: "The Patient Harvest",
    keywords: {
      upright: ["patience", "long-term view", "investment", "assessment"],
      reversed: ["impatience", "limited returns", "frustration", "reconsidering investment"],
    },
    symbols: ["a farmer leaning on a hoe", "coins growing on a vine", "a quiet field", "a harvest moon"],
    upright:
      "The Seven of Pentacles pauses in the field to see how the crop is growing. This card invites patient reflection on your long-term efforts. It may point to a time to assess progress and decide where to invest further.",
    reversed:
      "Reversed, the harvest may seem slow, leading to frustration or doubt. You might be questioning whether your effort is worth it. The card encourages you to adjust your approach rather than abandon what you have planted.",
    lenses: {
      self: "You are reflecting on your progress and the results of sustained effort.",
      obstacle: "Impatience or disappointment with slow results may be discouraging you.",
      guidance: "Take stock thoughtfully, and continue nurturing what shows promise.",
      outcome: "If things continue, patient investment is likely to bear fruit in time.",
    },
  }),
  pentacle({
    rank: "eight",
    number: 8,
    label: "Eight",
    archetype: "The Devoted Artisan",
    keywords: {
      upright: ["skill", "diligence", "mastery", "dedication"],
      reversed: ["perfectionism", "lack of focus", "repetitive work", "uninspired effort"],
    },
    symbols: ["a craftsman carving coins at a bench", "coins displayed on a post", "a hammer and chisel", "a distant town"],
    upright:
      "The Eight of Pentacles devotes itself to its craft, refining skills through steady, focused practice. This card invites dedication, attention to detail and pride in your work. It may point to a time of learning, apprenticeship or quiet mastery.",
    reversed:
      "Reversed, focus may be slipping, or perfectionism might be making the work feel joyless. You could be going through the motions without real engagement. The card encourages you to reconnect with why the work matters to you.",
    lenses: {
      self: "You are focused on developing skill through hard work and practice.",
      obstacle: "Perfectionism or a lack of motivation may be undermining your progress.",
      guidance: "Commit to steady practice, and take pride in each detail.",
      outcome: "If things continue, your dedication is likely to lead to genuine mastery.",
    },
  }),
  pentacle({
    rank: "nine",
    number: 9,
    label: "Nine",
    archetype: "The Walled Orchard",
    keywords: {
      upright: ["independence", "self-sufficiency", "refinement", "abundance"],
      reversed: ["overwork", "superficial success", "dependence", "insecurity"],
    },
    symbols: ["a falcon resting on a gloved hand", "ripe grapevines", "a garden of golden coins", "a snail on the path"],
    upright:
      "The Nine of Pentacles stands at ease in a flourishing garden, enjoying the fruits of independent effort. This card invites you to appreciate your self-sufficiency and the comfort you have built. It may point to refinement, leisure and well-earned abundance.",
    reversed:
      "Reversed, comfort may be built on overwork, or independence might feel more lonely than freeing. You could be relying on others more than you would like. The card encourages you to examine what true security and fulfilment look like for you.",
    lenses: {
      self: "You are enjoying a sense of independence and the rewards of your effort.",
      obstacle: "Overwork or a focus on appearances may be undermining real contentment.",
      guidance: "Value your achievements and take time to enjoy them.",
      outcome: "If things continue, a comfortable and self-sufficient position is likely.",
    },
  }),
  pentacle({
    rank: "ten",
    number: 10,
    label: "Ten",
    archetype: "The Ancestral Hearth",
    keywords: {
      upright: ["legacy", "family wealth", "stability", "long-term success"],
      reversed: ["family disputes", "financial loss", "instability", "short-term focus"],
    },
    symbols: ["an elder with two dogs", "a family beneath an archway", "ten coins in the Tree of Life pattern", "a heraldic tapestry"],
    upright:
      "The Ten of Pentacles reflects lasting security built over generations. This card invites you to consider your legacy and the foundations you are laying. It may point to family support, long-term stability or wealth that is more than material.",
    reversed:
      "Reversed, family tensions or financial instability may be shaking a sense of security. Short-term thinking might be at odds with long-term wellbeing. The card encourages you to strengthen the foundations that matter most.",
    lenses: {
      self: "You are focused on long-term stability and what you will leave behind.",
      obstacle: "Family disagreements or financial pressures may be disrupting a sense of security.",
      guidance: "Build with the future in mind, and honour the roots that support you.",
      outcome: "If things continue, lasting stability and legacy are likely to take shape.",
    },
  }),
  pentacle({
    rank: "page",
    number: 11,
    label: "Page",
    archetype: "The Earnest Student",
    keywords: {
      upright: ["ambition", "study", "practical opportunity", "diligence"],
      reversed: ["procrastination", "lack of progress", "missed lessons", "unrealistic goals"],
    },
    symbols: ["a young figure studying a coin", "a ploughed field", "a grove of trees", "a green tunic"],
    upright:
      "The Page of Pentacles studies a coin with quiet fascination, eager to turn ideas into results. This card invites learning, careful planning and steady progress. It may point to a new opportunity for study or practical growth.",
    reversed:
      "Reversed, enthusiasm may stall into procrastination, or goals might be set without a plan to reach them. You could be missing lessons that would serve you well. The card encourages you to focus on one practical step at a time.",
    lenses: {
      self: "You are curious and ambitious, eager to learn and grow practically.",
      obstacle: "Procrastination or a lack of follow-through may be slowing your progress.",
      guidance: "Commit to learning and take concrete steps toward your goals.",
      outcome: "If things continue, steady study is likely to open a practical opportunity.",
    },
  }),
  pentacle({
    rank: "knight",
    number: 12,
    label: "Knight",
    archetype: "The Steady Plough",
    keywords: {
      upright: ["reliability", "hard work", "routine", "patience"],
      reversed: ["stagnation", "boredom", "perfectionism", "laziness"],
    },
    symbols: ["a dark horse standing still", "a coin held carefully", "a freshly ploughed field", "oak leaves on the helmet"],
    upright:
      "The Knight of Pentacles moves slowly but surely, committed to doing things thoroughly. This card invites reliability, patience and consistent effort. It may point to steady progress earned through routine and responsibility.",
    reversed:
      "Reversed, steadiness may become stagnation, or routine might turn into boredom. You might be stuck in a rut or overly cautious. The card encourages you to bring fresh energy to your work without losing your reliability.",
    lenses: {
      self: "You are working steadily and reliably, committed to your responsibilities.",
      obstacle: "Excessive caution or monotony may be stalling your progress.",
      guidance: "Keep going with patience and consistency, and refresh your routine when needed.",
      outcome: "If things continue, slow and steady effort is likely to bring dependable results.",
    },
  }),
  pentacle({
    rank: "queen",
    number: 13,
    label: "Queen",
    archetype: "The Nurturing Steward",
    keywords: {
      upright: ["nurturing", "practicality", "abundance", "groundedness"],
      reversed: ["self-neglect", "work-home imbalance", "smothering", "insecurity"],
    },
    symbols: ["a coin cradled in the lap", "a rabbit at her feet", "a throne carved with fruit", "roses forming an arbour"],
    upright:
      "The Queen of Pentacles nurtures with practical care, creating comfort and abundance for those around her. This card invites you to tend to your home, body and resources with warmth. It may point to a grounded, generous presence in your life, or within you.",
    reversed:
      "Reversed, caring for everyone else may be crowding out your own needs. Work and home might feel out of balance. The card encourages you to nurture yourself with the same practical kindness you offer others.",
    lenses: {
      self: "You are grounded and caring, attending to practical and emotional needs alike.",
      obstacle: "Overextending yourself may be leaving little room for your own wellbeing.",
      guidance: "Create comfort and stability, and remember to include yourself in your care.",
      outcome: "If things continue, a nurturing and abundant environment is likely to grow.",
    },
  }),
  pentacle({
    rank: "king",
    number: 14,
    label: "King",
    archetype: "The Abundant Patron",
    keywords: {
      upright: ["prosperity", "security", "discipline", "leadership"],
      reversed: ["greed", "stubbornness", "materialism", "poor stewardship"],
    },
    symbols: ["a throne carved with bulls", "grapevines draped across the robe", "a golden coin and sceptre", "a castle behind"],
    upright:
      "The King of Pentacles has built abundance through discipline and wise stewardship. This card invites you to lead with steadiness and to manage your resources well. It may point to security, success and the ability to provide for others.",
    reversed:
      "Reversed, success may come with a stubborn or materialistic streak. Resources might be poorly managed, or held too tightly. The card encourages you to remember that true abundance includes generosity and balance.",
    lenses: {
      self: "You are in a position of stability, capable of managing and providing.",
      obstacle: "Rigidity or an overemphasis on material gain may be limiting your growth.",
      guidance: "Lead with practical wisdom, and use your resources to support others.",
      outcome: "If things continue, lasting prosperity and security are likely.",
    },
  }),
];
