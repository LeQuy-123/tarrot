import type { Orientation } from "@/types/tarot";

/** Generic outlooks for the suit of Wands (fire: drive, creativity, ambition). */
export const wandsPredictions: Record<string, Record<Orientation, string>> = {
  "ace-of-wands": {
    upright:
      "A spark of inspiration or a new opportunity is about to appear. Act on it while the energy is fresh; a project, passion or venture started now has real potential to catch fire.",
    reversed:
      "A promising idea may struggle to get off the ground, or enthusiasm may flicker. Expect a short delay that invites you to clarify what you truly want before you light the match.",
  },
  "two-of-wands": {
    upright:
      "You are likely to face a decision about expanding your horizons. Planning ahead and looking beyond familiar territory will open doors that staying comfortable would keep closed.",
    reversed:
      "Fear of the unknown may tempt you to play it safe for now. Expect plans to stall until you either commit to the bigger step or make peace with staying where you are.",
  },
  "three-of-wands": {
    upright:
      "Efforts you have already made are likely to start bearing fruit. News from afar, travel or a widening circle of opportunity is on the horizon, so keep looking ahead.",
    reversed:
      "Expected results may arrive later than you hoped. Use the waiting time to adjust plans; obstacles now are likely to reveal what needs more preparation.",
  },
  "four-of-wands": {
    upright:
      "A celebration, homecoming or happy milestone is likely soon. Stability and shared joy with friends or family make this a good time to mark how far you have come.",
    reversed:
      "Plans for a gathering or a sense of belonging may wobble briefly. Expect minor tension at home or in a group to pass once people feel heard.",
  },
  "five-of-wands": {
    upright:
      "Competition, debate or a clash of egos may arise. Handled well, this friction is likely to sharpen your ideas and show you where you stand.",
    reversed:
      "A conflict that has dragged on is likely to ease, or you may choose to step away from a pointless fight. Expect relief once you stop competing for things that do not matter.",
  },
  "six-of-wands": {
    upright:
      "Recognition and public success are on the way. You are likely to receive praise, a win or a sign that others see your effort; enjoy the moment with gratitude.",
    reversed:
      "Validation may be slower to come than you would like, or doubt may creep in after a win. Expect your confidence to steady once you stop measuring yourself by applause.",
  },
  "seven-of-wands": {
    upright:
      "You may need to defend your position or beliefs against pressure. Standing firm is likely to pay off, as long as you choose which battles truly deserve your energy.",
    reversed:
      "Feeling overwhelmed by challenges, you may be tempted to give in. Expect things to improve when you either reinforce your boundaries or let go of ground that was never worth holding.",
  },
  "eight-of-wands": {
    upright:
      "Things are about to move quickly: messages, travel or rapid progress are likely. Be ready to respond fast, because momentum is on your side.",
    reversed:
      "Delays, crossed wires or rushed decisions may slow things down. Expect better results by double-checking details and waiting for the right moment to act.",
  },
  "nine-of-wands": {
    upright:
      "You are close to the finish line, even if you feel tired and wary. One more push, with caution and resilience, is likely to see you through.",
    reversed:
      "Exhaustion or defensiveness may make the last stretch feel harder than it is. Expect relief once you accept help or rest instead of guarding every gate alone.",
  },
  "ten-of-wands": {
    upright:
      "Responsibilities may pile up and feel heavy for a while. The burden is likely to lighten once a current task is completed, so prioritise and delegate where you can.",
    reversed:
      "You may soon realise you are carrying more than your share. Expect a chance to put something down; saying no or asking for help will free your energy.",
  },
  "page-of-wands": {
    upright:
      "Exciting news or an adventurous invitation is on its way. Curiosity is your ally, so explore new ideas freely and see where your enthusiasm leads.",
    reversed:
      "A new idea may fizzle without follow-through, or news may be delayed. Expect a lesson in turning excitement into a plan you can actually stick with.",
  },
  "knight-of-wands": {
    upright:
      "Bold action, travel or a passionate burst of energy is likely to arrive. Moving decisively will carry you far, as long as you keep an eye on where you are heading.",
    reversed:
      "Impulsive moves or impatience may cause setbacks. Expect better outcomes by slowing down slightly and finishing what you start before charging ahead.",
  },
  "queen-of-wands": {
    upright:
      "Confidence and charisma are likely to open doors for you. You may step into a visible, warm leadership role where your enthusiasm inspires others.",
    reversed:
      "Self-doubt or jealousy may dim your natural fire for a while. Expect your confidence to return as you reconnect with what lights you up rather than comparing yourself to others.",
  },
  "king-of-wands": {
    upright:
      "A vision-driven opportunity to lead is likely to present itself. Your ability to inspire and take charge can turn a big idea into lasting achievement.",
    reversed:
      "Overconfidence or impatience with others may create friction. Expect a lesson in leading by example; tempering ambition with listening will bring better results.",
  },
};
