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
    passive: false,
    text: "You lay your hands upon a creature and channel healing magic to close their wounds. When you can take a few minutes to focus on the target you're helping, you can spend 2 Hope to clear a Hit Point or a Stress on them.\nOnce per long rest, when you spend this healing time learning something new about them or revealing something about yourself, you can clear 2 Hit Points or 2 Stress on them instead.",
    abilities: [
      {
        name: "Mending Touch",
        passive: false,
        cost: { type: "hope", amount: 2 },
        summary: "2 Hope · Touch · Takes a few minutes · Clear 1 HP or 1 Stress on target",
        text: "You lay your hands upon a creature and channel healing magic to close their wounds. When you can take a few minutes to focus on the target you're helping, you can spend 2 Hope to clear a Hit Point or a Stress on them.",
      },
      {
        name: "Bonding Moment",
        passive: false,
        uses: { recharge: "longRest", amount: 1 },
        summary: "Once per long rest · During Mending Touch · Learn something new or reveal yourself → clear 2 HP or 2 Stress instead",
        text: "Once per long rest, when you spend this healing time learning something new about them or revealing something about yourself, you can clear 2 Hit Points or 2 Stress on them instead.",
      },
    ],
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
    passive: true,
    text: "You speak with an unmatched power and authority. You have advantage on action rolls to de-escalate violent situations or convince someone to follow your lead.\nAdditionally, you're emboldened in moments of duress. When all of your Stress slots are marked, you gain a +1 bonus to your Proficiency for damage rolls.",
    abilities: [
      {
        name: "Voice of Reason",
        passive: true,
        summary: "Passive: Advantage on rolls to de-escalate violence or convince someone to follow your lead",
        text: "You speak with an unmatched power and authority. You have advantage on action rolls to de-escalate violent situations or convince someone to follow your lead.",
      },
      {
        name: "Emboldened",
        passive: true,
        summary: "Passive: When all Stress slots are marked → +1 Proficiency to damage rolls",
        text: "You're emboldened in moments of duress. When all of your Stress slots are marked, you gain a +1 bonus to your Proficiency for damage rolls.",
      },
    ],
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
  // Level 6
  {
    level: 6, name: "Restoration", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Tokens = Spellcast (long rest) · Touch · Spend tokens: 2 HP or 2 Stress per token · Or: spend token to clear Vulnerable or heal ailment · Clear unspent on long rest",
    text: "After a long rest, place a number of tokens equal to your Spellcast trait on this card. Touch a creature and spend any number of tokens to clear 2 Hit Points or 2 Stress for each token spent.\nYou can also spend a token from this card when touching a creature to clear the Vulnerable condition or heal a physical or magical ailment (the GM might require additional tokens depending on the strength of the ailment).\nWhen you take a long rest, clear all unspent tokens."
  },
  {
    level: 6, name: "Zone of Protection", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Spellcast Roll (16) · Once per long rest · Zone at Far point · Allies within Very Close: reduce damage by die value (d6 starts at 1) · After each reduction: increase die · Exceed 6: ends",
    text: "Make a Spellcast Roll (16). Once per long rest on a success, choose a point within Far range and create a visible zone of protection there for all allies within Very Close range of that point. When you do, place a d6 on this card with the 1 value facing up. When an ally in this zone takes damage, they reduce it by the die's value. You then increase the die's value by one. When the die's value would exceed 6, this effect ends."
  },
  // Level 7
  {
    level: 7, name: "Healing Strike", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "Deal damage to adversary · 2 Hope → clear a Hit Point on Close ally",
    text: "When you deal damage to an adversary, you can spend 2 Hope to clear a Hit Point on an ally within Close range."
  },
  {
    level: 7, name: "Splendor-Touched", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    text: "When 4 or more of the domain cards in your loadout are from the Splendor domain, gain the following benefits:\n• +3 bonus to your Severe damage threshold\n• Once per long rest, when incoming damage would require you to mark a number of Hit Points, you can choose to mark that much Stress or spend that much Hope instead.",
    abilities: [
      {
        name: "Splendor-Touched",
        passive: true,
        statEffects: [{ stat: "severeThreshold", amount: 3 }],
        summary: "Passive: 4+ Splendor cards in loadout → +3 Severe damage threshold",
        text: "When 4 or more of the domain cards in your loadout are from the Splendor domain, gain a +3 bonus to your Severe damage threshold.",
      },
      {
        name: "Divine Resilience",
        passive: false,
        uses: { recharge: "longRest", amount: 1 },
        summary: "Once per long rest (4+ Splendor) · Incoming damage would mark HP → mark Stress or spend Hope instead",
        text: "Once per long rest when 4 or more of the domain cards in your loadout are from the Splendor domain and incoming damage would require you to mark a number of Hit Points, you can choose to mark that much Stress or spend that much Hope instead.",
      },
    ],
  },
  // Level 8
  {
    level: 8, name: "Shield Aura", type: "Spell", recallCost: 2,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Mark Stress · Very Close target · When they mark Armor Slot: reduce attack severity by extra threshold · If attack deals no HP: spell ends · One target at a time",
    text: "Mark a Stress to cast a protective aura on a target within Very Close range. When the target marks an Armor Slot, they reduce the severity of the attack by an additional threshold. If this spell causes a creature who would be damaged to instead mark no Hit Points, the effect ends.\nYou can only hold Shield Aura on one creature at a time."
  },
  {
    level: 8, name: "Stunning Sunlight", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Far (all in front) · X Hope → X targets Reaction Roll (14) · Pass: 3d20+3 magic · Fail: 4d20+5 magic + Stunned",
    text: "Make a Spellcast Roll to unleash powerful rays of burning sunlight against all adversaries in front of you within Far range. On a success, spend any number of Hope and force that many targets you succeeded against to make a Reaction Roll (14). Targets who succeed take 3d20+3 magic damage. Targets who fail take 4d20+5 magic damage and are temporarily Stunned. While Stunned, they can't use reactions and can't take any other actions until they clear this condition."
  },
  // Level 9
  {
    level: 9, name: "Overwhelming Aura", type: "Spell", recallCost: 2,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "Spellcast Roll (15) · 2 Hope → Presence = Spellcast trait until next long rest · Adversary targeting you must mark Stress",
    text: "Make a Spellcast Roll (15) to magically empower your aura. On a success, spend 2 Hope to make your Presence equal to your Spellcast trait until your next long rest.\nWhile this spell is active, an adversary must mark a Stress when they target you with an attack."
  },
  {
    level: 9, name: "Salvation Beam", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Spellcast Roll (16) · Line of Far allies · Mark X Stress → clear X HP distributed among targets however you choose",
    text: "Make a Spellcast Roll (16). On a success, mark any number of Stress to target a line of allies within Far range. You can clear Hit Points on the targets equal to the number of Stress marked, divided among them however you'd like."
  },
  // Level 10
  {
    level: 10, name: "Invigoration", type: "Spell", recallCost: 3,
    cost: null,
    passive: false,
    summary: "You or Close ally used a once-per-rest/session feature · Spend X Hope → roll Xd6 · Any 6: feature can be used again",
    text: "When you or an ally within Close range has used a feature that has an exhaustion limit (such as once per rest or once per session), you can spend any number of Hope and roll that many d6s. If any roll a 6, the feature can be used again."
  },
  {
    level: 10, name: "Resurrection", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Spellcast Roll (20) · Restore creature dead ≤100 years to full strength · Roll d6: on 5 or lower → card vaulted permanently · On failure: can't cast again for a week",
    text: "Make a Spellcast Roll (20). On a success, restore one creature who has been dead no longer than 100 years to full strength. Then roll a d6. On a result of 5 or lower, place this card in your vault permanently.\nOn a failure, you can't cast Resurrection again for a week."
  },
];
