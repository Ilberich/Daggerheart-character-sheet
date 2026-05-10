export const Valor = [
  {
    level: 1, name: "Bare Bones", type: "Ability", recallCost: 0,
    cost: null,
    passive: true,
    statEffects: [
      { stat: "thresholds", type: "override", condition: "unarmored" },
      { stat: "armorScore", amount: "3+strength", condition: "unarmored" },
    ],
    summary: "Passive: Unarmored → Armor = 3+STR · Thresholds: T1 9/19 · T2 11/24 · T3 13/31 · T4 15/38",
    text: "When you choose not to equip armor, you have a base Armor Score of 3 + your Strength and use the following as your base damage thresholds:\n• Tier 1: 9/19\n• Tier 2: 11/24\n• Tier 3: 13/31\n• Tier 4: 15/38"
  },
  {
    level: 1, name: "Forceful Push", type: "Ability", recallCost: 0,
    cost: null, optionalCost: { type: "hope", amount: 1, label: "Make Vulnerable" },
    passive: false,
    summary: "Attack Roll · Melee · Weapon damage (+d6 on Hope) · Knockback to Close · Optional: 1 Hope → Vulnerable",
    text: "Make an attack with your primary weapon against a target within Melee range. On a success, you deal damage and knock them back to Close range. On a success with Hope, add a d6 to your damage roll.\nAdditionally, you can spend a Hope to make them temporarily Vulnerable."
  },
  {
    level: 1, name: "I Am Your Shield", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: true,
    summary: "Reaction: Ally within Very Close takes damage · 1 Stress → redirect attack to self · Can mark Armor Slots",
    text: "When an ally within Very Close range would take damage, you can mark a Stress to stand in the way and make yourself the target of the attack instead. When you take damage from this attack, you can mark any number of Armor Slots."
  },
  // Level 2
  {
    level: 2, name: "Body Basher", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Passive: On successful Melee weapon attack → +Strength to damage roll",
    text: "You use the full force of your body in a fight. On a successful attack using a weapon with a Melee range, gain a bonus to your damage roll equal to your Strength."
  },
  {
    level: 2, name: "Bold Presence", type: "Ability", recallCost: 0,
    passive: false,
    text: "When you make a Presence Roll, you can spend a Hope to add your Strength to the roll.\nAdditionally, once per rest when you would gain a condition, you can describe how your bold presence aids you in the situation and avoid gaining the condition.",
    abilities: [
      {
        name: "Bold Presence",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "On a Presence Roll · 1 Hope → add Strength to the roll",
        text: "When you make a Presence Roll, you can spend a Hope to add your Strength to the roll.",
      },
      {
        name: "Imposing Figure",
        passive: false,
        uses: { recharge: "rest", amount: 1 },
        summary: "Once per rest · Would gain a condition · Describe your bold presence → avoid the condition entirely",
        text: "Once per rest when you would gain a condition, you can describe how your bold presence aids you in the situation and avoid gaining the condition.",
      },
    ],
  },
  // Level 3
  {
    level: 3, name: "Critical Inspiration", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Once per rest · Critical success on attack → all Very Close allies can clear Stress or gain Hope",
    text: "Once per rest, when you critically succeed on an attack, all allies within Very Close range can clear a Stress or gain a Hope."
  },
  {
    level: 3, name: "Lean On Me", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Once per long rest · Console/inspire ally who failed a roll → both clear 2 Stress",
    text: "Once per long rest, when you console or inspire an ally who failed an action roll, you can both clear 2 Stress."
  },
  // Level 4
  {
    level: 4, name: "Goad Them On", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Taunt target within Close · Presence Roll · On success: mark Stress + next GM spotlight they must attack you with disadvantage",
    text: "Describe how you taunt a target within Close range, then make a Presence Roll against them. On a success, the target must mark a Stress, and the next time the GM spotlights them, they must target you with an attack, which they make with disadvantage."
  },
  {
    level: 4, name: "Support Tank", type: "Ability", recallCost: 2,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "Close ally fails a roll · 2 Hope → ally rerolls Hope or Fear Die",
    text: "When an ally within Close range fails a roll, you can spend 2 Hope to allow them to reroll either their Hope or Fear Die."
  },
  // Level 5
  {
    level: 5, name: "Armorer", type: "Ability", recallCost: 1,
    passive: true,
    text: "While you're wearing armor, gain a +1 bonus to your Armor Score.\nDuring a rest, when you choose to repair your armor as a downtime move, your allies also clear an Armor Slot.",
    abilities: [
      {
        name: "Armorer",
        passive: true,
        statEffects: [{ stat: "armorScore", amount: 1, condition: "armored" }],
        summary: "Passive: While wearing armor → +1 Armor Score",
        text: "While you're wearing armor, gain a +1 bonus to your Armor Score.",
      },
      {
        name: "Rally the Troops",
        passive: true,
        summary: "Passive: During rest, repair armor downtime move → allies also clear an Armor Slot",
        text: "During a rest, when you choose to repair your armor as a downtime move, your allies also clear an Armor Slot.",
      },
    ],
  },
  {
    level: 5, name: "Rousing Strike", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Once per rest · Critical success on attack → you + all allies who see or hear you clear 1 HP or 1d4 Stress",
    text: "Once per rest, when you critically succeed on an attack, you and all allies who can see or hear you can clear a Hit Point or 1d4 Stress."
  },
  // Level 6
  {
    level: 6, name: "Inevitable", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    summary: "Passive: When you fail an action roll → next action roll has advantage",
    text: "When you fail an action roll, your next action roll has advantage."
  },
  {
    level: 6, name: "Rise Up", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    text: "Gain a bonus to your Severe threshold equal to your Proficiency.\nWhen you mark 1 or more Hit Points from an attack, clear a Stress.",
    statEffects: [{ stat: "severeThreshold", amount: "proficiency" }],
    abilities: [
      {
        name: "Rise Up",
        passive: true,
        statEffects: [{ stat: "severeThreshold", amount: "proficiency" }],
        summary: "Passive: +Proficiency to Severe damage threshold",
        text: "Gain a bonus to your Severe threshold equal to your Proficiency.",
      },
      {
        name: "Resilient",
        passive: true,
        summary: "Passive: Mark 1+ HP from an attack → clear a Stress",
        text: "When you mark 1 or more Hit Points from an attack, clear a Stress.",
      },
    ],
  },
  // Level 7
  {
    level: 7, name: "Shrug It Off", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Would take damage · Mark Stress → reduce severity by one threshold · Roll d6 · On 3 or lower: card goes to vault",
    text: "When you would take damage, you can mark a Stress to reduce the severity of the damage by one threshold. When you do, roll a d6. On a result of 3 or lower, place this card in your vault."
  },
  {
    level: 7, name: "Valor-Touched", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    statEffects: [{ stat: "armorScore", amount: 1 }],
    text: "When 4 or more of the domain cards in your loadout are from the Valor domain, gain the following benefits:\n• +1 bonus to your Armor Score\n• When you mark 1 or more Hit Points without marking an Armor Slot, clear an Armor Slot.",
    abilities: [
      {
        name: "Valor-Touched",
        passive: true,
        statEffects: [{ stat: "armorScore", amount: 1 }],
        summary: "Passive: 4+ Valor cards in loadout → +1 Armor Score",
        text: "When 4 or more of the domain cards in your loadout are from the Valor domain, gain a +1 bonus to your Armor Score.",
      },
      {
        name: "Iron Body",
        passive: true,
        summary: "Passive: 4+ Valor cards · Mark 1+ HP without marking Armor Slot → clear an Armor Slot",
        text: "When 4 or more of the domain cards in your loadout are from the Valor domain and you mark 1 or more Hit Points without marking an Armor Slot, clear an Armor Slot.",
      },
    ],
  },
  // Level 8
  {
    level: 8, name: "Full Surge", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 3 },
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Mark 3 Stress → +2 to all character traits until next rest",
    text: "Once per long rest, mark 3 Stress to push your body to its limits. Gain a +2 bonus to all of your character traits until your next rest."
  },
  {
    level: 8, name: "Ground Pound", type: "Ability", recallCost: 2,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "2 Hope · Strength Roll · Very Close (all) · Knockback to Far + Reaction Roll (17) · Fail: 4d10+8 damage · Pass: half",
    text: "Spend 2 Hope to strike the ground where you stand and make a Strength Roll against all targets within Very Close range. Targets you succeed against are thrown back to Far range and must make a Reaction Roll (17). Targets who fail take 4d10+8 damage. Targets who succeed take half damage."
  },
  // Level 9
  {
    level: 9, name: "Hold the Line", type: "Ability", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Describe stance · 1 Hope · Adversary moves within Very Close: pulled to Melee + Restrained · Ends on your move, Fear roll failure, or GM spends 2 Fear",
    text: "Describe the defensive stance you take and spend a Hope. If an adversary moves within Very Close range, they're pulled into Melee range and Restrained.\nThis condition lasts until you move or fail a roll with Fear, or the GM spends 2 Fear on their turn to clear it."
  },
  {
    level: 9, name: "Lead by Example", type: "Ability", recallCost: 3,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Deal damage · Mark Stress + describe encouragement → next PC to attack same adversary: clear Stress or gain Hope",
    text: "When you deal damage to an adversary, you can mark a Stress and describe how you encourage your allies. The next PC to make an attack against that adversary can clear a Stress or gain a Hope."
  },
  // Level 10
  {
    level: 10, name: "Unbreakable", type: "Ability", recallCost: 4,
    cost: null,
    passive: false,
    summary: "Mark last HP · Instead of death move → roll d6, clear HP equal to result · Card vaulted permanently",
    text: "When you mark your last Hit Point, instead of making a death move, you can roll a d6 and clear a number of Hit Points equal to the result. Then place this card in your vault."
  },
  {
    level: 10, name: "Unyielding Armor", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Reaction: Would mark Armor Slot · Roll Proficiency d6s · Any 6: reduce severity by one threshold without marking an Armor Slot",
    text: "When you would mark an Armor Slot, roll a number of d6s equal to your Proficiency. If any roll a 6, reduce the severity by one threshold without marking an Armor Slot."
  },
];
