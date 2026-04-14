export const Codex = [
  {
    level: 1, name: "Book of Ava", type: "Grimoire", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Power Push: Spellcast Roll · Melee · d10+2 magic · Knockback to Far\nTava's Armor: 1 Hope · Touch · +1 Armor Score until next rest\nIce Spike: Spellcast Roll (12) · Far · d6 physical",
    text: "Power Push: Make a Spellcast Roll against a target within Melee range. On a success, they're knocked back to Far range and take d10+2 magic damage using your Proficiency.\nTava's Armor: Spend a Hope to give a target you can touch a +1 bonus to their Armor Score until their next rest or you cast Tava's Armor again.\nIce Spike: Make a Spellcast Roll (12) to summon a large ice spike within Far range. If you use it as a weapon, make the Spellcast Roll against the target's Difficulty instead. On a success, deal d6 physical damage using your Proficiency."
  },
  {
    level: 1, name: "Book of Illiat", type: "Grimoire", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Slumber: Spellcast Roll · Very Close · Asleep (until damage or GM spends Fear)\nArcane Barrage: Once per rest · X Hope → Xd6 magic · Close\nTelepathy: 1 Hope · Mental link with visible target until next rest",
    text: "Slumber: Make a Spellcast Roll against a target within Very Close range. On a success, they're Asleep until they take damage or the GM spends a Fear on their turn to clear this condition.\nArcane Barrage: Once per rest, spend any number of Hope and shoot magical projectiles at a target within Close range. Roll a number of d6s equal to the Hope spent and deal that much magic damage to the target.\nTelepathy: Spend a Hope to open a line of mental communication with one target you can see. This connection lasts until your next rest or you cast Telepathy again."
  },
  {
    level: 1, name: "Book of Tyfar", type: "Grimoire", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Wild Flame: Spellcast Roll · Melee (up to 3 targets) · 2d6 magic · Each target marks Stress\nMagic Hand: Conjure hand at Far range\nMysterious Mist: Spellcast Roll (13) · Very Close · Heavy obscurement",
    text: "Wild Flame: Make a Spellcast Roll against up to three adversaries within Melee range. Targets you succeed against take 2d6 magic damage and must mark a Stress as flames erupt from your hand.\nMagic Hand: You conjure a magical hand with the same size and strength as your own within Far range.\nMysterious Mist: Make a Spellcast Roll (13) to cast a temporary thick fog within Very Close range. The fog heavily obscures this area and everything in it."
  },
  // Level 2
  {
    level: 2, name: "Book of Sitil", type: "Grimoire", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Adjust Appearance: Magically shift appearance to avoid recognition\nParallela: 2 Hope → next attack hits additional target within range (one creature at a time)\nIllusion: Spellcast Roll (14) · Visual illusion within Close · Holds until observer within Melee",
    text: "Adjust Appearance: You magically shift your appearance and clothing to avoid recognition.\nParallela: Spend 2 Hope to cast this spell on yourself or an ally within Close range. The next time the target makes an attack, they can hit an additional target within range that their attack roll would succeed against. You can only hold this spell on one creature at a time.\nIllusion: Make a Spellcast Roll (14). On a success, create a temporary visual illusion no larger than you within Close range that lasts for as long as you look at it. It holds up to scrutiny until an observer is within Melee range."
  },
  {
    level: 2, name: "Book of Vagras", type: "Grimoire", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Runic Lock: Spellcast Roll (15) · Touch closeable object · Once per rest → lock for chosen creatures only\nArcane Door: Spellcast Roll (13) · No Melee adversaries · 1 Hope → portal to Far point · Closes after one use\nReveal: Spellcast Roll · Reveal anything magically hidden within Close",
    text: "Runic Lock: Make a Spellcast Roll (15) on an object you're touching that can close (such as a lock, chest, or box). Once per rest on a success, you can lock the object so it can only be opened by creatures of your choice. Someone with access to magic and an hour of time to study the spell can break it.\nArcane Door: When you have no adversaries within Melee range, make a Spellcast Roll (13). On a success, spend a Hope to create a portal from where you are to a point within Far range you can see. It closes once a creature has passed through it.\nReveal: Make a Spellcast Roll. If there is anything magically hidden within Close range, it is revealed."
  },
  // Level 3
  {
    level: 3, name: "Book of Korvax", type: "Grimoire", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Levitation: Spellcast Roll · Lift visible target, move within Close of original position\nRecant: 1 Hope · Melee target · Reaction Roll (15) · Fail: forget last minute of conversation\nRune Circle: Mark Stress · 2d12+4 magic to all Melee adversaries · Knockback to Very Close",
    text: "Levitation: Make a Spellcast Roll to temporarily lift a target you can see up into the air and move them within Close range of their original position.\nRecant: Spend a Hope to force a target within Melee range to make a Reaction Roll (15). On a failure, they forget the last minute of your conversation.\nRune Circle: Mark a Stress to create a temporary magical circle on the ground where you stand. All adversaries within Melee range, or who enter Melee range, take 2d12+4 magic damage and are knocked back to Very Close range."
  },
  {
    level: 3, name: "Book of Norai", type: "Grimoire", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Mystic Tether: Spellcast Roll · Far · Restrained + mark Stress · Grounds flying targets\nFireball: Spellcast Roll · Very Far · Explosion hits target + Very Close area · Reaction Roll (13) · Fail: d20+5 magic · Success: half",
    text: "Mystic Tether: Make a Spellcast Roll against a target within Far range. On a success, they're temporarily Restrained and must mark a Stress. If you target a flying creature, this spell grounds and temporarily Restrains them.\nFireball: Make a Spellcast Roll against a target within Very Far range. On a success, hurl a sphere of fire toward them that explodes on impact. The target and all creatures within Very Close range of them must make a Reaction Roll (13). Targets who fail take d20+5 magic damage using your Proficiency. Targets who succeed take half damage."
  },
  // Level 4
  {
    level: 4, name: "Book of Exota", type: "Grimoire", recallCost: 3,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Repudiate: Reaction · Spellcast roll · Once per rest on success: interrupt magical effect\nCreate Construct: 1 Hope · Animate objects → construct obeys commands · Spellcast Roll to command · 2d10+3 physical · One at a time · Falls apart on any damage",
    text: "Repudiate: You can interrupt a magical effect taking place. Make a reaction roll using your Spellcast trait. Once per rest on a success, the effect stops and any consequences are avoided.\nCreate Construct: Spend a Hope to choose a group of objects around you and create an animated construct from them that obeys basic commands. Make a Spellcast Roll to command them to take action. When necessary, they share your Evasion and traits and their attacks deal 2d10+3 physical damage. You can only maintain one construct at a time, and they fall apart when they take any amount of damage."
  },
  {
    level: 4, name: "Book of Grynn", type: "Grimoire", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Arcane Deflection: Once per long rest · 1 Hope → negate damage of attack on you or Very Close ally\nTime Lock: Target object within Far · Stops in time/space until next rest · Spellcast Roll to resist creature moving it\nWall of Flame: Spellcast Roll (15) · Temporary wall between two Far points · Passing through: 4d10+3 magic",
    text: "Arcane Deflection: Once per long rest, spend a Hope to negate the damage of an attack targeting you or an ally within Very Close range.\nTime Lock: Target an object within Far range. That object stops in time and space exactly where it is until your next rest. If a creature tries to move it, make a Spellcast Roll against them to maintain this spell.\nWall of Flame: Make a Spellcast Roll (15). On a success, create a temporary wall of magical flame between two points within Far range. All creatures in its path must choose a side to be on, and anything that subsequently passes through the wall takes 4d10+3 magic damage."
  },
  // Level 5
  {
    level: 5, name: "Manifest Wall", type: "Spell", recallCost: 2,
    cost: { type: "hope", amount: 1 },
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Spellcast Roll (15) · Once per rest · 1 Hope → magical wall between two Far points · Up to 50ft high · Creatures shunted to chosen side · Lasts until next rest",
    text: "Make a Spellcast Roll (15). Once per rest on a success, spend a Hope to create a temporary magical wall between two points within Far range. It can be up to 50 feet high and form at any angle. Creatures or objects in its path are shunted to a side of your choice. The wall stays up until your next rest or you cast Manifest Wall again."
  },
  {
    level: 5, name: "Teleport", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Spellcast Roll (16) · Teleport self + willing Close targets to visited place · Familiarity bonus: very well +3, frequent +1, infrequent ±0, once −2",
    text: "Once per long rest, you can instantly teleport yourself and any number of willing targets within Close range to a place you've been before. Choose one of the following options, then make a Spellcast Roll (16):\n• If you know the place very well, gain a +3 bonus.\n• If you've visited the place frequently, gain a +1 bonus.\n• If you've visited the place infrequently, gain no modifier.\n• If you've only been there once, gain a −2 penalty.\nOn a success, you appear where you were intending to go. On a failure, you appear off course, with the range of failure determining how far off course."
  },
];
