export const ANCESTRIES = {
  Clank: [
    {
      name: "Purposeful Design", passive: true,
      summary: "Passive: Choose one Experience aligned with your purpose · Permanent +1 bonus to it",
      text: "Purposeful Design: Decide who made you and for what purpose. Choose one Experience that aligns with this purpose and gain a permanent +1 bonus to it."
    },
    {
      name: "Efficient", passive: false,
      summary: "On short rest · Choose a long rest move instead of a short rest move",
      text: "Efficient: When you take a short rest, you can choose a long rest move instead of a short rest move."
    },
  ],
  Drakona: [
    {
      name: "Scales", passive: true,
      summary: "Reaction: On Severe damage · Mark Stress → mark 1 fewer Hit Points",
      text: "Scales: When you would take Severe damage, mark a Stress to mark 1 fewer Hit Points."
    },
    {
      name: "Elemental Breath", passive: false,
      summary: "Instinct attack · Very Close · d8 magic · Choose element",
      text: "Elemental Breath: Choose an element. Use breath against targets within Very Close range as an Instinct weapon dealing d8 magic damage using your Proficiency."
    },
  ],
  Dwarf: [
    {
      name: "Thick Skin", passive: true,
      summary: "Reaction: On Minor damage · Mark 2 Stress instead of 1 HP",
      text: "Thick Skin: When you take Minor damage, you can mark 2 Stress instead of marking a Hit Point."
    },
    {
      name: "Increased Fortitude", passive: false,
      summary: "3 Hope · Halve incoming physical damage",
      text: "Increased Fortitude: Spend 3 Hope to halve incoming physical damage."
    },
  ],
  Elf: [
    {
      name: "Quick Reactions", passive: false,
      summary: "Mark Stress · Advantage on a reaction roll",
      text: "Quick Reactions: Mark a Stress to gain advantage on a reaction roll."
    },
    {
      name: "Celestial Trance", passive: false,
      summary: "During rest · Enter trance → choose an additional downtime move",
      text: "Celestial Trance: During a rest, drop into a trance to choose an additional downtime move."
    },
  ],
  Faerie: [
    {
      name: "Luckbender", passive: false,
      summary: "Once per session · After any action roll · 3 Hope → reroll Duality Dice",
      text: "Luckbender: Once per session, after you or a willing ally within Close range makes an action roll, spend 3 Hope to reroll the Duality Dice."
    },
    {
      name: "Wings", passive: false,
      summary: "Passive: You can fly · Reaction: Adversary attacks → mark Stress → +2 Evasion vs that attack",
      text: "Wings: You can fly. While flying, mark a Stress after an adversary attacks to gain +2 Evasion against that attack."
    },
  ],
  Faun: [
    {
      name: "Caprine Leap", passive: true,
      summary: "Passive: Leap anywhere within Close as normal movement (no roll)",
      text: "Caprine Leap: Leap anywhere within Close range as normal movement."
    },
    {
      name: "Kick", passive: false,
      summary: "After successful Melee attack · Mark Stress → +2d6 damage + knockback to Very Close",
      text: "Kick: On a successful Melee attack, mark Stress to deal extra 2d6 damage and knock back to Very Close range."
    },
  ],
  Firbolg: [
    {
      name: "Charge", passive: false,
      summary: "Agility Roll · Move from Far/Very Far into Melee · Mark Stress → 1d12 physical to all Melee targets",
      text: "Charge: Succeed on Agility Roll to move from Far/Very Far into Melee, mark Stress to deal 1d12 physical to all targets in Melee."
    },
    {
      name: "Unshakable", passive: true,
      summary: "Passive: When marking Stress · Roll d6 · On 6, don't mark it",
      text: "Unshakable: When you would mark Stress, roll d6. On 6, don't mark it."
    },
  ],
  Fungril: [
    {
      name: "Fungril Network", passive: false,
      summary: "Instinct Roll (12) · Communicate with other fungril across any distance",
      text: "Fungril Network: Instinct Roll (12) to communicate with other fungril across any distance."
    },
    {
      name: "Death Connection", passive: false,
      summary: "Touch recent corpse · Mark Stress → extract one memory tied to an emotion or sensation",
      text: "Death Connection: Touch a recent corpse, mark Stress to extract one memory related to an emotion or sensation."
    },
  ],
  Galapa: [
    {
      name: "Shell", passive: true,
      statEffects: [{ stat: "thresholds", amount: "proficiency" }],
      summary: "Passive: +Proficiency to all damage thresholds",
      text: "Shell: Gain a bonus to damage thresholds equal to your Proficiency."
    },
    {
      name: "Retract", passive: false,
      summary: "Mark Stress · Retract into shell · Resistance to physical damage · Disadvantage on actions · Can't move",
      text: "Retract: Mark Stress to retract into shell. Resistance to physical damage, disadvantage on actions, can't move."
    },
  ],
  Giant: [
    {
      name: "Endurance", passive: true,
      statEffects: [{ stat: "hp", amount: 1 }],
      summary: "Passive: +1 Hit Point slot at character creation",
      text: "Endurance: Gain an additional Hit Point slot at character creation."
    },
    {
      name: "Reach", passive: true,
      summary: "Passive: Melee range features become Very Close range instead",
      text: "Reach: Melee range features become Very Close range instead."
    },
  ],
  Goblin: [
    {
      name: "Surefooted", passive: true,
      summary: "Passive: Ignore disadvantage on Agility Rolls",
      text: "Surefooted: You ignore disadvantage on Agility Rolls."
    },
    {
      name: "Danger Sense", passive: false,
      summary: "Once per rest · Mark Stress → force adversary to reroll attack vs you or Very Close ally",
      text: "Danger Sense: Once per rest, mark Stress to force adversary to reroll an attack against you or ally within Very Close."
    },
  ],
  Halfling: [
    {
      name: "Luckbringer", passive: true,
      summary: "Passive: At session start · Everyone in your party gains a Hope",
      text: "Luckbringer: At session start, everyone in your party gains a Hope."
    },
    {
      name: "Internal Compass", passive: true,
      summary: "Passive: Roll 1 on Hope Die → reroll it",
      text: "Internal Compass: When you roll a 1 on your Hope Die, reroll it."
    },
  ],
  Human: [
    {
      name: "High Stamina", passive: true,
      statEffects: [{ stat: "stress", amount: 1 }],
      summary: "Passive: +1 Stress slot at character creation",
      text: "High Stamina: Gain an additional Stress slot at character creation."
    },
    {
      name: "Adaptability", passive: false,
      summary: "On failed roll using an Experience · Mark Stress → reroll",
      text: "Adaptability: When you fail a roll using an Experience, mark Stress to reroll."
    },
  ],
  Infernis: [
    {
      name: "Fearless", passive: false,
      summary: "On roll with Fear · Mark 2 Stress → change to roll with Hope instead",
      text: "Fearless: When you roll with Fear, mark 2 Stress to change it to a roll with Hope."
    },
    {
      name: "Dread Visage", passive: true,
      summary: "Passive: Advantage on rolls to intimidate hostile creatures",
      text: "Dread Visage: Advantage on rolls to intimidate hostile creatures."
    },
  ],
  Katari: [
    {
      name: "Feline Instincts", passive: false,
      summary: "On Agility Roll · 2 Hope → reroll Hope Die",
      text: "Feline Instincts: On an Agility Roll, spend 2 Hope to reroll your Hope Die."
    },
    {
      name: "Retracting Claws", passive: false,
      summary: "Agility Roll · Melee scratch · On success → target temporarily Vulnerable",
      text: "Retracting Claws: Agility Roll to scratch a target in Melee. On success, they become temporarily Vulnerable."
    },
  ],
  Orc: [
    {
      name: "Sturdy", passive: true,
      summary: "Passive: When you have 1 HP remaining · Attacks against you have disadvantage",
      text: "Sturdy: When you have 1 Hit Point remaining, attacks against you have disadvantage."
    },
    {
      name: "Tusks", passive: false,
      summary: "After successful Melee attack · Spend Hope → gore for extra 1d6 damage",
      text: "Tusks: On a successful Melee attack, spend Hope to gore for extra 1d6 damage."
    },
  ],
  Ribbet: [
    {
      name: "Amphibious", passive: true,
      summary: "Passive: Breathe and move naturally underwater",
      text: "Amphibious: Breathe and move naturally underwater."
    },
    {
      name: "Long Tongue", passive: false,
      summary: "Grab things within Close · Mark Stress → use as Finesse weapon · Close · d12 physical",
      text: "Long Tongue: Grab things within Close range. Mark Stress to use as Finesse Close weapon dealing d12 physical damage."
    },
  ],
  Simiah: [
    {
      name: "Natural Climber", passive: true,
      summary: "Passive: Advantage on Agility Rolls involving balancing and climbing",
      text: "Natural Climber: Advantage on Agility Rolls involving balancing and climbing."
    },
    {
      name: "Nimble", passive: true,
      statEffects: [{ stat: "evasion", amount: 1 }],
      summary: "Passive: Permanent +1 to Evasion at character creation",
      text: "Nimble: Permanent +1 to Evasion at character creation."
    },
  ],
};

