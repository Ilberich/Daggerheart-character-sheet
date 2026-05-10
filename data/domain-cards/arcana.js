export const Arcana = [
  {
    level: 1, name: "Rune Ward", type: "Spell", recallCost: 0,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Touch · Infuse trinket as ward · Holder: 1 Hope → reduce damage by 1d8 · Ward die 8 = expires, recharge on rest",
    text: "You have a deeply personal trinket that can be infused with protective magic and held as a ward by you or an ally. Describe what it is and why it's important to you. The ward's holder can spend a Hope to reduce incoming damage by 1d8.\nIf the Ward Die result is 8, the ward's power ends after it reduces damage this turn. It can be recharged for free on your next rest."
  },
  {
    level: 1, name: "Unleash Chaos", type: "Spell", recallCost: 1,
    cost: null, optionalCost: { type: "stress", amount: 1, label: "Replenish tokens" },
    passive: false,
    summary: "Spellcast Roll · Far · Spend tokens → Xd10 magic · Optional: 1 Stress → replenish tokens (up to Spellcast)",
    text: "At the beginning of a session, place a number of tokens equal to your Spellcast trait on this card.\nMake a Spellcast Roll against a target within Far range and spend any number of tokens to channel raw energy to unleash against them. On a success, roll a number of d10s equal to the tokens you spent and deal that much magic damage to the target. Mark a Stress to replenish this card with tokens (up to your Spellcast trait). At the end of each session, clear all unspent tokens."
  },
  {
    level: 1, name: "Wall Walk", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "1 Hope · Touch · Wall/ceiling movement until end of scene",
    text: "Spend a Hope to allow a creature you can touch to climb on walls and ceilings as easily as walking on the ground. This lasts until the end of the scene or you cast Wall Walk again."
  },
  // Level 2
  {
    level: 2, name: "Cinder Grasp", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Melee · 1d20+3 magic · On Fire · While On Fire: +2d6 magic on each action",
    text: "Make a Spellcast Roll against a target within Melee range. On a success, the target instantly bursts into flames, takes 1d20+3 magic damage, and is temporarily lit On Fire. When a creature acts while On Fire, they must take an extra 2d6 magic damage if they are still On Fire at the end of their action."
  },
  {
    level: 2, name: "Floating Eye", type: "Spell", recallCost: 0,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "1 Hope · Create floating orb · Move anywhere within Very Far · See through it freely · Ends if orb takes damage or leaves range",
    text: "Spend a Hope to create a single, small floating orb that you can move anywhere within Very Far range. While this spell is active, you can see through the orb as though you're looking out from its position. You can transition between using your own senses and seeing through the orb freely. If the orb takes damage or moves out of range, the spell ends."
  },
  // Level 3
  {
    level: 3, name: "Counterspell", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Reaction: Interrupt a magical effect · Spellcast reaction roll · On success: effect stops, card goes to vault",
    text: "You can interrupt a magical effect taking place by making a reaction roll using your Spellcast trait. On a success, the effect stops and any consequences are avoided, and this card is placed in your vault."
  },
  {
    level: 3, name: "Flight", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll (15) · Tokens = Agility (min 1) · Fly freely · Each action costs 1 token · Last token: descend to ground below",
    text: "Make a Spellcast Roll (15). On a success, place a number of tokens equal to your Agility on this card (minimum 1). When you make an action roll while flying, spend a token from this card. After the action that spends the last token is resolved, you descend to the ground directly below you."
  },
  // Level 4
  {
    level: 4, name: "Blink Out", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "Spellcast Roll (12) · 1 Hope → teleport to visible Far point · +1 Hope per willing Very Close creature brought along",
    text: "Make a Spellcast Roll (12). On a success, spend a Hope to teleport to another point you can see within Far range. If any willing creatures are within Very Close range, spend an additional Hope for each creature to bring them with you."
  },
  {
    level: 4, name: "Preservation Blast", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Melee (all targets) · d8+3 magic · Knockback to Far",
    text: "Make a Spellcast Roll against all targets within Melee range. Targets you succeed against are forced back to Far range and take d8+3 magic damage using your Spellcast trait."
  },
  // Level 5
  {
    level: 5, name: "Chain Lightning", type: "Spell", recallCost: 1,
    cost: { type: "stress", amount: 2 },
    passive: false,
    summary: "2 Stress · Spellcast Roll · Close (all) · Reaction Roll vs your result · Fail: 2d8+4 magic · Chains to additional Close targets of those hit",
    text: "Mark 2 Stress to make a Spellcast Roll, unleashing lightning on all targets within Close range. Targets you succeed against must make a reaction roll with a Difficulty equal to the result of your Spellcast Roll. Targets who fail take 2d8+4 magic damage. Additional adversaries not already targeted by Chain Lightning and within Close range of previous targets who took damage must also make the reaction roll. Targets who fail take 2d8+4 magic damage. This chain continues until there are no more adversaries within range."
  },
  {
    level: 5, name: "Premonition", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Once per long rest · After GM conveys roll consequences → rescind and redo the action entirely",
    text: "You can channel arcane energy to have visions of the future. Once per long rest, immediately after the GM conveys the consequences of a roll you made, you can rescind the move and consequences like they never happened and make another move instead."
  },
  // Level 6
  {
    level: 6, name: "Rift Walker", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Spellcast Roll (15) · Place arcane marking · Next successful cast: rift opens back to marked spot · Stays open until closed or another spell cast",
    text: "Make a Spellcast Roll (15). On a success, you place an arcane marking on the ground where you currently stand. The next time you successfully cast Rift Walker, a rift in space opens up, providing safe passage back to the exact spot where the marking was placed. This rift stays open until you choose to close it or you cast another spell.\nYou can drop the spell at any time to cast Rift Walker again and place the marking somewhere new."
  },
  {
    level: 6, name: "Telekinesis", type: "Spell", recallCost: 0,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Far · Move target anywhere within Far · Optional: throw as attack → additional Spellcast Roll → d12+4 physical",
    text: "Make a Spellcast Roll against a target within Far range. On a success, you can use your mind to move them anywhere within Far range of their original position. You can throw the lifted target as an attack by making an additional Spellcast Roll against the second target you're trying to attack. On a success, deal d12+4 physical damage to the second target using your Proficiency. This spell then ends."
  },
  // Level 7
  {
    level: 7, name: "Arcana-Touched", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    summary: "Passive: 4+ Arcana cards in loadout → +1 Spellcast Rolls · Once per rest: swap Hope and Fear Dice results",
    text: "When 4 or more of the domain cards in your loadout are from the Arcana domain, gain the following benefits:\n• +1 bonus to your Spellcast Rolls\n• Once per rest, you can switch the results of your Hope and Fear Dice."
  },
  {
    level: 7, name: "Cloaking Blast", type: "Spell", recallCost: 2,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "After successful Spellcast Roll on another spell · 1 Hope → become Cloaked · Ends on movement into adversary line of sight or attack",
    text: "When you make a successful Spellcast Roll to cast a different spell, you can spend a Hope to become Cloaked. While Cloaked, you remain unseen if you are stationary when an adversary moves to where they would normally see you. When you move into or within an adversary's line of sight or make an attack, you are no longer Cloaked."
  },
  // Level 8
  {
    level: 8, name: "Arcane Reflection", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Reaction: Take magic damage · Spend X Hope → roll Xd6 · Any 6: reflect damage back to caster instead",
    text: "When you would take magic damage, you can spend any number of Hope to roll that many d6s. If any roll a 6, the attack is reflected back to the caster, dealing the damage to them instead."
  },
  {
    level: 8, name: "Confusing Aura", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Spellcast Roll (14) · Once per long rest · Illusion layers (base 1, +1 per Stress) · Adversary attacks: roll d6 per layer · 5+: layer destroyed, attack fails · All 4-: damage taken, spell ends",
    text: "Make a Spellcast Roll (14). Once per long rest on a success, you create a layer of illusion over your body that makes it hard to tell exactly where you are. Mark any number of Stress to make that many additional layers. When an adversary makes an attack against you, roll a number of d6s equal to the number of layers currently active. If any roll a 5 or higher, one layer of the aura is destroyed and the attack fails. If all the results are 4 or lower, you take the damage and this spell ends."
  },
  // Level 9
  {
    level: 9, name: "Earthquake", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Spellcast Roll (16) · Once per rest · Very Far (non-flying) · Reaction Roll (18) · Fail: 3d10+8 physical + Vulnerable · Pass: half · Terrain becomes difficult, structures may crumble",
    text: "Make a Spellcast Roll (16). Once per rest on a success, all targets within Very Far range who aren't flying must make a Reaction Roll (18). Targets who fail take 3d10+8 physical damage and are temporarily Vulnerable. Targets who succeed take half damage.\nAdditionally, when you succeed on the Spellcast Roll, all terrain within Very Far range becomes difficult to move through and structures within this range might sustain damage or crumble."
  },
  {
    level: 9, name: "Sensory Projection", type: "Spell", recallCost: 0,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Spellcast Roll (15) · Once per rest · Vision of any visited place · Move freely · Undetectable · Ends on damage or casting another spell",
    text: "Once per rest, make a Spellcast Roll (15). On a success, drop into a vision that lets you clearly see and hear any place you have been before as though you are standing there in this moment. You can move freely in this vision and are not constrained by the physics or impediments of a physical body. This spell cannot be detected by mundane or magical means. You drop out of this vision upon taking damage or casting another spell."
  },
  // Level 10
  {
    level: 10, name: "Adjust Reality", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 5 },
    passive: false,
    summary: "After any roll by you or willing ally · 5 Hope → change numerical result to any plausible value",
    text: "After you or a willing ally make any roll, you can spend 5 Hope to change the numerical result of that roll to a result of your choice instead. The result must be plausible within the range of the dice."
  },
  {
    level: 10, name: "Falling Sky", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Far (all targets) · Mark X Stress → each target takes Xd20+2 magic",
    text: "Make a Spellcast Roll against all adversaries within Far range. Mark any number of Stress to make shards of arcana rain down from above. Targets you succeed against take 1d20+2 magic damage for each Stress marked."
  },
];
