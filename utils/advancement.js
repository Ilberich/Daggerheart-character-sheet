// ═══════════════════════════════════════════════════════════════
// LEVELING SYSTEM CONSTANTS & HELPERS
// ═══════════════════════════════════════════════════════════════
const ADV_MAX  = { traits: 3, hp: 2, stress: 2, exp: 1, card: 1, evasion: 1, subclass: 1, proficiency: 1, multiclass: 1 };
const ADV_COST = { traits: 1, hp: 1, stress: 1, exp: 1, card: 1, evasion: 1, subclass: 1, proficiency: 2, multiclass: 2 };

// getTrait: effective trait value = baseTraits (creation) + traitIncreases (leveling)
// Falls back to legacy `traits` field for characters saved before this refactor.
const getTrait = (c, t) =>
  (c.baseTraits ? (c.baseTraits[t] ?? 0) : (c.traits?.[t] ?? 0))
  + (c.traitIncreases?.[t] ?? 0);

function advTierKey(lvl) { return lvl <= 4 ? "tier2" : lvl <= 7 ? "tier3" : "tier4"; }
function advAccessibleTiers(lvl) {
  if (lvl <= 4) return ["tier2"];
  if (lvl <= 7) return ["tier2", "tier3"];
  return ["tier2", "tier3", "tier4"];
}
function advRemainingUses(advUsed, lvl, option) {
  return advAccessibleTiers(lvl).reduce((sum, t) =>
    sum + Math.max(0, ADV_MAX[option] - ((advUsed?.[t]?.[option]) || 0)), 0);
}
