export const Codex = [
  // Level 1
  {
    level: 1, name: "Book of Ava", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Power Push: Make a Spellcast Roll against a target within Melee range. On a success, they're knocked back to Far range and take d10+2 magic damage using your Proficiency.\nTava's Armor: Spend a Hope to give a target you can touch a +1 bonus to their Armor Score until their next rest or you cast Tava's Armor again.\nIce Spike: Make a Spellcast Roll (12) to summon a large ice spike within Far range. If you use it as a weapon, make the Spellcast Roll against the target's Difficulty instead. On a success, deal d6 physical damage using your Proficiency.",
    abilities: [
      {
        name: "Power Push",
        passive: false,
        summary: "Spellcast Roll · Melee · d10+2 magic · Knockback to Far",
        text: "Make a Spellcast Roll against a target within Melee range. On a success, they're knocked back to Far range and take d10+2 magic damage using your Proficiency.",
      },
      {
        name: "Tava's Armor",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "1 Hope · Touch · +1 Armor Score until next rest or recast",
        text: "Spend a Hope to give a target you can touch a +1 bonus to their Armor Score until their next rest or you cast Tava's Armor again.",
      },
      {
        name: "Ice Spike",
        passive: false,
        summary: "Spellcast Roll (12) · Far · d6 physical · As weapon: roll vs target Difficulty",
        text: "Make a Spellcast Roll (12) to summon a large ice spike within Far range. If you use it as a weapon, make the Spellcast Roll against the target's Difficulty instead. On a success, deal d6 physical damage using your Proficiency.",
      },
    ],
  },
  {
    level: 1, name: "Book of Illiat", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Slumber: Make a Spellcast Roll against a target within Very Close range. On a success, they're Asleep until they take damage or the GM spends a Fear on their turn to clear this condition.\nArcane Barrage: Once per rest, spend any number of Hope and shoot magical projectiles at a target within Close range. Roll a number of d6s equal to the Hope spent and deal that much magic damage to the target.\nTelepathy: Spend a Hope to open a line of mental communication with one target you can see. This connection lasts until your next rest or you cast Telepathy again.",
    abilities: [
      {
        name: "Slumber",
        passive: false,
        summary: "Spellcast Roll · Very Close · Asleep until damage or GM spends Fear",
        text: "Make a Spellcast Roll against a target within Very Close range. On a success, they're Asleep until they take damage or the GM spends a Fear on their turn to clear this condition.",
      },
      {
        name: "Arcane Barrage",
        passive: false,
        cost: { type: "hope", amount: 1 },
        uses: { recharge: "rest", amount: 1 },
        summary: "Once per rest · X Hope → Xd6 magic · Close target",
        text: "Once per rest, spend any number of Hope and shoot magical projectiles at a target within Close range. Roll a number of d6s equal to the Hope spent and deal that much magic damage to the target.",
      },
      {
        name: "Telepathy",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "1 Hope · Mental link with visible target · Lasts until next rest or recast",
        text: "Spend a Hope to open a line of mental communication with one target you can see. This connection lasts until your next rest or you cast Telepathy again.",
      },
    ],
  },
  {
    level: 1, name: "Book of Tyfar", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Wild Flame: Make a Spellcast Roll against up to three adversaries within Melee range. Targets you succeed against take 2d6 magic damage and must mark a Stress as flames erupt from your hand.\nMagic Hand: You conjure a magical hand with the same size and strength as your own within Far range.\nMysterious Mist: Make a Spellcast Roll (13) to cast a temporary thick fog within Very Close range. The fog heavily obscures this area and everything in it.",
    abilities: [
      {
        name: "Wild Flame",
        passive: false,
        summary: "Spellcast Roll · Melee (up to 3 targets) · 2d6 magic · Each target marks Stress",
        text: "Make a Spellcast Roll against up to three adversaries within Melee range. Targets you succeed against take 2d6 magic damage and must mark a Stress as flames erupt from your hand.",
      },
      {
        name: "Magic Hand",
        passive: false,
        summary: "Conjure a magical hand within Far range with the same size and strength as your own",
        text: "You conjure a magical hand with the same size and strength as your own within Far range.",
      },
      {
        name: "Mysterious Mist",
        passive: false,
        summary: "Spellcast Roll (13) · Very Close · Heavy obscurement in the area",
        text: "Make a Spellcast Roll (13) to cast a temporary thick fog within Very Close range. The fog heavily obscures this area and everything in it.",
      },
    ],
  },
  // Level 2
  {
    level: 2, name: "Book of Sitil", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Adjust Appearance: You magically shift your appearance and clothing to avoid recognition.\nParallela: Spend 2 Hope to cast this spell on yourself or an ally within Close range. The next time the target makes an attack, they can hit an additional target within range that their attack roll would succeed against. You can only hold this spell on one creature at a time.\nIllusion: Make a Spellcast Roll (14). On a success, create a temporary visual illusion no larger than you within Close range that lasts for as long as you look at it. It holds up to scrutiny until an observer is within Melee range.",
    abilities: [
      {
        name: "Adjust Appearance",
        passive: false,
        summary: "Magically shift your appearance and clothing to avoid recognition",
        text: "You magically shift your appearance and clothing to avoid recognition.",
      },
      {
        name: "Parallela",
        passive: false,
        cost: { type: "hope", amount: 2 },
        summary: "2 Hope · Self or Close ally · Next attack hits one additional target in range · One creature at a time",
        text: "Spend 2 Hope to cast this spell on yourself or an ally within Close range. The next time the target makes an attack, they can hit an additional target within range that their attack roll would succeed against. You can only hold this spell on one creature at a time.",
      },
      {
        name: "Illusion",
        passive: false,
        summary: "Spellcast Roll (14) · Visual illusion up to your size within Close · Holds until observer within Melee",
        text: "Make a Spellcast Roll (14). On a success, create a temporary visual illusion no larger than you within Close range that lasts for as long as you look at it. It holds up to scrutiny until an observer is within Melee range.",
      },
    ],
  },
  {
    level: 2, name: "Book of Vagras", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Runic Lock: Make a Spellcast Roll (15) on an object you're touching that can close (such as a lock, chest, or box). Once per rest on a success, you can lock the object so it can only be opened by creatures of your choice. Someone with access to magic and an hour of time to study the spell can break it.\nArcane Door: When you have no adversaries within Melee range, make a Spellcast Roll (13). On a success, spend a Hope to create a portal from where you are to a point within Far range you can see. It closes once a creature has passed through it.\nReveal: Make a Spellcast Roll. If there is anything magically hidden within Close range, it is revealed.",
    abilities: [
      {
        name: "Runic Lock",
        passive: false,
        uses: { recharge: "rest", amount: 1 },
        summary: "Spellcast Roll (15) · Touch closeable object · Once per rest → lock for chosen creatures only",
        text: "Make a Spellcast Roll (15) on an object you're touching that can close (such as a lock, chest, or box). Once per rest on a success, you can lock the object so it can only be opened by creatures of your choice. Someone with access to magic and an hour of time to study the spell can break it.",
      },
      {
        name: "Arcane Door",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "Spellcast Roll (13) · No Melee adversaries · 1 Hope → portal to visible Far point · Closes after one use",
        text: "When you have no adversaries within Melee range, make a Spellcast Roll (13). On a success, spend a Hope to create a portal from where you are to a point within Far range you can see. It closes once a creature has passed through it.",
      },
      {
        name: "Reveal",
        passive: false,
        summary: "Spellcast Roll · Reveal anything magically hidden within Close range",
        text: "Make a Spellcast Roll. If there is anything magically hidden within Close range, it is revealed.",
      },
    ],
  },
  // Level 3
  {
    level: 3, name: "Book of Korvax", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Levitation: Make a Spellcast Roll to temporarily lift a target you can see up into the air and move them within Close range of their original position.\nRecant: Spend a Hope to force a target within Melee range to make a Reaction Roll (15). On a failure, they forget the last minute of your conversation.\nRune Circle: Mark a Stress to create a temporary magical circle on the ground where you stand. All adversaries within Melee range, or who enter Melee range, take 2d12+4 magic damage and are knocked back to Very Close range.",
    abilities: [
      {
        name: "Levitation",
        passive: false,
        summary: "Spellcast Roll · Lift visible target · Move within Close of original position",
        text: "Make a Spellcast Roll to temporarily lift a target you can see up into the air and move them within Close range of their original position.",
      },
      {
        name: "Recant",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "1 Hope · Melee target · Reaction Roll (15) · Fail: forget last minute of conversation",
        text: "Spend a Hope to force a target within Melee range to make a Reaction Roll (15). On a failure, they forget the last minute of your conversation.",
      },
      {
        name: "Rune Circle",
        passive: false,
        cost: { type: "stress", amount: 1 },
        summary: "Mark Stress · Magical circle where you stand · All Melee adversaries: 2d12+4 magic · Knockback to Very Close",
        text: "Mark a Stress to create a temporary magical circle on the ground where you stand. All adversaries within Melee range, or who enter Melee range, take 2d12+4 magic damage and are knocked back to Very Close range.",
      },
    ],
  },
  {
    level: 3, name: "Book of Norai", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Mystic Tether: Make a Spellcast Roll against a target within Far range. On a success, they're temporarily Restrained and must mark a Stress. If you target a flying creature, this spell grounds and temporarily Restrains them.\nFireball: Make a Spellcast Roll against a target within Very Far range. On a success, hurl a sphere of fire toward them that explodes on impact. The target and all creatures within Very Close range of them must make a Reaction Roll (13). Targets who fail take d20+5 magic damage using your Proficiency. Targets who succeed take half damage.",
    abilities: [
      {
        name: "Mystic Tether",
        passive: false,
        summary: "Spellcast Roll · Far · Restrained + mark Stress · Grounds flying targets",
        text: "Make a Spellcast Roll against a target within Far range. On a success, they're temporarily Restrained and must mark a Stress. If you target a flying creature, this spell grounds and temporarily Restrains them.",
      },
      {
        name: "Fireball",
        passive: false,
        summary: "Spellcast Roll · Very Far · Explosion hits target + Very Close area · Reaction Roll (13) · Fail: d20+5 magic · Pass: half",
        text: "Make a Spellcast Roll against a target within Very Far range. On a success, hurl a sphere of fire toward them that explodes on impact. The target and all creatures within Very Close range of them must make a Reaction Roll (13). Targets who fail take d20+5 magic damage using your Proficiency. Targets who succeed take half damage.",
      },
    ],
  },
  // Level 4
  {
    level: 4, name: "Book of Exota", type: "Grimoire", recallCost: 3,
    passive: false,
    text: "Repudiate: You can interrupt a magical effect taking place. Make a reaction roll using your Spellcast trait. Once per rest on a success, the effect stops and any consequences are avoided.\nCreate Construct: Spend a Hope to choose a group of objects around you and create an animated construct from them that obeys basic commands. Make a Spellcast Roll to command them to take action. When necessary, they share your Evasion and traits and their attacks deal 2d10+3 physical damage. You can only maintain one construct at a time, and they fall apart when they take any amount of damage.",
    abilities: [
      {
        name: "Repudiate",
        passive: false,
        uses: { recharge: "rest", amount: 1 },
        summary: "Reaction · Spellcast reaction roll · Once per rest on success: interrupt magical effect, consequences avoided",
        text: "You can interrupt a magical effect taking place. Make a reaction roll using your Spellcast trait. Once per rest on a success, the effect stops and any consequences are avoided.",
      },
      {
        name: "Create Construct",
        passive: false,
        cost: { type: "hope", amount: 1 },
        summary: "1 Hope · Animate nearby objects into a construct · Spellcast Roll to command · 2d10+3 physical · One at a time · Falls apart on any damage",
        text: "Spend a Hope to choose a group of objects around you and create an animated construct from them that obeys basic commands. Make a Spellcast Roll to command them to take action. When necessary, they share your Evasion and traits and their attacks deal 2d10+3 physical damage. You can only maintain one construct at a time, and they fall apart when they take any amount of damage.",
      },
    ],
  },
  {
    level: 4, name: "Book of Grynn", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Arcane Deflection: Once per long rest, spend a Hope to negate the damage of an attack targeting you or an ally within Very Close range.\nTime Lock: Target an object within Far range. That object stops in time and space exactly where it is until your next rest. If a creature tries to move it, make a Spellcast Roll against them to maintain this spell.\nWall of Flame: Make a Spellcast Roll (15). On a success, create a temporary wall of magical flame between two points within Far range. All creatures in its path must choose a side to be on, and anything that subsequently passes through the wall takes 4d10+3 magic damage.",
    abilities: [
      {
        name: "Arcane Deflection",
        passive: false,
        cost: { type: "hope", amount: 1 },
        uses: { recharge: "longRest", amount: 1 },
        summary: "Once per long rest · 1 Hope → negate damage of attack on you or Very Close ally",
        text: "Once per long rest, spend a Hope to negate the damage of an attack targeting you or an ally within Very Close range.",
      },
      {
        name: "Time Lock",
        passive: false,
        summary: "Target object within Far · Stops in time and space until next rest · Spellcast Roll to resist creature moving it",
        text: "Target an object within Far range. That object stops in time and space exactly where it is until your next rest. If a creature tries to move it, make a Spellcast Roll against them to maintain this spell.",
      },
      {
        name: "Wall of Flame",
        passive: false,
        summary: "Spellcast Roll (15) · Temporary wall between two Far points · Passing through: 4d10+3 magic",
        text: "Make a Spellcast Roll (15). On a success, create a temporary wall of magical flame between two points within Far range. All creatures in its path must choose a side to be on, and anything that subsequently passes through the wall takes 4d10+3 magic damage.",
      },
    ],
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
  // Level 6
  {
    level: 6, name: "Banish", type: "Spell", recallCost: 0,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Spellcast Roll · Close · Roll Xd20 (X = Spellcast) · Target Reaction Roll vs highest result · Fail: once per rest → banished · Each PC Fear roll: −1 Difficulty, another chance to return",
    text: "Make a Spellcast Roll against a target within Close range. On a success, roll a number of d20s equal to your Spellcast trait. The target must make a reaction roll with a Difficulty equal to your highest result. On a success, the target must mark a Stress but isn't banished. Once per rest on a failure, they are banished from this realm.\nWhen the PCs roll with Fear, the Difficulty gains a −1 penalty and the target makes another reaction roll. On a success, they return from banishment."
  },
  {
    level: 6, name: "Sigil of Retribution", type: "Spell", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Mark Close adversary · GM gains Fear · Each time marked target damages you/allies: place d8 on card (up to level) · Successful attack: roll all dice, add to damage, clear · Ends on defeat or recast",
    text: "Mark an adversary within Close range with a sigil of retribution. The GM gains a Fear. When the marked adversary deals damage to you or your allies, place a d8 on this card. You can hold a number of d8s equal to your level. When you successfully attack the marked adversary, roll the dice on this card and add the total to your damage roll, then clear the dice. This effect ends when the marked adversary is defeated or you cast Sigil of Retribution again."
  },
  // Level 7
  {
    level: 7, name: "Book of Homet", type: "Grimoire", recallCost: 0,
    passive: false,
    text: "Pass Through: Make a Spellcast Roll (13). Once per rest on a success, you and all creatures touching you can pass through a wall or door within Close range. The effect ends once everyone is on the other side.\nPlane Gate: Make a Spellcast Roll (14). Once per long rest on a success, open a gateway to a location in another dimension or plane of existence you've been to before. This gateway lasts until your next rest.",
    abilities: [
      {
        name: "Pass Through",
        passive: false,
        uses: { recharge: "rest", amount: 1 },
        summary: "Spellcast Roll (13) · Once per rest · You + touching creatures pass through a wall or door within Close",
        text: "Make a Spellcast Roll (13). Once per rest on a success, you and all creatures touching you can pass through a wall or door within Close range. The effect ends once everyone is on the other side.",
      },
      {
        name: "Plane Gate",
        passive: false,
        uses: { recharge: "longRest", amount: 1 },
        summary: "Spellcast Roll (14) · Once per long rest · Gateway to visited dimension/plane · Lasts until next rest",
        text: "Make a Spellcast Roll (14). Once per long rest on a success, open a gateway to a location in another dimension or plane of existence you've been to before. This gateway lasts until your next rest.",
      },
    ],
  },
  {
    level: 7, name: "Codex-Touched", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    text: "When 4 or more of the domain cards in your loadout are from the Codex domain, gain the following benefits:\n• You can mark a Stress to add your Proficiency to a Spellcast Roll.\n• Once per rest, replace this card with any card from your vault without paying its Recall Cost.",
    abilities: [
      {
        name: "Codex-Touched",
        passive: true,
        summary: "Passive: 4+ Codex cards in loadout → Mark Stress to add Proficiency to a Spellcast Roll",
        text: "When 4 or more of the domain cards in your loadout are from the Codex domain, you can mark a Stress to add your Proficiency to a Spellcast Roll.",
      },
      {
        name: "Vault Swap",
        passive: false,
        uses: { recharge: "rest", amount: 1 },
        summary: "Once per rest · Replace this card with any card from your vault (no Recall Cost)",
        text: "Once per rest, replace this card with any card from your vault without paying its Recall Cost.",
      },
    ],
  },
  // Level 8
  {
    level: 8, name: "Book of Vyola", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Memory Delve: Make a Spellcast Roll against a target within Far range. On a success, peer into the target's mind and ask the GM a question. The GM describes any memories the target has pertaining to the answer.\nShared Clarity: Once per long rest, spend a Hope to choose two willing creatures. When one of them would mark Stress, they can choose between the two of them who marks it. This spell lasts until their next rest.",
    abilities: [
      {
        name: "Memory Delve",
        passive: false,
        summary: "Spellcast Roll · Far · On success: ask GM one question about target's memories",
        text: "Make a Spellcast Roll against a target within Far range. On a success, peer into the target's mind and ask the GM a question. The GM describes any memories the target has pertaining to the answer.",
      },
      {
        name: "Shared Clarity",
        passive: false,
        cost: { type: "hope", amount: 1 },
        uses: { recharge: "longRest", amount: 1 },
        summary: "Once per long rest · 1 Hope · Two willing creatures: when one marks Stress, they choose who marks it · Lasts until next rest",
        text: "Once per long rest, spend a Hope to choose two willing creatures. When one of them would mark Stress, they can choose between the two of them who marks it. This spell lasts until their next rest.",
      },
    ],
  },
  {
    level: 8, name: "Safe Haven", type: "Spell", recallCost: 3,
    cost: { type: "hope", amount: 2 },
    passive: false,
    summary: "Few minutes of calm · 2 Hope · Summon interdimensional home · Door appears within Close · Chosen creatures only · Invisible entrance optional · Resting inside: extra downtime move",
    text: "When you have a few minutes of calm to focus, you can spend 2 Hope to summon your Safe Haven, a large interdimensional home where you and your allies can take shelter. When you do, a magical door appears somewhere within Close range. Only creatures of your choice can enter. Once inside, you can make the entrance invisible. You and anyone else inside can always exit. Once you leave, the doorway must be summoned again.\nWhen you take a rest within your own Safe Haven, you can choose an additional downtime move."
  },
  // Level 9
  {
    level: 9, name: "Book of Ronin", type: "Grimoire", recallCost: 4,
    passive: false,
    text: "Transform: Make a Spellcast Roll (15). On a success, transform into an inanimate object no larger than twice your normal size. You can remain in this shape until you take damage.\nEternal Enervation: Once per long rest, make a Spellcast Roll against a target within Close range. On a success, they become permanently Vulnerable. They can't clear this condition by any means.",
    abilities: [
      {
        name: "Transform",
        passive: false,
        summary: "Spellcast Roll (15) · Become inanimate object up to 2× your size · Lasts until damage taken",
        text: "Make a Spellcast Roll (15). On a success, transform into an inanimate object no larger than twice your normal size. You can remain in this shape until you take damage.",
      },
      {
        name: "Eternal Enervation",
        passive: false,
        uses: { recharge: "longRest", amount: 1 },
        summary: "Once per long rest · Spellcast Roll · Close · On success: permanently Vulnerable (unclearable)",
        text: "Once per long rest, make a Spellcast Roll against a target within Close range. On a success, they become permanently Vulnerable. They can't clear this condition by any means.",
      },
    ],
  },
  {
    level: 9, name: "Disintegration Wave", type: "Spell", recallCost: 4,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Spellcast Roll (18) · Once per long rest · GM reveals Far adversaries with Difficulty ≤18 · Mark Stress per chosen target → instantly killed, can't be revived",
    text: "Make a Spellcast Roll (18). Once per long rest on a success, the GM tells you which adversaries within Far range have a Difficulty of 18 or lower. Mark a Stress for each one you wish to hit with this spell. They are killed and can't come back to life by any means."
  },
  // Level 10
  {
    level: 10, name: "Book of Yarrow", type: "Grimoire", recallCost: 2,
    passive: false,
    text: "Timejammer: Make a Spellcast Roll (18). On a success, time temporarily slows to a halt for everyone within Far range except for you. It resumes the next time you make an action roll that targets another creature.\nMagic Immunity: Spend 5 Hope to become immune to magic damage until your next rest.",
    abilities: [
      {
        name: "Timejammer",
        passive: false,
        summary: "Spellcast Roll (18) · Time halts for all within Far except you · Resumes when you make an action roll targeting a creature",
        text: "Make a Spellcast Roll (18). On a success, time temporarily slows to a halt for everyone within Far range except for you. It resumes the next time you make an action roll that targets another creature.",
      },
      {
        name: "Magic Immunity",
        passive: false,
        cost: { type: "hope", amount: 5 },
        summary: "5 Hope → immune to magic damage until next rest",
        text: "Spend 5 Hope to become immune to magic damage until your next rest.",
      },
    ],
  },
  {
    level: 10, name: "Transcendent Union", type: "Spell", recallCost: 1,
    cost: { type: "hope", amount: 5 },
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · 5 Hope · Two or more willing creatures linked · When one would mark Stress or HP → connected creatures choose who marks it · Lasts until next rest",
    text: "Once per long rest, spend 5 Hope to cast this spell on two or more willing creatures. Until your next rest, when a creature connected by this union would mark Stress or Hit Points, the connected creatures can choose who marks it."
  },
];
