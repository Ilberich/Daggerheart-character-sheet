export const Sage = [
  {
    level: 1, name: "Gifted Tracker", type: "Ability", recallCost: 0,
    passive: false,
    text: "When you're tracking a specific creature or group of creatures based on signs of their passage, you can spend any number of Hope and ask the GM that many questions:\n• What direction did they go?\n• How long ago did they pass through?\n• What were they doing in this location?\n• How many of them were here?\nWhen you encounter creatures you've tracked in this way, gain a +1 bonus to your Evasion against them.",
    abilities: [
      {
        name: "Gifted Tracker",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "X Hope → ask GM X tracking questions about a specific creature's passage",
        text: "When you're tracking a specific creature or group of creatures based on signs of their passage, you can spend any number of Hope and ask the GM that many questions:\n• What direction did they go?\n• How long ago did they pass through?\n• What were they doing in this location?\n• How many of them were here?",
      },
      {
        name: "Hunter's Instinct",
        passive: true,
        summary: "Passive: Creatures you've tracked via Gifted Tracker → +1 Evasion against them when encountered",
        text: "When you encounter creatures you've tracked in this way, gain a +1 bonus to your Evasion against them.",
      },
    ],
  },
  {
    level: 1, name: "Nature's Tongue", type: "Ability", recallCost: 0,
    passive: false,
    text: "You can speak the language of the natural world. When you want to speak to the plants and animals around you, make an Instinct Roll (12). On a success, they'll give you the information they know. On a roll with Fear, their knowledge might be limited or come at a cost.\nAdditionally, before you make a Spellcast Roll while within a natural environment, you can spend a Hope to gain a +2 bonus to the roll.",
    abilities: [
      {
        name: "Nature's Tongue",
        passive: false,
        summary: "Instinct Roll (12) · Speak with plants/animals · On success: they share their knowledge · Fear: limited or costly",
        text: "You can speak the language of the natural world. When you want to speak to the plants and animals around you, make an Instinct Roll (12). On a success, they'll give you the information they know. On a roll with Fear, their knowledge might be limited or come at a cost.",
      },
      {
        name: "Voice of the Wild",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "Before Spellcast Roll in natural environment · 1 Hope → +2 bonus to the roll",
        text: "Before you make a Spellcast Roll while within a natural environment, you can spend a Hope to gain a +2 bonus to the roll.",
      },
    ],
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
    passive: false,
    text: "Tekaira Armored Beetles: Mark a Stress to conjure armored beetles that encircle you. When you next take damage, reduce the severity by one threshold. You can spend a Hope to keep the beetles conjured after taking damage.\nFire Flies: Make a Spellcast Roll against all adversaries within Close range. Spend a Hope to deal 2d8+3 magic damage to targets you succeeded against.",
    abilities: [
      {
        name: "Armored Beetles",
        passive: false,
        cost: { type: "stress", amount: 1 },
        summary: "1 Stress · Conjure beetle armor · Next damage received: reduce severity by one threshold · 1 Hope to keep active after damage",
        text: "Mark a Stress to conjure armored beetles that encircle you. When you next take damage, reduce the severity by one threshold. You can spend a Hope to keep the beetles conjured after taking damage.",
      },
      {
        name: "Fire Flies",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "Spellcast Roll · Close (all targets) · 1 Hope → 2d8+3 magic",
        text: "Make a Spellcast Roll against all adversaries within Close range. Spend a Hope to deal 2d8+3 magic damage to targets you succeeded against.",
      },
    ],
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
    summary: "Once per long rest · Burst of healing plants within Close · You + allies clear 1 HP · Optional: 2 Hope → clear 2 HP instead",
    text: "Once per long rest, you can conjure a field of healing plants around you. Everywhere within Close range of you bursts to life with vibrant nature, allowing you and all allies in the area to clear a Hit Point.\nSpend 2 Hope to allow you and all allies to clear 2 Hit Points instead."
  },
  // Level 5
  {
    level: 5, name: "Thorn Skin", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
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
  // Level 6
  {
    level: 6, name: "Conjured Steeds", type: "Spell", recallCost: 0,
    cost: null,
    passive: false,
    summary: "X Hope → conjure X magical steeds until next long rest or damage · Double land speed traveling · Move Far range in danger without rolling · Riders: −2 attack rolls, +2 damage rolls",
    text: "Spend any number of Hope to conjure that many magical steeds (such as horses, camels, or elephants) that you and your allies can ride until your next long rest or the steeds take any damage. The steeds double your land speed while traveling and, when in danger, allow you to move within Far range without having to roll. Creatures riding a steed gain a −2 penalty to attack rolls and a +2 bonus to damage rolls."
  },
  {
    level: 6, name: "Forager", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    restEffect: { trigger: "any", effect: "extraDowntimeMove", amount: 1 },
    summary: "Additional downtime move · Roll d6 → forage consumable · 1:clear 2 Stress 2:gain 2 Hope 3:+2 Spellcast Roll 4:clear 2 HP 5:reroll any die 6:choose · Party holds up to 5",
    text: "As an additional downtime move you can choose, roll a d6 to see what you forage. Work with the GM to describe it and add it to your inventory as a consumable. Your party can carry up to five foraged consumables at a time.\n1. A unique food (Clear 2 Stress)\n2. A beautiful relic (Gain 2 Hope)\n3. An arcane rune (+2 to a Spellcast Roll)\n4. A healing vial (Clear 2 Hit Points)\n5. A luck charm (Reroll any die)\n6. Choose one of the options above."
  },
  // Level 7
  {
    level: 7, name: "Sage-Touched", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    text: "When 4 or more of the domain cards in your loadout are from the Sage domain, gain the following benefits:\n• While you're in a natural environment, you gain a +2 bonus to your Spellcast Rolls.\n• Once per rest, you can double your Agility or Instinct when making a roll that uses that trait. You must choose to do this before you roll.",
    abilities: [
      {
        name: "Sage-Touched",
        passive: true,
        summary: "Passive: 4+ Sage cards in loadout · In natural environment → +2 Spellcast Rolls",
        text: "When 4 or more of the domain cards in your loadout are from the Sage domain, while you're in a natural environment, you gain a +2 bonus to your Spellcast Rolls.",
      },
      {
        name: "Natural Amplification",
        passive: false,
        uses: { recharge: "rest", amount: 1 },
        summary: "Once per rest (4+ Sage cards) · Before a roll using Agility or Instinct → double that trait for the roll",
        text: "Once per rest when 4 or more of the domain cards in your loadout are from the Sage domain, you can double your Agility or Instinct when making a roll that uses that trait. You must choose to do this before you roll.",
      },
    ],
  },
  {
    level: 7, name: "Wild Surge", type: "Spell", recallCost: 2,
    cost: { type: "stress", amount: 1 },
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Mark Stress · Wild Surge Die d6 starts at 1 · Add die value to every action roll · After each use: increase die value by 1 · Exceed 6 or rest: form drops, mark Stress",
    text: "Once per long rest, mark a Stress to channel the natural world around you and enhance yourself. Describe how your appearance changes, then place a d6 on this card with the 1 value facing up.\nWhile the Wild Surge Die is active, you add its value to every action roll you make. After you add its value to a roll, increase the Wild Surge Die's value by one. When the die's value would exceed 6 or you take a rest, this form drops and you must mark an additional Stress."
  },
  // Level 8
  {
    level: 8, name: "Forest Sprites", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Spellcast Roll (13) · X Hope → X sprites at Far points · Allies: +3 attack vs Melee adversaries · Melee ally marks Armor Slot: mark extra · Sprite vanishes after granting benefit or taking damage",
    text: "Make a Spellcast Roll (13). On a success, spend any number of Hope to create an equal number of small forest sprites who appear at points you choose within Far range, providing the following benefits:\n• Your allies gain a +3 bonus to attack rolls against adversaries within Melee range of a sprite.\n• An ally who marks an Armor Slot while within Melee range of a sprite can mark an additional Armor Slot.\nA sprite vanishes after granting a benefit or taking any damage."
  },
  {
    level: 8, name: "Rejuvenation Barrier", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Spellcast Roll (15) · Once per rest · Very Close barrier · You + allies inside clear 1d4 HP · Resistance to outside physical damage · Follows you when you move",
    text: "Make a Spellcast Roll (15). Once per rest on a success, create a temporary barrier of protective energy around you at Very Close range. You and all allies within the barrier when this spell is cast clear 1d4 Hit Points. While the barrier is up, you and all allies within have resistance to physical damage from outside the barrier.\nWhen you move, the barrier follows you."
  },
  // Level 9
  {
    level: 9, name: "Fane of the Wilds", type: "Ability", recallCost: 2,
    cost: null,
    passive: false,
    summary: "After long rest · Tokens = Sage cards in loadout+vault · Before Spellcast Roll: spend tokens → +1 per token · Critical Spellcast success: gain token · Clear on long rest",
    text: "After a long rest, place a number of tokens equal to the number of Sage domain cards in your loadout and vault on this card.\nWhen you would make a Spellcast Roll, you can spend any number of tokens after the roll to gain a +1 bonus for each token spent.\nWhen you critically succeed on a Spellcast Roll for a Sage domain spell, gain a token.\nWhen you take a long rest, clear all unspent tokens."
  },
  {
    level: 9, name: "Plant Dominion", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Spellcast Roll (18) · Once per long rest · Reshape all plant life within Far range — grow trees, clear paths, create walls of roots",
    text: "Make a Spellcast Roll (18). Once per long rest on a success, you reshape the natural world, changing the surrounding plant life anywhere within Far range of you. For example, you can grow trees instantly, clear a path through dense vines, or create a wall of roots."
  },
  // Level 10
  {
    level: 10, name: "Force of Nature", type: "Spell", recallCost: 2,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Mark Stress → nature spirit form · Succeed on attack/Spellcast: +10 damage · Defeat Close creature: absorb + clear Armor Slot · Can't be Restrained · Must spend Hope before each action roll or revert",
    text: "Mark a Stress to transform into a hulking nature spirit, gaining the following benefits:\n• When you succeed on an attack or Spellcast Roll, gain a +10 bonus to the damage roll.\n• When you deal enough damage to defeat a creature within Close range, you absorb them and clear an Armor Slot.\n• You can't be Restrained.\nBefore you make an action roll, you must spend a Hope. If you can't, you revert to your normal form."
  },
  {
    level: 10, name: "Tempest", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Far (all) · Choose one tempest until GM spends Fear:\nBlizzard: 2d20+8 magic + Vulnerable\nHurricane: 3d10+10 magic + can't move against wind\nSandstorm: 5d6+9 magic + ranged attacks at disadvantage",
    text: "Choose one of the following tempests and make a Spellcast Roll against all targets within Far range. Targets you succeed against experience its effects until the GM spends a Fear on their turn to end this spell.\n• Blizzard: Deal 2d20+8 magic damage and targets are temporarily Vulnerable.\n• Hurricane: Deal 3d10+10 magic damage and choose a direction the wind is blowing. Targets can't move against the wind.\n• Sandstorm: Deal 5d6+9 magic damage. Attacks made from beyond Melee range have disadvantage."
  },
];
