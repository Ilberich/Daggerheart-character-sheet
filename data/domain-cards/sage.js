export const Sage = [
  {
    level: 1, name: "Gifted Tracker", type: "Ability", recallCost: 0,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "X Hope → ask GM X tracking questions · +1 Evasion vs tracked creatures when encountered",
    text: "When you're tracking a specific creature or group of creatures based on signs of their passage, you can spend any number of Hope and ask the GM that many questions:\n• What direction did they go?\n• How long ago did they pass through?\n• What were they doing in this location?\n• How many of them were here?\nWhen you encounter creatures you've tracked in this way, gain a +1 bonus to your Evasion against them."
  },
  {
    level: 1, name: "Nature's Tongue", type: "Ability", recallCost: 0,
    cost: null, optionalCost: { type: "hope", amount: 1, label: "+2 Spellcast bonus" },
    passive: false,
    summary: "Instinct Roll (12) · Speak with plants/animals · Optional: 1 Hope → +2 Spellcast bonus",
    text: "You can speak the language of the natural world. When you want to speak to the plants and animals around you, make an Instinct Roll (12). On a success, they'll give you the information they know. On a roll with Fear, their knowledge might be limited or come at a cost.\nAdditionally, before you make a Spellcast Roll while within a natural environment, you can spend a Hope to gain a +2 bonus to the roll."
  },
  {
    level: 1, name: "Vicious Entangle", type: "Spell", recallCost: 1,
    cost: null, optionalCost: { type: "hope", amount: 1, label: "Restrain another" },
    passive: false,
    summary: "Spellcast Roll · Far · 1d8+1 physical · Restrained · Optional: 1 Hope → Restrain additional Very Close target",
    text: "Make a Spellcast Roll against a target within Far range. On a success, roots and vines reach out from the ground, dealing 1d8+1 physical damage and temporarily Restraining the target.\nAdditionally on a success, you can spend a Hope to temporarily Restrain another adversary within Very Close range of your target."
  },
  // Level 2
  {
    level: 2, name: "Conjure Swarm", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Armored Beetles: Mark Stress → reduce next damage by one threshold · 1 Hope to keep after damage\nFire Flies: Spellcast Roll · Close (all) · 1 Hope → 2d8+3 magic",
    text: "Tekaira Armored Beetles: Mark a Stress to conjure armored beetles that encircle you. When you next take damage, reduce the severity by one threshold. You can spend a Hope to keep the beetles conjured after taking damage.\nFire Flies: Make a Spellcast Roll against all adversaries within Close range. Spend a Hope to deal 2d8+3 magic damage to targets you succeeded against."
  },
  {
    level: 2, name: "Natural Familiar", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "1 Hope (2 for flying) · Summon familiar until next rest · Communicate + Spellcast Roll to command · Mark Stress → see through eyes · Melee familiar: +d6 to damage",
    text: "Spend a Hope to summon a small nature spirit or forest critter to your side until your next rest, you cast Natural Familiar again, or the familiar is targeted by an attack. If you spend an additional Hope, you can summon a familiar that flies. You can communicate with them, make a Spellcast Roll to command them to perform simple tasks, and mark a Stress to see through their eyes.\nWhen you deal damage to an adversary within Melee range of your familiar, you add a d6 to your damage roll."
  },
  // Level 3
  {
    level: 3, name: "Corrosive Projectile", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Far · d6+4 magic · Mark 2+ Stress → permanently Corroded (−1 Difficulty per 2 Stress spent, stackable)",
    text: "Make a Spellcast Roll against a target within Far range. On a success, deal d6+4 magic damage using your Proficiency. Additionally, mark 2 or more Stress to make them permanently Corroded. While a target is Corroded, they gain a −1 penalty to their Difficulty for every 2 Stress you spent. This condition can stack."
  },
  {
    level: 3, name: "Towering Stalk", type: "Spell", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Once per rest · Conjure climbable stalk within Close (height up to Far) · Optional: 1 Stress + Spellcast Roll → lift Close adversaries and drop for d8 physical",
    text: "Once per rest, you can conjure a thick, twisting stalk within Close range that can be easily climbed. Its height can grow up to Far range.\nMark a Stress to use this spell as an attack. Make a Spellcast Roll against an adversary or group of adversaries within Close range. The erupting stalk lifts targets you succeed against into the air and drops them, dealing d8 physical damage using your Proficiency."
  },
  // Level 4
  {
    level: 4, name: "Death Grip", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Close · On success: Restrained + choose one — pull to Melee, force 2 Stress, or all between you take 3d6+2 physical (Reaction Roll 13)",
    text: "Make a Spellcast Roll against a target within Close range and choose one of the following options:\n• You pull the target into Melee range or pull yourself into Melee range of them.\n• You constrict the target and force them to mark 2 Stress.\n• All adversaries between you and the target must succeed on a Reaction Roll (13) or be hit by vines, taking 3d6+2 physical damage.\nOn a success, vines reach out from your hands, causing the chosen effect and temporarily Restraining the target."
  },
  {
    level: 4, name: "Healing Field", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Burst of healing plants within Close · You + allies clear 1 HP · Optional: 2 Hope → clear 2 HP instead",
    text: "Once per long rest, you can conjure a field of healing plants around you. Everywhere within Close range of you bursts to life with vibrant nature, allowing you and all allies in the area to clear a Hit Point.\nSpend 2 Hope to allow you and all allies to clear 2 Hit Points instead."
  },
  // Level 5
  {
    level: 5, name: "Thorn Skin", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Once per rest · 1 Hope → sprout thorns · Tokens = Spellcast · On taking damage: spend tokens → roll that many d6s · Reduce damage by total · If attacker in Melee: deal that amount back",
    text: "Once per rest, spend a Hope to sprout thorns all over your body. When you do, place a number of tokens equal to your Spellcast trait on this card. When you take damage, you can spend any number of tokens to roll that number of d6s. Add the results together and reduce the incoming damage by that amount. If you're within Melee range of the attacker, deal that amount of damage back to them.\nWhen you take a rest, clear all unspent tokens."
  },
  {
    level: 5, name: "Wild Fortress", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "Spellcast Roll (13) · 2 Hope → dome barricade · You + 1 ally inside can't be targeted or attack · Dome: thresholds 15/30 · Falls at 3 HP marked",
    text: "Make a Spellcast Roll (13). On a success, spend 2 Hope to grow a natural barricade in the shape of a dome that you and one ally can take cover within. While inside the dome, a creature can't be targeted by attacks and can't make attacks. Attacks made against the dome automatically succeed. The dome has the following damage thresholds and lasts until it marks 3 Hit Points.\nThresholds: 15/30"
  },
];
