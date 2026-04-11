const DOMAIN_CARDS = {
  Arcana: [
    {
      name: "Rune Ward", type: "Spell", recallCost: 0,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Touch · Infuse trinket as ward · Holder: 1 Hope → reduce damage by 1d8 · Ward die 8 = expires, recharge on rest",
      text: "You have a deeply personal trinket that can be infused with protective magic and held as a ward by you or an ally. Describe what it is and why it's important to you. The ward's holder can spend a Hope to reduce incoming damage by 1d8.\nIf the Ward Die result is 8, the ward's power ends after it reduces damage this turn. It can be recharged for free on your next rest."
    },
    {
      name: "Unleash Chaos", type: "Spell", recallCost: 1,
      cost: null, optionalCost: { type: "stress", amount: 1, label: "Replenish tokens" },
      passive: false,
      summary: "Spellcast Roll · Far · Spend tokens → Xd10 magic · Optional: 1 Stress → replenish tokens (up to Spellcast)",
      text: "At the beginning of a session, place a number of tokens equal to your Spellcast trait on this card.\nMake a Spellcast Roll against a target within Far range and spend any number of tokens to channel raw energy to unleash against them. On a success, roll a number of d10s equal to the tokens you spent and deal that much magic damage to the target. Mark a Stress to replenish this card with tokens (up to your Spellcast trait). At the end of each session, clear all unspent tokens."
    },
    {
      name: "Wall Walk", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "1 Hope · Touch · Wall/ceiling movement until end of scene",
      text: "Spend a Hope to allow a creature you can touch to climb on walls and ceilings as easily as walking on the ground. This lasts until the end of the scene or you cast Wall Walk again."
    },
    // Level 2
    {
      name: "Cinder Grasp", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll · Melee · 1d20+3 magic · On Fire · While On Fire: +2d6 magic on each action",
      text: "Make a Spellcast Roll against a target within Melee range. On a success, the target instantly bursts into flames, takes 1d20+3 magic damage, and is temporarily lit On Fire. When a creature acts while On Fire, they must take an extra 2d6 magic damage if they are still On Fire at the end of their action."
    },
    {
      name: "Floating Eye", type: "Spell", recallCost: 0,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "1 Hope · Create floating orb · Move anywhere within Very Far · See through it freely · Ends if orb takes damage or leaves range",
      text: "Spend a Hope to create a single, small floating orb that you can move anywhere within Very Far range. While this spell is active, you can see through the orb as though you're looking out from its position. You can transition between using your own senses and seeing through the orb freely. If the orb takes damage or moves out of range, the spell ends."
    },
    // Level 3
    {
      name: "Counterspell", type: "Spell", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Reaction: Interrupt a magical effect · Spellcast reaction roll · On success: effect stops, card goes to vault",
      text: "You can interrupt a magical effect taking place by making a reaction roll using your Spellcast trait. On a success, the effect stops and any consequences are avoided, and this card is placed in your vault."
    },
    {
      name: "Flight", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll (15) · Tokens = Agility (min 1) · Fly freely · Each action costs 1 token · Last token: descend to ground below",
      text: "Make a Spellcast Roll (15). On a success, place a number of tokens equal to your Agility on this card (minimum 1). When you make an action roll while flying, spend a token from this card. After the action that spends the last token is resolved, you descend to the ground directly below you."
    },
    // Level 4
    {
      name: "Blink Out", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Spellcast Roll (12) · 1 Hope → teleport to visible Far point · +1 Hope per willing Very Close creature brought along",
      text: "Make a Spellcast Roll (12). On a success, spend a Hope to teleport to another point you can see within Far range. If any willing creatures are within Very Close range, spend an additional Hope for each creature to bring them with you."
    },
    {
      name: "Preservation Blast", type: "Spell", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Spellcast Roll · Melee (all targets) · d8+3 magic · Knockback to Far",
      text: "Make a Spellcast Roll against all targets within Melee range. Targets you succeed against are forced back to Far range and take d8+3 magic damage using your Spellcast trait."
    },
    // Level 5
    {
      name: "Chain Lightning", type: "Spell", recallCost: 1,
      cost: { type: "stress", amount: 2 },
      passive: false,
      summary: "2 Stress · Spellcast Roll · Close (all) · Reaction Roll vs your result · Fail: 2d8+4 magic · Chains to additional Close targets of those hit",
      text: "Mark 2 Stress to make a Spellcast Roll, unleashing lightning on all targets within Close range. Targets you succeed against must make a reaction roll with a Difficulty equal to the result of your Spellcast Roll. Targets who fail take 2d8+4 magic damage. Additional adversaries not already targeted by Chain Lightning and within Close range of previous targets who took damage must also make the reaction roll. Targets who fail take 2d8+4 magic damage. This chain continues until there are no more adversaries within range."
    },
    {
      name: "Premonition", type: "Spell", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Once per long rest · After GM conveys roll consequences → rescind and redo the action entirely",
      text: "You can channel arcane energy to have visions of the future. Once per long rest, immediately after the GM conveys the consequences of a roll you made, you can rescind the move and consequences like they never happened and make another move instead."
    },
  ],
  Blade: [
    {
      name: "Get Back Up", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: true,
      summary: "Reaction: On Severe damage · 1 Stress → reduce severity by one threshold",
      text: "When you take Severe damage, you can mark a Stress to reduce the severity by one threshold."
    },
    {
      name: "Not Good Enough", type: "Ability", recallCost: 1,
      cost: null,
      passive: true,
      summary: "Passive: On damage roll, reroll any 1s or 2s",
      text: "When you roll your damage dice, you can reroll any 1s or 2s."
    },
    {
      name: "Whirlwind", type: "Ability", recallCost: 0,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "After successful attack vs Very Close · 1 Hope → attack all other Very Close targets · Additional targets: half damage",
      text: "When you make a successful attack against a target within Very Close range, you can spend a Hope to use the attack against all other targets within Very Close range. All additional adversaries you succeed against with this ability take half damage."
    },
    // Level 2
    {
      name: "A Soldier's Bond", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Once per long rest · Compliment or ask about someone's strengths → both gain 3 Hope",
      text: "Once per long rest, when you compliment someone or ask them about something they're good at, you can both gain 3 Hope."
    },
    {
      name: "Reckless", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "1 Stress · Advantage on an attack roll",
      text: "Mark a Stress to gain advantage on an attack."
    },
    // Level 3
    {
      name: "Scramble", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Once per rest · Creature within Melee would deal damage → avoid attack and safely move out of Melee",
      text: "Once per rest, when a creature within Melee range would deal damage to you, you can avoid the attack and safely move out of Melee range of the enemy."
    },
    {
      name: "Versatile Fighter", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "Passive: Use any trait for equipped weapon attacks · On damage: 1 Stress → use maximum result of one damage die instead of rolling",
      text: "You can use a different character trait for an equipped weapon, rather than the trait the weapon calls for.\nWhen you deal damage, you can mark a Stress to use the maximum result of one of your damage dice instead of rolling it."
    },
    // Level 4
    {
      name: "Deadly Focus", type: "Ability", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Once per rest · Focus on a target · +1 Proficiency until you attack another creature, defeat target, or battle ends",
      text: "Once per rest, you can apply all your focus toward a target of your choice. Until you attack another creature, you defeat the target, or the battle ends, gain a +1 bonus to your Proficiency."
    },
    {
      name: "Fortified Armor", type: "Ability", recallCost: 0,
      cost: null,
      passive: true,
      statEffects: [{ stat: "thresholds", amount: 2, condition: "armored" }],
      summary: "Passive: While wearing armor · +2 to damage thresholds",
      text: "While you are wearing armor, gain a +2 bonus to your damage thresholds."
    },
    // Level 5
    {
      name: "Champion's Edge", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "On critical success · Spend up to 3 Hope · Per Hope (each once): clear 1 HP, clear 1 Armor Slot, or target marks extra HP",
      text: "When you critically succeed on an attack, you can spend up to 3 Hope and choose one of the following options for each Hope spent:\n• You clear a Hit Point.\n• You clear an Armor Slot.\n• The target must mark an additional Hit Point.\nYou can't choose the same option more than once."
    },
    {
      name: "Vitality", type: "Ability", recallCost: 0,
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
  ],
  Bone: [
    {
      name: "Deft Maneuvers", type: "Ability", recallCost: 0,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "1 Stress · Once per rest · Sprint to Far (no Agility Roll) · +1 attack if immediately attack from Melee",
      text: "Once per rest, mark a Stress to sprint anywhere within Far range without making an Agility Roll to get there.\nIf you end this movement within Melee range of an adversary and immediately make an attack against them, gain a +1 bonus to the attack roll."
    },
    {
      name: "I See It Coming", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: true,
      summary: "Reaction: Ranged attack incoming · 1 Stress → roll d4, add to Evasion vs that attack",
      text: "When you're targeted by an attack made from beyond Melee range, you can mark a Stress to roll a d4 and gain a bonus to your Evasion equal to the result against the attack."
    },
    {
      name: "Untouchable", type: "Ability", recallCost: 1,
      cost: null,
      passive: true,
      statEffects: [{ stat: "evasion", amount: "halfAgility" }],
      summary: "Passive: +½ Agility to Evasion (permanent)",
      text: "Gain a bonus to your Evasion equal to half your Agility."
    },
    // Level 2
    {
      name: "Ferocity", type: "Ability", recallCost: 2,
      cost: { type: "hope", amount: 2 },
      passive: false,
      summary: "Cause adversary to mark HP · 2 Hope → +Evasion equal to HP marked · Lasts until next attack against you",
      text: "When you cause an adversary to mark 1 or more Hit Points, you can spend 2 Hope to increase your Evasion by the number of Hit Points they marked. This bonus lasts until after the next attack made against you."
    },
    {
      name: "Strategic Approach", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Tokens = Knowledge (on long rest) · Move within Close + attack → spend token: advantage on attack, ally clears Stress, or +d8 damage",
      text: "After a long rest, place a number of tokens equal to your Knowledge on this card (minimum 1). The first time you move within Close range of an adversary and make an attack against them, you can spend one token to choose one of the following options:\n• You make the attack with advantage.\n• You clear a Stress on an ally within Melee range of the adversary.\n• You add a d8 to your damage roll.\nWhen you take a long rest, clear all unspent tokens."
    },
    // Level 3
    {
      name: "Brace", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "When marking Armor Slot to reduce damage · Mark Stress → mark an additional Armor Slot",
      text: "When you mark an Armor Slot to reduce incoming damage, you can mark a Stress to mark an additional Armor Slot."
    },
    {
      name: "Tactician", type: "Ability", recallCost: 1,
      cost: null,
      passive: true,
      summary: "Passive: Help an Ally → they can spend Hope to add one of your Experiences to roll · Tag Team Roll: roll d20 as Hope Die",
      text: "When you Help an Ally, they can spend a Hope to add one of your Experiences to their roll alongside your advantage die.\nWhen making a Tag Team Roll, you can roll a d20 as your Hope Die."
    },
    // Level 4
    {
      name: "Boost", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "1 Stress · Boost off willing Close ally → aerial attack vs Far target · Advantage · +d10 damage · Land within Melee of target",
      text: "Mark a Stress to boost off a willing ally within Close range, fling yourself into the air, and perform an aerial attack against a target within Far range. You have advantage on the attack, add a d10 to the damage roll, and end your move within Melee range of the target."
    },
    {
      name: "Redirect", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "Ranged attack against you fails · Roll Proficiency d6s · On any 6: Mark Stress → redirect damage to Very Close adversary",
      text: "When an attack made against you from beyond Melee range fails, roll a number of d6s equal to your Proficiency. If any roll a 6, you can mark a Stress to redirect the attack to damage an adversary within Very Close range instead."
    },
    // Level 5
    {
      name: "Know Thy Enemy", type: "Ability", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Observe creature · Instinct Roll vs target · On success: 1 Hope → choose one info set: HP/Stress, Difficulty/thresholds, tactics/damage, or features · Also: Mark Stress → remove a GM Fear",
      text: "When observing a creature, you can make an Instinct Roll against them. On a success, spend a Hope and ask the GM for one set of information about the target from the following options:\n• Their unmarked Hit Points and Stress.\n• Their Difficulty and damage thresholds.\n• Their tactics and standard attack damage dice.\n• Their features and Experiences.\nAdditionally on a success, you can mark a Stress to remove a Fear from the GM's Fear Pool."
    },
    {
      name: "Signature Move", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Name and describe your move · Once per rest · Perform it as part of an action → roll d20 as Hope Die · On success: clear a Stress",
      text: "Name and describe your signature combat move. Once per rest, when you perform this signature move as part of an action you're taking, you can roll a d20 as your Hope Die. On a success, clear a Stress."
    },
  ],
  Codex: [
    {
      name: "Book of Ava", type: "Grimoire", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Power Push: Spellcast Roll · Melee · d10+2 magic · Knockback to Far\nTava's Armor: 1 Hope · Touch · +1 Armor Score until next rest\nIce Spike: Spellcast Roll (12) · Far · d6 physical",
      text: "Power Push: Make a Spellcast Roll against a target within Melee range. On a success, they're knocked back to Far range and take d10+2 magic damage using your Proficiency.\nTava's Armor: Spend a Hope to give a target you can touch a +1 bonus to their Armor Score until their next rest or you cast Tava's Armor again.\nIce Spike: Make a Spellcast Roll (12) to summon a large ice spike within Far range. If you use it as a weapon, make the Spellcast Roll against the target's Difficulty instead. On a success, deal d6 physical damage using your Proficiency."
    },
    {
      name: "Book of Illiat", type: "Grimoire", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Slumber: Spellcast Roll · Very Close · Asleep (until damage or GM spends Fear)\nArcane Barrage: Once per rest · X Hope → Xd6 magic · Close\nTelepathy: 1 Hope · Mental link with visible target until next rest",
      text: "Slumber: Make a Spellcast Roll against a target within Very Close range. On a success, they're Asleep until they take damage or the GM spends a Fear on their turn to clear this condition.\nArcane Barrage: Once per rest, spend any number of Hope and shoot magical projectiles at a target within Close range. Roll a number of d6s equal to the Hope spent and deal that much magic damage to the target.\nTelepathy: Spend a Hope to open a line of mental communication with one target you can see. This connection lasts until your next rest or you cast Telepathy again."
    },
    {
      name: "Book of Tyfar", type: "Grimoire", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Wild Flame: Spellcast Roll · Melee (up to 3 targets) · 2d6 magic · Each target marks Stress\nMagic Hand: Conjure hand at Far range\nMysterious Mist: Spellcast Roll (13) · Very Close · Heavy obscurement",
      text: "Wild Flame: Make a Spellcast Roll against up to three adversaries within Melee range. Targets you succeed against take 2d6 magic damage and must mark a Stress as flames erupt from your hand.\nMagic Hand: You conjure a magical hand with the same size and strength as your own within Far range.\nMysterious Mist: Make a Spellcast Roll (13) to cast a temporary thick fog within Very Close range. The fog heavily obscures this area and everything in it."
    },
    // Level 2
    {
      name: "Book of Sitil", type: "Grimoire", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Adjust Appearance: Magically shift appearance to avoid recognition\nParallela: 2 Hope → next attack hits additional target within range (one creature at a time)\nIllusion: Spellcast Roll (14) · Visual illusion within Close · Holds until observer within Melee",
      text: "Adjust Appearance: You magically shift your appearance and clothing to avoid recognition.\nParallela: Spend 2 Hope to cast this spell on yourself or an ally within Close range. The next time the target makes an attack, they can hit an additional target within range that their attack roll would succeed against. You can only hold this spell on one creature at a time.\nIllusion: Make a Spellcast Roll (14). On a success, create a temporary visual illusion no larger than you within Close range that lasts for as long as you look at it. It holds up to scrutiny until an observer is within Melee range."
    },
    {
      name: "Book of Vagras", type: "Grimoire", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Runic Lock: Spellcast Roll (15) · Touch closeable object · Once per rest → lock for chosen creatures only\nArcane Door: Spellcast Roll (13) · No Melee adversaries · 1 Hope → portal to Far point · Closes after one use\nReveal: Spellcast Roll · Reveal anything magically hidden within Close",
      text: "Runic Lock: Make a Spellcast Roll (15) on an object you're touching that can close (such as a lock, chest, or box). Once per rest on a success, you can lock the object so it can only be opened by creatures of your choice. Someone with access to magic and an hour of time to study the spell can break it.\nArcane Door: When you have no adversaries within Melee range, make a Spellcast Roll (13). On a success, spend a Hope to create a portal from where you are to a point within Far range you can see. It closes once a creature has passed through it.\nReveal: Make a Spellcast Roll. If there is anything magically hidden within Close range, it is revealed."
    },
    // Level 3
    {
      name: "Book of Korvax", type: "Grimoire", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Levitation: Spellcast Roll · Lift visible target, move within Close of original position\nRecant: 1 Hope · Melee target · Reaction Roll (15) · Fail: forget last minute of conversation\nRune Circle: Mark Stress · 2d12+4 magic to all Melee adversaries · Knockback to Very Close",
      text: "Levitation: Make a Spellcast Roll to temporarily lift a target you can see up into the air and move them within Close range of their original position.\nRecant: Spend a Hope to force a target within Melee range to make a Reaction Roll (15). On a failure, they forget the last minute of your conversation.\nRune Circle: Mark a Stress to create a temporary magical circle on the ground where you stand. All adversaries within Melee range, or who enter Melee range, take 2d12+4 magic damage and are knocked back to Very Close range."
    },
    {
      name: "Book of Norai", type: "Grimoire", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Mystic Tether: Spellcast Roll · Far · Restrained + mark Stress · Grounds flying targets\nFireball: Spellcast Roll · Very Far · Explosion hits target + Very Close area · Reaction Roll (13) · Fail: d20+5 magic · Success: half",
      text: "Mystic Tether: Make a Spellcast Roll against a target within Far range. On a success, they're temporarily Restrained and must mark a Stress. If you target a flying creature, this spell grounds and temporarily Restrains them.\nFireball: Make a Spellcast Roll against a target within Very Far range. On a success, hurl a sphere of fire toward them that explodes on impact. The target and all creatures within Very Close range of them must make a Reaction Roll (13). Targets who fail take d20+5 magic damage using your Proficiency. Targets who succeed take half damage."
    },
    // Level 4
    {
      name: "Book of Exota", type: "Grimoire", recallCost: 3,
      cost: null,
      passive: false,
      summary: "Repudiate: Reaction · Spellcast roll · Once per rest on success: interrupt magical effect\nCreate Construct: 1 Hope · Animate objects → construct obeys commands · Spellcast Roll to command · 2d10+3 physical · One at a time · Falls apart on any damage",
      text: "Repudiate: You can interrupt a magical effect taking place. Make a reaction roll using your Spellcast trait. Once per rest on a success, the effect stops and any consequences are avoided.\nCreate Construct: Spend a Hope to choose a group of objects around you and create an animated construct from them that obeys basic commands. Make a Spellcast Roll to command them to take action. When necessary, they share your Evasion and traits and their attacks deal 2d10+3 physical damage. You can only maintain one construct at a time, and they fall apart when they take any amount of damage."
    },
    {
      name: "Book of Grynn", type: "Grimoire", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Arcane Deflection: Once per long rest · 1 Hope → negate damage of attack on you or Very Close ally\nTime Lock: Target object within Far · Stops in time/space until next rest · Spellcast Roll to resist creature moving it\nWall of Flame: Spellcast Roll (15) · Temporary wall between two Far points · Passing through: 4d10+3 magic",
      text: "Arcane Deflection: Once per long rest, spend a Hope to negate the damage of an attack targeting you or an ally within Very Close range.\nTime Lock: Target an object within Far range. That object stops in time and space exactly where it is until your next rest. If a creature tries to move it, make a Spellcast Roll against them to maintain this spell.\nWall of Flame: Make a Spellcast Roll (15). On a success, create a temporary wall of magical flame between two points within Far range. All creatures in its path must choose a side to be on, and anything that subsequently passes through the wall takes 4d10+3 magic damage."
    },
    // Level 5
    {
      name: "Manifest Wall", type: "Spell", recallCost: 2,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Spellcast Roll (15) · Once per rest · 1 Hope → magical wall between two Far points · Up to 50ft high · Creatures shunted to chosen side · Lasts until next rest",
      text: "Make a Spellcast Roll (15). Once per rest on a success, spend a Hope to create a temporary magical wall between two points within Far range. It can be up to 50 feet high and form at any angle. Creatures or objects in its path are shunted to a side of your choice. The wall stays up until your next rest or you cast Manifest Wall again."
    },
    {
      name: "Teleport", type: "Spell", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Once per long rest · Spellcast Roll (16) · Teleport self + willing Close targets to visited place · Familiarity bonus: very well +3, frequent +1, infrequent ±0, once −2",
      text: "Once per long rest, you can instantly teleport yourself and any number of willing targets within Close range to a place you've been before. Choose one of the following options, then make a Spellcast Roll (16):\n• If you know the place very well, gain a +3 bonus.\n• If you've visited the place frequently, gain a +1 bonus.\n• If you've visited the place infrequently, gain no modifier.\n• If you've only been there once, gain a −2 penalty.\nOn a success, you appear where you were intending to go. On a failure, you appear off course, with the range of failure determining how far off course."
    },
  ],
  Grace: [
    {
      name: "Deft Deceiver", type: "Ability", recallCost: 0,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "1 Hope · Advantage on deception roll",
      text: "Spend a Hope to gain advantage on a roll to deceive or trick someone into believing a lie you tell them."
    },
    {
      name: "Enrapture", type: "Spell", recallCost: 0,
      cost: null, optionalCost: { type: "stress", amount: 1, label: "Target marks Stress" },
      passive: false,
      summary: "Spellcast Roll · Close · Enraptured · Optional: 1 Stress (once/rest) → target marks Stress",
      text: "Make a Spellcast Roll against a target within Close range. On a success, they become temporarily Enraptured. While Enraptured, a target's attention is fixed on you, narrowing their field of view and drowning out any sound but your voice. Once per rest on a success, you can mark a Stress to force the Enraptured target to mark a Stress as well."
    },
    {
      name: "Inspirational Words", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Token pool = Presence (refills on long rest) · Spend 1 token → ally: clear Stress, clear HP, or gain Hope",
      text: "Your speech is imbued with power. After a long rest, place a number of tokens on this card equal to your Presence. When you speak with an ally, you can spend a token from this card to give them one benefit:\n• Your ally clears a Stress.\n• Your ally clears a Hit Point.\n• Your ally gains a Hope.\nWhen you take a long rest, clear all unspent tokens."
    },
    // Level 2
    {
      name: "Tell No Lies", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll · Very Close · Target can't lie while within Close · Refusing to answer = mark Stress + effect ends · Target typically unaware",
      text: "Make a Spellcast Roll against a target within Very Close range. On a success, they can't lie to you while they remain within Close range, but they are not compelled to speak. If you ask them a question and they refuse to answer, they must mark a Stress and the effect ends. The target is typically unaware this spell has been cast on them until it causes them to utter the truth."
    },
    {
      name: "Troublemaker", type: "Ability", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Taunt/provoke within Far · Presence Roll · Once per rest on success: roll Proficiency d4s · Target marks Stress = highest result",
      text: "When you taunt or provoke a target within Far range, make a Presence Roll against them. Once per rest on a success, roll a number of d4s equal to your Proficiency. The target must mark Stress equal to the highest result rolled."
    },
    // Level 3
    {
      name: "Hypnotic Shimmer", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll · Close (all in front) · Once per rest on success: Stunned + mark Stress · Stunned: no reactions or actions until cleared",
      text: "Make a Spellcast Roll against all adversaries in front of you within Close range. Once per rest on a success, create an illusion of flashing colors and lights that temporarily Stuns targets you succeed against and forces them to mark a Stress. While Stunned, they can't use reactions and can't take any other actions until they clear this condition."
    },
    {
      name: "Invisibility", type: "Spell", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "Spellcast Roll (10) · 1 Stress · Self or Melee ally → Invisible · Tokens = Spellcast · Each action costs 1 token · One target at a time",
      text: "Make a Spellcast Roll (10). On a success, mark a Stress and choose yourself or an ally within Melee range to become Invisible. An Invisible creature can't be seen except through magical means and attack rolls against them are made with disadvantage. Place a number of tokens on this card equal to your Spellcast trait. When the Invisible creature takes an action, spend a token from this card. After the action that spends the last token is resolved, the effect ends.\nYou can only hold Invisibility on one creature at a time."
    },
    // Level 4
    {
      name: "Soothing Speech", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Short rest · Comfort ally while using Tend to Wounds → +1 HP cleared on them · You also clear 2 HP",
      text: "During a short rest, when you take the time to comfort another character while using the Tend to Wounds downtime move on them, clear an additional Hit Point on that character. When you do, you also clear 2 Hit Points."
    },
    {
      name: "Through Your Eyes", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Choose target within Very Far · See and hear through their senses freely · Lasts until you cast another spell or next rest",
      text: "Choose a target within Very Far range. You can see through their eyes and hear through their ears. You can transition between using your own senses or the target's freely until you cast another spell or until your next rest."
    },
    // Level 5
    {
      name: "Thought Delver", type: "Spell", recallCost: 2,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "1 Hope → read vague surface thoughts of Far target · Spellcast Roll vs target → deeper hidden thoughts · Fear: target may notice",
      text: "You can peek into the minds of others. Spend a Hope to read the vague surface thoughts of a target within Far range. Make a Spellcast Roll against the target to delve for deeper, more hidden thoughts.\nOn a roll with Fear, the target might, at the GM's discretion, become aware that you're reading their thoughts."
    },
    {
      name: "Words of Discord", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll (13) · Melee target · On success: mark Stress + must attack another adversary · −5 penalty to reuse on same target",
      text: "Whisper words of discord to an adversary within Melee range and make a Spellcast Roll (13). On a success, the target must mark a Stress and make an attack against another adversary instead of against you or your allies.\nOnce this attack is over, the target realizes what happened. The next time you cast Words of Discord on them, gain a −5 penalty to the Spellcast Roll."
    },
  ],
  Midnight: [
    {
      name: "Pick and Pull", type: "Ability", recallCost: 0,
      cost: null,
      passive: true,
      summary: "Passive: Advantage on rolls to pick locks, disarm traps, or steal",
      text: "You have advantage on action rolls to pick nonmagical locks, disarm nonmagical traps, or steal items from a target (either through stealth or by force)."
    },
    {
      name: "Rain of Blades", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "1 Hope · Spellcast Roll · Very Close (all targets) · d8+2 magic · Vulnerable targets: +1d8",
      text: "Spend a Hope to make a Spellcast Roll and conjure throwing blades that strike out at all targets within Very Close range. Targets you succeed against take d8+2 magic damage using your Proficiency.\nIf a target you hit is Vulnerable, they take an extra 1d8 damage."
    },
    {
      name: "Uncanny Disguise", type: "Spell", recallCost: 0,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "1 Stress · Disguise as any humanoid · Tokens = Spellcast · Each action costs 1 token · Advantage vs scrutiny",
      text: "When you have a few minutes to prepare, you can mark a Stress to don the facade of any humanoid you can picture clearly in your mind. While disguised, you have advantage on Presence Rolls to avoid scrutiny.\nPlace a number of tokens equal to your Spellcast trait on this card. When you take an action while disguised, spend a token from this card. After the action that spends the last token is resolved, the disguise drops."
    },
    // Level 2
    {
      name: "Midnight Spirit", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "1 Hope · Summon spirit until next rest · Attack: Spellcast Roll · Very Far · Spellcast d6s magic · Spirit dissipates · One at a time",
      text: "Spend a Hope to summon a humanoid-sized spirit that can move or carry things for you until your next rest.\nYou can also send it to attack an adversary. When you do, make a Spellcast Roll against a target within Very Far range. On a success, the spirit moves into Melee range with that target. Roll a number of d6s equal to your Spellcast trait and deal that much magic damage to the target. The spirit then dissipates. You can only have one spirit at a time."
    },
    {
      name: "Shadowbind", type: "Spell", recallCost: 0,
      cost: null,
      passive: false,
      summary: "Spellcast Roll · Very Close (all targets) · Restrained (shadow binds them in place)",
      text: "Make a Spellcast Roll against all adversaries within Very Close range. Targets you succeed against are temporarily Restrained as their shadow binds them in place."
    },
    // Level 3
    {
      name: "Chokehold", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "Position behind similar-sized creature · 1 Stress → Vulnerable · Attacks on Vulnerable target: +2d6 damage",
      text: "When you position yourself behind a creature who's about your size, you can mark a Stress to pull them into a chokehold, making them temporarily Vulnerable.\nWhen a creature attacks a target who is Vulnerable in this way, they deal an extra 2d6 damage."
    },
    {
      name: "Veil of Night", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll (13) · Curtain of darkness between two Far points · Only you see through it · Hidden to adversaries beyond · Advantage on attacks through darkness · Lasts until next spell",
      text: "Make a Spellcast Roll (13). On a success, you can create a temporary curtain of darkness between two points within Far range. Only you can see through this darkness. You're considered Hidden to adversaries on the other side of the veil, and you have advantage on attacks you make through the darkness. The veil remains until you cast another spell."
    },
    // Level 4
    {
      name: "Stealth Expertise", type: "Ability", recallCost: 0,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "Roll Fear while moving unnoticed · 1 Stress → roll Hope instead · Close ally also rolling Fear: 1 Stress → change their result to Hope",
      text: "When you roll with Fear while attempting to move unnoticed through a dangerous area, you can mark a Stress to roll with Hope instead.\nIf an ally within Close range is also attempting to move unnoticed and rolls with Fear, you can mark a Stress to change their result to a roll with Hope."
    },
    {
      name: "Glyph of Nightfall", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Spellcast Roll · Very Close · 1 Hope → dark glyph on target · Temporarily reduces target's Difficulty by Knowledge (min 1)",
      text: "Make a Spellcast Roll against a target within Very Close range. On a success, spend a Hope to conjure a dark glyph upon their body that exposes their weak points, temporarily reducing the target's Difficulty by a value equal to your Knowledge (minimum 1)."
    },
    // Level 5
    {
      name: "Hush", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Spellcast Roll · Close · 1 Hope → Silenced aura on target, encompasses Very Close area, follows them · Silenced: no noise or spells · Ends on GM Fear spend, recast, or you take Major damage",
      text: "Make a Spellcast Roll against a target within Close range. On a success, spend a Hope to conjure suppressive magic around the target that encompasses everything within Very Close range of them and follows them as they move.\nThe target and anything within the area is Silenced until the GM spends a Fear on their turn to clear this condition, you cast Hush again, or you take Major damage. While Silenced, they can't make noise and can't cast spells."
    },
    {
      name: "Phantom Retreat", type: "Spell", recallCost: 2,
      cost: { type: "hope", amount: 2 },
      passive: false,
      summary: "1 Hope → mark current location · Later before next rest: 1 Hope → teleport back to marked spot · Ends after reappearing",
      text: "Spend a Hope to activate Phantom Retreat where you're currently standing. Spend another Hope at any time before your next rest to disappear from where you are and reappear where you were standing when you activated Phantom Retreat. This spell ends after you reappear."
    },
  ],
  Sage: [
    {
      name: "Gifted Tracker", type: "Ability", recallCost: 0,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "X Hope → ask GM X tracking questions · +1 Evasion vs tracked creatures when encountered",
      text: "When you're tracking a specific creature or group of creatures based on signs of their passage, you can spend any number of Hope and ask the GM that many questions:\n• What direction did they go?\n• How long ago did they pass through?\n• What were they doing in this location?\n• How many of them were here?\nWhen you encounter creatures you've tracked in this way, gain a +1 bonus to your Evasion against them."
    },
    {
      name: "Nature's Tongue", type: "Ability", recallCost: 0,
      cost: null, optionalCost: { type: "hope", amount: 1, label: "+2 Spellcast bonus" },
      passive: false,
      summary: "Instinct Roll (12) · Speak with plants/animals · Optional: 1 Hope → +2 Spellcast bonus",
      text: "You can speak the language of the natural world. When you want to speak to the plants and animals around you, make an Instinct Roll (12). On a success, they'll give you the information they know. On a roll with Fear, their knowledge might be limited or come at a cost.\nAdditionally, before you make a Spellcast Roll while within a natural environment, you can spend a Hope to gain a +2 bonus to the roll."
    },
    {
      name: "Vicious Entangle", type: "Spell", recallCost: 1,
      cost: null, optionalCost: { type: "hope", amount: 1, label: "Restrain another" },
      passive: false,
      summary: "Spellcast Roll · Far · 1d8+1 physical · Restrained · Optional: 1 Hope → Restrain additional Very Close target",
      text: "Make a Spellcast Roll against a target within Far range. On a success, roots and vines reach out from the ground, dealing 1d8+1 physical damage and temporarily Restraining the target.\nAdditionally on a success, you can spend a Hope to temporarily Restrain another adversary within Very Close range of your target."
    },
    // Level 2
    {
      name: "Conjure Swarm", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Armored Beetles: Mark Stress → reduce next damage by one threshold · 1 Hope to keep after damage\nFire Flies: Spellcast Roll · Close (all) · 1 Hope → 2d8+3 magic",
      text: "Tekaira Armored Beetles: Mark a Stress to conjure armored beetles that encircle you. When you next take damage, reduce the severity by one threshold. You can spend a Hope to keep the beetles conjured after taking damage.\nFire Flies: Make a Spellcast Roll against all adversaries within Close range. Spend a Hope to deal 2d8+3 magic damage to targets you succeeded against."
    },
    {
      name: "Natural Familiar", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "1 Hope (2 for flying) · Summon familiar until next rest · Communicate + Spellcast Roll to command · Mark Stress → see through eyes · Melee familiar: +d6 to damage",
      text: "Spend a Hope to summon a small nature spirit or forest critter to your side until your next rest, you cast Natural Familiar again, or the familiar is targeted by an attack. If you spend an additional Hope, you can summon a familiar that flies. You can communicate with them, make a Spellcast Roll to command them to perform simple tasks, and mark a Stress to see through their eyes.\nWhen you deal damage to an adversary within Melee range of your familiar, you add a d6 to your damage roll."
    },
    // Level 3
    {
      name: "Corrosive Projectile", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll · Far · d6+4 magic · Mark 2+ Stress → permanently Corroded (−1 Difficulty per 2 Stress spent, stackable)",
      text: "Make a Spellcast Roll against a target within Far range. On a success, deal d6+4 magic damage using your Proficiency. Additionally, mark 2 or more Stress to make them permanently Corroded. While a target is Corroded, they gain a −1 penalty to their Difficulty for every 2 Stress you spent. This condition can stack."
    },
    {
      name: "Towering Stalk", type: "Spell", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "Once per rest · Conjure climbable stalk within Close (height up to Far) · Optional: 1 Stress + Spellcast Roll → lift Close adversaries and drop for d8 physical",
      text: "Once per rest, you can conjure a thick, twisting stalk within Close range that can be easily climbed. Its height can grow up to Far range.\nMark a Stress to use this spell as an attack. Make a Spellcast Roll against an adversary or group of adversaries within Close range. The erupting stalk lifts targets you succeed against into the air and drops them, dealing d8 physical damage using your Proficiency."
    },
    // Level 4
    {
      name: "Death Grip", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll · Close · On success: Restrained + choose one — pull to Melee, force 2 Stress, or all between you take 3d6+2 physical (Reaction Roll 13)",
      text: "Make a Spellcast Roll against a target within Close range and choose one of the following options:\n• You pull the target into Melee range or pull yourself into Melee range of them.\n• You constrict the target and force them to mark 2 Stress.\n• All adversaries between you and the target must succeed on a Reaction Roll (13) or be hit by vines, taking 3d6+2 physical damage.\nOn a success, vines reach out from your hands, causing the chosen effect and temporarily Restraining the target."
    },
    {
      name: "Healing Field", type: "Spell", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Once per long rest · Burst of healing plants within Close · You + allies clear 1 HP · Optional: 2 Hope → clear 2 HP instead",
      text: "Once per long rest, you can conjure a field of healing plants around you. Everywhere within Close range of you bursts to life with vibrant nature, allowing you and all allies in the area to clear a Hit Point.\nSpend 2 Hope to allow you and all allies to clear 2 Hit Points instead."
    },
    // Level 5
    {
      name: "Thorn Skin", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Once per rest · 1 Hope → sprout thorns · Tokens = Spellcast · On taking damage: spend tokens → roll that many d6s · Reduce damage by total · If attacker in Melee: deal that amount back",
      text: "Once per rest, spend a Hope to sprout thorns all over your body. When you do, place a number of tokens equal to your Spellcast trait on this card. When you take damage, you can spend any number of tokens to roll that number of d6s. Add the results together and reduce the incoming damage by that amount. If you're within Melee range of the attacker, deal that amount of damage back to them.\nWhen you take a rest, clear all unspent tokens."
    },
    {
      name: "Wild Fortress", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 2 },
      passive: false,
      summary: "Spellcast Roll (13) · 2 Hope → dome barricade · You + 1 ally inside can't be targeted or attack · Dome: thresholds 15/30 · Falls at 3 HP marked",
      text: "Make a Spellcast Roll (13). On a success, spend 2 Hope to grow a natural barricade in the shape of a dome that you and one ally can take cover within. While inside the dome, a creature can't be targeted by attacks and can't make attacks. Attacks made against the dome automatically succeed. The dome has the following damage thresholds and lasts until it marks 3 Hit Points.\nThresholds: 15/30"
    },
  ],
  Splendor: [
    {
      name: "Bolt Beacon", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Spellcast Roll · Far · d8+2 magic · 1 Hope on success · Vulnerable + glowing",
      text: "Make a Spellcast Roll against a target within Far range. On a success, spend a Hope to send a bolt of shimmering light toward them, dealing d8+2 magic damage using your Proficiency. The target becomes temporarily Vulnerable and glows brightly until this condition is cleared."
    },
    {
      name: "Mending Touch", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 2 },
      passive: false,
      summary: "2 Hope · Touch · Clear 1 HP or 1 Stress · Takes a few minutes · Once/long rest: bonding moment → 2 HP or 2 Stress",
      text: "You lay your hands upon a creature and channel healing magic to close their wounds. When you can take a few minutes to focus on the target you're helping, you can spend 2 Hope to clear a Hit Point or a Stress on them.\nOnce per long rest, when you spend this healing time learning something new about them or revealing something about yourself, you can clear 2 Hit Points or 2 Stress on them instead."
    },
    {
      name: "Reassurance", type: "Ability", recallCost: 0,
      cost: null,
      passive: true,
      summary: "Reaction: After ally's action roll, before consequences · Ally rerolls Duality Dice · Once per rest",
      text: "Once per rest, after an ally attempts an action roll but before the consequences take place, you can offer assistance or words of support. When you do, your ally can reroll their dice."
    },
    // Level 2
    {
      name: "Final Words", type: "Spell", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Spellcast Roll (13) · Infuse corpse with life · Hope: 3 questions · Fear: 1 question · Failure or done: body turns to dust",
      text: "You can infuse a corpse with a moment of life to speak with it. Make a Spellcast Roll (13). On a success with Hope, the corpse answers up to three questions. On a success with Fear, the corpse answers one question. The corpse answers truthfully, but it can't impart information it didn't know in life. On a failure, or once the corpse has finished answering your questions, the body turns to dust."
    },
    {
      name: "Healing Hands", type: "Spell", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: false,
      summary: "Spellcast Roll (13) · Melee (other creature) · Success + Stress: clear 2 HP or 2 Stress · Failure + Stress: clear 1 HP or 1 Stress · Once per long rest per target",
      text: "Make a Spellcast Roll (13) and target a creature other than yourself within Melee range. On a success, mark a Stress to clear 2 Hit Points or 2 Stress on the target. On a failure, mark a Stress to clear a Hit Point or a Stress on the target. You can't heal the same target again until your next long rest."
    },
    // Level 3
    {
      name: "Second Wind", type: "Ability", recallCost: 2,
      cost: null,
      passive: false,
      summary: "Once per rest · Succeed on attack → clear 3 Stress or 1 HP · Hope success: also clear 3 Stress or 1 HP on Close ally",
      text: "Once per rest, when you succeed on an attack against an adversary, you can clear 3 Stress or a Hit Point. On a success with Hope, you also clear 3 Stress or a Hit Point on an ally within Close range of you."
    },
    {
      name: "Voice of Reason", type: "Ability", recallCost: 1,
      cost: null,
      passive: true,
      summary: "Passive: Advantage on rolls to de-escalate violence or lead others · All Stress marked: +1 Proficiency to damage rolls",
      text: "You speak with an unmatched power and authority. You have advantage on action rolls to de-escalate violent situations or convince someone to follow your lead.\nAdditionally, you're emboldened in moments of duress. When all of your Stress slots are marked, you gain a +1 bonus to your Proficiency for damage rolls."
    },
    // Level 4
    {
      name: "Divination", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 3 },
      passive: false,
      summary: "Once per long rest · 3 Hope → ask one yes/no question about near-future event, person, place, or situation",
      text: "Once per long rest, spend 3 Hope to reach out to the forces beyond and ask one \"yes or no\" question about an event, person, place, or situation in the near future. For a moment, the present falls away and you see the answer before you."
    },
    {
      name: "Life Ward", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 3 },
      passive: false,
      summary: "3 Hope · Close ally marked with glowing sigil · Next death move: clear HP instead · Ends on save, recast, or long rest",
      text: "Spend 3 Hope and choose an ally within Close range. They are marked with a glowing sigil of protection. When this ally would make a death move, they clear a Hit Point instead.\nThis effect ends when it saves the target from a death move, you cast Life Ward on another target, or you take a long rest."
    },
    // Level 5
    {
      name: "Shape Material", type: "Spell", recallCost: 1,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "1 Hope · Touch natural material (stone/ice/wood) · Shape area up to your size · Affects material within Close of touch point",
      text: "Spend a Hope to shape a section of natural material you're touching (such as stone, ice, or wood) to suit your purpose. The area of the material can be no larger than you. For example, you can form a rudimentary tool or create a door.\nYou can only affect the material within Close range of where you're touching it."
    },
    {
      name: "Smite", type: "Spell", recallCost: 2,
      cost: { type: "hope", amount: 3 },
      passive: false,
      summary: "Once per rest · 3 Hope → charge smite · Next successful weapon attack: double damage roll · Deals magic damage regardless of weapon type",
      text: "Once per rest, spend 3 Hope to charge your powerful smite. When you next successfully attack with a weapon, double the result of your damage roll. This attack deals magic damage regardless of the weapon's damage type."
    },
  ],
  Valor: [
    {
      name: "Bare Bones", type: "Ability", recallCost: 0,
      cost: null,
      passive: true,
      statEffects: [
        { stat: "thresholds", type: "override", condition: "unarmored" },
        { stat: "armorScore", amount: "3+strength", condition: "unarmored" },
      ],
      summary: "Passive: Unarmored → Armor = 3+STR · Thresholds: T1 9/19 · T2 11/24 · T3 13/31 · T4 15/38",
      text: "When you choose not to equip armor, you have a base Armor Score of 3 + your Strength and use the following as your base damage thresholds:\n• Tier 1: 9/19\n• Tier 2: 11/24\n• Tier 3: 13/31\n• Tier 4: 15/38"
    },
    {
      name: "Forceful Push", type: "Ability", recallCost: 0,
      cost: null, optionalCost: { type: "hope", amount: 1, label: "Make Vulnerable" },
      passive: false,
      summary: "Attack Roll · Melee · Weapon damage (+d6 on Hope) · Knockback to Close · Optional: 1 Hope → Vulnerable",
      text: "Make an attack with your primary weapon against a target within Melee range. On a success, you deal damage and knock them back to Close range. On a success with Hope, add a d6 to your damage roll.\nAdditionally, you can spend a Hope to make them temporarily Vulnerable."
    },
    {
      name: "I Am Your Shield", type: "Ability", recallCost: 1,
      cost: { type: "stress", amount: 1 },
      passive: true,
      summary: "Reaction: Ally within Very Close takes damage · 1 Stress → redirect attack to self · Can mark Armor Slots",
      text: "When an ally within Very Close range would take damage, you can mark a Stress to stand in the way and make yourself the target of the attack instead. When you take damage from this attack, you can mark any number of Armor Slots."
    },
    // Level 2
    {
      name: "Body Basher", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Passive: On successful Melee weapon attack → +Strength to damage roll",
      text: "You use the full force of your body in a fight. On a successful attack using a weapon with a Melee range, gain a bonus to your damage roll equal to your Strength."
    },
    {
      name: "Bold Presence", type: "Ability", recallCost: 0,
      cost: { type: "hope", amount: 1 },
      passive: false,
      summary: "Presence Roll · 1 Hope → +Strength to roll · Once per rest: describe bold presence → avoid gaining a condition",
      text: "When you make a Presence Roll, you can spend a Hope to add your Strength to the roll.\nAdditionally, once per rest when you would gain a condition, you can describe how your bold presence aids you in the situation and avoid gaining the condition."
    },
    // Level 3
    {
      name: "Critical Inspiration", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Once per rest · Critical success on attack → all Very Close allies can clear Stress or gain Hope",
      text: "Once per rest, when you critically succeed on an attack, all allies within Very Close range can clear a Stress or gain a Hope."
    },
    {
      name: "Lean On Me", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Once per long rest · Console/inspire ally who failed a roll → both clear 2 Stress",
      text: "Once per long rest, when you console or inspire an ally who failed an action roll, you can both clear 2 Stress."
    },
    // Level 4
    {
      name: "Goad Them On", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Taunt target within Close · Presence Roll · On success: mark Stress + next GM spotlight they must attack you with disadvantage",
      text: "Describe how you taunt a target within Close range, then make a Presence Roll against them. On a success, the target must mark a Stress, and the next time the GM spotlights them, they must target you with an attack, which they make with disadvantage."
    },
    {
      name: "Support Tank", type: "Ability", recallCost: 2,
      cost: { type: "hope", amount: 2 },
      passive: false,
      summary: "Close ally fails a roll · 2 Hope → ally rerolls Hope or Fear Die",
      text: "When an ally within Close range fails a roll, you can spend 2 Hope to allow them to reroll either their Hope or Fear Die."
    },
    // Level 5
    {
      name: "Armorer", type: "Ability", recallCost: 1,
      cost: null,
      passive: true,
      statEffects: [{ stat: "armorScore", amount: 1, condition: "armored" }],
      summary: "Passive: While wearing armor → +1 Armor Score · During rest, repair armor downtime move → allies also clear an Armor Slot",
      text: "While you're wearing armor, gain a +1 bonus to your Armor Score.\nDuring a rest, when you choose to repair your armor as a downtime move, your allies also clear an Armor Slot."
    },
    {
      name: "Rousing Strike", type: "Ability", recallCost: 1,
      cost: null,
      passive: false,
      summary: "Once per rest · Critical success on attack → you + all allies who see or hear you clear 1 HP or 1d4 Stress",
      text: "Once per rest, when you critically succeed on an attack, you and all allies who can see or hear you can clear a Hit Point or 1d4 Stress."
    },
  ],
};

const DOMAIN_COLORS = {
  Arcana: "#a855f7", Blade: "#ef4444", Bone: "#f97316",
  Codex: "#3b82f6", Grace: "#ec4899", Midnight: "#6366f1",
  Sage: "#22c55e", Splendor: "#facc15", Valor: "#f59e0b",
};
