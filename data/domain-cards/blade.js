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
    passive: false,
    text: "You can use a different character trait for an equipped weapon, rather than the trait the weapon calls for.\nWhen you deal damage, you can mark a Stress to use the maximum result of one of your damage dice instead of rolling it.",
    abilities: [
      {
        name: "Versatile Fighter",
        passive: true,
        summary: "Passive: Use any trait for equipped weapon attacks instead of the weapon's default trait",
        text: "You can use a different character trait for an equipped weapon, rather than the trait the weapon calls for.",
      },
      {
        name: "Calculated Strike",
        passive: false,
        cost: { type: "stress", amount: 1 },
        summary: "On damage roll · 1 Stress → use maximum result of one damage die instead of rolling it",
        text: "When you deal damage, you can mark a Stress to use the maximum result of one of your damage dice instead of rolling it.",
      },
    ],
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
  // Level 6
  {
    level: 6, name: "Battle-Hardened", type: "Ability", recallCost: 2,
    cost: { type: "hope", amount: 1 },
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Would make a Death Move · 1 Hope → clear a Hit Point instead",
    text: "Once per long rest when you would make a Death Move, you can spend a Hope to clear a Hit Point instead."
  },
  {
    level: 6, name: "Rage Up", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Before attack · 1 Stress → +2×Strength to damage roll · Can Rage Up twice per attack",
    text: "Before you make an attack, you can mark a Stress to gain a bonus to your damage roll equal to twice your Strength.\nYou can Rage Up twice per attack."
  },
  // Level 7
  {
    level: 7, name: "Blade-Touched", type: "Ability", recallCost: 1,
    cost: null,
    passive: true,
    summary: "Passive: 4+ Blade cards in loadout → +2 attack rolls · +4 Severe damage threshold",
    text: "When 4 or more of the domain cards in your loadout are from the Blade domain, gain the following benefits:\n• +2 bonus to your attack rolls\n• +4 bonus to your Severe damage threshold"
  },
  {
    level: 7, name: "Glancing Blow", type: "Ability", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "On failed attack · Mark Stress → deal weapon damage using half Proficiency",
    text: "When you fail an attack, you can mark a Stress to deal weapon damage using half your Proficiency."
  },
  // Level 8
  {
    level: 8, name: "Battle Cry", type: "Ability", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Charge into danger · All hearing allies: clear Stress + gain Hope + advantage on attacks until someone rolls Fear",
    text: "Once per long rest, while you're charging into danger, you can muster a rousing call that inspires your allies. All allies who can hear you each clear a Stress and gain a Hope. Additionally, your allies gain advantage on attack rolls until you or an ally rolls a failure with Fear."
  },
  {
    level: 8, name: "Frenzy", type: "Ability", recallCost: 3,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Frenzy until no adversaries in sight · Can't use Armor Slots · +10 damage rolls · +8 Severe threshold",
    text: "Once per long rest, you can go into a Frenzy until there are no more adversaries within sight.\nWhile Frenzied, you can't use Armor Slots, and you gain a +10 bonus to your damage rolls and a +8 bonus to your Severe damage threshold."
  },
  // Level 9
  {
    level: 9, name: "Gore and Glory", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    text: "When you critically succeed on a weapon attack, gain an additional Hope or clear an additional Stress.\nAdditionally, when you deal enough damage to defeat an enemy, gain a Hope or clear a Stress.",
    abilities: [
      {
        name: "Gore and Glory",
        passive: true,
        summary: "Passive: Critical success on weapon attack → gain Hope or clear Stress",
        text: "When you critically succeed on a weapon attack, gain an additional Hope or clear an additional Stress.",
      },
      {
        name: "Blood Rush",
        passive: true,
        summary: "Passive: Deal enough damage to defeat an enemy → gain Hope or clear Stress",
        text: "When you deal enough damage to defeat an enemy, gain a Hope or clear a Stress.",
      },
    ],
  },
  {
    level: 9, name: "Reaper's Strike", type: "Ability", recallCost: 3,
    cost: { type: "hope", amount: 1 },
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · 1 Hope → attack roll · GM tells you which range targets it would hit · Choose one → force them to mark 5 Hit Points",
    text: "Once per long rest, spend a Hope to make an attack roll. The GM tells you which targets within range it would succeed against. Choose one of these targets and force them to mark 5 Hit Points."
  },
  // Level 10
  {
    level: 10, name: "Battle Monster", type: "Ability", recallCost: 0,
    cost: { type: "stress", amount: 4 },
    passive: false,
    summary: "Successful attack · Mark 4 Stress → target marks HP equal to your currently marked HP instead of rolling damage",
    text: "When you make a successful attack against an adversary, you can mark 4 Stress to force the target to mark a number of Hit Points equal to the number of Hit Points you currently have marked instead of rolling for damage."
  },
  {
    level: 10, name: "Onslaught", type: "Ability", recallCost: 3,
    passive: false,
    text: "When you successfully make an attack with your weapon, you never deal damage beneath a target's Major damage threshold (the target always marks a minimum of 2 Hit Points).\nAdditionally, when a creature within your weapon's range deals damage to an ally with an attack that doesn't include you, you can mark a Stress to force them to make a Reaction Roll (15). On a failure, the target must mark a Hit Point.",
    abilities: [
      {
        name: "Relentless",
        passive: true,
        summary: "Passive: Successful weapon attacks always deal at least Major damage (minimum 2 HP marked)",
        text: "When you successfully make an attack with your weapon, you never deal damage beneath a target's Major damage threshold (the target always marks a minimum of 2 Hit Points).",
      },
      {
        name: "Onslaught",
        passive: false,
        cost: { type: "stress", amount: 1 },
        summary: "Reaction: Creature in weapon range damages ally without targeting you · Mark Stress → Reaction Roll (15) · Fail: target marks 1 HP",
        text: "When a creature within your weapon's range deals damage to an ally with an attack that doesn't include you, you can mark a Stress to force them to make a Reaction Roll (15). On a failure, the target must mark a Hit Point.",
      },
    ],
  },
];
