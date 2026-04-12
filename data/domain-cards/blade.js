export const Blade = [
  {
    level: 1, name: "Get Back Up", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: true,
    summary: "Reaction: On Severe damage · 1 Stress → reduce severity by one threshold",
    text: "When you take Severe damage, you can mark a Stress to reduce the severity by one threshold."
  },
  {
    level: 1, name: "Not Good Enough", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    summary: "Passive: On damage roll, reroll any 1s or 2s",
    text: "When you roll your damage dice, you can reroll any 1s or 2s."
  },
  {
    level: 1, name: "Whirlwind", type: "Ability", recallCost: 0,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "After successful attack vs Very Close · 1 Hope → attack all other Very Close targets · Additional targets: half damage",
    text: "When you make a successful attack against a target within Very Close range, you can spend a Hope to use the attack against all other targets within Very Close range. All additional adversaries you succeed against with this ability take half damage."
  },
  // Level 2
  {
    level: 2, name: "A Soldier's Bond", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Once per long rest · Compliment or ask about someone's strengths → both gain 3 Hope",
    text: "Once per long rest, when you compliment someone or ask them about something they're good at, you can both gain 3 Hope."
  },
  {
    level: 2, name: "Reckless", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "1 Stress · Advantage on an attack roll",
    text: "Mark a Stress to gain advantage on an attack."
  },
  // Level 3
  {
    level: 3, name: "Scramble", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Once per rest · Creature within Melee would deal damage → avoid attack and safely move out of Melee",
    text: "Once per rest, when a creature within Melee range would deal damage to you, you can avoid the attack and safely move out of Melee range of the enemy."
  },
  {
    level: 3, name: "Versatile Fighter", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Passive: Use any trait for equipped weapon attacks · On damage: 1 Stress → use maximum result of one damage die instead of rolling",
    text: "You can use a different character trait for an equipped weapon, rather than the trait the weapon calls for.\nWhen you deal damage, you can mark a Stress to use the maximum result of one of your damage dice instead of rolling it."
  },
  // Level 4
  {
    level: 4, name: "Deadly Focus", type: "Ability", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Once per rest · Focus on a target · +1 Proficiency until you attack another creature, defeat target, or battle ends",
    text: "Once per rest, you can apply all your focus toward a target of your choice. Until you attack another creature, you defeat the target, or the battle ends, gain a +1 bonus to your Proficiency."
  },
  {
    level: 4, name: "Fortified Armor", type: "Ability", recallCost: 0,
    cost: null,
    passive: true,
    statEffects: [{ stat: "thresholds", amount: 2, condition: "armored" }],
    summary: "Passive: While wearing armor · +2 to damage thresholds",
    text: "While you are wearing armor, gain a +2 bonus to your damage thresholds."
  },
  // Level 5
  {
    level: 5, name: "Champion's Edge", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "On critical success · Spend up to 3 Hope · Per Hope (each once): clear 1 HP, clear 1 Armor Slot, or target marks extra HP",
    text: "When you critically succeed on an attack, you can spend up to 3 Hope and choose one of the following options for each Hope spent:\n• You clear a Hit Point.\n• You clear an Armor Slot.\n• The target must mark an additional Hit Point.\nYou can't choose the same option more than once."
  },
  {
    level: 5, name: "Vitality", type: "Ability", recallCost: 0,
    cost: null,
    passive: true,
    statEffects: [{
      playerChoice: true, choose: 2,
      options: [
        { stat: "stress", amount: 1 },
        { stat: "hp", amount: 1 },
        { stat: "thresholds", amount: 2 },
      ],
    }],
    summary: "On take: permanently choose two — +1 Stress slot, +1 HP slot, or +2 damage thresholds · Card vaulted permanently",
    text: "When you choose this card, permanently gain two of the following benefits:\n• One Stress slot\n• One Hit Point slot\n• +2 bonus to your damage thresholds\nThen place this card in your vault permanently."
  },
];
