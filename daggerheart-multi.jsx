import { useState, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// DAGGERHEART CHARACTER SHEET — Core Rulebook Data Only
// ═══════════════════════════════════════════════════════════════

const CLASSES = {
  Bard: { domains: ["Grace", "Codex"], evasion: 10, hp: 5,
    subclasses: { Troubadour: { spellcast: "Presence", desc: "Play music to bolster your allies", foundation: "Gifted Performer: Describe how you perform for others. You can play each song once per long rest:\n• Relaxing Song: You and all allies within Close range clear a Hit Point.\n• Epic Song: Make a target within Close range temporarily Vulnerable.\n• Heartbreaking Song: You and all allies within Close range gain a Hope.", specialization: "Maestro: Your rallying songs steel the courage of those who listen. When you give a Rally Die to an ally, they can gain a Hope or clear a Stress.", mastery: "Virtuoso: You can perform each of your Gifted Performer songs twice instead of once per long rest." }, Wordsmith: { spellcast: "Presence", desc: "Use clever wordplay and captivate crowds", foundation: "Rousing Speech: Once per long rest, give a heartfelt, inspiring speech. All allies within Far range clear 2 Stress.\n\nHeart of a Poet: After you make an action roll to impress, persuade, or offend someone, you can spend a Hope to add a d4 to the roll.", specialization: "Eloquent: Once per session, when you encourage an ally, do one of: allow them to find a mundane object/tool, Help an Ally without spending Hope, or give them an additional downtime move during their next rest.", mastery: "Epic Poetry: Your Rally Die increases to a d10. When you Help an Ally, narrate the moment as heroic memoir; roll a d10 as your advantage die." } },
    hopeFeature: "Make a Scene: Spend 3 Hope to temporarily Distract a target within Close range, giving them a -2 penalty to their Difficulty.",
    classFeatures: ["Rally: Once per session, describe how you rally the party and give yourself and each of your allies a Rally Die. At level 1, your Rally Die is a d6. A PC can spend their Rally Die to roll it, adding the result to their action roll, reaction roll, damage roll, or to clear a number of Stress equal to the result. At the end of each session, clear all unspent Rally Dice.\n\nAt level 5, your Rally Die increases to a d8."],
    items: "A romance novel or a letter never opened",
    suggestedTraits: { Agility: 0, Strength: -1, Finesse: 1, Instinct: 0, Presence: 2, Knowledge: 1 },
  },
  Druid: { domains: ["Sage", "Arcana"], evasion: 10, hp: 6,
    subclasses: { "Warden of the Elements": { spellcast: "Instinct", desc: "Embody the natural elements of the wild", foundation: "Elemental Incarnation: Mark a Stress to Channel one element until Severe damage or next rest:\n• Fire: Adversary within Melee who damages you takes 1d10 magic damage.\n• Earth: Bonus to damage thresholds equal to Proficiency.\n• Water: When you damage an adversary in Melee, all others in Very Close mark a Stress.\n• Air: Hover, advantage on Agility Rolls.", specialization: "Elemental Aura: Once per rest while Channeling, assume an aura within Close range:\n• Fire: Adversaries who mark HP also mark Stress.\n• Earth: Allies gain +1 Strength.\n• Water: When damaged, mark Stress to move adversary within Very Close.\n• Air: Reduce damage from beyond Melee by 1d8.", mastery: "Elemental Dominion: While Channeling:\n• Fire: +1 Proficiency for damage.\n• Earth: Roll d6 per HP marked; 6s reduce by 1.\n• Water: Mark Stress to make attacker Vulnerable.\n• Air: +1 Evasion and fly." }, "Warden of Renewal": { spellcast: "Instinct", desc: "Use powerful magic to heal your party", foundation: "Clarity of Nature: Once per long rest, create serenity within Close range. Resting clears Stress equal to your Instinct among you and allies.\n\nRegeneration: Touch a creature, spend 3 Hope. They clear 1d4 HP.", specialization: "Regenerative Reach: Use Regeneration within Very Close range.\n\nWarden's Protection: Once per long rest, spend 2 Hope to clear 2 HP on 1d4 allies within Close range.", mastery: "Defender: In Beastform, when an ally within Close marks 2+ HP, mark a Stress to reduce HP they mark by 1." } },
    hopeFeature: "Evolution: Spend 3 Hope to Beastform without marking Stress. Choose one trait +1 until you drop out.",
    classFeatures: ["Beastform: Mark a Stress to magically transform into a creature of your tier or lower from the Beastform list. You can drop out of this form at any time. While transformed, you can't use weapons or cast spells from domain cards, but you can still use other features or abilities you have access to. Spells you cast before you transform stay active and last for their normal duration, and you can talk and communicate as normal.\n\nAdditionally, you gain the Beastform's features, add their Evasion bonus to your Evasion, and use the trait specified in their statistics for your attack. While in Beastform, your armor becomes part of your body and you mark Armor Slots as usual; when you drop out, those marked Armor Slots remain marked. If you mark your last Hit Point, you automatically drop out of this form.", "Wildtouch: You can perform harmless, subtle effects that involve nature—such as causing a flower to rapidly grow, summoning a slight gust of wind, or starting a campfire—at will."],
    items: "A small bag of rocks and bones or a strange pendant found in the dirt",
    suggestedTraits: { Agility: 0, Strength: -1, Finesse: 0, Instinct: 2, Presence: 1, Knowledge: 1 },
  },
  Guardian: { domains: ["Valor", "Blade"], evasion: 9, hp: 7,
    subclasses: { Stalwart: { spellcast: null, desc: "Take heavy blows and keep fighting", foundation: "Unwavering: Permanent +1 to damage thresholds.\n\nIron Will: When you take physical damage, mark an additional Armor Slot to reduce severity.", specialization: "Unrelenting: Permanent +2 to damage thresholds.\n\nPartners-in-Arms: When an ally within Very Close takes damage, mark an Armor Slot to reduce severity by one threshold.", mastery: "Undaunted: Permanent +3 to damage thresholds.\n\nLoyal Protector: When an ally within Close has 2 or fewer HP and would take damage, mark Stress to sprint to them and take the damage." }, Vengeance: { spellcast: null, desc: "Strike down enemies who harm you or your allies", foundation: "At Ease: Gain an additional Stress slot.\n\nRevenge: When an adversary within Melee succeeds on an attack against you, mark 2 Stress to force them to mark a HP.", specialization: "Act of Reprisal: When an adversary damages an ally within Melee, gain +1 Proficiency for the next attack against that adversary.", mastery: "Nemesis: Spend 2 Hope to Prioritize an adversary until next rest. You can swap Hope and Fear Dice when attacking them." } },
    hopeFeature: "Frontline Tank: Spend 3 Hope to clear 2 Armor Slots.",
    classFeatures: ["Unstoppable: Once per long rest, you can become Unstoppable. You gain an Unstoppable Die. At level 1, your Unstoppable Die is a d4. Place it on your character sheet starting with the 1 value facing up. After you make a damage roll that deals 1 or more Hit Points to a target, increase the Unstoppable Die value by one. When the die's value would exceed its maximum value, or when the scene ends, remove the die and drop out of Unstoppable. At level 5, your Unstoppable Die increases to a d6.\n\nWhile Unstoppable, you gain the following benefits:\n• You reduce the severity of physical damage by one threshold (Severe to Major, Major to Minor, Minor to None).\n• You add the current value of the Unstoppable Die to your damage roll.\n• You can't be Restrained or Vulnerable."],
    items: "A totem from your mentor or a secret key",
    suggestedTraits: { Agility: 0, Strength: 2, Finesse: 0, Instinct: 1, Presence: -1, Knowledge: 1 },
  },
  Ranger: { domains: ["Bone", "Sage"], evasion: 12, hp: 6,
    subclasses: { Beastbound: { spellcast: "Agility", desc: "Form a deep bond with an animal ally", foundation: "Companion: You have an animal companion (GM's discretion). Take the Ranger Companion sheet.", specialization: "Expert Training: Choose an additional companion level-up option.\n\nBattle-Bonded: When attacked while within companion's Melee range, +2 Evasion.", mastery: "Advanced Training: Two additional companion level-up options.\n\nLoyal Friend: Once per long rest, when damage would mark companion's last Stress or your last HP within Close range, one takes damage instead." }, Wayfinder: { spellcast: "Agility", desc: "Hunt your prey and strike with deadly force", foundation: "Ruthless Predator: On a damage roll, mark Stress for +1 Proficiency. Severe damage forces adversary to mark Stress.\n\nPath Forward: Identify shortest path to a previously visited place.", specialization: "Elusive Predator: When your Focus attacks you, +2 Evasion.", mastery: "Apex Predator: Before attacking Focus, spend Hope. On success, remove a Fear from GM's pool." } },
    hopeFeature: "Hold Them Off: Spend 3 Hope on a successful weapon attack to use the same roll against two more adversaries in range.",
    classFeatures: ["Ranger's Focus: Spend a Hope and make an attack against a target. On a success, deal your attack's normal damage and temporarily make the attack's target your Focus. Until this feature ends or you make a different creature your Focus, you gain the following benefits against your Focus:\n• You know precisely what direction they are in.\n• When you deal damage to them, they must mark a Stress.\n• When you fail an attack against them, you can end your Ranger's Focus to reroll your Duality Dice."],
    items: "A trophy from your first kill or a seemingly broken compass",
    suggestedTraits: { Agility: 2, Strength: 0, Finesse: 1, Instinct: 1, Presence: -1, Knowledge: 0 },
  },
  Rogue: { domains: ["Midnight", "Grace"], evasion: 12, hp: 6,
    subclasses: { Nightwalker: { spellcast: "Finesse", desc: "Manipulate shadows to maneuver", foundation: "Shadow Stepper: In darkness or shadow, mark Stress to teleport to another shadow within Far range. You are Cloaked.", specialization: "Dark Cloud: Spellcast Roll (15) to create dark cloud within Close range. Cloaked from adversaries it blocks.\n\nAdrenaline: While Vulnerable, add level to damage.", mastery: "Fleeting Shadow: Permanent +1 Evasion. Shadow Stepper extends to Very Far.\n\nVanishing Act: Mark Stress to become Cloaked. Auto-clear Restrained. Lasts until Fear roll or next rest." }, Syndicate: { spellcast: "Finesse", desc: "Have a web of contacts everywhere", foundation: "Well-Connected: In a prominent town, you know someone. Give them a name and choose a fact:\n• They owe me a favor, but hard to find.\n• They'll ask something in exchange.\n• They're always in trouble.\n• We used to be together.\n• We didn't part on great terms.", specialization: "Contacts Everywhere: Once per session, call a contact:\n• 1 handful of gold, a tool, or mundane object.\n• +3 to next Hope or Fear Die.\n• They snipe from shadows, +2d8 damage.", mastery: "Reliable Backup: Contacts Everywhere 3x per session. Added:\n• When you mark HP, reduce by 1.\n• On Presence Roll, roll d20 as Hope Die." } },
    hopeFeature: "Rogue's Dodge: Spend 3 Hope for +2 Evasion until next successful attack against you or next rest.",
    classFeatures: ["Cloaked: Any time you would be Hidden, you are instead Cloaked. In addition to the benefits of the Hidden condition, while Cloaked you remain unseen if you are stationary when an adversary moves to where they would normally see you. After you make an attack or end a move within line of sight of an adversary, you are no longer Cloaked.", "Sneak Attack: When you succeed on an attack while Cloaked or while an ally is within Melee range of your target, add a number of d6s equal to your tier to your damage roll.\n\nLevel 1 is Tier 1. Levels 2–4 are Tier 2. Levels 5–7 are Tier 3. Levels 8–10 are Tier 4."],
    items: "A set of forgery tools or a grappling hook",
    suggestedTraits: { Agility: 1, Strength: -1, Finesse: 2, Instinct: 0, Presence: 1, Knowledge: 0 },
  },
  Seraph: { domains: ["Splendor", "Valor"], evasion: 9, hp: 7,
    subclasses: { "Divine Wielder": { spellcast: "Strength", desc: "Dominate the battlefield with a legendary weapon", foundation: "Spirit Weapon: Melee/Very Close weapon flies to attack within Close range and returns. Mark Stress for additional target.\n\nSparing Touch: Once per long rest, touch to clear 2 HP or 2 Stress.", specialization: "Devout: Roll extra Prayer Die, discard lowest. Sparing Touch 2x per long rest.", mastery: "Sacred Resonance: Spirit Weapon damage with matching dice doubles their values." }, "Winged Sentinel": { spellcast: "Strength", desc: "Take flight and strike crushing blows", foundation: "Wings of Light: You can fly. While flying:\n• Mark Stress to carry a willing creature your size or smaller.\n• Spend Hope for extra 1d8 damage on a successful attack.", specialization: "Ethereal Visage: While flying, advantage on Presence Rolls. Succeed with Hope on Presence to remove GM Fear instead of gaining Hope.", mastery: "Ascendant: Permanent +4 to Severe threshold.\n\nPower of the Gods: Wings of Light deals 1d12 instead of 1d8." } },
    hopeFeature: "Life Support: Spend 3 Hope to clear a HP on an ally within Close range.",
    classFeatures: ["Prayer Dice: At the beginning of each session, roll a number of d4s equal to your subclass's Spellcast trait and place them on your character sheet. These are your Prayer Dice. You can spend any number of Prayer Dice to aid yourself or an ally within Far range. You can use a spent die's value to:\n• Reduce incoming damage by that amount.\n• Add that amount to a roll's result after the roll is made.\n• Gain Hope equal to the result.\n\nAt the end of each session, clear all unspent Prayer Dice."],
    items: "A bundle of offerings or a sigil of your god",
    suggestedTraits: { Agility: 0, Strength: 2, Finesse: 0, Instinct: 1, Presence: 1, Knowledge: -1 },
  },
  Sorcerer: { domains: ["Arcana", "Midnight"], evasion: 10, hp: 6,
    subclasses: { "Elemental Origin": { spellcast: "Instinct", desc: "Channel raw elemental power", foundation: "Elementalist: Choose an element (air, earth, fire, lightning, water). Shape it into harmless effects. Spend Hope for +2 to action roll or +3 to damage.", specialization: "Natural Evasion: When hit, mark Stress, roll d6, add to Evasion against the attack.", mastery: "Transcendence: Once per long rest, become your element. Choose two until next rest:\n• +4 Severe threshold\n• +1 character trait\n• +1 Proficiency\n• +2 Evasion" }, "Primal Origin": { spellcast: "Instinct", desc: "Extend spell versatility", foundation: "Manipulate Magic: After casting or magic weapon attack, mark Stress to:\n• Extend reach one range\n• +2 to action roll result\n• Double a damage die\n• Hit additional target in range", specialization: "Enchanted Aid: Help Ally Spellcast with d8 advantage die. Once per long rest, swap ally's Duality Dice after helping.", mastery: "Arcane Charge: Take magic damage to become Charged (or spend 2 Hope). On magic attack while Charged, clear Charge for +10 damage or +3 reaction Difficulty." } },
    hopeFeature: "Volatile Magic: Spend 3 Hope to reroll any damage dice on a magic attack.",
    classFeatures: ["Arcane Sense: You can sense the presence of magical people and objects within Close range.", "Minor Illusion: Make a Spellcast Roll (difficulty 10). On a success, you create a minor visual illusion no larger than yourself within Close range. This illusion is convincing to anyone at Close range or farther.", "Channel Raw Power: Once per long rest, you can place a domain card from your loadout into your vault and choose to either:\n• Gain Hope equal to the level of the card.\n• Enhance a spell that deals damage, gaining a bonus to your damage roll equal to twice the level of the card."],
    items: "A whispering orb or a family heirloom",
    suggestedTraits: { Agility: 0, Strength: -1, Finesse: 1, Instinct: 2, Presence: 1, Knowledge: 0 },
  },
  Warrior: { domains: ["Blade", "Bone"], evasion: 11, hp: 6,
    subclasses: { "Call of the Brave": { spellcast: null, desc: "Fuel power from enemies' might", foundation: "Courage: Fail with Fear → gain a Hope.\n\nBattle Ritual: Once per long rest before great danger, describe ritual. Clear 2 Stress, gain 2 Hope.", specialization: "Rise to the Challenge: 2 or fewer HP unmarked → roll d20 as Hope Die.", mastery: "Camaraderie: Extra Tag Team Roll per session. Allies only spend 2 Hope to Tag Team with you." }, "Call of the Slayer": { spellcast: null, desc: "Strike with immense force", foundation: "Slayer: On Hope rolls, place d6 instead of gaining Hope (max Proficiency). Spend on attack/damage rolls. Clear unspent at session end, gain Hope per die.", specialization: "Weapon Specialist: On success, spend Hope to add secondary weapon damage die. Once per long rest, reroll 1s on Slayer Dice.", mastery: "Martial Preparation: Party gains Martial Preparation downtime. You and allies each gain a d6 Slayer Die." } },
    hopeFeature: "No Mercy: Spend 3 Hope for +1 to attack rolls until next rest.",
    classFeatures: ["Attack of Opportunity: If an adversary within Melee range attempts to leave that range, make a reaction roll using a trait of your choice against their Difficulty. Choose one effect on a success, or two if you critically succeed:\n• They can't move from where they are.\n• You deal damage to them equal to your primary weapon's damage.\n• You move with them.", "Combat Training: You ignore burden when equipping weapons. When you deal physical damage, you gain a bonus to your damage roll equal to your level."],
    items: "The drawing of a lover or a sharpening stone",
    suggestedTraits: { Agility: 1, Strength: 2, Finesse: 0, Instinct: 0, Presence: -1, Knowledge: 1 },
  },
  Wizard: { domains: ["Codex", "Splendor"], evasion: 11, hp: 5,
    subclasses: { "School of Knowledge": { spellcast: "Knowledge", desc: "Keen understanding of the world", foundation: "Prepared: Take an additional domain card.\n\nAdept: Utilize an Experience by marking Stress instead of Hope. Double the modifier.", specialization: "Accomplished: Take an additional domain card.\n\nPerfect Recall: Once per rest, reduce Recall Cost by 1.", mastery: "Brilliant: Take an additional domain card.\n\nHoned Expertise: When using an Experience, roll d6. On 5+, no Hope cost." }, "School of War": { spellcast: "Knowledge", desc: "Trained magic for violence", foundation: "Battlemage: Gain an additional HP slot.\n\nFace Your Fear: Succeed with Fear on attack → extra 1d10 magic damage.", specialization: "Conjure Shield: With 2+ Hope, add Proficiency to Evasion.\n\nFueled by Fear: Face Your Fear → 2d10.", mastery: "Thrive in Chaos: On success, mark Stress after damage to force target to mark extra HP.\n\nHave No Fear: Face Your Fear → 3d10." } },
    hopeFeature: "Not This Time: Spend 3 Hope to force an adversary within Far to reroll attack or damage.",
    classFeatures: ["Prestidigitation: You can perform harmless, subtle magical effects at will. For example, you can change an object's color, create a smell, light a candle, cause a tiny object to float, illuminate a room, or repair a small object.", "Strange Patterns: Choose a number between 1 and 12. When you roll that number on a Duality Die, gain a Hope or clear a Stress. You can change this number when you take a long rest."],
    items: "A book you're trying to translate or a tiny, harmless elemental pet",
    suggestedTraits: { Agility: -1, Strength: 0, Finesse: 0, Instinct: 1, Presence: 1, Knowledge: 2 },
  },
};

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
};

