import type { Orientation } from "@/types/tarot";

/** Generic outlooks for the Major Arcana: what may unfold, upright and reversed. */
export const majorPredictions: Record<string, Record<Orientation, string>> = {
  "the-fool": {
    upright:
      "A fresh beginning is likely to open soon, perhaps one you did not plan for. Say yes to the first small step and trust that the path will reveal itself as you walk it.",
    reversed:
      "A leap you are considering may need one more look before you take it. Expect a short pause that protects you from a careless start, so you can begin again with clearer eyes.",
  },
  "the-magician": {
    upright:
      "The coming days favour action: the skills, contacts and tools you need are already within reach. An idea you set in motion now has a strong chance of taking shape.",
    reversed:
      "Plans may stall if energy is scattered across too many directions. Watch for promises that sound better than they are, including your own, and focus on one thing you can actually make real.",
  },
  "the-high-priestess": {
    upright:
      "An answer is on its way, but it is more likely to arrive as a hunch, a dream or a quiet knowing than as a clear announcement. Give yourself stillness and the message will surface.",
    reversed:
      "You may soon notice a gap between what you feel and what you allow yourself to admit. Secrets or unspoken truths could come to light, and listening inward will spare you confusion.",
  },
  "the-empress": {
    upright:
      "A season of growth and abundance is approaching, in work, home or relationships. What you have nurtured patiently is likely to blossom, especially if you also make room for rest and pleasure.",
    reversed:
      "Growth may slow while you recover energy you have been giving away. Expect a reminder to care for yourself first; once you do, creativity and comfort are likely to return.",
  },
  "the-emperor": {
    upright:
      "Structure and steady leadership are likely to bring results soon. Clear plans, firm boundaries or support from an authority figure can turn a shaky situation into solid ground.",
    reversed:
      "A clash with rigid rules or a controlling person may be on the horizon. The outcome improves if you find a balance between holding your ground and staying flexible.",
  },
  "the-hierophant": {
    upright:
      "Guidance from a mentor, tradition or institution is likely to prove useful. Commitments, ceremonies or formal learning may play a meaningful role in what comes next.",
    reversed:
      "You may feel pulled to break from an expected path or question an inherited belief. An unconventional choice is likely to serve you better than following the rulebook.",
  },
  "the-lovers": {
    upright:
      "An important choice of the heart or of values is approaching. A relationship or partnership may deepen, and decisions made honestly now are likely to feel deeply right later.",
    reversed:
      "Tension between what you want and what you value may surface soon. Expect a relationship or decision to ask for more honesty; alignment returns when you stop splitting yourself in two.",
  },
  "the-chariot": {
    upright:
      "Momentum is building and a hard-won victory looks likely. Stay focused on your direction and keep opposing pulls in check, and you are likely to move forward faster than expected.",
    reversed:
      "Progress may feel blocked or chaotic for a while, often because your goals are pulling in different directions. Slowing down to regain control will get you further than forcing the pace.",
  },
  strength: {
    upright:
      "A challenge ahead is likely to be met with patience rather than force. Quiet courage and kindness, including toward yourself, will win more ground than any show of power.",
    reversed:
      "Self-doubt may grow louder before it fades. Expect moments where you feel less capable than you are; gentle persistence will rebuild your confidence sooner than you think.",
  },
  "the-hermit": {
    upright:
      "A period of reflection is likely to bring the clarity you are seeking. Time alone, study or a wise guide may light the next step, even if only one step at a time.",
    reversed:
      "Withdrawing too far may leave you feeling isolated in the coming weeks. Reaching out, even a little, is likely to bring back the perspective that solitude alone cannot provide.",
  },
  "wheel-of-fortune": {
    upright:
      "A turning point is coming, and luck seems to be moving in your favour. Unexpected opportunities or timely coincidences are likely, so stay open and ready to move when the moment arrives.",
    reversed:
      "A run of delays or setbacks may test your patience, but cycles always turn. What feels like bad luck is likely to reveal a pattern worth breaking before fortune shifts again.",
  },
  justice: {
    upright:
      "A fair outcome is likely in a matter that has been weighing on you. Decisions, agreements or paperwork tend to resolve in line with truth, so act with integrity and expect balance to return.",
    reversed:
      "Something may feel unfair or one-sided for a time. Expect a reckoning with accountability, yours or someone else's; honesty now will shorten the imbalance.",
  },
  "the-hanged-man": {
    upright:
      "Things may seem to stand still, but a valuable shift in perspective is forming. A pause or sacrifice in the near future is likely to show you an answer you could not see while rushing.",
    reversed:
      "You may feel stuck in waiting without knowing why. The delay is likely to end once you stop resisting what needs to be released, or decide it is time to act after all.",
  },
  death: {
    upright:
      "An ending is likely to clear the way for something new. A chapter, habit or situation may close soon, and although change can feel heavy, it is making space for genuine renewal.",
    reversed:
      "You may hold on to something that has already run its course, and things could feel stagnant as a result. Letting go, even gradually, is likely to restart the flow of your life.",
  },
  temperance: {
    upright:
      "Balance and healing are likely to return through patience and moderation. A blending of people, ideas or resources may produce something better than either could alone.",
    reversed:
      "Excess or impatience may throw things off balance for a while. Expect a nudge to slow down and find the middle path; small adjustments will restore harmony.",
  },
  "the-devil": {
    upright:
      "A temptation, attachment or unhealthy pattern may grow more noticeable soon. Recognising what holds you is the first step, and you are likely to find you have more freedom than you assumed.",
    reversed:
      "A release is coming: a habit, relationship or fear that has held you may finally loosen its grip. Expect a feeling of relief as you reclaim power you had given away.",
  },
  "the-tower": {
    upright:
      "A sudden change or revelation may shake something you thought was secure. Though unsettling, it is likely to clear away what was false and leave you on more honest ground.",
    reversed:
      "An upheaval may be delayed or happen quietly within you. Facing a hard truth willingly in the near future is likely to soften what would otherwise arrive as a crisis.",
  },
  "the-star": {
    upright:
      "Hope and healing are likely to return after a difficult stretch. Expect renewed inspiration, a sense of being guided, and a gentle confirmation that you are on the right path.",
    reversed:
      "Faith in yourself or the future may feel faint for a while. Small acts of self-care and reconnecting with what inspires you are likely to rekindle a light that has not gone out.",
  },
  "the-moon": {
    upright:
      "Uncertainty or mixed signals may cloud the coming days. Not everything is as it appears, so trust your intuition, avoid hasty decisions, and wait for clarity before committing.",
    reversed:
      "Confusion is likely to lift and hidden facts may come to light. Fears that seemed large are likely to shrink once you see them clearly.",
  },
  "the-sun": {
    upright:
      "Success, warmth and clarity are on the way. Expect good news, recognition or simply a lighter heart; this is a time to enjoy what is going well and share it with others.",
    reversed:
      "Joy may feel slightly out of reach or delayed, but the outlook remains bright. A shift in attitude or letting go of unrealistic expectations is likely to let the sunshine back in.",
  },
  judgement: {
    upright:
      "A moment of awakening or an important call is approaching. You are likely to see your past more clearly and feel ready to make a decision that sets you on a renewed path.",
    reversed:
      "Self-criticism or fear of judgement may hold back a decision you need to make. Expect the chance to forgive yourself and answer the call once the inner critic quiets down.",
  },
  "the-world": {
    upright:
      "Completion and fulfilment are close. A cycle is likely to end successfully, perhaps with travel, celebration or recognition, opening the door to a bigger next chapter.",
    reversed:
      "A goal may feel almost but not quite finished. Expect a final loose end to demand attention; tying it up will bring the sense of closure you have been missing.",
  },
};
