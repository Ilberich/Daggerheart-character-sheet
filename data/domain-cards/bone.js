export const Bone = [
  {
    level: 1, name: "Deft Maneuvers", type: "Ability", recallCost: 0,
    cost: { type: "stress", amount: 1 },
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "1 Stress · Once per rest · Sprint to Far (no Agility Roll) · +1 attack if immediately attack from Melee",
    text: "Once per rest, mark a Stress to sprint anywhere within Far range without making an Agility Roll to get there.\nIf you end this movement within Melee range of an adversary and immediately make an attack against them, gain a +1 bonus to the attack roll."
  },
  {
    level: 1, name: "I See It Coming", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: true,
    summary: "Reaction: Ranged attack incoming · 1 Stress → roll d4, add to Evasion vs that attack",
    text: "When you're targeted by an attack made from beyond Melee range, you can mark a Stress to roll a d4 and gain a bonus to your Evasion equal to the result against the attack."
  },
  {
    level: 1, name: "Untouchable", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    statEffects: [{ stat: "evasion", amount: "halfAgility" }],
    summary: "Passive: +½ Agility to Evasion (permanent)",
    text: "Gain a bonus to your Evasion equal to half your Agility."
  },
  // Level 2
  {
    level: 2, name: "Ferocity", type: "Ability", recallCost: 2,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "Cause adversary to mark HP · 2 Hope → +Evasion equal to HP marked · Lasts until next attack against you",
    text: "When you cause an adversary to mark 1 or more Hit Points, you can spend 2 Hope to increase your Evasion by the number of Hit Points they marked. This bonus lasts until after the next attack made against you."
  },
  {
    level: 2, name: "Strategic Approach", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Tokens = Knowledge (on long rest) · Move within Close + attack → spend token: advantage on attack, ally clears Stress, or +d8 damage",
    text: "After a long rest, place a number of tokens equal to your Knowledge on this card (minimum 1). The first time you move within Close range of an adversary and make an attack against them, you can spend one token to choose one of the following options:\n• You make the attack with advantage.\n• You clear a Stress on an ally within Melee range of the adversary.\n• You add a d8 to your damage roll.\nWhen you take a long rest, clear all unspent tokens."
  },
  // Level 3
  {
    level: 3, name: "Brace", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "When marking Armor Slot to reduce damage · Mark Stress → mark an additional Armor Slot",
    text: "When you mark an Armor Slot to reduce incoming damage, you can mark a Stress to mark an additional Armor Slot."
  },
  {
    level: 3, name: "Tactician", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    summary: "Passive: Help an Ally → they can spend Hope to add one of your Experiences to roll · Tag Team Roll: roll d20 as Hope Die",
    text: "When you Help an Ally, they can spend a Hope to add one of your Experiences to their roll alongside your advantage die.\nWhen making a Tag Team Roll, you can roll a d20 as your Hope Die."
  },
  // Level 4
  {
    level: 4, name: "Boost", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "1 Stress · Boost off willing Close ally → aerial attack vs Far target · Advantage · +d10 damage · Land within Melee of target",
    text: "Mark a Stress to boost off a willing ally within Close range, fling yourself into the air, and perform an aerial attack against a target within Far range. You have advantage on the attack, add a d10 to the damage roll, and end your move within Melee range of the target."
  },
  {
    level: 4, name: "Redirect", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Ranged attack against you fails · Roll Proficiency d6s · On any 6: Mark Stress → redirect damage to Very Close adversary",
    text: "When an attack made against you from beyond Melee range fails, roll a number of d6s equal to your Proficiency. If any roll a 6, you can mark a Stress to redirect the attack to damage an adversary within Very Close range instead."
  },
  // Level 5
  {
    level: 5, name: "Know Thy Enemy", type: "Ability", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Observe creature · Instinct Roll vs target · On success: 1 Hope → choose one info set: HP/Stress, Difficulty/thresholds, tactics/damage, or features · Also: Mark Stress → remove a GM Fear",
    text: "When observing a creature, you can make an Instinct Roll against them. On a success, spend a Hope and ask the GM for one set of information about the target from the following options:\n• Their unmarked Hit Points and Stress.\n• Their Difficulty and damage thresholds.\n• Their tactics and standard attack damage dice.\n• Their features and Experiences.\nAdditionally on a success, you can mark a Stress to remove a Fear from the GM's Fear Pool."
  },
  {
    level: 5, name: "Signature Move", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Name and describe your move · Once per rest · Perform it as part of an action → roll d20 as Hope Die · On success: clear a Stress",
    text: "Name and describe your signature combat move. Once per rest, when you perform this signature move as part of an action you're taking, you can roll a d20 as your Hope Die. On a success, clear a Stress."
  },
];
