const WEAPONS_PRIMARY = [
  { name: "Broadsword", trait: "Agility", range: "Melee", damage: "d8", type: "phy", burden: "1H", feature: "Reliable: +1 attack" },
  { name: "Longsword", trait: "Agility", range: "Melee", damage: "d8+3", type: "phy", burden: "2H", feature: "" },
  { name: "Battleaxe", trait: "Strength", range: "Melee", damage: "d10+3", type: "phy", burden: "2H", feature: "" },
  { name: "Greatsword", trait: "Strength", range: "Melee", damage: "d10+3", type: "phy", burden: "2H", feature: "Massive: −1 Eva; extra die, discard low" },
  { name: "Mace", trait: "Strength", range: "Melee", damage: "d8+1", type: "phy", burden: "1H", feature: "" },
  { name: "Warhammer", trait: "Strength", range: "Melee", damage: "d12+3", type: "phy", burden: "2H", feature: "Heavy: −1 Evasion" },
  { name: "Dagger", trait: "Finesse", range: "Melee", damage: "d8+1", type: "phy", burden: "1H", feature: "" },
  { name: "Quarterstaff", trait: "Instinct", range: "Melee", damage: "d10+3", type: "phy", burden: "2H", feature: "" },
  { name: "Cutlass", trait: "Presence", range: "Melee", damage: "d8+1", type: "phy", burden: "1H", feature: "" },
  { name: "Rapier", trait: "Presence", range: "Melee", damage: "d8", type: "phy", burden: "1H", feature: "Quick: Stress to hit another" },
  { name: "Halberd", trait: "Strength", range: "V. Close", damage: "d10+2", type: "phy", burden: "2H", feature: "Cumbersome: −1 Finesse" },
  { name: "Spear", trait: "Finesse", range: "V. Close", damage: "d10+2", type: "phy", burden: "2H", feature: "Cumbersome: −1 Finesse" },
  { name: "Shortbow", trait: "Agility", range: "Far", damage: "d6+3", type: "phy", burden: "2H", feature: "" },
  { name: "Crossbow", trait: "Finesse", range: "Far", damage: "d6+1", type: "phy", burden: "1H", feature: "" },
  { name: "Longbow", trait: "Agility", range: "V. Far", damage: "d8+3", type: "phy", burden: "2H", feature: "Cumbersome: −1 Finesse" },
  { name: "Arcane Gauntlets", trait: "Strength", range: "Melee", damage: "d10+3", type: "mag", burden: "2H", feature: "" },
  { name: "Hallowed Axe", trait: "Strength", range: "Melee", damage: "d8+1", type: "mag", burden: "1H", feature: "" },
  { name: "Glowing Rings", trait: "Agility", range: "V. Close", damage: "d10+1", type: "mag", burden: "2H", feature: "" },
  { name: "Hand Runes", trait: "Instinct", range: "V. Close", damage: "d10", type: "mag", burden: "1H", feature: "" },
  { name: "Returning Blade", trait: "Finesse", range: "Close", damage: "d8", type: "mag", burden: "1H", feature: "Returning" },
  { name: "Shortstaff", trait: "Instinct", range: "Close", damage: "d8+1", type: "mag", burden: "1H", feature: "" },
  { name: "Dualstaff", trait: "Instinct", range: "Far", damage: "d6+3", type: "mag", burden: "2H", feature: "" },
  { name: "Scepter", trait: "Presence", range: "Far", damage: "d6", type: "mag", burden: "2H", feature: "Versatile: also Presence Melee d8" },
  { name: "Wand", trait: "Knowledge", range: "Far", damage: "d6+1", type: "mag", burden: "1H", feature: "" },
  { name: "Greatstaff", trait: "Knowledge", range: "V. Far", damage: "d6", type: "mag", burden: "2H", feature: "Powerful: extra die, discard low" },
];

const WEAPONS_SECONDARY = [
  { name: "Shortsword", trait: "Agility", range: "Melee", damage: "d8", type: "phy", burden: "1H", feature: "Paired: +2 primary dmg in Melee" },
  { name: "Small Dagger", trait: "Finesse", range: "Melee", damage: "d8", type: "phy", burden: "1H", feature: "Paired: +2 primary dmg in Melee" },
  { name: "Round Shield", trait: "Strength", range: "Melee", damage: "d4", type: "phy", burden: "1H", feature: "Protective: +1 Armor Score" },
  { name: "Tower Shield", trait: "Strength", range: "Melee", damage: "d6", type: "phy", burden: "1H", feature: "Barrier: +2 Armor Score; −1 Eva" },
  { name: "Whip", trait: "Presence", range: "V. Close", damage: "d6", type: "phy", burden: "1H", feature: "Startling: Stress to push Melee back" },
  { name: "Grappler", trait: "Finesse", range: "Close", damage: "d6", type: "phy", burden: "1H", feature: "Hooked: pull target to Melee" },
  { name: "Hand Crossbow", trait: "Finesse", range: "Far", damage: "d6+1", type: "phy", burden: "1H", feature: "" },
];

const ARMOR = [
  { name: "Gambeson", thresholds: "5 / 11", score: 3, feature: "Flexible: +1 Evasion" },
  { name: "Leather", thresholds: "6 / 13", score: 3, feature: "" },
  { name: "Chainmail", thresholds: "7 / 15", score: 4, feature: "Heavy: −1 Evasion" },
  { name: "Full Plate", thresholds: "8 / 17", score: 4, feature: "Very Heavy: −2 Eva; −1 Agility" },
];
