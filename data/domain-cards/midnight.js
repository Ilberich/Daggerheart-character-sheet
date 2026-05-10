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
  // Level 6
  {
    level: 6, name: "Dark Whispers", type: "Spell", recallCost: 0,
    cost: null,
    passive: false,
    text: "You can speak into the mind of any person with whom you've made physical contact. Once you've opened a channel with them, they can speak back into your mind. Additionally, you can mark a Stress to make a Spellcast Roll against them. On a success, you can ask the GM one of the following questions and receive an answer:\n• Where are they?\n• What are they doing?\n• What are they afraid of?\n• What do they cherish most in the world?",
    abilities: [
      {
        name: "Dark Whispers",
        passive: false,
        summary: "Passive ability: Telepathic link with any previously touched person · They can speak back",
        text: "You can speak into the mind of any person with whom you've made physical contact. Once you've opened a channel with them, they can speak back into your mind.",
      },
      {
        name: "Mind Probe",
        passive: false,
        cost: { type: "stress", amount: 1 },
        summary: "Mark Stress · Spellcast Roll vs linked target · On success: ask GM one question — location, actions, fears, or what they cherish",
        text: "Mark a Stress to make a Spellcast Roll against a linked target. On a success, ask the GM one question:\n• Where are they?\n• What are they doing?\n• What are they afraid of?\n• What do they cherish most in the world?",
      },
    ],
  },
  {
    level: 6, name: "Mass Disguise", type: "Spell", recallCost: 0,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Few minutes of silence · Mark Stress · Change appearance of all willing Close creatures · Advantage on scrutiny rolls · Countdown (8) — when triggered, disguise drops",
    text: "When you have a few minutes of silence to focus, you can mark a Stress to change the appearance of all willing creatures within Close range. Their new forms must share a general body structure and size, and can be somebody or something you've seen before or entirely fabricated. A disguised creature has advantage on Presence Rolls to avoid scrutiny.\nActivate a Countdown (8). It ticks down as a consequence the GM chooses. When it triggers, the disguise drops."
  },
  // Level 7
  {
    level: 7, name: "Midnight-Touched", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    text: "When 4 or more of the domain cards in your loadout are from the Midnight domain, gain the following benefits:\n• Once per rest, when you have 0 Hope and the GM would gain a Fear, you can gain a Hope instead.\n• When you make a successful attack, you can mark a Stress to add the result of your Fear Die to your damage roll.",
    abilities: [
      {
        name: "Midnight-Touched",
        passive: true,
        uses: { recharge: "rest", amount: 1 },
        summary: "Passive: 4+ Midnight cards · Once per rest: 0 Hope + GM gains Fear → gain Hope instead",
        text: "When 4 or more of the domain cards in your loadout are from the Midnight domain, once per rest when you have 0 Hope and the GM would gain a Fear, you can gain a Hope instead.",
      },
      {
        name: "Fear Harvest",
        passive: false,
        cost: { type: "stress", amount: 1 },
        summary: "4+ Midnight cards · Successful attack · Mark Stress → add Fear Die result to damage roll",
        text: "When 4 or more of the domain cards in your loadout are from the Midnight domain and you make a successful attack, you can mark a Stress to add the result of your Fear Die to your damage roll.",
      },
    ],
  },
  {
    level: 7, name: "Vanishing Dodge", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Physical damage attack against you fails · 1 Hope → become Hidden + teleport within Close of attacker · Hidden until next action roll",
    text: "When an attack made against you that would deal physical damage fails, you can spend a Hope to envelop yourself in shadow, becoming Hidden and teleporting to a point within Close range of the attacker. You remain Hidden until the next time you make an action roll."
  },
  // Level 8
  {
    level: 8, name: "Shadowhunter", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    summary: "Passive: In low light or darkness → +1 Evasion · Attack rolls with advantage",
    text: "Your prowess is enhanced under the cover of shadow. While you're shrouded in low light or darkness, you gain a +1 bonus to your Evasion and make attack rolls with advantage."
  },
  {
    level: 8, name: "Spellcharge", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Take magic damage · Place tokens = HP marked (max = Spellcast) · Successful attack · Spend tokens → +d6 per token to damage",
    text: "When you take magic damage, place tokens equal to the number of Hit Points you marked on this card. You can store a number of tokens equal to your Spellcast trait.\nWhen you make a successful attack against a target, you can spend any number of tokens to add a d6 for each token spent to your damage roll."
  },
  // Level 9
  {
    level: 9, name: "Night Terror", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Very Close targets · Reaction Roll (16) · Fail: Horrified + Vulnerable · Steal Fear = Horrified targets · Roll d6 per Fear · Deal total to each Horrified target",
    text: "Once per long rest, choose any targets within Very Close range to perceive you as a nightmarish horror. The targets must succeed on a Reaction Roll (16) or become temporarily Horrified. While Horrified, they're Vulnerable. Steal a number of Fear from the GM equal to the number of targets that are Horrified (up to the number of Fear in the GM's pool). Roll a number of d6s equal to the number of stolen Fear and deal the total damage to each Horrified target. Discard the stolen Fear."
  },
  // Level 10
  {
    level: 10, name: "Eclipse", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Spellcast Roll (16) · Once per long rest · Far area plunged into darkness only you + allies see · Attacks vs you/allies: disadvantage · Hope success vs shadow adversary: they mark Stress · Ends on GM Fear spend or Severe damage",
    text: "Make a Spellcast Roll (16). Once per long rest on a success, plunge the entire area within Far range into complete darkness only you and your allies can see through. Attack rolls have disadvantage when targeting you or an ally within this shadow.\nAdditionally, when you or an ally succeeds with Hope against an adversary within this shadow, the target must mark a Stress.\nThis spell lasts until the GM spends a Fear on their turn to clear this effect or you take Severe damage."
  },
  {
    level: 10, name: "Specter of the Dark", type: "Spell", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Mark Stress → Spectral until next action roll targeting a creature · Immune to physical damage · Float and pass through solid objects · Still visible to others",
    text: "Mark a Stress to become Spectral until you make an action roll targeting another creature. While Spectral, you're immune to physical damage and can float and pass through solid objects. Other creatures can still see you while you're in this form."
  },
  {
    level: 9, name: "Twilight Toll", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Choose Far target · Succeed on non-damage rolls vs them: place token · Deal damage: spend tokens → +d12 per token · One target at a time · Clear on new target or rest",
    text: "Choose a target within Far range. When you succeed on an action roll against them that doesn't result in making a damage roll, place a token on this card. When you deal damage to this target, spend any number of tokens to add a d12 for each token spent to your damage roll. You can only hold Twilight Toll on one creature at a time.\nWhen you choose a new target or take a rest, clear all unspent tokens."
  },
];
