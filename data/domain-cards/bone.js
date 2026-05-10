export const Bone = [
  {
    level: 1, name: "Deft Maneuvers", type: "Ability", recallCost: 0,
    cost: { type: "stress", amount: 1 },
    passive: false,
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
    statEffects: [{ stat: "evasion", amount: { of: "agility", multiply: 0.5, round: "up" } }],
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
    passive: true,
    text: "When you Help an Ally, they can spend a Hope to add one of your Experiences to their roll alongside your advantage die.\nWhen making a Tag Team Roll, you can roll a d20 as your Hope Die.",
    abilities: [
      {
        name: "Tactical Assistance",
        passive: true,
        summary: "Passive: Help an Ally → they can spend Hope to add one of your Experiences to their roll",
        text: "When you Help an Ally, they can spend a Hope to add one of your Experiences to their roll alongside your advantage die.",
      },
      {
        name: "Tag Team Expert",
        passive: true,
        summary: "Passive: When making a Tag Team Roll → roll d20 as your Hope Die",
        text: "When making a Tag Team Roll, you can roll a d20 as your Hope Die.",
      },
    ],
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
    passive: false,
    text: "When observing a creature, you can make an Instinct Roll against them. On a success, spend a Hope and ask the GM for one set of information about the target from the following options:\n• Their unmarked Hit Points and Stress.\n• Their Difficulty and damage thresholds.\n• Their tactics and standard attack damage dice.\n• Their features and Experiences.\nAdditionally on a success, you can mark a Stress to remove a Fear from the GM's Fear Pool.",
    abilities: [
      {
        name: "Know Thy Enemy",
        passive: false,
        cost: { type: "hope", amount: 1 },
        uses: { recharge: "rest", amount: 1 },
        summary: "Observe creature · Instinct Roll vs target · On success: 1 Hope → ask GM one info set: HP/Stress, Difficulty/thresholds, tactics/damage, or features",
        text: "When observing a creature, you can make an Instinct Roll against them. On a success, spend a Hope and ask the GM for one set of information about the target:\n• Their unmarked Hit Points and Stress.\n• Their Difficulty and damage thresholds.\n• Their tactics and standard attack damage dice.\n• Their features and Experiences.",
      },
      {
        name: "Tactical Advantage",
        passive: false,
        cost: { type: "stress", amount: 1 },
        summary: "On successful Know Thy Enemy · Mark Stress → remove a Fear from GM's Fear Pool",
        text: "Additionally on a success with Know Thy Enemy, you can mark a Stress to remove a Fear from the GM's Fear Pool.",
      },
    ],
  },
  {
    level: 5, name: "Signature Move", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Name and describe your move · Once per rest · Perform it as part of an action → roll d20 as Hope Die · On success: clear a Stress",
    text: "Name and describe your signature combat move. Once per rest, when you perform this signature move as part of an action you're taking, you can roll a d20 as your Hope Die. On a success, clear a Stress."
  },
  // Level 6
  {
    level: 6, name: "Rapid Riposte", type: "Ability", recallCost: 0,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Melee attack against you fails · Mark Stress → immediately deal one active weapon's damage to attacker",
    text: "When an attack made against you from within Melee range fails, you can mark a Stress and seize the opportunity to deal the weapon damage of one of your active weapons to the attacker."
  },
  {
    level: 6, name: "Recovery", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    text: "During a short rest, you can choose a long rest downtime move instead. You can spend a Hope to let an ally do the same.",
    abilities: [
      {
        name: "Recovery",
        passive: false,
        summary: "During short rest · Choose a long rest downtime move instead",
        text: "During a short rest, you can choose a long rest downtime move instead.",
      },
      {
        name: "Share Recovery",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "During short rest · 1 Hope → ally also chooses a long rest downtime move",
        text: "You can spend a Hope to let an ally also choose a long rest downtime move during a short rest.",
      },
    ],
  },
  // Level 7
  {
    level: 7, name: "Bone-Touched", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    text: "When 4 or more of the domain cards in your loadout are from the Bone domain, gain the following benefits:\n• +1 bonus to Agility\n• Once per rest, you can spend 3 Hope to cause an attack that succeeded against you to fail instead.",
    abilities: [
      {
        name: "Bone-Touched",
        passive: true,
        summary: "Passive: 4+ Bone cards in loadout → +1 Agility",
        text: "When 4 or more of the domain cards in your loadout are from the Bone domain, gain a +1 bonus to Agility.",
      },
      {
        name: "Deflect",
        passive: false,
        cost: { type: "hope", amount: 3 },
        uses: { recharge: "rest", amount: 1 },
        summary: "Once per rest · 3 Hope → cause a successful attack against you to fail instead",
        text: "Once per rest, you can spend 3 Hope to cause an attack that succeeded against you to fail instead.",
      },
    ],
  },
  {
    level: 7, name: "Cruel Precision", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    summary: "Passive: Successful weapon attack → add Finesse or Agility to damage roll",
    text: "When you make a successful attack with a weapon, gain a bonus to your damage roll equal to either your Finesse or Agility."
  },
  // Level 8
  {
    level: 8, name: "Breaking Blow", type: "Ability", recallCost: 3,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Successful attack · Mark Stress → next successful attack against same target deals +2d12 damage",
    text: "When you make a successful attack, you can mark a Stress to make the next successful attack against that same target deal an extra 2d12 damage."
  },
  {
    level: 8, name: "Wrangle", type: "Ability", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Agility Roll · Close (all targets) · 1 Hope → move succeeded targets + willing Close allies to another Close point",
    text: "Make an Agility Roll against all targets within Close range. Spend a Hope to move targets you succeed against, and any willing allies within Close range, to another point within Close range."
  },
  // Level 9
  {
    level: 9, name: "On the Brink", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    summary: "Passive: 2 or fewer HP unmarked → don't take Minor damage",
    text: "When you have 2 or fewer Hit Points unmarked, you don't take Minor damage."
  },
  {
    level: 9, name: "Splintering Strike", type: "Ability", recallCost: 3,
    cost: { type: "hope", amount: 1 },
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "1 Hope · Attack all adversaries within weapon range · Once per long rest on success: roll weapon damage, distribute freely + roll extra damage die per target",
    text: "Spend a Hope and make an attack against all adversaries within your weapon's range. Once per long rest, on a success against any targets, roll your weapon's damage and distribute that damage however you wish between the targets you succeeded against. Before you deal damage to each target, roll an additional damage die and add its result to the damage you deal to them."
  },
  // Level 10
  {
    level: 10, name: "Deathrun", type: "Ability", recallCost: 1,
    cost: { type: "hope", amount: 3 },
    passive: false,
    summary: "3 Hope · Sprint to Far in straight line · Attack all adversaries in weapon range along path · First: +1 Proficiency · Each subsequent: remove one damage die · Continue until no dice or targets remain",
    text: "Spend 3 Hope to run a straight path through the battlefield to a point within Far range, making an attack against all adversaries within your weapon's range along that path. Choose the order in which you deal damage to the targets you succeeded against. For the first, roll your weapon damage with a +1 bonus to your Proficiency. Then remove a die from your damage roll and deal the remaining damage to the next target. Continue to remove a die for each subsequent target until you have no more damage dice or adversaries.\nYou can't target the same adversary more than once per attack."
  },
  {
    level: 10, name: "Swift Step", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    summary: "Passive: When an attack against you fails → clear a Stress · If no Stress to clear: gain a Hope instead",
    text: "When an attack made against you fails, clear a Stress. If you can't clear a Stress, gain a Hope."
  },
];