export const COMMUNITIES = {
  Highborne: {
    name: "Privilege", passive: true,
    summary: "Passive: Advantage on rolls to consort with nobles, negotiate prices, or leverage reputation",
    text: "Privilege: You have advantage on rolls to consort with nobles, negotiate prices, or leverage your reputation to get what you want."
  },
  Loreborne: {
    name: "Well-Read", passive: true,
    summary: "Passive: Advantage on rolls involving history, culture, or politics of a prominent person or place",
    text: "Well-Read: You have advantage on rolls that involve the history, culture, or politics of a prominent person or place."
  },
  Orderborne: {
    name: "Dedicated", passive: false,
    summary: "Record 3 sayings/values · Once per rest · Describe embodying one → roll d20 as Hope Die",
    text: "Dedicated: Record three sayings or values your upbringing instilled in you. Once per rest, when you describe how you're embodying one of these principles through your current action, you can roll a d20 as your Hope Die."
  },
  Ridgeborne: {
    name: "Steady", passive: true,
    summary: "Passive: Advantage on rolls to traverse cliffs/ledges, navigate harsh environments, or use survival knowledge",
    text: "Steady: You have advantage on rolls to traverse dangerous cliffs and ledges, navigate harsh environments, and use your survival knowledge."
  },
  Seaborne: {
    name: "Know the Tide", passive: false,
    summary: "On roll with Fear · Place token (max = level) · Before action roll, spend tokens for +1 each · Clear at session end",
    text: "Know the Tide: When you roll with Fear, place a token on your community card (max = level). Before an action roll, spend tokens for +1 each. Clear at session end."
  },
  Slyborne: {
    name: "Scoundrel", passive: true,
    summary: "Passive: Advantage on rolls to negotiate with criminals, detect lies, or find a safe hiding place",
    text: "Scoundrel: You have advantage on rolls to negotiate with criminals, detect lies, or find a safe place to hide."
  },
  Underborne: {
    name: "Low-Light Living", passive: true,
    summary: "Passive: In low light or heavy shadow · Advantage on rolls to hide, investigate, or perceive details",
    text: "Low-Light Living: In low light or heavy shadow, advantage on rolls to hide, investigate, or perceive details."
  },
  Wanderborne: {
    name: "Nomadic Pack", passive: false,
    summary: "Once per session · Spend Hope → pull a useful mundane item from your pack (work with GM)",
    text: "Nomadic Pack: Once per session, spend Hope to pull a useful mundane item from your pack. Work with GM."
  },
  Wildborne: {
    name: "Lightfoot", passive: true,
    summary: "Passive: Movement is naturally silent · Advantage on rolls to move without being heard",
    text: "Lightfoot: Your movement is naturally silent. Advantage on rolls to move without being heard."
  },
  // ── The Void v1.5 ──
  Duneborne: {
    name: "Oasis", passive: false,
    summary: "During short rest · You or an ally can reroll a die used for a downtime action",
    text: "Oasis: During a short rest, you or an ally can reroll a die used for a downtime action."
  },
  Freeborne: {
    name: "Unbound", passive: false,
    summary: "Once per session · On action roll with Fear → change to roll with Hope instead",
    text: "Unbound: Once per session, when you make an action roll with Fear, you can change it to a roll with Hope instead."
  },
  Frostborne: {
    name: "Hardy", passive: false,
    summary: "Once per rest · Help an Ally traverse difficult terrain without spending Hope",
    text: "Hardy: Once per rest, you can Help an Ally traverse difficult terrain without spending a Hope."
  },
  Hearthborne: {
    name: "Close-Knit", passive: false,
    summary: "Once per long rest · Spend any number of Hope → give same amount to an ally",
    text: "Close-Knit: Once per long rest, you can spend any number of Hope to give an ally the same number of Hope."
  },
  Reborne: {
    name: "Found Family", passive: false,
    summary: "Once per session · 1 Hope → use an ally's community ability · Ally gains Hope · Can permanently swap this card when you find/join your true community",
    text: "Found Family: Once per session, you can spend a Hope to use an ally's community ability. When you do, your ally gains a Hope. At any point, when you've discovered the community you were once a part of, or have joined a new community, you can permanently trade this community card for that one instead."
  },
  Warborne: {
    name: "Brave Face", passive: false,
    summary: "Once per session · Attack would cause you to mark Stress → spend Hope instead",
    text: "Brave Face: Once per session, when an attack would cause you to mark a Stress, you can spend a Hope instead."
  },
};