const COMMUNITY_HAS_NOTES = { Orderborne: "Record your three sayings or values below:" };

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
};

const DOMAIN_COLORS = {
  Arcana: "#a855f7", Blade: "#ef4444", Bone: "#f97316",
  Codex: "#3b82f6", Grace: "#ec4899", Midnight: "#6366f1",
  Sage: "#22c55e", Splendor: "#facc15", Valor: "#f59e0b",
};



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

const TRAIT_KEYS = ["Agility", "Strength", "Finesse", "Instinct", "Presence", "Knowledge"];
const TRAIT_SHORT = { Agility: "AGI", Strength: "STR", Finesse: "FIN", Instinct: "INS", Presence: "PRE", Knowledge: "KNO" };
const TRAIT_ACTIONS = { Agility: "Sprint, Leap, Maneuver", Strength: "Lift, Smash, Grapple", Finesse: "Control, Hide, Tinker", Instinct: "Perceive, Sense, Navigate", Presence: "Charm, Perform, Deceive", Knowledge: "Recall, Analyze, Comprehend" };

const P = { bg: "#0d0f14", surface: "#161922", card: "#1c2030", cardHover: "#232840", border: "#2a3050", borderActive: "#6366f1", text: "#e2e4f0", textMuted: "#8890b0", accent: "#6366f1", accentGlow: "rgba(99,102,241,0.25)", hope: "#facc15", fear: "#ef4444", hp: "#22c55e", stress: "#f97316", gold: "#fbbf24" };
const sBtn = { width: 26, height: 26, borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", flexShrink: 0 };
const mono = "'JetBrains Mono', monospace";

function TabBar({ tabs, active, onChange }) { return <div style={{ display: "flex", gap: 2, overflowX: "auto", padding: "0 12px", borderBottom: `1px solid ${P.border}`, background: P.bg, position: "sticky", top: 0, zIndex: 100 }}>{tabs.map(t => <button key={t} onClick={() => onChange(t)} style={{ padding: "10px 14px", fontSize: 13, fontWeight: active === t ? 700 : 500, color: active === t ? P.accent : P.textMuted, background: "none", border: "none", borderBottom: active === t ? `2px solid ${P.accent}` : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>{t}</button>)}</div>; }
function Card({ children, style }) { return <div style={{ background: P.card, borderRadius: 12, padding: 14, border: `1px solid ${P.border}`, ...style }}>{children}</div>; }
function Lbl({ children, style }) { return <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: P.textMuted, marginBottom: 4, ...style }}>{children}</div>; }
function Inp({ value, onChange, placeholder, style }) { return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", ...style }} />; }
function Sel({ value, onChange, children }) { return <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%238890b0' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32 }}>{children}</select>; }
function Pip({ filled, color, onClick, size = 22 }) { return <div onClick={onClick} style={{ width: size, height: size, borderRadius: size / 2, border: `2px solid ${color}`, background: filled ? color : "transparent", cursor: "pointer", transition: "all .15s", flexShrink: 0 }} />; }

function Feat({ title, text, startOpen }) {
  const [open, setOpen] = useState(!!startOpen);
  return <div style={{ background: P.surface, borderRadius: 8, border: `1px solid ${P.border}`, marginBottom: 8, overflow: "hidden" }}>
    <div onClick={() => setOpen(!open)} style={{ padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: P.text }}>{title}</span>
      <span style={{ fontSize: 11, color: P.textMuted, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
    </div>
    {open && <div style={{ padding: "0 12px 12px", fontSize: 12, lineHeight: 1.7, color: P.textMuted, whiteSpace: "pre-line" }}>{text}</div>}
  </div>;
}

function Grid({ items, selected, onSelect, render }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
    {items.map(item => { const k = typeof item === "string" ? item : item.name; const s = selected === k;
      return <div key={k} onClick={() => onSelect(k)} style={{ background: s ? P.cardHover : P.surface, border: `1px solid ${s ? P.borderActive : P.border}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", boxShadow: s ? `0 0 12px ${P.accentGlow}` : "none", transition: "all .2s" }}>{render(item, s)}</div>; })}
  </div>;
}

// ── RICH TEXT RENDERER ──────────────────────────────────────
// Parses structured body strings into formatted JSX.
// Markers:
//   ## Title        → section header (accent color, uppercase, tracked)
//   **Name**: text  → bold gold feature name + muted body
//   • item          → bullet point
//   blank line      → spacer
//   plain text      → muted paragraph line
function RichBody({ text }) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((line, i) => {
        if (!line.trim()) {
          return <div key={i} style={{ height: 7 }} />;
        }
        // ## Section header
        if (line.startsWith("## ")) {
          return (
            <div key={i} style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase",
              letterSpacing: 1.8, color: P.accent, marginTop: 14, marginBottom: 5,
              paddingBottom: 4, borderBottom: `1px solid ${P.accent}44` }}>
              {line.slice(3)}
            </div>
          );
        }
        // • bullet
        if (line.startsWith("• ")) {
          return (
            <div key={i} style={{ display: "flex", gap: 7, marginBottom: 3, paddingLeft: 2 }}>
              <span style={{ color: P.accent, flexShrink: 0, fontSize: 11, lineHeight: "1.7" }}>•</span>
              <span style={{ fontSize: 12, lineHeight: 1.7, color: P.textMuted }}>{line.slice(2)}</span>
            </div>
          );
        }
        // **Feature Name**: rest  →  bold gold name + muted text
        const boldMatch = line.match(/^\*\*(.+?)\*\*:(.*)$/);
        if (boldMatch) {
          return (
            <div key={i} style={{ fontSize: 12, lineHeight: 1.7, marginBottom: 2 }}>
              <span style={{ fontWeight: 800, color: P.hope }}>{boldMatch[1]}</span>
              <span style={{ color: P.text }}>:</span>
              <span style={{ color: P.textMuted }}>{boldMatch[2]}</span>
            </div>
          );
        }
        // Plain text
        return (
          <div key={i} style={{ fontSize: 12, lineHeight: 1.7, color: P.textMuted, marginBottom: 1 }}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

function PickerAccordion({ items, selected, onSelect, accentColor }) {
  const [openKey, setOpenKey] = useState(null);
  const accent = accentColor || P.accent;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map(({ key, label, meta, body }) => {
        const isSelected = selected === key;
        const isOpen = openKey === key;
        return (
          <div key={key}
            style={{ borderRadius: 10, border: `2px solid ${isSelected ? accent : isOpen ? P.borderActive + "88" : P.border}`,
              background: isSelected ? accent + "14" : P.surface,
              overflow: "hidden", transition: "border-color .15s, background .15s" }}>
            <div onClick={() => setOpenKey(isOpen ? null : key)}
              style={{ padding: "11px 13px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${isSelected ? accent : P.border}`,
                background: isSelected ? accent : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isSelected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: isSelected ? accent : P.text }}>{label}</div>
                {meta && <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{meta}</div>}
              </div>
              <span style={{ fontSize: 11, color: P.textMuted, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}>▼</span>
            </div>
            {isOpen && (
              <div style={{ borderTop: `1px solid ${isSelected ? accent + "44" : P.border}`, padding: "14px 14px 12px" }}>
                <RichBody text={body} />
                <button onClick={() => { onSelect(key); setOpenKey(null); }}
                  style={{ width: "100%", padding: "10px", borderRadius: 8, marginTop: 16,
                    border: `2px solid ${isSelected ? P.border : accent}`,
                    background: isSelected ? P.surface : accent,
                    color: isSelected ? P.textMuted : "#fff",
                    fontSize: 13, fontWeight: 800, cursor: isSelected ? "default" : "pointer",
                    fontFamily: "inherit", letterSpacing: 0.3, transition: "all .15s" }}>
                  {isSelected ? "✓ Selected" : "Select"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MULTI-CHARACTER SUPPORT
// ═══════════════════════════════════════════════════════════════

function newChar(id) {
  return { _id: id, name: "", pronouns: "", level: 1, className: "", subclass: "", ancestry: "", community: "", communityNotes: "", traits: { Agility: 0, Strength: 0, Finesse: 0, Instinct: 0, Presence: 0, Knowledge: 0 }, hp: Array(10).fill(false), stress: Array(7).fill(false), hope: [true, true, false, false, false, false], armorSlots: Array(12).fill(false), primaryWeapon: "", secondaryWeapon: "", armor: "", exp1: "", exp1Val: 2, exp2: "", exp2Val: 2, inventory: "", goldH: 1, goldB: 0, goldC: 0, notes: "", selectedCards: [] };
}

// ── CLASS COLOR MAP ──────────────────────────────────────────
const CLASS_COLORS = { Bard: "#ec4899", Druid: "#22c55e", Guardian: "#f97316", Ranger: "#84cc16", Rogue: "#a855f7", Seraph: "#facc15", Sorcerer: "#ef4444", Warrior: "#f59e0b", Wizard: "#3b82f6" };

function CharacterSelect({ characters, onSelect, onCreate, onDelete, onImport }) {
  const fileRef = useRef(null);
  return (
    <div style={{ minHeight: "100vh", background: P.bg, color: P.text, fontFamily: "'Crimson Pro','Georgia',serif", maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      {/* Header */}
      <div style={{ padding: "20px 16px 14px", background: `linear-gradient(135deg, ${P.surface} 0%, ${P.bg} 100%)`, borderBottom: `1px solid ${P.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: P.accent }}>⬥</span>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1 }}>DAGGERHEART</span>
        </div>
        <div style={{ fontSize: 12, color: P.textMuted, letterSpacing: 0.5 }}>CHARACTER ROSTER</div>
      </div>

      {/* Character List */}
      <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        {characters.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: P.textMuted, fontSize: 13 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚔️</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: P.text, marginBottom: 6 }}>No characters yet</div>
            <div>Create your first character to begin your adventure.</div>
          </div>
        )}
        {characters.map((ch, idx) => {
          const cls = ch.className ? CLASSES[ch.className] : null;
          const clsColor = CLASS_COLORS[ch.className] || P.accent;
          const prof = ch.level <= 1 ? 1 : ch.level <= 4 ? 2 : ch.level <= 7 ? 3 : 4;
          const hpMarked = ch.hp.filter(Boolean).length;
          const maxHp = (cls ? cls.hp : 6) + (ch.ancestry === "Giant" ? 1 : 0) + (ch.className === "Wizard" && ch.subclass === "School of War" ? 1 : 0);
          return (
            <div key={ch._id} style={{ background: P.card, borderRadius: 14, border: `1px solid ${P.border}`, overflow: "hidden", transition: "border-color .2s", cursor: "pointer" }}
              onClick={() => onSelect(idx)}>
              {/* Color bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${clsColor}, ${clsColor}55)` }} />
              <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar placeholder */}
                <div style={{ width: 46, height: 46, borderRadius: 12, background: clsColor + "22", border: `2px solid ${clsColor}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {ch.className ? { Bard: "🎵", Druid: "🌿", Guardian: "🛡", Ranger: "🏹", Rogue: "🗡", Seraph: "✨", Sorcerer: "🔮", Warrior: "⚔️", Wizard: "📖" }[ch.className] || "⚔️" : "?"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: ch.name ? P.text : P.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {ch.name || "Unnamed Character"}
                    {ch.pronouns && <span style={{ fontSize: 11, color: P.textMuted, fontWeight: 400 }}> ({ch.pronouns})</span>}
                  </div>
                  <div style={{ fontSize: 12, color: clsColor, fontWeight: 700, marginTop: 1 }}>
                    {ch.className ? `Lv${ch.level} ${ch.className}${ch.subclass ? ` · ${ch.subclass}` : ""}` : <span style={{ color: P.textMuted, fontWeight: 400 }}>No class selected</span>}
                  </div>
                  {ch.ancestry && <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{ch.ancestry}{ch.community ? ` · ${ch.community}` : ""}</div>}
                </div>
                {/* Mini stat block */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: P.fear, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>HP {hpMarked}/{maxHp}</div>
                  <div style={{ fontSize: 10, color: P.textMuted, fontFamily: "'JetBrains Mono',monospace" }}>Prof +{prof}</div>
                  <button onClick={e => { e.stopPropagation(); if (window.confirm(`Delete "${ch.name || "Unnamed"}"? This cannot be undone.`)) onDelete(idx); }}
                    style={{ fontSize: 11, padding: "2px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: "transparent", color: P.textMuted, cursor: "pointer", fontFamily: "inherit", marginTop: 2 }}>✕</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div style={{ padding: "14px", borderTop: `1px solid ${P.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={onCreate}
          style={{ width: "100%", padding: "14px", borderRadius: 12, border: `2px solid ${P.accent}`, background: P.accent, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 }}>
          + New Character
        </button>
        <button onClick={() => fileRef.current?.click()}
          style={{ width: "100%", padding: "11px", borderRadius: 12, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Import JSON
        </button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }}
          onChange={e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => { try { const d = JSON.parse(ev.target.result); onImport(d); } catch { alert("Invalid JSON file."); } }; r.readAsText(f); e.target.value = ""; }} />
        <div style={{ textAlign: "center", fontSize: 9, color: P.textMuted, paddingTop: 2 }}>Daggerheart © Darrington Press 2025 — Fan-made digital sheet</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [characters, setCharacters] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);
  const nextId = useRef(1);

  const handleCreate = () => {
    const id = nextId.current++;
    setCharacters(prev => [...prev, newChar(id)]);
    setActiveIdx(characters.length); // after add, new item is at current length index
  };
  const handleSelect = idx => setActiveIdx(idx);
  const handleBack = () => setActiveIdx(null);
  const handleDelete = idx => {
    setCharacters(prev => prev.filter((_, i) => i !== idx));
    setActiveIdx(null);
  };
  const handleImport = data => {
    const id = nextId.current++;
    setCharacters(prev => [...prev, { ...data, _id: id }]);
    setActiveIdx(characters.length);
  };

  if (activeIdx === null || !characters[activeIdx]) {
    return <CharacterSelect characters={characters} onSelect={handleSelect} onCreate={handleCreate} onDelete={handleDelete} onImport={handleImport} />;
  }

  const setC = updater => setCharacters(prev => {
    const next = [...prev];
    next[activeIdx] = typeof updater === "function" ? updater(prev[activeIdx]) : { ...prev[activeIdx], ...updater };
    return next;
  });

  return <DaggerheartSheet c={characters[activeIdx]} setC={setC} onBack={handleBack} />;
}

// ─────────────────────────────────────────────────────────────
function DaggerheartSheet({ c, setC, onBack }) {
  const [tab, setTab] = useState("Play");
  const [editHdr, setEditHdr] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [restModal, setRestModal] = useState(null); // null | 'choose' | 'short' | 'long'
  const [restChoices, setRestChoices] = useState([]);
  const [restResults, setRestResults] = useState(null); // null | { type, lines[] }
  const [editingClass, setEditingClass] = useState(false);
  const [editingSubclass, setEditingSubclass] = useState(false);
  const [editingAncestry, setEditingAncestry] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState(false);
  const [swapCardsOnRest, setSwapCardsOnRest] = useState(false);
  const [cardSwapOpen, setCardSwapOpen] = useState(false);
  const u = useCallback((k, v) => setC(p => ({ ...p, [k]: v })), [setC]);
  const uT = useCallback((t, v) => setC(p => ({ ...p, traits: { ...p.traits, [t]: v } })), [setC]);
  const tog = useCallback((k, i) => setC(p => { const a = [...p[k]]; a[i] = !a[i]; return { ...p, [k]: a }; }), [setC]);
  const toggleRestChoice = useCallback((id) => {
    setRestChoices(prev => {
      const idx = prev.indexOf(id);
      if (idx !== -1) { const next = [...prev]; next.splice(idx, 1); return next; }
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }, []);

  const cls = c.className ? CLASSES[c.className] : null;
  const sub = cls && c.subclass ? cls.subclasses[c.subclass] : null;

  // Stat bonuses — all sources accumulate so they always stack
  let hpBonus = 0;
  let stressBonus = 0;
  let evasionBonus = 0;
  // Ancestry bonuses
  if (c.ancestry === "Giant")  hpBonus      += 1; // Endurance
  if (c.ancestry === "Human")  stressBonus  += 1; // High Stamina
  if (c.ancestry === "Simiah") evasionBonus += 1; // Nimble
  // Subclass bonuses
  if (c.className === "Wizard"   && c.subclass === "School of War") hpBonus     += 1; // Battlemage
  if (c.className === "Guardian" && c.subclass === "Vengeance")     stressBonus += 1; // At Ease

  const maxHp     = (cls ? cls.hp : 6) + hpBonus;
  const maxStress = 6 + stressBonus;
  const baseEv = cls ? cls.evasion : 10;
  const prof = c.level <= 1 ? 1 : c.level <= 4 ? 2 : c.level <= 7 ? 3 : 4;
  const sA = ARMOR.find(a => a.name === c.armor);
  const mT = sA ? parseInt(sA.thresholds.split("/")[0]) + c.level : c.level;
  const sT = sA ? parseInt(sA.thresholds.split("/")[1]) + c.level : c.level * 2;
  const aS = sA ? sA.score : 0;
  let eM = 0; if (sA) { if (sA.feature.includes("+1")) eM += 1; if (sA.feature.includes("−1 Eva") || sA.feature.includes("−1 Evasion")) eM -= 1; if (sA.feature.includes("−2 Eva")) eM -= 2; }
  const fEv = baseEv + eM + evasionBonus;

  // Build quick actions
  const actions = [];
  const pw = WEAPONS_PRIMARY.find(x => x.name === c.primaryWeapon);
  const sw = WEAPONS_SECONDARY.find(x => x.name === c.secondaryWeapon);
  if (pw) {
    const mod = c.traits[pw.trait] || 0;
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    actions.push({ label: pw.name, detail: `${pw.trait} ${modStr} | ${pw.range} | ${prof}${pw.damage} ${pw.type}`, sub: pw.feature, type: "primary" });
  }
  if (sw) {
    const mod = c.traits[sw.trait] || 0;
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    actions.push({ label: sw.name, detail: `${sw.trait} ${modStr} | ${sw.range} | ${prof}${sw.damage} ${sw.type}`, sub: sw.feature, type: "secondary" });
  }
  if (sub && sub.spellcast) {
    const mod = c.traits[sub.spellcast] || 0;
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    actions.push({ label: "Spellcast", detail: `${sub.spellcast} ${modStr}`, sub: "", type: "spell" });
  }
  // Common trait actions
  TRAIT_KEYS.forEach(t => {
    const v = c.traits[t]; const d = v >= 0 ? `+${v}` : `${v}`;
    actions.push({ label: `${t} Roll`, detail: d, sub: TRAIT_ACTIONS[t], type: "trait" });
  });

  const tabs = ["Play", "Domains", "Class", "Heritage", "Gear", "Notes"];

  const fmtMod = v => v >= 0 ? `+${v}` : `${v}`;

  return (
    <div style={{ minHeight: "100vh", background: P.bg, color: P.text, fontFamily: "'Crimson Pro', 'Georgia', serif", maxWidth: 480, margin: "0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />



      {/* ═══ CARD SWAP MODAL ═══ */}
      {cardSwapOpen && c.className && (() => {
        const domains = CLASSES[c.className]?.domains || [];
        const typeColor = { Ability: P.accent, Spell: "#a855f7", Grimoire: "#3b82f6" };
        const selCount = c.selectedCards.length;
        const toggleCard = (domain, name) => {
          const key = `${domain}::${name}`;
          const already = c.selectedCards.includes(key);
          if (already) u("selectedCards", c.selectedCards.filter(k => k !== key));
          else if (selCount < 2) u("selectedCards", [...c.selectedCards, key]);
        };
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1002, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ background: P.card, borderBottom: `1px solid ${P.border}`, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: P.accent }}>Choose Domain Cards</div>
                <div style={{ fontSize: 11, color: P.textMuted, marginTop: 2 }}>{selCount}/2 in loadout — tap to select or deselect</div>
              </div>
              <button onClick={() => setCardSwapOpen(false)}
                style={{ fontSize: 13, padding: "6px 14px", borderRadius: 8, border: "none",
                  background: selCount === 2 ? P.accent : P.border,
                  color: selCount === 2 ? "#fff" : P.textMuted,
                  cursor: "pointer", fontFamily: "inherit", fontWeight: 800 }}>
                {selCount === 2 ? "Confirm ✓" : "Close"}
              </button>
            </div>
            {/* Scrollable card list */}
            <div style={{ overflowY: "auto", flex: 1, padding: "14px" }}>
              {/* Status bar */}
              <div style={{ padding: "10px 14px", borderRadius: 10, background: selCount === 2 ? "#1a2a1a" : P.surface,
                border: `1px solid ${selCount === 2 ? P.hp + "88" : P.border}`, marginBottom: 14, fontSize: 12, color: selCount === 2 ? P.hp : P.textMuted }}>
                {selCount === 0 && "No cards selected — choose up to 2"}
                {selCount === 1 && <span>1 selected — <span style={{ color: P.hope }}>choose 1 more</span></span>}
                {selCount === 2 && <span>✓ Loadout full — tap Confirm or deselect to change</span>}
              </div>
              {domains.map(domain => (
                <div key={domain}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, marginTop: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: DOMAIN_COLORS[domain] || P.accent }} />
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: DOMAIN_COLORS[domain] || P.accent }}>{domain} Domain</div>
                  </div>
                  {(DOMAIN_CARDS[domain] || []).map(card => {
                    const key = `${domain}::${card.name}`;
                    const isSelected = c.selectedCards.includes(key);
                    const isDisabled = !isSelected && selCount >= 2;
                    const domColor = DOMAIN_COLORS[domain] || P.accent;
                    return (
                      <div key={card.name} onClick={() => !isDisabled && toggleCard(domain, card.name)}
                        style={{ marginBottom: 10, borderRadius: 12, padding: 14,
                          border: `2px solid ${isSelected ? domColor : P.border}`,
                          background: isSelected ? domColor + "18" : P.card,
                          opacity: isDisabled ? 0.35 : 1,
                          cursor: isDisabled ? "default" : "pointer",
                          boxShadow: isSelected ? `0 0 16px ${domColor}33` : "none", transition: "all .2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: typeColor[card.type] || P.textMuted }}>{card.type}</div>
                              {isSelected && <div style={{ fontSize: 9, fontWeight: 800, color: domColor, background: domColor + "22", borderRadius: 4, padding: "1px 6px", letterSpacing: 0.5 }}>IN LOADOUT</div>}
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: isSelected ? domColor : P.text }}>{card.name}</div>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                            <div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700, marginBottom: 2 }}>RECALL</div>
                            <div style={{ fontSize: 15, fontWeight: 800, fontFamily: mono, color: card.recallCost === 0 ? P.hp : P.stress }}>⚡{card.recallCost}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 12, lineHeight: 1.7, color: P.textMuted, whiteSpace: "pre-line", borderTop: `1px solid ${isSelected ? domColor + "44" : P.border}`, paddingTop: 8, marginTop: 4 }}>{card.text}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ═══ REST RESULTS ═══ */}
      {restResults && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1001, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 480, background: P.card, borderRadius: "20px 20px 0 0", padding: 24, paddingBottom: 36, border: `1px solid ${P.border}`, borderBottom: "none" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{restResults.isLong ? "🌙" : "☕"}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: restResults.isLong ? P.accent : P.hope }}>{restResults.type} Complete</div>
              <div style={{ fontSize: 11, color: P.textMuted, marginTop: 4 }}>Here's what you recovered</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {restResults.lines.length === 0 && (
                <div style={{ textAlign: "center", fontSize: 12, color: P.textMuted, fontStyle: "italic", padding: 12 }}>No mechanical changes — narrative moves only.</div>
              )}
              {restResults.lines.map((line, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: P.surface, borderRadius: 10, border: `1px solid ${line.color}44` }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{line.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: line.color }}>{line.label}</div>
                    <div style={{ fontSize: 12, color: P.textMuted, marginTop: 2 }}>{line.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => { setRestResults(null); if (swapCardsOnRest) { setCardSwapOpen(true); setSwapCardsOnRest(false); } }}
              style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none",
                background: restResults.isLong ? P.accent : P.hope,
                color: restResults.isLong ? "#fff" : "#000",
                fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
              {swapCardsOnRest ? "Done — Choose Cards →" : "Done"}
            </button>
          </div>
        </div>
      )}

      {/* ═══ REST MODAL ═══ */}
      {restModal && (() => {
        const tier = c.level <= 4 ? 1 : c.level <= 7 ? 2 : 3;
        const markedHp     = c.hp.filter(Boolean).length;
        const markedStress = c.stress.slice(0, maxStress).filter(Boolean).length;
        const markedArmor  = c.armorSlots.slice(0, aS).filter(Boolean).length;

        const SHORT_OPTIONS = [
          { id: "tendWounds",  label: "Tend to Wounds",  desc: `Roll 1d4 + ${tier} (tier) → clear that many Hit Points. Can target an ally instead.` },
          { id: "clearStress", label: "Clear Stress",    desc: `Roll 1d4 + ${tier} (tier) → clear that many Stress.` },
          { id: "repairArmor", label: "Repair Armor",    desc: `Roll 1d4 + ${tier} (tier) → clear that many Armor Slots. Can target an ally instead.` },
          { id: "prepare",     label: "Prepare",         desc: "Gain 1 Hope. If preparing with one or more party members, gain 2 Hope instead." },
        ];
        const LONG_OPTIONS = [
          { id: "tendAllWounds",  label: "Tend to All Wounds",  desc: `Clear all ${markedHp} marked Hit Points. Can do this for an ally instead.` },
          { id: "clearAllStress", label: "Clear All Stress",    desc: `Clear all ${markedStress} marked Stress.` },
          { id: "repairAllArmor", label: "Repair All Armor",    desc: `Clear all ${markedArmor} marked Armor Slots. Can do this for an ally instead.` },
          { id: "prepare",        label: "Prepare",             desc: "Gain 1 Hope. If preparing with one or more party members, gain 2 Hope instead." },
          { id: "workProject",    label: "Work on a Project",   desc: "Establish or continue a long-term project. The GM may call for a roll to determine progress." },
        ];

        const applyRest = () => {
          const t = c.level <= 4 ? 1 : c.level <= 7 ? 2 : 3;
          const isLong = restModal === "long";
          const lines = [];

          setC(p => {
            let next = { ...p };
            // Process each unique id once for Prepare (since it's handled specially)
            const prepareCount = restChoices.filter(x => x === "prepare").length;
            let prepareProcessed = false;
            restChoices.forEach(id => {
              if (isLong) {
                if (id === "tendAllWounds") {
                  const was = next.hp.filter(Boolean).length;
                  next.hp = Array(10).fill(false);
                  lines.push({ icon: "❤️", label: "Tend to All Wounds", detail: `Cleared ${was} Hit Point${was !== 1 ? "s" : ""}`, color: P.fear });
                }
                if (id === "clearAllStress") {
                  const was = next.stress.filter(Boolean).length;
                  next.stress = Array(7).fill(false);
                  lines.push({ icon: "🔥", label: "Clear All Stress", detail: `Cleared ${was} Stress`, color: P.stress });
                }
                if (id === "repairAllArmor") {
                  const was = next.armorSlots.filter(Boolean).length;
                  next.armorSlots = Array(12).fill(false);
                  lines.push({ icon: "🛡", label: "Repair All Armor", detail: `Repaired ${was} Armor Slot${was !== 1 ? "s" : ""}`, color: P.accent });
                }
              } else {
                if (id === "tendWounds") {
                  const die = Math.floor(Math.random() * 4) + 1;
                  const roll = die + t;
                  const newHp = [...next.hp]; let cleared = 0;
                  for (let i = newHp.length - 1; i >= 0 && cleared < roll; i--) { if (newHp[i]) { newHp[i] = false; cleared++; } }
                  next.hp = newHp;
                  lines.push({ icon: "❤️", label: "Tend to Wounds", detail: `Rolled ${die}+${t} = ${roll} → cleared ${cleared} Hit Point${cleared !== 1 ? "s" : ""}`, color: P.fear });
                }
                if (id === "clearStress") {
                  const die = Math.floor(Math.random() * 4) + 1;
                  const roll = die + t;
                  const newSt = [...next.stress]; let cleared = 0;
                  for (let i = newSt.length - 1; i >= 0 && cleared < roll; i--) { if (newSt[i]) { newSt[i] = false; cleared++; } }
                  next.stress = newSt;
                  lines.push({ icon: "🔥", label: "Clear Stress", detail: `Rolled ${die}+${t} = ${roll} → cleared ${cleared} Stress`, color: P.stress });
                }
                if (id === "repairArmor") {
                  const die = Math.floor(Math.random() * 4) + 1;
                  const roll = die + t;
                  const newAr = [...next.armorSlots]; let cleared = 0;
                  for (let i = newAr.length - 1; i >= 0 && cleared < roll; i--) { if (newAr[i]) { newAr[i] = false; cleared++; } }
                  next.armorSlots = newAr;
                  lines.push({ icon: "🛡", label: "Repair Armor", detail: `Rolled ${die}+${t} = ${roll} → repaired ${cleared} Armor Slot${cleared !== 1 ? "s" : ""}`, color: P.accent });
                }
              }
              if (id === "prepare" && !prepareProcessed) {
                prepareProcessed = true;
                const gains = prepareCount > 1 ? 2 : 1;
                const newHope = [...next.hope];
                let given = 0;
                for (let i = 0; i < gains; i++) { const idx = newHope.indexOf(false); if (idx >= 0) { newHope[idx] = true; given++; } }
                next.hope = newHope;
                lines.push({ icon: "✨", label: "Prepare", detail: `Gained ${given} Hope`, color: P.hope });
              }
              if (id === "workProject") {
                lines.push({ icon: "📖", label: "Work on a Project", detail: "Check with your GM for progress", color: P.textMuted });
              }
            });
            return next;
          });

          setRestResults({ type: isLong ? "Long Rest" : "Short Rest", isLong, lines });
          setRestModal(null);
          setRestChoices([]);
        };

        const opts    = restModal === "short" ? SHORT_OPTIONS : restModal === "long" ? LONG_OPTIONS : [];
        const isLong  = restModal === "long";
        const isChoose = restModal === "choose";

        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
            onClick={e => { if (e.target === e.currentTarget) { setRestModal(null); setRestChoices([]); } }}>
            <div style={{ width: "100%", maxWidth: 480, background: P.card, borderRadius: "20px 20px 0 0", padding: 20, paddingBottom: 32, border: `1px solid ${P.border}`, borderBottom: "none" }}>

              {isChoose ? <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: P.text, marginBottom: 4 }}>Take a Rest</div>
                  <div style={{ fontSize: 12, color: P.textMuted }}>What kind of rest is the party taking?</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => { setRestModal("short"); setRestChoices([]); }} style={{ padding: "14px 16px", borderRadius: 12, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: P.hope, marginBottom: 3 }}>Short Rest — ~1 hour</div>
                    <div style={{ fontSize: 11, color: P.textMuted, lineHeight: 1.5 }}>Choose <strong style={{color:P.text}}>2 downtime moves</strong> (can repeat). Recovery rolls use <strong style={{color:P.text}}>1d4 + tier {tier}</strong>.</div>
                  </button>
                  <button onClick={() => { setRestModal("long"); setRestChoices([]); }} style={{ padding: "14px 16px", borderRadius: 12, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: P.accent, marginBottom: 3 }}>Long Rest — Full camp</div>
                    <div style={{ fontSize: 11, color: P.textMuted, lineHeight: 1.5 }}>Choose <strong style={{color:P.text}}>2 downtime moves</strong> (can repeat). Recovery options clear <strong style={{color:P.text}}>everything</strong>.</div>
                  </button>
                </div>
                <button onClick={() => { setRestModal(null); setRestChoices([]); }} style={{ marginTop: 14, width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${P.border}`, background: "transparent", color: P.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Cancel</button>
              </> : <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <button onClick={() => { setRestModal("choose"); setRestChoices([]); }} style={{ background: "none", border: "none", color: P.textMuted, cursor: "pointer", fontSize: 22, padding: 0, lineHeight: 1 }}>‹</button>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: isLong ? P.accent : P.hope }}>{isLong ? "Long Rest" : "Short Rest"}</div>
                    <div style={{ fontSize: 11, color: P.textMuted }}>
                      {restChoices.length}/2 moves chosen
                      {!isLong && ` · Tier ${tier} · Recovery: 1d4+${tier}`}
                      {` · You can pick the same move twice`}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, marginTop: 12 }}>
                  {opts.map(opt => {
                    const countSelected = restChoices.filter(x => x === opt.id).length;
                    const totalSelected = restChoices.length;
                    const accentColor = isLong ? P.accent : P.hope;
                    // Each slot is independent: slot 0 = first pick, slot 1 = second pick
                    const handleSlot = (e, slot) => {
                      e.stopPropagation();
                      if (slot === 0) {
                        if (countSelected >= 1) {
                          // Remove one instance of this id (deselect slot 0)
                          setRestChoices(prev => { const i = prev.indexOf(opt.id); return i === -1 ? prev : [...prev.slice(0, i), ...prev.slice(i + 1)]; });
                        } else if (totalSelected < 2) {
                          // Add first instance
                          setRestChoices(prev => [...prev, opt.id]);
                        }
                      } else {
                        if (countSelected >= 2) {
                          // Remove second instance (deselect slot 1)
                          setRestChoices(prev => { const i = prev.lastIndexOf(opt.id); return i === -1 ? prev : [...prev.slice(0, i), ...prev.slice(i + 1)]; });
                        } else if (countSelected === 1 && totalSelected < 2) {
                          // Add second instance — explicitly push, never remove
                          setRestChoices(prev => [...prev, opt.id]);
                        }
                      }
                    };
                    return (
                      <div key={opt.id}
                        style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", borderRadius: 10,
                          border: `2px solid ${countSelected > 0 ? accentColor : P.border}`,
                          background: countSelected > 0 ? accentColor + "18" : P.surface,
                          transition: "all .15s" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 2 }}>
                          {[0, 1].map(slot => {
                            const filled = slot < countSelected;
                            const slot1Locked = slot === 1 && countSelected < 1;
                            const slot1Full   = slot === 1 && countSelected < 1 && totalSelected >= 2;
                            const canClick = slot === 0
                              ? (countSelected >= 1 || totalSelected < 2)
                              : (countSelected >= 2 || (countSelected === 1 && totalSelected < 2));
                            return (
                              <div key={slot} onClick={(e) => canClick && handleSlot(e, slot)}
                                style={{ width: 22, height: 22, borderRadius: 6,
                                  border: `2px solid ${filled ? accentColor : slot1Locked ? P.border + "55" : P.border}`,
                                  background: filled ? accentColor : "transparent",
                                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                                  cursor: canClick ? "pointer" : "default",
                                  opacity: slot1Locked ? 0.3 : 1,
                                  transition: "all .15s" }}>
                                {filled && <span style={{ color: isLong ? "#fff" : "#000", fontSize: 12, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: countSelected > 0 ? accentColor : P.text }}>{opt.label}</div>
                          <div style={{ fontSize: 11, color: P.textMuted, marginTop: 2, lineHeight: 1.5 }}>{opt.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Swap cards checkbox */}
                {c.className && (
                  <div onClick={() => setSwapCardsOnRest(v => !v)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10,
                      border: `2px solid ${swapCardsOnRest ? P.accent : P.border}`,
                      background: swapCardsOnRest ? P.accent + "18" : P.surface,
                      cursor: "pointer", marginBottom: 2, transition: "all .15s" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${swapCardsOnRest ? P.accent : P.border}`,
                      background: swapCardsOnRest ? P.accent : "transparent", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {swapCardsOnRest && <span style={{ color: "#fff", fontSize: 12, fontWeight: 900 }}>✓</span>}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: swapCardsOnRest ? P.accent : P.text }}>Swap Domain Cards</div>
                      <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>Choose new cards for your loadout after this rest</div>
                    </div>
                  </div>
                )}
                <button onClick={applyRest} disabled={restChoices.length === 0}
                  style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none",
                    background: restChoices.length > 0 ? (isLong ? P.accent : P.hope) : P.border,
                    color: restChoices.length > 0 ? (isLong ? "#fff" : "#000") : P.textMuted,
                    fontSize: 14, fontWeight: 800, cursor: restChoices.length > 0 ? "pointer" : "default",
                    fontFamily: "inherit", transition: "all .15s" }}>
                  {isLong ? "Long Rest" : "Short Rest"}
                </button>
              </>}
            </div>
          </div>
        );
      })()}

            {/* ═══ HEADER ═══ */}
      <div style={{ padding: "12px 14px 10px", background: `linear-gradient(135deg, ${P.surface} 0%, ${P.bg} 100%)`, borderBottom: `1px solid ${P.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onBack} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>‹ Roster</button>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ fontSize: 16, fontWeight: 800, color: P.accent }}>⬥</span><span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>DAGGERHEART</span></div>
          </div>
          <button onClick={() => setEditHdr(!editHdr)} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: editHdr ? P.accent : P.surface, color: editHdr ? "#fff" : P.accent, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{editHdr ? "Done" : "Edit"}</button>
        </div>

        {editHdr ? (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8 }}><Inp value={c.name} onChange={v => u("name", v)} placeholder="Name" style={{ flex: 2 }} /><Inp value={c.pronouns} onChange={v => u("pronouns", v)} placeholder="Pronouns" style={{ flex: 1 }} /></div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: P.textMuted, fontWeight: 700 }}>LVL</span>
              <button onClick={() => u("level", Math.max(1, c.level - 1))} style={{ ...sBtn, width: 22, height: 22 }}>−</button>
              <span style={{ fontSize: 16, fontWeight: 800, fontFamily: mono, minWidth: 20, textAlign: "center" }}>{c.level}</span>
              <button onClick={() => u("level", Math.min(10, c.level + 1))} style={{ ...sBtn, width: 22, height: 22 }}>+</button>
              {cls && <button onClick={() => setC(p => ({ ...p, traits: { ...cls.suggestedTraits } }))} style={{ marginLeft: "auto", fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.accent, cursor: "pointer", fontFamily: "inherit" }}>Suggested Traits</button>}
            </div>
            <Lbl style={{ marginTop: 4, marginBottom: 0 }}>Traits (distribute +2, +1, +1, 0, 0, −1)</Lbl>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {TRAIT_KEYS.map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 4, background: P.surface, borderRadius: 6, padding: "4px 6px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: P.textMuted, minWidth: 28 }}>{TRAIT_SHORT[t]}</span>
                  <button onClick={() => uT(t, Math.max(-3, c.traits[t] - 1))} style={{ ...sBtn, width: 20, height: 20, fontSize: 12 }}>−</button>
                  <span style={{ fontSize: 14, fontWeight: 800, fontFamily: mono, color: c.traits[t] > 0 ? P.hp : c.traits[t] < 0 ? P.fear : P.textMuted, minWidth: 22, textAlign: "center" }}>{fmtMod(c.traits[t])}</span>
                  <button onClick={() => uT(t, Math.min(5, c.traits[t] + 1))} style={{ ...sBtn, width: 20, height: 20, fontSize: 12 }}>+</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginTop: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: c.name ? P.hope : P.textMuted }}>{c.name || "Unnamed"}</span>
              {c.pronouns && <span style={{ fontSize: 11, color: P.textMuted }}> ({c.pronouns})</span>}
              <span style={{ fontSize: 11, color: P.textMuted, marginLeft: 8 }}>Lv{c.level}{cls ? ` ${c.className}` : ""}{c.subclass ? ` · ${c.subclass}` : ""}</span>
            </div>
            {/* Trait bar */}
            <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
              {TRAIT_KEYS.map(t => (
                <div key={t} style={{ fontSize: 11, color: P.textMuted }}>
                  <span style={{ fontWeight: 700, fontSize: 10 }}>{TRAIT_SHORT[t]}</span>{" "}
                  <span style={{ fontWeight: 800, fontFamily: mono, color: c.traits[t] > 0 ? P.hp : c.traits[t] < 0 ? P.fear : P.textMuted }}>{fmtMod(c.traits[t])}</span>
                </div>
              ))}
            </div>
            {/* Stat bar */}
            <div style={{ display: "flex", gap: 10, marginTop: 4, fontSize: 11, color: P.textMuted, flexWrap: "wrap" }}>
              <span>Eva <strong style={{ color: P.accent }}>{fEv}</strong></span>
              <span>HP <strong style={{ color: P.fear }}>{maxHp}</strong></span>
              <span>Armor <strong style={{ color: P.text }}>{aS}</strong></span>
              <span>Thresh <strong style={{ color: P.stress }}>{mT}/{sT}</strong></span>
              <span>Prof <strong style={{ color: P.accent }}>{prof}</strong></span>
            </div>
          </>
        )}
      </div>

      <TabBar tabs={tabs} active={tab} onChange={setTab} />
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>

        {/* ═══ PLAY TAB ═══ */}
        {tab === "Play" && <>
          {/* Trackers */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", marginBottom: 10 }}>
              <div><div style={{ fontSize: 22, fontWeight: 800, color: P.accent, fontFamily: mono }}>{fEv}</div><div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>EVASION</div></div>
              <div><div style={{ fontSize: 22, fontWeight: 800, color: P.text, fontFamily: mono }}>{aS}</div><div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>ARMOR</div></div>
              <div><div style={{ fontSize: 22, fontWeight: 800, color: P.stress, fontFamily: mono }}>{mT}/{sT}</div><div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>THRESHOLDS</div></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", fontSize: 9, color: P.textMuted, marginBottom: 6 }}>
              <span>Minor: &lt;{mT} → 1HP</span><span>Major: {mT}–{sT-1} → 2HP</span><span>Severe: {sT}+ → 3HP</span>
            </div>
          </Card>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <Lbl style={{ marginBottom: 0 }}>Hit Points ({c.hp.filter(Boolean).length} / {maxHp})</Lbl>
              <button onClick={() => { setRestModal("choose"); setRestChoices([]); }}
                style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.hope, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, letterSpacing: 0.3 }}>⛺ Rest</button>
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{c.hp.slice(0, maxHp).map((f, i) => <Pip key={i} filled={f} color={P.fear} onClick={() => tog("hp", i)} size={26} />)}</div>
          </Card>

          <div style={{ display: "flex", gap: 10 }}>
            <Card style={{ flex: 1 }}>
              <Lbl>Stress ({c.stress.slice(0, maxStress).filter(Boolean).length}/{maxStress})</Lbl>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{c.stress.slice(0, maxStress).map((f, i) => <Pip key={i} filled={f} color={P.stress} onClick={() => tog("stress", i)} size={24} />)}</div>
            </Card>
            <Card style={{ flex: 1 }}>
              <Lbl>Hope ({c.hope.filter(Boolean).length}/6)</Lbl>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{c.hope.map((f, i) => <Pip key={i} filled={f} color={P.hope} onClick={() => tog("hope", i)} size={24} />)}</div>
            </Card>
          </div>

          {aS > 0 && <Card>
            <Lbl>Armor Slots ({c.armorSlots.slice(0, aS).filter(Boolean).length}/{aS})</Lbl>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{c.armorSlots.slice(0, aS).map((f, i) => <Pip key={i} filled={f} color={P.accent} onClick={() => tog("armorSlots", i)} size={24} />)}</div>
          </Card>}

          {/* Experiences */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <Lbl style={{ marginBottom: 0 }}>Experiences</Lbl>
              <button onClick={() => setEditExp(!editExp)} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: editExp ? P.accent : P.surface, color: editExp ? "#fff" : P.accent, cursor: "pointer", fontFamily: "inherit" }}>{editExp ? "Done" : "Edit"}</button>
            </div>
            <div style={{ fontSize: 10, color: P.textMuted, marginBottom: 8 }}>Spend a Hope to add modifier to a roll</div>
            {editExp ? (
              <>
                {[["exp1", "exp1Val"], ["exp2", "exp2Val"]].map(([ek, vk], i) => (
                  <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <Inp value={c[ek]} onChange={v => u(ek, v)} placeholder={`Experience ${i + 1}...`} style={{ flex: 1, fontSize: 13, padding: "6px 10px" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <button onClick={() => u(vk, Math.max(0, c[vk] - 1))} style={{ ...sBtn, width: 20, height: 20, fontSize: 12 }}>−</button>
                      <span style={{ fontSize: 14, fontWeight: 800, color: P.accent, fontFamily: mono, minWidth: 20, textAlign: "center" }}>+{c[vk]}</span>
                      <button onClick={() => u(vk, c[vk] + 1)} style={{ ...sBtn, width: 20, height: 20, fontSize: 12 }}>+</button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[["exp1", "exp1Val"], ["exp2", "exp2Val"]].map(([ek, vk], i) => (
                  c[ek] ? <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: P.surface, borderRadius: 6, border: `1px solid ${P.border}` }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c[ek]}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: P.accent, fontFamily: mono }}>+{c[vk]}</span>
                  </div> : <div key={i} style={{ fontSize: 12, color: P.textMuted, fontStyle: "italic", padding: "6px 10px" }}>Tap Edit to set Experience {i + 1}</div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <Card>
            <Lbl>Quick Actions</Lbl>
            {actions.length === 0 && <div style={{ fontSize: 12, color: P.textMuted, fontStyle: "italic" }}>Select weapons and class to see actions</div>}
            {actions.filter(a => a.type !== "trait").map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: P.surface, borderRadius: 8, border: `1px solid ${P.border}`, marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: a.type === "spell" ? P.hope : P.text }}>
                    {a.type === "primary" ? "⚔ " : a.type === "secondary" ? "🛡 " : "✦ "}{a.label}
                  </div>
                  {a.sub && <div style={{ fontSize: 10, color: P.accent, marginTop: 2 }}>{a.sub}</div>}
                </div>
                <div style={{ fontSize: 12, color: P.textMuted, fontFamily: mono, textAlign: "right", whiteSpace: "nowrap" }}>{a.detail}</div>
              </div>
            ))}
            <div style={{ marginTop: 8 }}><Lbl>Trait Rolls</Lbl></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {actions.filter(a => a.type === "trait").map((a, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", background: P.surface, borderRadius: 6, border: `1px solid ${P.border}` }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{a.label.replace(" Roll", "")}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, fontFamily: mono, color: parseInt(a.detail) > 0 ? P.hp : parseInt(a.detail) < 0 ? P.fear : P.textMuted }}>{a.detail}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Domain Cards */}
          {c.selectedCards.length > 0 && <Card>
            <Lbl>Active Domain Cards</Lbl>
            {c.selectedCards.map(key => {
              const [domain, name] = key.split("::");
              const card = (DOMAIN_CARDS[domain] || []).find(c => c.name === name);
              if (!card) return null;
              const domColor = DOMAIN_COLORS[domain] || P.accent;
              const typeColor = { Ability: P.accent, Spell: "#a855f7", Grimoire: "#3b82f6" };
              return (
                <div key={key} style={{ marginBottom: 8, borderRadius: 10, border: `1px solid ${domColor}55`, background: domColor + "0d", overflow: "hidden" }}>
                  <div style={{ padding: "8px 12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: domColor, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, fontWeight: 800, color: domColor }}>{card.name}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: typeColor[card.type] || P.textMuted, textTransform: "uppercase", letterSpacing: 0.8 }}>{card.type}</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: mono, color: card.recallCost === 0 ? P.hp : P.stress }}>⚡{card.recallCost}</span>
                    </div>
                    <div style={{ fontSize: 11, lineHeight: 1.65, color: P.textMuted, whiteSpace: "pre-line", marginTop: 6, paddingLeft: 16 }}>{card.text}</div>
                  </div>
                </div>
              );
            })}
          </Card>}

          {/* Gold */}
          <Card>
            <Lbl>Gold</Lbl>
            <div style={{ display: "flex", gap: 12 }}>
              {[["Handfuls", "goldH"], ["Bags", "goldB"], ["Chests", "goldC"]].map(([l, k]) => (
                <div key={k} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: P.textMuted, marginBottom: 3 }}>{l}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                    <button onClick={() => u(k, Math.max(0, c[k] - 1))} style={{ ...sBtn, width: 22, height: 22, fontSize: 13 }}>−</button>
                    <span style={{ fontSize: 16, fontWeight: 800, color: P.gold, fontFamily: mono, minWidth: 18 }}>{c[k]}</span>
                    <button onClick={() => u(k, c[k] + 1)} style={{ ...sBtn, width: 22, height: 22, fontSize: 13 }}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>}

        {/* ═══ CLASS TAB ═══ */}
        {tab === "Class" && <>
          {(() => {
            const classItems = Object.keys(CLASSES).map(n => {
              const cl = CLASSES[n];
              // Reformat each feature: "Name: text" → "**Name**: text"
              const featureLines = cl.classFeatures.map(f => {
                const colonIdx = f.indexOf(":");
                if (colonIdx > 0) {
                  return `**${f.slice(0, colonIdx)}**:${f.slice(colonIdx + 1)}`;
                }
                return f;
              }).join("\n\n");
              const hopeFormatted = (() => {
                const colonIdx = cl.hopeFeature.indexOf(":");
                if (colonIdx > 0) return `**${cl.hopeFeature.slice(0, colonIdx)}**:${cl.hopeFeature.slice(colonIdx + 1)}`;
                return cl.hopeFeature;
              })();
              return {
                key: n,
                label: n,
                meta: `${cl.domains.join(" & ")} · HP ${cl.hp} · Evasion ${cl.evasion}`,
                body: `## Overview\nDomains: ${cl.domains.join(" & ")}  ·  Starting HP: ${cl.hp}  ·  Base Evasion: ${cl.evasion}\n\n## Hope Feature\n${hopeFormatted}\n\n## Class Features\n\n${featureLines}\n\n## Starting Items\n${cl.items}`,
              };
            });
            return (
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <Lbl style={{ marginBottom: 0 }}>Class</Lbl>
                  {c.className && <button onClick={() => setEditingClass(e => !e)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: editingClass ? P.accent + "22" : P.surface, color: editingClass ? P.accent : P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{editingClass ? "Done" : "Change"}</button>}
                </div>
                {(!c.className || editingClass) && (
                  <PickerAccordion items={classItems} selected={c.className} onSelect={v => { u("className", v); u("subclass", ""); setEditingClass(false); setEditingSubclass(false); }} />
                )}
                {c.className && !editingClass && (
                  <div style={{ padding: "8px 12px", borderRadius: 8, background: P.accent + "14", border: `2px solid ${P.accent}` }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: P.accent }}>{c.className}</div>
                    <div style={{ fontSize: 11, color: P.textMuted, marginTop: 2 }}>{cls?.domains.join(" & ")} · HP {cls?.hp} · Evasion {cls?.evasion}</div>
                  </div>
                )}
              </Card>
            );
          })()}
          {cls && <>
            <Card>
              {(() => {
                const subItems = Object.keys(cls.subclasses).map(n => {
                  const sc = cls.subclasses[n];
                  const fmt = (text) => text.split("\n").map(line => {
                    const colonIdx = line.indexOf(":");
                    if (colonIdx > 0 && !line.startsWith("•") && !line.startsWith(" ")) {
                      return `**${line.slice(0, colonIdx)}**:${line.slice(colonIdx + 1)}`;
                    }
                    return line;
                  }).join("\n");
                  return {
                    key: n,
                    label: n,
                    meta: `${sc.desc}${sc.spellcast ? ` · Spellcast: ${sc.spellcast}` : ""}`,
                    body: `${sc.desc}${sc.spellcast ? `\n**Spellcast Trait**: ${sc.spellcast}` : ""}\n\n## Foundation\n${fmt(sc.foundation)}\n\n## Specialization\n${fmt(sc.specialization)}\n\n## Mastery\n${fmt(sc.mastery)}`,
                  };
                });
                return (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <Lbl style={{ marginBottom: 0 }}>Subclass</Lbl>
                      {c.subclass && <button onClick={() => setEditingSubclass(e => !e)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: editingSubclass ? P.accent + "22" : P.surface, color: editingSubclass ? P.accent : P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{editingSubclass ? "Done" : "Change"}</button>}
                    </div>
                    {(!c.subclass || editingSubclass) && (
                      <PickerAccordion items={subItems} selected={c.subclass} onSelect={v => { u("subclass", v); setEditingSubclass(false); }} />
                    )}
                    {c.subclass && !editingSubclass && (
                      <div style={{ padding: "8px 12px", borderRadius: 8, background: P.accent + "14", border: `2px solid ${P.accent}` }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: P.accent }}>{c.subclass}</div>
                        {sub?.spellcast && <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>Spellcast: {sub.spellcast}</div>}
                        <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{sub?.desc}</div>
                      </div>
                    )}
                  </>
                );
              })()}
            </Card>
                <Card><Lbl>Hope Feature (3 Hope)</Lbl><div style={{ fontSize: 12, lineHeight: 1.6, color: P.textMuted }}>{cls.hopeFeature}</div></Card>
                <Card><Lbl>Class Features</Lbl>{cls.classFeatures.map((f, i) => <Feat key={i} title={f.split(":")[0]} text={f} />)}</Card>
                {sub && <Card><Lbl>Subclass — {c.subclass}</Lbl><Feat title="Foundation" text={sub.foundation} /><Feat title="Specialization" text={sub.specialization} /><Feat title="Mastery" text={sub.mastery} /></Card>}
                <Card><Lbl>Starting Items</Lbl><div style={{ fontSize: 12, color: P.textMuted }}>{cls.items}</div></Card>
          </>}
        </>}

        {/* ═══ HERITAGE TAB ═══ */}
        {tab === "Heritage" && <>
          {/* Ancestry */}
          <Card>
            {(() => {
              const ancestryItems = Object.keys(ANCESTRIES).map(a => {
                const fmtFeature = (f) => {
                  const colonIdx = f.indexOf(":");
                  if (colonIdx > 0) return `**${f.slice(0, colonIdx)}**:${f.slice(colonIdx + 1)}`;
                  return f;
                };
                return {
                  key: a,
                  label: a,
                  meta: ANCESTRIES[a].map(f => f.split(":")[0]).join(" · "),
                  body: `## Ancestry Features\n\n` + ANCESTRIES[a].map(fmtFeature).join("\n\n"),
                };
              });
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <Lbl style={{ marginBottom: 0 }}>Ancestry</Lbl>
                    {c.ancestry && <button onClick={() => setEditingAncestry(e => !e)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: editingAncestry ? P.accent + "22" : P.surface, color: editingAncestry ? P.accent : P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{editingAncestry ? "Done" : "Change"}</button>}
                  </div>
                  {(!c.ancestry || editingAncestry) && (
                    <PickerAccordion items={ancestryItems} selected={c.ancestry} onSelect={v => { u("ancestry", v); setEditingAncestry(false); }} />
                  )}
                  {c.ancestry && !editingAncestry && (
                    <>
                      <div style={{ padding: "8px 12px", borderRadius: 8, background: P.accent + "14", border: `2px solid ${P.accent}`, marginBottom: 8 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: P.accent }}>{c.ancestry}</div>
                        <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{ANCESTRIES[c.ancestry].map(f => f.split(":")[0]).join(" · ")}</div>
                      </div>
                      {ANCESTRIES[c.ancestry].map((f, i) => <Feat key={i} title={f.split(":")[0]} text={f} />)}
                    </>
                  )}
                </>
              );
            })()}
          </Card>

          {/* Community */}
          <Card>
            {(() => {
              const communityItems = Object.keys(COMMUNITIES).map(k => {
                const text = COMMUNITIES[k];
                const colonIdx = text.indexOf(":");
                const featureName = colonIdx > 0 ? text.slice(0, colonIdx) : k;
                const featureBody = colonIdx > 0 ? text.slice(colonIdx + 1) : text;
                return {
                  key: k,
                  label: k,
                  meta: featureName,
                  body: `## Community Feature\n\n**${featureName}**:${featureBody}`,
                };
              });
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <Lbl style={{ marginBottom: 0 }}>Community</Lbl>
                    {c.community && <button onClick={() => setEditingCommunity(e => !e)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: editingCommunity ? P.accent + "22" : P.surface, color: editingCommunity ? P.accent : P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{editingCommunity ? "Done" : "Change"}</button>}
                  </div>
                  {(!c.community || editingCommunity) && (
                    <PickerAccordion items={communityItems} selected={c.community} onSelect={v => { u("community", v); setEditingCommunity(false); }} />
                  )}
                  {c.community && !editingCommunity && (
                    <>
                      <div style={{ padding: "8px 12px", borderRadius: 8, background: P.accent + "14", border: `2px solid ${P.accent}`, marginBottom: 10 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: P.accent }}>{c.community}</div>
                        <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{COMMUNITIES[c.community].split(":")[0]}</div>
                      </div>
                      <div style={{ marginBottom: 10, padding: 10, background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}>
                        <div style={{ fontSize: 12, lineHeight: 1.6, color: P.textMuted }}>{COMMUNITIES[c.community]}</div>
                      </div>
                      <div style={{ marginTop: 4 }}>
                        <Lbl>{COMMUNITY_HAS_NOTES[c.community] || "Community Notes"}</Lbl>
                        <textarea value={c.communityNotes} onChange={e => u("communityNotes", e.target.value)} placeholder={c.community === "Orderborne" ? "1. \n2. \n3. " : "Notes about your community..."} rows={c.community === "Orderborne" ? 4 : 3} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", resize: "vertical" }} />
                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </Card>
        </>}

        {/* ═══ GEAR TAB ═══ */}
        {tab === "Gear" && <>
          <Card><Lbl>Primary Weapon</Lbl><Sel value={c.primaryWeapon} onChange={v => u("primaryWeapon", v)}><option value="">— Select —</option><optgroup label="Physical">{WEAPONS_PRIMARY.filter(w => w.type === "phy").map(w => <option key={w.name} value={w.name}>{w.name} — {w.trait} {w.range} {w.damage} ({w.burden})</option>)}</optgroup><optgroup label="Magic (Spellcast)">{WEAPONS_PRIMARY.filter(w => w.type === "mag").map(w => <option key={w.name} value={w.name}>{w.name} — {w.trait} {w.range} {w.damage} ({w.burden})</option>)}</optgroup></Sel>
            {pw && <div style={{ marginTop: 8, padding: 10, background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}><div style={{ fontSize: 14, fontWeight: 700 }}>{pw.name}</div><div style={{ fontSize: 12, color: P.textMuted, marginTop: 3 }}>{pw.trait} ({fmtMod(c.traits[pw.trait] || 0)}) | {pw.range} | {prof}{pw.damage} {pw.type} | {pw.burden}</div>{pw.feature && <div style={{ fontSize: 11, color: P.accent, marginTop: 3 }}>{pw.feature}</div>}</div>}
          </Card>
          <Card><Lbl>Secondary Weapon</Lbl><Sel value={c.secondaryWeapon} onChange={v => u("secondaryWeapon", v)}><option value="">— None —</option>{WEAPONS_SECONDARY.map(w => <option key={w.name} value={w.name}>{w.name} — {w.trait} {w.range} {w.damage}</option>)}</Sel>
            {sw && <div style={{ marginTop: 8, padding: 10, background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}><div style={{ fontSize: 14, fontWeight: 700 }}>{sw.name}</div><div style={{ fontSize: 12, color: P.textMuted, marginTop: 3 }}>{sw.trait} ({fmtMod(c.traits[sw.trait] || 0)}) | {sw.range} | {prof}{sw.damage} {sw.type} | {sw.burden}</div>{sw.feature && <div style={{ fontSize: 11, color: P.accent, marginTop: 3 }}>{sw.feature}</div>}</div>}
          </Card>
          <Card><Lbl>Armor</Lbl><Sel value={c.armor} onChange={v => u("armor", v)}><option value="">— Select —</option>{ARMOR.map(a => <option key={a.name} value={a.name}>{a.name} — {a.thresholds} | Score {a.score}</option>)}</Sel>
            {sA && <div style={{ marginTop: 8, padding: 10, background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}><div style={{ fontSize: 14, fontWeight: 700 }}>{sA.name}</div><div style={{ fontSize: 12, color: P.textMuted, marginTop: 3 }}>Base: {sA.thresholds} → Lv{c.level}: {mT}/{sT} | Score: {sA.score}</div>{sA.feature && <div style={{ fontSize: 11, color: P.accent, marginTop: 3 }}>{sA.feature}</div>}</div>}
          </Card>
          <Card><Lbl>Inventory</Lbl><div style={{ fontSize: 10, color: P.textMuted, marginBottom: 6 }}>Starts with: torch, 50ft rope, basic supplies, handful of gold, Minor Health or Stamina Potion</div><textarea value={c.inventory} onChange={e => u("inventory", e.target.value)} placeholder="Items..." rows={5} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", resize: "vertical" }} /></Card>
        </>}

        {/* ═══ NOTES TAB ═══ */}

        {/* ═══ DOMAINS TAB ═══ */}
        {tab === "Domains" && (() => {
          if (!c.className) return (
            <Card><div style={{ fontSize: 13, color: P.textMuted, fontStyle: "italic", textAlign: "center", padding: 16 }}>Choose a class on the Class tab to see your domain cards.</div></Card>
          );
          const domains = CLASSES[c.className]?.domains || [];
          const typeColor = { Ability: P.accent, Spell: "#a855f7", Grimoire: "#3b82f6" };
          const selCount = c.selectedCards.length;
          // Max loadout = 5, but at level 1 you start with 2 earned cards.
          // Rule: if selCount < maxLoadout (cards you've earned so far), let them pick freely.
          // At level 1 with only level-1 cards available, starting loadout = 2.
          // Once full, cards can only be swapped during a rest.
          // School of Knowledge Wizard: 'Prepared' foundation grants an extra card at creation
          const maxLoadout = (c.className === "Wizard" && c.subclass === "School of Knowledge") ? 3 : 2;
          const canPickFreely = selCount < maxLoadout;

          const toggleCard = (domain, name) => {
            const key = `${domain}::${name}`;
            const already = c.selectedCards.includes(key);
            if (already) u("selectedCards", c.selectedCards.filter(k => k !== key));
            else if (selCount < maxLoadout) u("selectedCards", [...c.selectedCards, key]);
          };

          return <>
            {/* Status bar */}
            <Card style={{ background: selCount >= maxLoadout ? "#1a2a1a" : P.card, borderColor: selCount >= maxLoadout ? P.hp + "88" : P.border }}>
              <div style={{ fontSize: 12, color: P.textMuted, marginBottom: canPickFreely ? 4 : 0 }}>
                {canPickFreely && selCount === 0 && <span style={{ color: P.hope }}>Choose {maxLoadout} domain cards for your starting loadout.</span>}
                {canPickFreely && selCount > 0 && <span>Selected {selCount} of {maxLoadout} — <span style={{ color: P.hope }}>choose {maxLoadout - selCount} more</span></span>}
                {!canPickFreely && <span style={{ color: P.hp }}>✓ Loadout full ({selCount}/{maxLoadout}) — swap cards during a rest to change</span>}
              </div>
              {canPickFreely && <div style={{ fontSize: 11, color: P.textMuted, fontStyle: "italic" }}>Tap a card to add it to your loadout.</div>}
            </Card>
            {/* Domain cards — interactive if under max, display-only if full */}
            {domains.map(domain => (
              <div key={domain}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, marginTop: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: DOMAIN_COLORS[domain] || P.accent }} />
                  <Lbl style={{ marginBottom: 0, color: DOMAIN_COLORS[domain] || P.accent }}>{domain} Domain — Level 1</Lbl>
                </div>
                {(DOMAIN_CARDS[domain] || []).map(card => {
                  const key = `${domain}::${card.name}`;
                  const isSelected = c.selectedCards.includes(key);
                  const isDisabled = !isSelected && !canPickFreely;
                  const domColor = DOMAIN_COLORS[domain] || P.accent;
                  return (
                    <div key={card.name}
                      onClick={() => canPickFreely && toggleCard(domain, card.name)}
                      style={{ marginBottom: 10, borderRadius: 12, padding: 14,
                        border: `2px solid ${isSelected ? domColor : P.border}`,
                        background: isSelected ? domColor + "18" : P.card,
                        opacity: isDisabled ? 0.5 : 1,
                        cursor: canPickFreely ? "pointer" : "default",
                        boxShadow: isSelected ? `0 0 16px ${domColor}33` : "none",
                        transition: "all .2s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: typeColor[card.type] || P.textMuted }}>{card.type}</div>
                            {isSelected && <div style={{ fontSize: 9, fontWeight: 800, color: domColor, background: domColor + "22", borderRadius: 4, padding: "1px 6px", letterSpacing: 0.5 }}>IN LOADOUT</div>}
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 800, color: isSelected ? domColor : P.text }}>{card.name}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                          <div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700, marginBottom: 2 }}>RECALL</div>
                          <div style={{ fontSize: 15, fontWeight: 800, fontFamily: mono, color: card.recallCost === 0 ? P.hp : P.stress }}>⚡{card.recallCost}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, lineHeight: 1.7, color: P.textMuted, whiteSpace: "pre-line", borderTop: `1px solid ${isSelected ? domColor + "44" : P.border}`, paddingTop: 8, marginTop: 4 }}>{card.text}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </>;
        })()}
        {tab === "Notes" && <>
          <Card><Lbl>Notes & Backstory</Lbl><textarea value={c.notes} onChange={e => u("notes", e.target.value)} placeholder="Background, connections, session notes..." rows={14} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.7 }} /></Card>
          <Card><Lbl>Reference</Lbl><Feat title="Action Rolls" text="Roll 2d12 (Hope die + Fear die). Add trait modifier. Hope > Fear = gain Hope. Fear > Hope = GM gains Fear. Compare total to Difficulty." /><Feat title="Downtime" text={"Short Rest: Tend Wounds (1 HP), Clear Stress (up to 3), Repair Armor, Prepare.\nLong Rest: Clear ALL Stress, Repair ALL Armor, Tend ALL Wounds, Work on Project."} /></Card>
          <Card><Lbl>Export</Lbl><button onClick={() => { const b = new Blob([JSON.stringify(c, null, 2)], { type: "application/json" }); const x = URL.createObjectURL(b); const a = document.createElement("a"); a.href = x; a.download = `${c.name || "character"}_daggerheart.json`; a.click(); URL.revokeObjectURL(x); }} style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${P.borderActive}`, background: P.surface, color: P.accent, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Download JSON</button></Card>
        </>}
      </div>
      <div style={{ padding: "16px", textAlign: "center", fontSize: 9, color: P.textMuted, borderTop: `1px solid ${P.border}` }}>Daggerheart © Darrington Press 2025 — Fan-made digital sheet</div>
    </div>
  );
}
