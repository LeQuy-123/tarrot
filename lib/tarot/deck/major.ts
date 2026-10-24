import type { TarotCardData } from "@/types/tarot";

export const majorArcana: TarotCardData[] = [
  {
    id: "the-fool",
    name: "The Fool",
    arcana: "major",
    number: 0,
    suit: null,
    rank: null,
    element: "spirit",
    archetype: "The Unwritten Step",
    keywords: {
      upright: ["beginnings", "openness", "trust", "spontaneity", "curiosity"],
      reversed: ["hesitation", "recklessness", "naivety", "fear of the unknown"],
    },
    symbols: ["an open road beneath a scatter of new stars", "a white rose", "Uranus", "a light traveller's satchel", "the edge of a gold-lit cliff"],
    upright:
      "The Fool stands at the threshold of a path no one has charted yet, carrying little more than curiosity. This card invites you to meet what is new with an open heart, trusting that experience itself will teach you what you need. It may point to a moment where beginning matters more than knowing exactly where you will arrive.",
    reversed:
      "Reversed, the leap may be stalled by worry, or taken without any glance at the ground below. You might notice a pull between holding back out of fear and rushing ahead to avoid thinking things through. The invitation is to keep the sense of adventure while adding a little care to your footing.",
    lenses: {
      self: "You are standing at a fresh threshold, more willing than usual to step into something unfamiliar.",
      obstacle: "A carefree approach may be skipping over details that deserve a second look.",
      guidance: "Let yourself begin before every question is answered, and treat the first step as an experiment.",
      outcome: "If things continue, a new chapter is likely to open, shaped by your willingness to learn as you go.",
    },
  },
  {
    id: "the-magician",
    name: "The Magician",
    arcana: "major",
    number: 1,
    suit: null,
    rank: null,
    element: "air",
    archetype: "The Lens of Four Stars",
    keywords: {
      upright: ["skill", "focus", "willpower", "resourcefulness", "manifestation"],
      reversed: ["scattered energy", "manipulation", "untapped talent", "self-doubt"],
    },
    symbols: ["the infinity sign traced in starlight", "a wand raised toward the zenith", "Mercury", "the four suit tools on a gilded table", "red and white robes"],
    upright:
      "The Magician gathers every tool within reach and points them toward a single intention. This card suggests that you already hold more resources than you might assume, and that focused attention can turn ideas into something tangible. It invites you to act with clarity and to trust your own capability.",
    reversed:
      "Reversed, the tools are present but the current between them is weak or misdirected. Talent may be going unused, or persuasion may be drifting toward cleverness for its own sake. This can be a cue to reconnect skill with honest purpose and to notice where self-doubt is quietly unplugging your power.",
    lenses: {
      self: "You are in a position to shape events, with skills and resources already laid out before you.",
      obstacle: "Too many options or a lack of clear intention may be dispersing your considerable ability.",
      guidance: "Choose one aim, gather your tools around it, and act deliberately.",
      outcome: "If you keep your focus, ideas are likely to take concrete form through your own effort.",
    },
  },
  {
    id: "the-high-priestess",
    name: "The High Priestess",
    arcana: "major",
    number: 2,
    suit: null,
    rank: null,
    element: "water",
    archetype: "The Veiled Observatory",
    keywords: {
      upright: ["intuition", "mystery", "inner knowing", "stillness", "the subconscious"],
      reversed: ["ignored instincts", "secrecy", "disconnection", "surface noise"],
    },
    symbols: ["the crescent moon at her feet", "a veil embroidered with pomegranates", "two pillars, one dark and one pale", "a half-hidden scroll", "the Moon"],
    upright:
      "The High Priestess sits between what is known and what is only sensed, keeping a quiet watch. This card invites you to listen beneath the surface, where intuition often speaks more softly than logic. It may point to knowledge that arrives through patience and stillness rather than through effort.",
    reversed:
      "Reversed, the inner voice may be muffled by busyness or by a habit of seeking answers only from others. There might be something withheld, either by you or around you, that is asking to be acknowledged. Making room for silence can help you hear what you already sense.",
    lenses: {
      self: "You are attuned to undercurrents that others may miss, even if you cannot yet put them into words.",
      obstacle: "Hidden information or an unspoken feeling may be clouding the situation.",
      guidance: "Pause, withdraw from the noise for a while, and give weight to your quiet instincts.",
      outcome: "If you keep listening inward, a deeper understanding is likely to surface in its own time.",
    },
  },
  {
    id: "the-empress",
    name: "The Empress",
    arcana: "major",
    number: 3,
    suit: null,
    rank: null,
    element: "earth",
    archetype: "The Garden of Nebulae",
    keywords: {
      upright: ["abundance", "nurturing", "creativity", "sensuality", "growth"],
      reversed: ["creative block", "over-giving", "neglect of self", "stagnation"],
    },
    symbols: ["a crown of twelve stars", "ripening wheat", "Venus", "a flowing river", "a cushion embroidered with a heart"],
    upright:
      "The Empress embodies growth that comes from patient care, much like a garden tended through its seasons. This card invites you to nourish what you love, including your own body, senses and creative impulses. It may point to a fertile period where ideas, relationships or projects can flourish when given warmth.",
    reversed:
      "Reversed, the flow of nourishment may be running in only one direction, leaving you depleted while others are fed. Creativity might feel dry, or comfort may have tipped into inertia. The card gently asks you to receive care as readily as you give it.",
    lenses: {
      self: "You are in a nurturing, generative phase, with a capacity to help things grow.",
      obstacle: "Giving too much of yourself, or smothering what needs space, may be slowing natural growth.",
      guidance: "Tend to your own wellbeing and let creativity unfold at an organic pace.",
      outcome: "If you continue to nurture, the situation is likely to ripen into something abundant and satisfying.",
    },
  },
  {
    id: "the-emperor",
    name: "The Emperor",
    arcana: "major",
    number: 4,
    suit: null,
    rank: null,
    element: "fire",
    archetype: "The Iron Meridian",
    keywords: {
      upright: ["structure", "authority", "stability", "leadership", "protection"],
      reversed: ["rigidity", "control", "lack of discipline", "domination"],
    },
    symbols: ["a stone throne carved with rams", "Aries", "an orb and sceptre", "red mountains under a gold sky", "armour beneath a robe"],
    upright:
      "The Emperor brings order to chaos by drawing clear lines and standing by them. This card invites you to build steady foundations, set boundaries and take responsibility for the realm that is yours. It may point to a time when structure provides the security that allows everything else to thrive.",
    reversed:
      "Reversed, structure may have hardened into control, or it may be missing altogether. You might be pressing too hard on others, or struggling to hold any line at all. The card suggests finding authority that protects rather than dominates.",
    lenses: {
      self: "You are taking a grounded, organised stance, ready to lead and to hold firm.",
      obstacle: "Inflexible rules or a need for control may be limiting what could otherwise unfold.",
      guidance: "Create a clear plan and consistent boundaries, then honour them with steady discipline.",
      outcome: "If you keep building methodically, a stable and well-defended foundation is likely to emerge.",
    },
  },
  {
    id: "the-hierophant",
    name: "The Hierophant",
    arcana: "major",
    number: 5,
    suit: null,
    rank: null,
    element: "earth",
    archetype: "The Keeper of Star Charts",
    keywords: {
      upright: ["tradition", "teaching", "shared values", "ritual", "guidance"],
      reversed: ["dogma", "rebellion", "unconventional paths", "hollow conformity"],
    },
    symbols: ["crossed golden keys", "a triple crown", "Taurus", "two kneeling students", "pillars of grey stone"],
    upright:
      "The Hierophant represents wisdom that has been gathered, tested and passed down through generations. This card invites you to explore what established teachings, mentors or communities might offer you right now. It may point to the comfort and meaning found in shared rituals and values.",
    reversed:
      "Reversed, inherited rules may feel confining, or you may be following them without asking whether they still fit. There can be value in questioning convention and forging a more personal relationship with belief. The card asks you to keep what is true for you and set down what has become empty form.",
    lenses: {
      self: "You are drawn toward tried-and-tested approaches and the guidance of those with experience.",
      obstacle: "Expectations of how things are supposed to be done may be stifling your own insight.",
      guidance: "Seek out a trusted teacher or tradition, while staying honest about what resonates.",
      outcome: "If things continue, you are likely to find belonging within a shared framework or community.",
    },
  },
  {
    id: "the-lovers",
    name: "The Lovers",
    arcana: "major",
    number: 6,
    suit: null,
    rank: null,
    element: "air",
    archetype: "The Twin Constellation",
    keywords: {
      upright: ["union", "choice", "alignment", "harmony", "values"],
      reversed: ["disharmony", "misalignment", "indecision", "imbalance"],
    },
    symbols: ["an angel in a burst of sunlight", "Gemini", "a tree of flames and a tree of fruit", "a distant mountain peak", "two figures beneath a single star"],
    upright:
      "The Lovers speaks of meaningful connection and of choices that reflect who you truly are. This card invites you to align your relationships and decisions with your deepest values. It may point to a bond, partnership or commitment that feels like a genuine meeting of hearts and minds.",
    reversed:
      "Reversed, there may be a gap between what you value and how you are choosing, or friction within a close bond. Indecision might be keeping you suspended between two paths. The card encourages honest reflection on what alignment would look like for you.",
    lenses: {
      self: "You are at a point of meaningful connection or a choice that touches your core values.",
      obstacle: "Conflicting desires or a mismatch of values may be making it hard to commit.",
      guidance: "Choose from the heart while staying faithful to your principles.",
      outcome: "If you follow what you value, a harmonious union or wholehearted decision is likely to unfold.",
    },
  },
  {
    id: "the-chariot",
    name: "The Chariot",
    arcana: "major",
    number: 7,
    suit: null,
    rank: null,
    element: "water",
    archetype: "The Comet's Reins",
    keywords: {
      upright: ["determination", "willpower", "momentum", "victory", "direction"],
      reversed: ["loss of direction", "opposing forces", "aggression", "stalling"],
    },
    symbols: ["a canopy of stars", "two sphinxes, one dark and one light", "Cancer", "a crescent moon on each shoulder", "a walled city behind"],
    upright:
      "The Chariot moves forward by harnessing forces that pull in different directions. This card invites you to channel discipline and resolve toward a clear destination. It may point to progress earned through focus rather than luck, as competing impulses are brought under steady guidance.",
    reversed:
      "Reversed, the forces you are steering may be pulling apart, leaving you spinning or stuck. Willpower might be turning into force, or motivation may have scattered. This can be a moment to stop, realign your intentions, and decide which direction is truly yours.",
    lenses: {
      self: "You are driven and determined, moving with purpose toward something you want.",
      obstacle: "Inner conflict or competing priorities may be pulling your momentum in two directions.",
      guidance: "Take the reins with calm confidence and keep your eyes on the destination.",
      outcome: "If your focus holds, you are likely to make decisive progress and overcome resistance.",
    },
  },
  {
    id: "strength",
    name: "Strength",
    arcana: "major",
    number: 8,
    suit: null,
    rank: null,
    element: "fire",
    archetype: "The Gentle Lion of Regulus",
    keywords: {
      upright: ["courage", "compassion", "patience", "inner strength", "gentle influence"],
      reversed: ["self-doubt", "low energy", "raw emotion", "insecurity"],
    },
    symbols: ["a lion soothed by an open hand", "Leo", "the infinity sign above her head", "a garland of flowers", "a golden meadow"],
    upright:
      "Strength shows a courage that is soft-spoken, meeting wild energy with steady compassion. This card invites you to trust your resilience and to handle challenges with patience rather than force. It may point to an inner steadiness that can calm fears, both your own and other people's.",
    reversed:
      "Reversed, inner strength may be present but hidden behind doubt, or emotions may feel too large to hold. You might be overpowering feelings rather than befriending them, or forgetting how capable you are. The card encourages kindness toward yourself as the first step to rebuilding confidence.",
    lenses: {
      self: "You are drawing on quiet courage, holding steady in a situation that asks for patience.",
      obstacle: "Fear, frustration or self-criticism may be undermining your natural resilience.",
      guidance: "Meet what feels untamed with gentleness, and let calm persistence do the work.",
      outcome: "If you continue with compassion, you are likely to find that patience overcomes what force could not.",
    },
  },
  {
    id: "the-hermit",
    name: "The Hermit",
    arcana: "major",
    number: 9,
    suit: null,
    rank: null,
    element: "earth",
    archetype: "The Lantern at the Pole Star",
    keywords: {
      upright: ["introspection", "solitude", "inner guidance", "wisdom", "reflection"],
      reversed: ["isolation", "loneliness", "withdrawal", "avoidance"],
    },
    symbols: ["a lantern holding a six-pointed star", "Virgo", "a long staff", "a snowy summit", "a grey hooded cloak"],
    upright:
      "The Hermit steps away from the crowd to seek a light that can only be found within. This card invites a period of reflection, simplicity and honest questioning. It may point to wisdom that grows from solitude, and to the possibility of later sharing what you discover.",
    reversed:
      "Reversed, healthy solitude may have slipped into isolation, or you may be avoiding the reflection you need. Withdrawal can protect you for a while but may also keep support at a distance. The card asks whether it is time to turn back toward others, or to finally make space for stillness.",
    lenses: {
      self: "You are in a reflective season, seeking meaning more than distraction.",
      obstacle: "Withdrawal or excessive self-analysis may be cutting you off from helpful connection.",
      guidance: "Take some intentional time alone and follow the small light of your own understanding.",
      outcome: "If you continue inward, greater clarity and self-knowledge are likely to emerge.",
    },
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    arcana: "major",
    number: 10,
    suit: null,
    rank: null,
    element: "spirit",
    archetype: "The Turning Orrery",
    keywords: {
      upright: ["cycles", "change", "fate", "turning points", "opportunity"],
      reversed: ["resistance to change", "setbacks", "feeling stuck", "repeating patterns"],
    },
    symbols: ["a great wheel inscribed with alchemical signs", "Jupiter", "a sphinx at the crest", "four winged creatures in the clouds", "a gilded orrery"],
    upright:
      "The Wheel of Fortune reminds you that every season turns, and that change is woven into the nature of things. This card may point to a turning point, where circumstances shift in ways that open new possibilities. It invites you to move with the cycle rather than cling to any single moment.",
    reversed:
      "Reversed, the wheel may feel as though it is turning against you, or the same pattern keeps coming round. Resistance to change can make transitions harder than they need to be. The card invites you to notice which cycles you can influence and which you might simply ride out.",
    lenses: {
      self: "You are in the midst of a shift, with circumstances moving in ways beyond your full control.",
      obstacle: "Unpredictable change or an old repeating pattern may be unsettling your plans.",
      guidance: "Stay adaptable and look for the opportunity hidden inside each turn.",
      outcome: "If things continue, a new phase is likely to arrive as the cycle moves forward.",
    },
  },
  {
    id: "justice",
    name: "Justice",
    arcana: "major",
    number: 11,
    suit: null,
    rank: null,
    element: "air",
    archetype: "The Scales of Equinox",
    keywords: {
      upright: ["fairness", "truth", "accountability", "cause and effect", "clarity"],
      reversed: ["imbalance", "dishonesty", "avoidance of responsibility", "bias"],
    },
    symbols: ["balanced golden scales", "an upright double-edged sword", "Libra", "a purple veil between pillars", "a crown with a square jewel"],
    upright:
      "Justice weighs each side carefully and asks for honesty about what is true. This card invites you to take responsibility for your choices and to act with fairness. It may point to a situation where clear thinking and integrity help restore balance.",
    reversed:
      "Reversed, the scales may be tipped by bias, denial or a reluctance to face consequences. You might be judging yourself or others too harshly, or not honestly enough. The card encourages a candid reckoning that leads toward balance rather than blame.",
    lenses: {
      self: "You are weighing a situation carefully, wanting an outcome that feels fair and true.",
      obstacle: "An imbalance, or a truth not yet acknowledged, may be keeping things unresolved.",
      guidance: "Look at the facts with honesty and act in a way you would be willing to stand behind.",
      outcome: "If you continue with integrity, matters are likely to settle in proportion to what has been put in.",
    },
  },
  {
    id: "the-hanged-man",
    name: "The Hanged Man",
    arcana: "major",
    number: 12,
    suit: null,
    rank: null,
    element: "water",
    archetype: "The Inverted Horizon",
    keywords: {
      upright: ["surrender", "pause", "new perspective", "letting go", "suspension"],
      reversed: ["stalling", "resistance", "needless sacrifice", "indecision"],
    },
    symbols: ["a figure suspended from a living tree", "Neptune", "a golden halo", "crossed legs forming a figure four", "a pale blue tunic"],
    upright:
      "The Hanged Man pauses willingly, letting the world turn upside down so that it can be seen anew. This card invites you to release the urge to force progress and to see what stillness reveals. It may point to insight that arrives only once you stop struggling against the moment.",
    reversed:
      "Reversed, the pause may have become a stall, or a sacrifice may no longer be serving any purpose. You might be resisting a change of perspective because the old view feels safer. The card invites you to ask whether waiting is still wise, or whether it is time to move.",
    lenses: {
      self: "You are in a state of suspension, waiting for something to become clear.",
      obstacle: "Indecision or reluctance to let go may be prolonging a period of limbo.",
      guidance: "Surrender the need to control the timing and try looking at the situation from the opposite angle.",
      outcome: "If you allow the pause, a fresh perspective is likely to change how you approach things.",
    },
  },
  {
    id: "death",
    name: "Death",
    arcana: "major",
    number: 13,
    suit: null,
    rank: null,
    element: "water",
    archetype: "The Eclipse Gate",
    keywords: {
      upright: ["endings", "transformation", "transition", "release", "renewal"],
      reversed: ["resistance to endings", "lingering", "fear of change", "stagnation"],
    },
    symbols: ["a white rose on a black banner", "Scorpio", "a sun rising between two towers", "a pale horse", "a river carrying things away"],
    upright:
      "Death marks the close of a chapter so that something new can take its place. Rather than a literal ending, this card invites you to honour what has run its course and to let it go with grace. It may point to a deep transformation that clears space for renewal.",
    reversed:
      "Reversed, an ending may be pressing at the door while you hold it shut. Clinging to what is finished can leave you in an uneasy in-between. The card gently encourages you to grieve what needs grieving, so that change can move through you instead of around you.",
    lenses: {
      self: "You are moving through a significant transition, with an old way of being drawing to a close.",
      obstacle: "Holding on to what has already ended may be preventing a necessary renewal.",
      guidance: "Release what no longer fits your life, trusting that clearing space is an act of care.",
      outcome: "If things continue, a meaningful transformation is likely to make way for a new beginning.",
    },
  },
  {
    id: "temperance",
    name: "Temperance",
    arcana: "major",
    number: 14,
    suit: null,
    rank: null,
    element: "fire",
    archetype: "The Alchemist of Dawn",
    keywords: {
      upright: ["balance", "moderation", "patience", "blending", "healing"],
      reversed: ["excess", "imbalance", "impatience", "discord"],
    },
    symbols: ["water poured between two golden cups", "Sagittarius", "one foot on land and one in water", "irises by a pool", "a path toward a crown of light"],
    upright:
      "Temperance blends opposites slowly, creating something more harmonious than either part alone. This card invites patience, moderation and a willingness to find the middle way. It may point to a quiet healing that comes from steady, balanced effort over time.",
    reversed:
      "Reversed, the mixture may be off, with too much of one thing and too little of another. Impatience or overindulgence could be disturbing an otherwise healthy rhythm. The card invites you to recalibrate gently and to notice where balance has slipped.",
    lenses: {
      self: "You are seeking equilibrium, trying to blend different needs or influences.",
      obstacle: "Extremes or a lack of patience may be upsetting the balance you are trying to create.",
      guidance: "Move slowly, combine thoughtfully, and choose moderation over intensity.",
      outcome: "If you maintain this measured approach, harmony and a sense of integration are likely to follow.",
    },
  },
  {
    id: "the-devil",
    name: "The Devil",
    arcana: "major",
    number: 15,
    suit: null,
    rank: null,
    element: "earth",
    archetype: "The Gilded Tether",
    keywords: {
      upright: ["attachment", "temptation", "shadow self", "materialism", "restriction"],
      reversed: ["release", "breaking free", "reclaiming power", "facing the shadow"],
    },
    symbols: ["loose chains around two figures", "Capricorn", "an inverted pentagram", "a lowered torch", "a dark pedestal"],
    upright:
      "The Devil reveals the ties that bind us, many of them looser than they appear. This card invites an honest look at habits, attachments or beliefs that may be limiting your freedom. It may point to patterns where comfort or desire has quietly turned into constraint.",
    reversed:
      "Reversed, the chains may be loosening as you recognise their hold and begin to step away. It can also suggest facing a hidden part of yourself with curiosity rather than shame. The card affirms that awareness is often the first key to freedom.",
    lenses: {
      self: "You may be caught in a pattern or attachment that feels hard to step away from.",
      obstacle: "An unhealthy dependency or fear-based belief may be holding you in place.",
      guidance: "Name the tether honestly, and remember that you have more choice than it seems.",
      outcome: "If the pattern continues unexamined, its pull is likely to grow, so awareness now can change the direction.",
    },
  },
  {
    id: "the-tower",
    name: "The Tower",
    arcana: "major",
    number: 16,
    suit: null,
    rank: null,
    element: "fire",
    archetype: "The Shattered Spire",
    keywords: {
      upright: ["sudden change", "upheaval", "revelation", "awakening", "breakdown of illusion"],
      reversed: ["averting disaster", "delayed upheaval", "inner transformation", "fear of change"],
    },
    symbols: ["a lightning bolt striking a crown", "Mars", "a tower on a jagged peak", "falling figures and sparks", "a storm-dark sky"],
    upright:
      "The Tower shakes loose what was built on unstable ground, often in a sudden flash of insight. Though dramatic, this card may point to a revelation that clears away illusion and makes room for something truer. It invites you to treat disruption as information about what needs rebuilding.",
    reversed:
      "Reversed, the upheaval may be happening inwardly, or a necessary collapse is being postponed. You might be bracing against a change that would be easier if met sooner. The card invites you to let small truths in now, so they do not have to arrive all at once later.",
    lenses: {
      self: "You are experiencing, or sensing, a shake-up that challenges what you thought was solid.",
      obstacle: "A structure or belief that no longer holds may be crumbling at an inconvenient time.",
      guidance: "Let go of what is already breaking and look for the clear sky that opens behind it.",
      outcome: "If things continue, a disruptive turning point is likely to reveal a more honest foundation.",
    },
  },
  {
    id: "the-star",
    name: "The Star",
    arcana: "major",
    number: 17,
    suit: null,
    rank: null,
    element: "air",
    archetype: "The Wellspring of Light",
    keywords: {
      upright: ["hope", "renewal", "inspiration", "serenity", "faith"],
      reversed: ["discouragement", "lost faith", "disconnection", "weariness"],
    },
    symbols: ["one great star among seven smaller ones", "Aquarius", "water poured onto land and into a pool", "an ibis on a tree", "a calm night sky"],
    upright:
      "The Star arrives after the storm, offering quiet hope and the sense of being guided. This card invites you to rest, heal and reconnect with what inspires you. It may point to a period of renewal in which trust in the future begins to return.",
    reversed:
      "Reversed, the light may still be shining but feel far away, dimmed by tiredness or disappointment. You might be finding it hard to believe that things can improve. The card invites small acts of replenishment that can gradually rekindle hope.",
    lenses: {
      self: "You are in a hopeful, healing space, open to inspiration and renewal.",
      obstacle: "Discouragement or a sense of being unsupported may be dimming your optimism.",
      guidance: "Keep faith with your vision and let yourself be replenished by what restores you.",
      outcome: "If you continue to trust, a sense of peace and renewed purpose is likely to grow.",
    },
  },
  {
    id: "the-moon",
    name: "The Moon",
    arcana: "major",
    number: 18,
    suit: null,
    rank: null,
    element: "water",
    archetype: "The Tidal Dream",
    keywords: {
      upright: ["illusion", "intuition", "uncertainty", "dreams", "the unconscious"],
      reversed: ["clarity emerging", "released fear", "confusion lifting", "repressed emotion"],
    },
    symbols: ["a full moon with a sleeping face", "Pisces", "a dog and a wolf howling", "a crayfish rising from a pool", "a winding path between two towers"],
    upright:
      "The Moon lights the way only dimly, so that shapes shift and certainty slips away. This card invites you to navigate by intuition while staying aware that fears and imaginings can distort what you see. It may point to a time of dreams, symbols and feelings that are not yet fully understood.",
    reversed:
      "Reversed, the fog may be starting to lift, revealing what was hidden or misread. It can also suggest emotions you have kept submerged that are now pressing to be seen. The card encourages you to approach these revelations gently rather than all at once.",
    lenses: {
      self: "You are moving through uncertainty, sensing more than you can confirm.",
      obstacle: "Anxiety, illusion or incomplete information may be distorting your view.",
      guidance: "Trust your instincts, but test your fears against what is actually in front of you.",
      outcome: "If things continue, the situation is likely to remain ambiguous for a while before its truth becomes clearer.",
    },
  },
  {
    id: "the-sun",
    name: "The Sun",
    arcana: "major",
    number: 19,
    suit: null,
    rank: null,
    element: "fire",
    archetype: "The Golden Zenith",
    keywords: {
      upright: ["joy", "vitality", "success", "warmth", "clarity"],
      reversed: ["dimmed joy", "overconfidence", "temporary clouds", "forced positivity"],
    },
    symbols: ["a radiant sun with a calm face", "sunflowers along a wall", "a child on a white horse", "a red banner", "the Sun"],
    upright:
      "The Sun shines on everything without reservation, bringing warmth, clarity and a sense of ease. This card invites you to enjoy what is going well and to let yourself be seen. It may point to a period of vitality, confidence and simple happiness.",
    reversed:
      "Reversed, the light may be partially clouded, so that joy feels harder to reach or is being performed rather than felt. Occasionally it can suggest optimism that has overlooked a few details. The card reminds you that the sun is still there, and invites you to reconnect with genuine delight.",
    lenses: {
      self: "You are in a bright, confident place, with energy and enthusiasm to share.",
      obstacle: "Overconfidence or a reluctance to acknowledge shadows may be skewing the picture.",
      guidance: "Embrace openness, play and honesty, and allow your natural warmth to lead.",
      outcome: "If things continue, a joyful and successful outcome is likely to come into view.",
    },
  },
  {
    id: "judgement",
    name: "Judgement",
    arcana: "major",
    number: 20,
    suit: null,
    rank: null,
    element: "spirit",
    archetype: "The Clarion of Rebirth",
    keywords: {
      upright: ["awakening", "reckoning", "renewal", "calling", "absolution"],
      reversed: ["self-criticism", "ignoring the call", "doubt", "unresolved past"],
    },
    symbols: ["a trumpet sounding from the clouds", "Pluto", "figures rising with open arms", "a banner bearing a cross", "distant snow-capped mountains"],
    upright:
      "Judgement sounds a call to rise, review your path and step into a more authentic version of yourself. This card invites an honest reckoning with the past, held with compassion rather than condemnation. It may point to a moment of awakening in which you recognise what you are being called toward.",
    reversed:
      "Reversed, the call may be heard but resisted, often because self-judgement feels louder than the invitation. You might be replaying old mistakes instead of learning from them. The card encourages forgiveness, so that you can answer what is asking to begin.",
    lenses: {
      self: "You are reassessing your life, sensing a call toward something more aligned.",
      obstacle: "Harsh self-assessment or fear of change may be muting an important inner call.",
      guidance: "Reflect honestly on what you have learned, forgive what needs forgiving, and answer the call.",
      outcome: "If you heed this awakening, a renewed sense of purpose is likely to take shape.",
    },
  },
  {
    id: "the-world",
    name: "The World",
    arcana: "major",
    number: 21,
    suit: null,
    rank: null,
    element: "spirit",
    archetype: "The Completed Orbit",
    keywords: {
      upright: ["completion", "integration", "accomplishment", "wholeness", "travel"],
      reversed: ["unfinished business", "lack of closure", "delays", "seeking shortcuts"],
    },
    symbols: ["a dancer within a laurel wreath", "Saturn", "two wands held lightly", "four guardians at the corners", "a violet sash"],
    upright:
      "The World celebrates a cycle brought to its fullness, where many threads finally weave together. This card invites you to acknowledge how far you have come and to feel the wholeness of what you have achieved. It may point to completion, integration and readiness for the next great journey.",
    reversed:
      "Reversed, the circle may be nearly closed but not quite, with a loose end still asking for attention. You might be rushing past the ending without truly arriving. The card invites you to finish thoughtfully, so that the next beginning starts on solid ground.",
    lenses: {
      self: "You are approaching the culmination of a significant chapter in your life.",
      obstacle: "An unfinished task or a lack of closure may be keeping you from moving on.",
      guidance: "Complete what remains, celebrate the journey, and integrate its lessons.",
      outcome: "If things continue, a satisfying sense of completion and wholeness is likely to arrive.",
    },
  },
];