export const COMMUNITY_HAS_NOTES = { Orderborne: "Record your three sayings or values below:" };

// ── MIXED ANCESTRY HELPER ────────────────────────────────────
// featureIdx: 0 = first feature, 1 = second feature
// mixedFeaturePick "A" = feat[0] from primary (ancestry) + feat[1] from secondary (ancestrySecondary)
// mixedFeaturePick "B" = feat[1] from primary (ancestry) + feat[0] from secondary (ancestrySecondary)
export function hasAncestryFeature(c, ancestryName, featureIdx) {
  if (!c.isMixedAncestry) return c.ancestry === ancestryName;
  if (featureIdx === 0) {
    return (c.mixedFeaturePick === "A" && c.ancestry === ancestryName) ||
           (c.mixedFeaturePick === "B" && c.ancestrySecondary === ancestryName);
  } else {
    return (c.mixedFeaturePick === "A" && c.ancestrySecondary === ancestryName) ||
           (c.mixedFeaturePick === "B" && c.ancestry === ancestryName);
  }
}
export function getActiveAncestryFeatures(c) {
  if (!c.isMixedAncestry) return c.ancestry ? (ANCESTRIES[c.ancestry] || []) : [];
  const primary = ANCESTRIES[c.ancestry] || [];
  const secondary = ANCESTRIES[c.ancestrySecondary] || [];
  if (c.mixedFeaturePick === "A") return [primary[0], secondary[1]].filter(Boolean);
  return [primary[1], secondary[0]].filter(Boolean);
}
export function getMixedAncestryLabel(c) {
  if (!c.isMixedAncestry) return c.ancestry;
  if (c.mixedAncestryLabel) return c.mixedAncestryLabel;
  const parts = [c.ancestry, c.ancestrySecondary].filter(Boolean);
  return parts.length === 2 ? `${parts[0]}-${parts[1]}` : parts[0] || "";
}
