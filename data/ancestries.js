const ANCESTRIES = {
  Clank: ["Purposeful Design: Decide who made you and for what purpose. Choose one Experience that aligns with this purpose and gain a permanent +1 bonus to it.", "Efficient: When you take a short rest, you can choose a long rest move instead of a short rest move."],
  Drakona: ["Scales: When you would take Severe damage, mark a Stress to mark 1 fewer Hit Points.", "Elemental Breath: Choose an element. Use breath against targets within Very Close range as an Instinct weapon dealing d8 magic damage using your Proficiency."],
  Dwarf: ["Thick Skin: When you take Minor damage, you can mark 2 Stress instead of marking a Hit Point.", "Increased Fortitude: Spend 3 Hope to halve incoming physical damage."],
  Elf: ["Quick Reactions: Mark a Stress to gain advantage on a reaction roll.", "Celestial Trance: During a rest, drop into a trance to choose an additional downtime move."],
  Faerie: ["Luckbender: Once per session, after you or a willing ally within Close range makes an action roll, spend 3 Hope to reroll the Duality Dice.", "Wings: You can fly. While flying, mark a Stress after an adversary attacks to gain +2 Evasion against that attack."],
  Faun: ["Caprine Leap: Leap anywhere within Close range as normal movement.", "Kick: On a successful Melee attack, mark Stress to deal extra 2d6 damage and knock back to Very Close range."],
  Firbolg: ["Charge: Succeed on Agility Roll to move from Far/Very Far into Melee, mark Stress to deal 1d12 physical to all targets in Melee.", "Unshakable: When you would mark Stress, roll d6. On 6, don't mark it."],
  Fungril: ["Fungril Network: Instinct Roll (12) to communicate with other fungril across any distance.", "Death Connection: Touch a recent corpse, mark Stress to extract one memory related to an emotion or sensation."],
  Galapa: ["Shell: Gain a bonus to damage thresholds equal to your Proficiency.", "Retract: Mark Stress to retract into shell. Resistance to physical damage, disadvantage on actions, can't move."],
  Giant: ["Endurance: Gain an additional Hit Point slot at character creation.", "Reach: Melee range features become Very Close range instead."],
  Goblin: ["Surefooted: You ignore disadvantage on Agility Rolls.", "Danger Sense: Once per rest, mark Stress to force adversary to reroll an attack against you or ally within Very Close."],
  Halfling: ["Luckbringer: At session start, everyone in your party gains a Hope.", "Internal Compass: When you roll a 1 on your Hope Die, reroll it."],
  Human: ["High Stamina: Gain an additional Stress slot at character creation.", "Adaptability: When you fail a roll using an Experience, mark Stress to reroll."],
  Infernis: ["Fearless: When you roll with Fear, mark 2 Stress to change it to a roll with Hope.", "Dread Visage: Advantage on rolls to intimidate hostile creatures."],
  Katari: ["Feline Instincts: On an Agility Roll, spend 2 Hope to reroll your Hope Die.", "Retracting Claws: Agility Roll to scratch a target in Melee. On success, they become temporarily Vulnerable."],
  Orc: ["Sturdy: When you have 1 Hit Point remaining, attacks against you have disadvantage.", "Tusks: On a successful Melee attack, spend Hope to gore for extra 1d6 damage."],
  Ribbet: ["Amphibious: Breathe and move naturally underwater.", "Long Tongue: Grab things within Close range. Mark Stress to use as Finesse Close weapon dealing d12 physical damage."],
  Simiah: ["Natural Climber: Advantage on Agility Rolls involving balancing and climbing.", "Nimble: Permanent +1 to Evasion at character creation."],
};

const COMMUNITIES = {
  Highborne: "Privilege: You have advantage on rolls to consort with nobles, negotiate prices, or leverage your reputation to get what you want.",
  Loreborne: "Well-Read: You have advantage on rolls that involve the history, culture, or politics of a prominent person or place.",
  Orderborne: "Dedicated: Record three sayings or values your upbringing instilled in you. Once per rest, when you describe how you're embodying one of these principles through your current action, you can roll a d20 as your Hope Die.",
  Ridgeborne: "Steady: You have advantage on rolls to traverse dangerous cliffs and ledges, navigate harsh environments, and use your survival knowledge.",
  Seaborne: "Know the Tide: When you roll with Fear, place a token on your community card (max = level). Before an action roll, spend tokens for +1 each. Clear at session end.",
  Slyborne: "Scoundrel: You have advantage on rolls to negotiate with criminals, detect lies, or find a safe place to hide.",
  Underborne: "Low-Light Living: In low light or heavy shadow, advantage on rolls to hide, investigate, or perceive details.",
  Wanderborne: "Nomadic Pack: Once per session, spend Hope to pull a useful mundane item from your pack. Work with GM.",
  Wildborne: "Lightfoot: Your movement is naturally silent. Advantage on rolls to move without being heard.",
  // ── The Void v1.5 ──
  Duneborne: "Oasis: During a short rest, you or an ally can reroll a die used for a downtime action.",
  Freeborne: "Unbound: Once per session, when you make an action roll with Fear, you can change it to a roll with Hope instead.",
  Frostborne: "Hardy: Once per rest, you can Help an Ally traverse difficult terrain without spending a Hope.",
  Hearthborne: "Close-Knit: Once per long rest, you can spend any number of Hope to give an ally the same number of Hope.",
  Reborne: "Found Family: Once per session, you can spend a Hope to use an ally's community ability. When you do, your ally gains a Hope. At any point, when you've discovered the community you were once a part of, or have joined a new community, you can permanently trade this community card for that one instead.",
  Warborne: "Brave Face: Once per session, when an attack would cause you to mark a Stress, you can spend a Hope instead.",
};

const COMMUNITY_HAS_NOTES = { Orderborne: "Record your three sayings or values below:" };

// ── MIXED ANCESTRY HELPER ────────────────────────────────────
// featureIdx: 0 = first feature, 1 = second feature
// mixedFeaturePick "A" = feat[0] from primary (ancestry) + feat[1] from secondary (ancestrySecondary)
// mixedFeaturePick "B" = feat[1] from primary (ancestry) + feat[0] from secondary (ancestrySecondary)
function hasAncestryFeature(c, ancestryName, featureIdx) {
  if (!c.isMixedAncestry) return c.ancestry === ancestryName;
  if (featureIdx === 0) {
    return (c.mixedFeaturePick === "A" && c.ancestry === ancestryName) ||
           (c.mixedFeaturePick === "B" && c.ancestrySecondary === ancestryName);
  } else {
    return (c.mixedFeaturePick === "A" && c.ancestrySecondary === ancestryName) ||
           (c.mixedFeaturePick === "B" && c.ancestry === ancestryName);
  }
}
function getActiveAncestryFeatures(c) {
  if (!c.isMixedAncestry) return c.ancestry ? (ANCESTRIES[c.ancestry] || []) : [];
  const primary = ANCESTRIES[c.ancestry] || [];
  const secondary = ANCESTRIES[c.ancestrySecondary] || [];
  if (c.mixedFeaturePick === "A") return [primary[0], secondary[1]].filter(Boolean);
  return [primary[1], secondary[0]].filter(Boolean);
}
function getMixedAncestryLabel(c) {
  if (!c.isMixedAncestry) return c.ancestry;
  if (c.mixedAncestryLabel) return c.mixedAncestryLabel;
  const parts = [c.ancestry, c.ancestrySecondary].filter(Boolean);
  return parts.length === 2 ? `${parts[0]}-${parts[1]}` : parts[0] || "";
}
