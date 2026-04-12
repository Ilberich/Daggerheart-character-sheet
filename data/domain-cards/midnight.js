export const Midnight = [
  {
    level: 1, name: "Pick and Pull", type: "Ability", recallCost: 0,
    cost: null,
    passive: true,
    summary: "Passive: Advantage on rolls to pick locks, disarm traps, or steal",
    text: "You have advantage on action rolls to pick nonmagical locks, disarm nonmagical traps, or steal items from a target (either through stealth or by force)."
  },
  {
    level: 1, name: "Rain of Blades", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "1 Hope · Spellcast Roll · Very Close (all targets) · d8+2 magic · Vulnerable targets: +1d8",
    text: "Spend a Hope to make a Spellcast Roll and conjure throwing blades that strike out at all targets within Very Close range. Targets you succeed against take d8+2 magic damage using your Proficiency.\nIf a target you hit is Vulnerable, they take an extra 1d8 damage."
  },
  {
    level: 1, name: "Uncanny Disguise", type: "Spell", recallCost: 0,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "1 Stress · Disguise as any humanoid · Tokens = Spellcast · Each action costs 1 token · Advantage vs scrutiny",
    text: "When you have a few minutes to prepare, you can mark a Stress to don the facade of any humanoid you can picture clearly in your mind. While disguised, you have advantage on Presence Rolls to avoid scrutiny.\nPlace a number of tokens equal to your Spellcast trait on this card. When you take an action while disguised, spend a token from this card. After the action that spends the last token is resolved, the disguise drops."
  },
  // Level 2
  {
    level: 2, name: "Midnight Spirit", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "1 Hope · Summon spirit until next rest · Attack: Spellcast Roll · Very Far · Spellcast d6s magic · Spirit dissipates · One at a time",
    text: "Spend a Hope to summon a humanoid-sized spirit that can move or carry things for you until your next rest.\nYou can also send it to attack an adversary. When you do, make a Spellcast Roll against a target within Very Far range. On a success, the spirit moves into Melee range with that target. Roll a number of d6s equal to your Spellcast trait and deal that much magic damage to the target. The spirit then dissipates. You can only have one spirit at a time."
  },
  {
    level: 2, name: "Shadowbind", type: "Spell", recallCost: 0,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Very Close (all targets) · Restrained (shadow binds them in place)",
    text: "Make a Spellcast Roll against all adversaries within Very Close range. Targets you succeed against are temporarily Restrained as their shadow binds them in place."
  },
  // Level 3
  {
    level: 3, name: "Chokehold", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Position behind similar-sized creature · 1 Stress → Vulnerable · Attacks on Vulnerable target: +2d6 damage",
    text: "When you position yourself behind a creature who's about your size, you can mark a Stress to pull them into a chokehold, making them temporarily Vulnerable.\nWhen a creature attacks a target who is Vulnerable in this way, they deal an extra 2d6 damage."
  },
  {
    level: 3, name: "Veil of Night", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll (13) · Curtain of darkness between two Far points · Only you see through it · Hidden to adversaries beyond · Advantage on attacks through darkness · Lasts until next spell",
    text: "Make a Spellcast Roll (13). On a success, you can create a temporary curtain of darkness between two points within Far range. Only you can see through this darkness. You're considered Hidden to adversaries on the other side of the veil, and you have advantage on attacks you make through the darkness. The veil remains until you cast another spell."
  },
  // Level 4
  {
    level: 4, name: "Stealth Expertise", type: "Ability", recallCost: 0,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Roll Fear while moving unnoticed · 1 Stress → roll Hope instead · Close ally also rolling Fear: 1 Stress → change their result to Hope",
    text: "When you roll with Fear while attempting to move unnoticed through a dangerous area, you can mark a Stress to roll with Hope instead.\nIf an ally within Close range is also attempting to move unnoticed and rolls with Fear, you can mark a Stress to change their result to a roll with Hope."
  },
  {
    level: 4, name: "Glyph of Nightfall", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Spellcast Roll · Very Close · 1 Hope → dark glyph on target · Temporarily reduces target's Difficulty by Knowledge (min 1)",
    text: "Make a Spellcast Roll against a target within Very Close range. On a success, spend a Hope to conjure a dark glyph upon their body that exposes their weak points, temporarily reducing the target's Difficulty by a value equal to your Knowledge (minimum 1)."
  },
  // Level 5
  {
    level: 5, name: "Hush", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Spellcast Roll · Close · 1 Hope → Silenced aura on target, encompasses Very Close area, follows them · Silenced: no noise or spells · Ends on GM Fear spend, recast, or you take Major damage",
    text: "Make a Spellcast Roll against a target within Close range. On a success, spend a Hope to conjure suppressive magic around the target that encompasses everything within Very Close range of them and follows them as they move.\nThe target and anything within the area is Silenced until the GM spends a Fear on their turn to clear this condition, you cast Hush again, or you take Major damage. While Silenced, they can't make noise and can't cast spells."
  },
  {
    level: 5, name: "Phantom Retreat", type: "Spell", recallCost: 2,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "1 Hope → mark current location · Later before next rest: 1 Hope → teleport back to marked spot · Ends after reappearing",
    text: "Spend a Hope to activate Phantom Retreat where you're currently standing. Spend another Hope at any time before your next rest to disappear from where you are and reappear where you were standing when you activated Phantom Retreat. This spell ends after you reappear."
  },
];
