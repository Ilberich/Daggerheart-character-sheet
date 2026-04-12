export const Splendor = [
  {
    level: 1, name: "Bolt Beacon", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Spellcast Roll · Far · d8+2 magic · 1 Hope on success · Vulnerable + glowing",
    text: "Make a Spellcast Roll against a target within Far range. On a success, spend a Hope to send a bolt of shimmering light toward them, dealing d8+2 magic damage using your Proficiency. The target becomes temporarily Vulnerable and glows brightly until this condition is cleared."
  },
  {
    level: 1, name: "Mending Touch", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "2 Hope · Touch · Clear 1 HP or 1 Stress · Takes a few minutes · Once/long rest: bonding moment → 2 HP or 2 Stress",
    text: "You lay your hands upon a creature and channel healing magic to close their wounds. When you can take a few minutes to focus on the target you're helping, you can spend 2 Hope to clear a Hit Point or a Stress on them.\nOnce per long rest, when you spend this healing time learning something new about them or revealing something about yourself, you can clear 2 Hit Points or 2 Stress on them instead."
  },
  {
    level: 1, name: "Reassurance", type: "Ability", recallCost: 0,
    cost: null,
    passive: true,
    summary: "Reaction: After ally's action roll, before consequences · Ally rerolls Duality Dice · Once per rest",
    text: "Once per rest, after an ally attempts an action roll but before the consequences take place, you can offer assistance or words of support. When you do, your ally can reroll their dice."
  },
  // Level 2
  {
    level: 2, name: "Final Words", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll (13) · Infuse corpse with life · Hope: 3 questions · Fear: 1 question · Failure or done: body turns to dust",
    text: "You can infuse a corpse with a moment of life to speak with it. Make a Spellcast Roll (13). On a success with Hope, the corpse answers up to three questions. On a success with Fear, the corpse answers one question. The corpse answers truthfully, but it can't impart information it didn't know in life. On a failure, or once the corpse has finished answering your questions, the body turns to dust."
  },
  {
    level: 2, name: "Healing Hands", type: "Spell", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Spellcast Roll (13) · Melee (other creature) · Success + Stress: clear 2 HP or 2 Stress · Failure + Stress: clear 1 HP or 1 Stress · Once per long rest per target",
    text: "Make a Spellcast Roll (13) and target a creature other than yourself within Melee range. On a success, mark a Stress to clear 2 Hit Points or 2 Stress on the target. On a failure, mark a Stress to clear a Hit Point or a Stress on the target. You can't heal the same target again until your next long rest."
  },
  // Level 3
  {
    level: 3, name: "Second Wind", type: "Ability", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Once per rest · Succeed on attack → clear 3 Stress or 1 HP · Hope success: also clear 3 Stress or 1 HP on Close ally",
    text: "Once per rest, when you succeed on an attack against an adversary, you can clear 3 Stress or a Hit Point. On a success with Hope, you also clear 3 Stress or a Hit Point on an ally within Close range of you."
  },
  {
    level: 3, name: "Voice of Reason", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    summary: "Passive: Advantage on rolls to de-escalate violence or lead others · All Stress marked: +1 Proficiency to damage rolls",
    text: "You speak with an unmatched power and authority. You have advantage on action rolls to de-escalate violent situations or convince someone to follow your lead.\nAdditionally, you're emboldened in moments of duress. When all of your Stress slots are marked, you gain a +1 bonus to your Proficiency for damage rolls."
  },
  // Level 4
  {
    level: 4, name: "Divination", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 3 },
    passive: false,
    summary: "Once per long rest · 3 Hope → ask one yes/no question about near-future event, person, place, or situation",
    text: "Once per long rest, spend 3 Hope to reach out to the forces beyond and ask one \"yes or no\" question about an event, person, place, or situation in the near future. For a moment, the present falls away and you see the answer before you."
  },
  {
    level: 4, name: "Life Ward", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 3 },
    passive: false,
    summary: "3 Hope · Close ally marked with glowing sigil · Next death move: clear HP instead · Ends on save, recast, or long rest",
    text: "Spend 3 Hope and choose an ally within Close range. They are marked with a glowing sigil of protection. When this ally would make a death move, they clear a Hit Point instead.\nThis effect ends when it saves the target from a death move, you cast Life Ward on another target, or you take a long rest."
  },
  // Level 5
  {
    level: 5, name: "Shape Material", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "1 Hope · Touch natural material (stone/ice/wood) · Shape area up to your size · Affects material within Close of touch point",
    text: "Spend a Hope to shape a section of natural material you're touching (such as stone, ice, or wood) to suit your purpose. The area of the material can be no larger than you. For example, you can form a rudimentary tool or create a door.\nYou can only affect the material within Close range of where you're touching it."
  },
  {
    level: 5, name: "Smite", type: "Spell", recallCost: 2,
    cost: { type: "hope", amount: 3 },
    passive: false,
    summary: "Once per rest · 3 Hope → charge smite · Next successful weapon attack: double damage roll · Deals magic damage regardless of weapon type",
    text: "Once per rest, spend 3 Hope to charge your powerful smite. When you next successfully attack with a weapon, double the result of your damage roll. This attack deals magic damage regardless of the weapon's damage type."
  },
];
