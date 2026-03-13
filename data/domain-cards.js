const DOMAIN_CARDS = {
  Arcana: [
    {
      name: "Rune Ward", type: "Spell", recallCost: 0,
      text: "You have a deeply personal trinket that can be infused with protective magic and held as a ward by you or an ally. Describe what it is and why it's important to you. The ward's holder can spend a Hope to reduce incoming damage by 1d8.\nIf the Ward Die result is 8, the ward's power ends after it reduces damage this turn. It can be recharged for free on your next rest."
    },
    {
      name: "Unleash Chaos", type: "Spell", recallCost: 1,
      text: "At the beginning of a session, place a number of tokens equal to your Spellcast trait on this card.\nMake a Spellcast Roll against a target within Far range and spend any number of tokens to channel raw energy to unleash against them. On a success, roll a number of d10s equal to the tokens you spent and deal that much magic damage to the target. Mark a Stress to replenish this card with tokens (up to your Spellcast trait). At the end of each session, clear all unspent tokens."
    },
    {
      name: "Wall Walk", type: "Spell", recallCost: 1,
      text: "Spend a Hope to allow a creature you can touch to climb on walls and ceilings as easily as walking on the ground. This lasts until the end of the scene or you cast Wall Walk again."
    },
  ],
  Blade: [
    {
      name: "Get Back Up", type: "Ability", recallCost: 1,
      text: "When you take Severe damage, you can mark a Stress to reduce the severity by one threshold."
    },
    {
      name: "Not Good Enough", type: "Ability", recallCost: 1,
      text: "When you roll your damage dice, you can reroll any 1s or 2s."
    },
    {
      name: "Whirlwind", type: "Ability", recallCost: 0,
      text: "When you make a successful attack against a target within Very Close range, you can spend a Hope to use the attack against all other targets within Very Close range. All additional adversaries you succeed against with this ability take half damage."
    },
  ],
  Bone: [
    {
      name: "Deft Maneuvers", type: "Ability", recallCost: 0,
      text: "Once per rest, mark a Stress to sprint anywhere within Far range without making an Agility Roll to get there.\nIf you end this movement within Melee range of an adversary and immediately make an attack against them, gain a +1 bonus to the attack roll."
    },
    {
      name: "I See It Coming", type: "Ability", recallCost: 1,
      text: "When you're targeted by an attack made from beyond Melee range, you can mark a Stress to roll a d4 and gain a bonus to your Evasion equal to the result against the attack."
    },
    {
      name: "Untouchable", type: "Ability", recallCost: 1,
      text: "Gain a bonus to your Evasion equal to half your Agility."
    },
  ],
  Codex: [
    {
      name: "Book of Ava", type: "Grimoire", recallCost: 2,
      text: "Power Push: Make a Spellcast Roll against a target within Melee range. On a success, they're knocked back to Far range and take d10+2 magic damage using your Proficiency.\nTava's Armor: Spend a Hope to give a target you can touch a +1 bonus to their Armor Score until their next rest or you cast Tava's Armor again.\nIce Spike: Make a Spellcast Roll (12) to summon a large ice spike within Far range. If you use it as a weapon, make the Spellcast Roll against the target's Difficulty instead. On a success, deal d6 physical damage using your Proficiency."
    },
    {
      name: "Book of Illiat", type: "Grimoire", recallCost: 2,
      text: "Slumber: Make a Spellcast Roll against a target within Very Close range. On a success, they're Asleep until they take damage or the GM spends a Fear on their turn to clear this condition.\nArcane Barrage: Once per rest, spend any number of Hope and shoot magical projectiles at a target within Close range. Roll a number of d6s equal to the Hope spent and deal that much magic damage to the target.\nTelepathy: Spend a Hope to open a line of mental communication with one target you can see. This connection lasts until your next rest or you cast Telepathy again."
    },
    {
      name: "Book of Tyfar", type: "Grimoire", recallCost: 2,
      text: "Wild Flame: Make a Spellcast Roll against up to three adversaries within Melee range. Targets you succeed against take 2d6 magic damage and must mark a Stress as flames erupt from your hand.\nMagic Hand: You conjure a magical hand with the same size and strength as your own within Far range.\nMysterious Mist: Make a Spellcast Roll (13) to cast a temporary thick fog within Very Close range. The fog heavily obscures this area and everything in it."
    },
  ],
  Grace: [
    {
      name: "Deft Deceiver", type: "Ability", recallCost: 0,
      text: "Spend a Hope to gain advantage on a roll to deceive or trick someone into believing a lie you tell them."
    },
    {
      name: "Enrapture", type: "Spell", recallCost: 0,
      text: "Make a Spellcast Roll against a target within Close range. On a success, they become temporarily Enraptured. While Enraptured, a target's attention is fixed on you, narrowing their field of view and drowning out any sound but your voice. Once per rest on a success, you can mark a Stress to force the Enraptured target to mark a Stress as well."
    },
    {
      name: "Inspirational Words", type: "Ability", recallCost: 1,
      text: "Your speech is imbued with power. After a long rest, place a number of tokens on this card equal to your Presence. When you speak with an ally, you can spend a token from this card to give them one benefit:\n• Your ally clears a Stress.\n• Your ally clears a Hit Point.\n• Your ally gains a Hope.\nWhen you take a long rest, clear all unspent tokens."
    },
  ],
  Midnight: [
    {
      name: "Pick and Pull", type: "Ability", recallCost: 0,
      text: "You have advantage on action rolls to pick nonmagical locks, disarm nonmagical traps, or steal items from a target (either through stealth or by force)."
    },
    {
      name: "Rain of Blades", type: "Spell", recallCost: 1,
      text: "Spend a Hope to make a Spellcast Roll and conjure throwing blades that strike out at all targets within Very Close range. Targets you succeed against take d8+2 magic damage using your Proficiency.\nIf a target you hit is Vulnerable, they take an extra 1d8 damage."
    },
    {
      name: "Uncanny Disguise", type: "Spell", recallCost: 0,
      text: "When you have a few minutes to prepare, you can mark a Stress to don the facade of any humanoid you can picture clearly in your mind. While disguised, you have advantage on Presence Rolls to avoid scrutiny.\nPlace a number of tokens equal to your Spellcast trait on this card. When you take an action while disguised, spend a token from this card. After the action that spends the last token is resolved, the disguise drops."
    },
  ],
  Sage: [
    {
      name: "Gifted Tracker", type: "Ability", recallCost: 0,
      text: "When you're tracking a specific creature or group of creatures based on signs of their passage, you can spend any number of Hope and ask the GM that many questions:\n• What direction did they go?\n• How long ago did they pass through?\n• What were they doing in this location?\n• How many of them were here?\nWhen you encounter creatures you've tracked in this way, gain a +1 bonus to your Evasion against them."
    },
    {
      name: "Nature's Tongue", type: "Ability", recallCost: 0,
      text: "You can speak the language of the natural world. When you want to speak to the plants and animals around you, make an Instinct Roll (12). On a success, they'll give you the information they know. On a roll with Fear, their knowledge might be limited or come at a cost.\nAdditionally, before you make a Spellcast Roll while within a natural environment, you can spend a Hope to gain a +2 bonus to the roll."
    },
    {
      name: "Vicious Entangle", type: "Spell", recallCost: 1,
      text: "Make a Spellcast Roll against a target within Far range. On a success, roots and vines reach out from the ground, dealing 1d8+1 physical damage and temporarily Restraining the target.\nAdditionally on a success, you can spend a Hope to temporarily Restrain another adversary within Very Close range of your target."
    },
  ],
  Splendor: [
    {
      name: "Bolt Beacon", type: "Spell", recallCost: 1,
      text: "Make a Spellcast Roll against a target within Far range. On a success, spend a Hope to send a bolt of shimmering light toward them, dealing d8+2 magic damage using your Proficiency. The target becomes temporarily Vulnerable and glows brightly until this condition is cleared."
    },
    {
      name: "Mending Touch", type: "Spell", recallCost: 1,
      text: "You lay your hands upon a creature and channel healing magic to close their wounds. When you can take a few minutes to focus on the target you're helping, you can spend 2 Hope to clear a Hit Point or a Stress on them.\nOnce per long rest, when you spend this healing time learning something new about them or revealing something about yourself, you can clear 2 Hit Points or 2 Stress on them instead."
    },
    {
      name: "Reassurance", type: "Ability", recallCost: 0,
      text: "Once per rest, after an ally attempts an action roll but before the consequences take place, you can offer assistance or words of support. When you do, your ally can reroll their dice."
    },
  ],
  Valor: [
    {
      name: "Bare Bones", type: "Ability", recallCost: 0,
      text: "When you choose not to equip armor, you have a base Armor Score of 3 + your Strength and use the following as your base damage thresholds:\n• Tier 1: 9/19\n• Tier 2: 11/24\n• Tier 3: 13/31\n• Tier 4: 15/38"
    },
    {
      name: "Forceful Push", type: "Ability", recallCost: 0,
      text: "Make an attack with your primary weapon against a target within Melee range. On a success, you deal damage and knock them back to Close range. On a success with Hope, add a d6 to your damage roll.\nAdditionally, you can spend a Hope to make them temporarily Vulnerable."
    },
    {
      name: "I Am Your Shield", type: "Ability", recallCost: 1,
      text: "When an ally within Very Close range would take damage, you can mark a Stress to stand in the way and make yourself the target of the attack instead. When you take damage from this attack, you can mark any number of Armor Slots."
    },
  ],
  // ── THE VOID v1.5 — Custom Domains ─────────────────────────────
  Blood: [
    {
      name: "Lifeblood Talisman", type: "Spell", recallCost: 0,
      text: "Mark a Hit Point to conjure a talisman infused with your life essence. The talisman appears in your hand, and whoever carries it gains the following benefit: whenever the bearer marks 2 or more Hit Points, they can spend a Hope to reduce the number of Hit Points marked by 1.\nThe talisman disappears if you have no Hit Points marked or you use this spell again."
    },
    {
      name: "Brand of Castigation", type: "Spell", recallCost: 1,
      text: "When you deal damage to a creature, mark a Stress to sear a red, magical mark on them. Until this mark disappears, you always know the direction of the marked creature relative to you, and that creature marks a Stress each time it deals damage to you or an ally of yours within Very Close range of you. The mark disappears when you use this spell again."
    },
    {
      name: "Blood Spike", type: "Spell", recallCost: 1,
      text: "Make a Spellcast Roll against a target within Far range. On a success, mark a Stress to deal d10 magic damage to the target using your Proficiency. On a success with Hope, the target also marks a Stress. On a roll with Fear, mark a Stress."
    },
  ],
  Dread: [
    {
      name: "Voice of Dread", type: "Spell", recallCost: 0,
      text: "You can magically speak directly into the ears of a creature you can see. To torment them with your words, make a Spellcast Roll against them. On a success, they must mark a Stress and become temporarily Vulnerable."
    },
    {
      name: "Blighting Strike", type: "Spell", recallCost: 1,
      text: "Make a Spellcast Roll against a target within Far range. On a success, the target takes d6+1 magic damage using your Proficiency and the next time the target deals damage to an ally, it is reduced by half. If you succeed with Fear, the target instead takes d10+1 magic damage using your Proficiency."
    },
    {
      name: "Terrify", type: "Spell", recallCost: 1,
      text: "Make a Spellcast Roll against a target within Far range. On a success, the target marks 1d4 Stress and you can choose to make the target run one range away from you (Close to Far, Far to Very Far, etc.). On a success with Fear, the target becomes temporarily Vulnerable."
    },
  ],
};

const DOMAIN_COLORS = {
  Arcana: "#a855f7", Blade: "#ef4444", Bone: "#f97316",
  Codex: "#3b82f6", Grace: "#ec4899", Midnight: "#6366f1",
  Sage: "#22c55e", Splendor: "#facc15", Valor: "#f59e0b",
  // The Void v1.5
  Blood: "#dc2626", Dread: "#7c3aed",
};



