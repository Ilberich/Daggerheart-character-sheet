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
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Presence Roll · 1 Hope → +Strength to roll · Once per rest: describe bold presence → avoid gaining a condition",
    text: "When you make a Presence Roll, you can spend a Hope to add your Strength to the roll.\nAdditionally, once per rest when you would gain a condition, you can describe how your bold presence aids you in the situation and avoid gaining the condition."
  },
  // Level 3
  {
    level: 3, name: "Critical Inspiration", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Once per rest · Critical success on attack → all Very Close allies can clear Stress or gain Hope",
    text: "Once per rest, when you critically succeed on an attack, all allies within Very Close range can clear a Stress or gain a Hope."
  },
  {
    level: 3, name: "Lean On Me", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
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
    cost: null,
    passive: true,
    statEffects: [{ stat: "armorScore", amount: 1, condition: "armored" }],
    summary: "Passive: While wearing armor → +1 Armor Score · During rest, repair armor downtime move → allies also clear an Armor Slot",
    text: "While you're wearing armor, gain a +1 bonus to your Armor Score.\nDuring a rest, when you choose to repair your armor as a downtime move, your allies also clear an Armor Slot."
  },
  {
    level: 5, name: "Rousing Strike", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Once per rest · Critical success on attack → you + all allies who see or hear you clear 1 HP or 1d4 Stress",
    text: "Once per rest, when you critically succeed on an attack, you and all allies who can see or hear you can clear a Hit Point or 1d4 Stress."
  },
];
