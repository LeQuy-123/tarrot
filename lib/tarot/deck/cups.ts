import type { MinorRank, TarotCardData } from "@/types/tarot";

type CupsEntry = Pick<
  TarotCardData,
  "archetype" | "keywords" | "symbols" | "upright" | "reversed" | "lenses"
> & { rank: MinorRank; number: number; label: string };

function cup(entry: CupsEntry): TarotCardData {
  const { rank, number, label, ...rest } = entry;
  return {
    id: `${rank}-of-cups`,
    name: `${label} of Cups`,
    arcana: "minor",
    number,
    suit: "cups",
    rank,
    element: "water",
    ...rest,
  };
}

export const cups: TarotCardData[] = [
  cup({
    rank: "ace",
    number: 1,
    label: "Ace",
    archetype: "The Overflowing Chalice of Night",
    keywords: {
      upright: ["new love", "emotional opening", "compassion", "intuition"],
      reversed: ["emotional blockage", "self-love needed", "repressed feelings", "emptiness"],
    },
    symbols: ["a chalice spilling five streams", "a dove carrying a wafer", "lotus blossoms on still water", "dewdrops like falling stars"],
    upright:
      "The Ace of Cups overflows with feeling, offering the beginning of love, compassion or creative joy. This card invites you to open your heart and let emotion move freely. It may point to a new relationship, a renewed tenderness, or a deepening connection to your intuition.",
    reversed:
      "Reversed, the cup may be full but sealed, with feelings held in rather than shared. You might be guarding your heart or overlooking your own need for care. The card invites you to let a little of that water flow, beginning with kindness toward yourself.",
    lenses: {
      self: "You are emotionally open, ready to give and receive love or compassion.",
      obstacle: "Holding back your feelings may be keeping a meaningful connection at arm's length.",
      guidance: "Let your heart lead and allow yourself to feel fully.",
      outcome: "If you stay open, a new emotional beginning is likely to bring fulfilment.",
    },
  }),
  cup({
    rank: "two",
    number: 2,
    label: "Two",
    archetype: "The Mirrored Vows",
    keywords: {
      upright: ["partnership", "mutual attraction", "connection", "harmony"],
      reversed: ["imbalance", "broken communication", "disconnection", "tension"],
    },
    symbols: ["two figures exchanging cups", "a winged lion's head", "the caduceus", "twin crescent moons"],
    upright:
      "The Two of Cups brings two people together in a moment of recognition and shared feeling. This card invites you to honour a connection built on mutual respect and care. It may point to a romance, friendship or partnership where both sides feel truly met.",
    reversed:
      "Reversed, the exchange may feel uneven, with one person giving more or the conversation faltering. Misunderstandings might be creating distance in an important bond. The card encourages a gentle effort to rebalance and reconnect.",
    lenses: {
      self: "You are experiencing, or seeking, a close and balanced connection with someone.",
      obstacle: "An imbalance or miscommunication may be straining a relationship.",
      guidance: "Meet others as equals and nurture the connection with honest attention.",
      outcome: "If you continue to invest, a harmonious partnership is likely to deepen.",
    },
  }),
  cup({
    rank: "three",
    number: 3,
    label: "Three",
    archetype: "The Circle of Raised Cups",
    keywords: {
      upright: ["friendship", "celebration", "community", "joy"],
      reversed: ["overindulgence", "gossip", "isolation", "third-party tension"],
    },
    symbols: ["three dancers raising cups", "a harvest of grapes and gourds", "garlands of flowers", "a ring of stars overhead"],
    upright:
      "The Three of Cups celebrates friendship and the joy of being among people who lift you up. This card invites you to gather, share and enjoy community. It may point to a reunion, celebration or a supportive circle that helps you flourish.",
    reversed:
      "Reversed, the celebration may tip into excess, or a group dynamic could feel strained by gossip or exclusion. You might feel on the outside of a circle you once belonged to. The card encourages you to seek connection that genuinely nourishes rather than depletes.",
    lenses: {
      self: "You are surrounded by, or longing for, supportive friendship and shared happiness.",
      obstacle: "Overindulgence or social friction may be souring the good times.",
      guidance: "Lean on your community and make time to celebrate together.",
      outcome: "If things continue, joyful gatherings and strengthening friendships are likely.",
    },
  }),
  cup({
    rank: "four",
    number: 4,
    label: "Four",
    archetype: "The Unnoticed Offering",
    keywords: {
      upright: ["apathy", "contemplation", "reevaluation", "withdrawal"],
      reversed: ["renewed interest", "motivation", "seizing opportunities", "awareness"],
    },
    symbols: ["a figure seated under a tree", "three cups on the grass", "a fourth cup offered from a cloud", "folded arms"],
    upright:
      "The Four of Cups sits in quiet discontent, so absorbed in reflection that a new offering goes unnoticed. This card invites you to consider whether boredom or disappointment is narrowing your view. It may point to a need for contemplation, and to opportunities waiting just at the edge of awareness.",
    reversed:
      "Reversed, the figure may be looking up at last, ready to engage with life again. It can also suggest a withdrawal that has deepened into numbness and now needs gentle attention before it lifts. The card invites you to notice what has quietly been offered to you.",
    lenses: {
      self: "You are feeling withdrawn or unenthused, turning inward to reconsider things.",
      obstacle: "Apathy or dissatisfaction may be blinding you to new possibilities.",
      guidance: "Take time for reflection, but stay open to what life is offering.",
      outcome: "If things continue, a period of quiet reassessment is likely before fresh interest returns.",
    },
  }),
  cup({
    rank: "five",
    number: 5,
    label: "Five",
    archetype: "The Spilled Starlight",
    keywords: {
      upright: ["loss", "grief", "regret", "disappointment"],
      reversed: ["acceptance", "moving on", "forgiveness", "finding peace"],
    },
    symbols: ["three spilled cups", "two cups still standing", "a black cloak", "a bridge leading to a distant home"],
    upright:
      "The Five of Cups mourns what has spilled, while two cups still stand untouched behind. This card acknowledges grief and disappointment, inviting you to feel them honestly. It may also point gently toward what remains, ready for when you are able to turn around.",
    reversed:
      "Reversed, the mourning may be giving way to acceptance as you begin to look toward the standing cups. It can also suggest grief that has been pushed aside instead of felt. The card encourages you to give sorrow its due, so that peace can follow naturally.",
    lenses: {
      self: "You are processing a loss or disappointment that weighs on your heart.",
      obstacle: "Dwelling on what went wrong may be hiding what is still possible.",
      guidance: "Honour your grief, then let yourself notice what remains.",
      outcome: "If things continue, healing is likely to come as you gradually shift your focus.",
    },
  }),
  cup({
    rank: "six",
    number: 6,
    label: "Six",
    archetype: "The Memory Garden",
    keywords: {
      upright: ["nostalgia", "innocence", "childhood", "kindness"],
      reversed: ["living in the past", "unrealistic memories", "moving forward", "independence"],
    },
    symbols: ["cups filled with white flowers", "a child offering a gift", "an old cottage courtyard", "a faded star map"],
    upright:
      "The Six of Cups returns to sweet memories and the simple kindness of earlier days. This card invites you to reconnect with innocence, play and the people who shaped you. It may point to a reunion, a gift from the past, or a renewed sense of gentleness.",
    reversed:
      "Reversed, nostalgia may be holding you in the past or polishing memories until they shine brighter than they were. You might be ready to outgrow an old role or story. The card invites you to keep the warmth of memory while stepping into the present.",
    lenses: {
      self: "You are drawn to memories, past connections or a simpler emotional time.",
      obstacle: "Longing for how things were may be preventing you from embracing how they are.",
      guidance: "Draw comfort from the past, and bring its kindness into the present.",
      outcome: "If things continue, an echo from the past is likely to bring tenderness or reconnection.",
    },
  }),
  cup({
    rank: "seven",
    number: 7,
    label: "Seven",
    archetype: "The Cloud of Phantom Goblets",
    keywords: {
      upright: ["choices", "fantasy", "illusion", "wishful thinking"],
      reversed: ["clarity", "alignment", "decisiveness", "sobering reality"],
    },
    symbols: ["seven cups floating on a cloud", "a jewelled treasure", "a serpent and a dragon", "a shrouded glowing figure"],
    upright:
      "The Seven of Cups presents many tempting visions, each shimmering with possibility. This card invites you to distinguish between dreams worth pursuing and illusions that only distract. It may point to a moment of abundant options where clarity is the most valuable gift.",
    reversed:
      "Reversed, the clouds may be parting, making it easier to see which choice truly fits. It can also suggest that fantasies have been holding you back from action. The card encourages you to choose and commit, even if the choice is less dazzling than the dream.",
    lenses: {
      self: "You are faced with many options or imaginative possibilities.",
      obstacle: "Wishful thinking or indecision may be keeping you from a real choice.",
      guidance: "Ground your dreams in reality and pick one path to explore.",
      outcome: "If things continue, choices are likely to multiply until you decide which matters most.",
    },
  }),
  cup({
    rank: "eight",
    number: 8,
    label: "Eight",
    archetype: "The Moonlit Departure",
    keywords: {
      upright: ["walking away", "seeking meaning", "disillusionment", "transition"],
      reversed: ["fear of leaving", "aimless drifting", "returning", "avoidance"],
    },
    symbols: ["eight stacked cups left behind", "a waning moon and sun together", "a cloaked traveller with a staff", "rocky mountain paths"],
    upright:
      "The Eight of Cups walks away from something that once mattered, guided by a longing for deeper meaning. This card invites you to recognise when a situation no longer fulfils you. It may point to a brave departure in search of what truly resonates.",
    reversed:
      "Reversed, you might feel stuck between leaving and staying, unsure whether to go. It can also suggest drifting without direction, or circling back to what was already outgrown. The card encourages you to clarify what you are seeking before you decide.",
    lenses: {
      self: "You are sensing that something no longer satisfies and are ready to move on.",
      obstacle: "Fear of the unknown may be keeping you tied to an unfulfilling situation.",
      guidance: "Trust the call to seek more, even if it means leaving comfort behind.",
      outcome: "If things continue, a meaningful departure is likely to lead toward greater fulfilment.",
    },
  }),
  cup({
    rank: "nine",
    number: 9,
    label: "Nine",
    archetype: "The Wish Fulfilled",
    keywords: {
      upright: ["contentment", "satisfaction", "gratitude", "wishes granted"],
      reversed: ["smugness", "dissatisfaction", "materialism", "inner emptiness"],
    },
    symbols: ["nine cups on a curved shelf", "a contented figure with folded arms", "a blue cloth", "a wishing star"],
    upright:
      "The Nine of Cups sits contentedly among the cups, as if a heartfelt wish has come true. This card invites you to savour satisfaction and appreciate what you have. It may point to emotional fulfilment, comfort and a well-earned sense of pleasure.",
    reversed:
      "Reversed, the satisfaction might feel hollow, or happiness may be measured mainly in possessions and appearances. You could be holding out for a different wish than the one that came true. The card encourages you to reflect on what genuinely brings contentment.",
    lenses: {
      self: "You are in a place of contentment, enjoying something you hoped for.",
      obstacle: "Complacency or chasing the wrong wish may be limiting deeper happiness.",
      guidance: "Practise gratitude and enjoy what is going well.",
      outcome: "If things continue, your wishes are likely to be realised in satisfying ways.",
    },
  }),
  cup({
    rank: "ten",
    number: 10,
    label: "Ten",
    archetype: "The Rainbow Homestead",
    keywords: {
      upright: ["harmony", "family", "lasting happiness", "emotional fulfilment"],
      reversed: ["disconnection", "domestic tension", "misaligned values", "struggles at home"],
    },
    symbols: ["ten cups arched in a rainbow", "a couple with arms raised", "dancing children", "a cottage by a river"],
    upright:
      "The Ten of Cups shows emotional abundance shared among loved ones, crowned by a rainbow. This card invites you to cherish harmony, belonging and lasting connection. It may point to family happiness, a peaceful home or relationships that feel deeply nourishing.",
    reversed:
      "Reversed, the picture of happiness may feel out of reach, or tension could be disrupting harmony at home. You might be chasing an ideal instead of tending to the real relationships in front of you. The card encourages honest conversation to rebuild a sense of togetherness.",
    lenses: {
      self: "You are experiencing or longing for emotional harmony with those closest to you.",
      obstacle: "Unspoken tension or unrealistic expectations may be clouding your relationships.",
      guidance: "Invest in your loved ones and nurture an atmosphere of warmth and understanding.",
      outcome: "If things continue, a deep sense of belonging and emotional fulfilment is likely.",
    },
  }),
  cup({
    rank: "page",
    number: 11,
    label: "Page",
    archetype: "The Dreaming Apprentice",
    keywords: {
      upright: ["creative opportunity", "curiosity", "intuitive messages", "sensitivity"],
      reversed: ["emotional immaturity", "creative block", "escapism", "insecurity"],
    },
    symbols: ["a fish peeking from a cup", "a tunic patterned with lotus flowers", "gentle sea waves", "a blue beret"],
    upright:
      "The Page of Cups is delighted by a surprising message, like a fish appearing in a cup. This card invites you to stay open to intuitive nudges, creative ideas and new feelings. It may point to playful emotional discoveries or unexpected tender news.",
    reversed:
      "Reversed, sensitivity may be making you easily hurt, or creative impulses could feel blocked. You might retreat into daydreams to avoid real emotions. The card encourages you to honour your feelings while grounding them in honest expression.",
    lenses: {
      self: "You are emotionally curious and receptive to new feelings or inspirations.",
      obstacle: "Over-sensitivity or escapism may be keeping you from engaging authentically.",
      guidance: "Welcome surprising emotions and express your creativity freely.",
      outcome: "If you stay open, a delightful emotional or creative opportunity is likely to appear.",
    },
  }),
  cup({
    rank: "knight",
    number: 12,
    label: "Knight",
    archetype: "The Moonbeam Envoy",
    keywords: {
      upright: ["romance", "charm", "imagination", "following the heart"],
      reversed: ["moodiness", "unrealistic expectations", "disappointment", "jealousy"],
    },
    symbols: ["a white horse stepping calmly", "a cup held forward like an offering", "a winged helmet", "a winding stream"],
    upright:
      "The Knight of Cups approaches with an offering, guided by feeling and imagination. This card invites you to follow your heart and pursue what moves you. It may point to a romantic gesture, a creative proposal or an invitation to act on your ideals.",
    reversed:
      "Reversed, idealism may drift into moodiness or promises that are difficult to keep. You might be swept up in a fantasy that does not match reality. The card encourages you to check that your heart and your actions are moving in the same direction.",
    lenses: {
      self: "You are led by emotion and ideals, ready to pursue a heartfelt vision.",
      obstacle: "Unrealistic expectations or changeable moods may be causing disappointment.",
      guidance: "Follow your heart, while keeping your feet on solid ground.",
      outcome: "If things continue, a romantic or creative offer is likely to come your way.",
    },
  }),
  cup({
    rank: "queen",
    number: 13,
    label: "Queen",
    archetype: "The Tidal Oracle",
    keywords: {
      upright: ["compassion", "emotional security", "intuition", "calm"],
      reversed: ["over-giving", "emotional overwhelm", "codependency", "insecurity"],
    },
    symbols: ["an ornate lidded cup", "a throne at the water's edge", "carved sea nymphs", "the Moon over still water"],
    upright:
      "The Queen of Cups holds deep compassion and emotional wisdom, at home in the tides of feeling. This card invites you to trust your intuition and offer care from a place of calm. It may point to a nurturing presence, or your own capacity to hold space for others.",
    reversed:
      "Reversed, caring for others may be overwhelming your own emotional reserves. Boundaries could be blurring, so that others' feelings become your own. The card encourages you to replenish yourself and to care without losing your centre.",
    lenses: {
      self: "You are intuitive and compassionate, deeply in tune with the feelings around you.",
      obstacle: "Absorbing others' emotions may be leaving you drained or unsteady.",
      guidance: "Trust your intuition and nurture yourself as tenderly as you nurture others.",
      outcome: "If things continue, emotional wisdom is likely to guide you toward peace and connection.",
    },
  }),
  cup({
    rank: "king",
    number: 14,
    label: "King",
    archetype: "The Calm Helmsman",
    keywords: {
      upright: ["emotional balance", "diplomacy", "composure", "generosity"],
      reversed: ["emotional manipulation", "volatility", "suppression", "coldness"],
    },
    symbols: ["a throne floating on a choppy sea", "a ship sailing behind", "a leaping fish", "a sceptre and cup held steady"],
    upright:
      "The King of Cups remains calm amid restless waters, balancing feeling with clear judgement. This card invites you to lead with compassion and to stay composed when emotions run high. It may point to a wise counsellor, or your own ability to steady those around you.",
    reversed:
      "Reversed, composure may be a mask, with emotions held down until they surge unexpectedly. Feelings might be used to influence others rather than to connect with them. The card encourages you to acknowledge what you feel without being ruled by it.",
    lenses: {
      self: "You are holding steady emotionally, balancing heart and head with care.",
      obstacle: "Suppressed feelings or emotional volatility may be undermining your calm.",
      guidance: "Respond with empathy and diplomacy, keeping your emotional centre steady.",
      outcome: "If things continue, balanced emotional leadership is likely to bring stability.",
    },
  }),
];
