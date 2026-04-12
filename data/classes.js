export const CLASSES = {
  Bard: { domains: ["Grace", "Codex"], evasion: 10, hp: 5,
    subclasses: {
      Troubadour: {
        spellcast: "Presence", desc: "Play music to bolster your allies",
        foundation: {
          name: "Gifted Performer", passive: false,
          summary: "Once per long rest each:\nRelaxing Song: Self + Close allies clear 1 HP\nEpic Song: Close target → Vulnerable\nHeartbreaking Song: Self + Close allies gain 1 Hope",
          text: "Gifted Performer: Describe how you perform for others. You can play each song once per long rest:\n• Relaxing Song: You and all allies within Close range clear a Hit Point.\n• Epic Song: Make a target within Close range temporarily Vulnerable.\n• Heartbreaking Song: You and all allies within Close range gain a Hope."
        },
        specialization: {
          name: "Maestro", passive: true,
          summary: "Passive: When giving a Rally Die · Ally can also gain Hope or clear Stress",
          text: "Maestro: Your rallying songs steel the courage of those who listen. When you give a Rally Die to an ally, they can gain a Hope or clear a Stress."
        },
        mastery: {
          name: "Virtuoso", passive: true,
          summary: "Passive: Each Gifted Performer song usable twice per long rest",
          text: "Virtuoso: You can perform each of your Gifted Performer songs twice instead of once per long rest."
        },
      },
      Wordsmith: {
        spellcast: "Presence", desc: "Use clever wordplay and captivate crowds",
        foundation: {
          name: "Rousing Speech / Heart of a Poet", passive: false,
          summary: "Rousing Speech: Once per long rest · Inspiring speech → Far allies clear 2 Stress\nHeart of a Poet: After impress/persuade/offend roll · 1 Hope → +d4 to roll",
          text: "Rousing Speech: Once per long rest, give a heartfelt, inspiring speech. All allies within Far range clear 2 Stress.\n\nHeart of a Poet: After you make an action roll to impress, persuade, or offend someone, you can spend a Hope to add a d4 to the roll."
        },
        specialization: {
          name: "Eloquent", passive: false,
          summary: "Once per session · Encourage ally → choose: find mundane object, Help without spending Hope, or extra downtime move",
          text: "Eloquent: Once per session, when you encourage an ally, do one of: allow them to find a mundane object/tool, Help an Ally without spending Hope, or give them an additional downtime move during their next rest."
        },
        mastery: {
          name: "Epic Poetry", passive: true,
          summary: "Passive: Rally Die → d10 · Help an Ally: narrate as heroic memoir, roll d10 as advantage die",
          text: "Epic Poetry: Your Rally Die increases to a d10. When you Help an Ally, narrate the moment as heroic memoir; roll a d10 as your advantage die."
        },
      },
    },
    hopeFeature: {
      name: "Make a Scene", passive: false,
      summary: "3 Hope · Temporarily Distract target within Close · −2 penalty to their Difficulty",
      text: "Make a Scene: Spend 3 Hope to temporarily Distract a target within Close range, giving them a −2 penalty to their Difficulty."
    },
    classFeatures: [
      {
        name: "Rally", passive: false,
        summary: "Once per session · Give self + each ally a Rally Die (d6, d8 at level 5) · Spend to add to any roll or clear Stress equal to result · Unspent clear at session end",
        text: "Rally: Once per session, describe how you rally the party and give yourself and each of your allies a Rally Die. At level 1, your Rally Die is a d6. A PC can spend their Rally Die to roll it, adding the result to their action roll, reaction roll, damage roll, or to clear a number of Stress equal to the result. At the end of each session, clear all unspent Rally Dice.\n\nAt level 5, your Rally Die increases to a d8."
      },
    ],
    items: "A romance novel or a letter never opened",
    suggestedTraits: { Agility: 0, Strength: -1, Finesse: 1, Instinct: 0, Presence: 2, Knowledge: 1 },
  },

  Druid: { domains: ["Sage", "Arcana"], evasion: 10, hp: 6,
    subclasses: {
      "Warden of the Elements": {
        spellcast: "Instinct", desc: "Embody the natural elements of the wild",
        foundation: {
          name: "Elemental Incarnation", passive: false,
          summary: "1 Stress · Channel one element until Severe damage or next rest:\nFire: Melee attacker takes 1d10 magic\nEarth: +Proficiency to damage thresholds\nWater: Melee damage → all Very Close mark Stress\nAir: Hover + advantage on Agility Rolls",
          text: "Elemental Incarnation: Mark a Stress to Channel one element until Severe damage or next rest:\n• Fire: Adversary within Melee who damages you takes 1d10 magic damage.\n• Earth: Bonus to damage thresholds equal to Proficiency.\n• Water: When you damage an adversary in Melee, all others in Very Close mark a Stress.\n• Air: Hover, advantage on Agility Rolls."
        },
        specialization: {
          name: "Elemental Aura", passive: false,
          summary: "Once per rest while Channeling · Aura within Close:\nFire: HP markers also mark Stress\nEarth: Allies +1 Strength\nWater: On damage, mark Stress → move attacker (Very Close)\nAir: Reduce damage from beyond Melee by 1d8",
          text: "Elemental Aura: Once per rest while Channeling, assume an aura within Close range:\n• Fire: Adversaries who mark HP also mark Stress.\n• Earth: Allies gain +1 Strength.\n• Water: When damaged, mark Stress to move adversary within Very Close.\n• Air: Reduce damage from beyond Melee by 1d8."
        },
        mastery: {
          name: "Elemental Dominion", passive: true,
          summary: "Passive while Channeling:\nFire: +1 Proficiency for damage\nEarth: Roll d6 per HP marked; 6s reduce by 1\nWater: Mark Stress → make attacker Vulnerable\nAir: +1 Evasion and fly",
          text: "Elemental Dominion: While Channeling:\n• Fire: +1 Proficiency for damage.\n• Earth: Roll d6 per HP marked; 6s reduce by 1.\n• Water: Mark Stress to make attacker Vulnerable.\n• Air: +1 Evasion and fly."
        },
      },
      "Warden of Renewal": {
        spellcast: "Instinct", desc: "Use powerful magic to heal your party",
        foundation: {
          name: "Clarity of Nature / Regeneration", passive: false,
          summary: "Clarity of Nature: Once per long rest · Create serenity within Close · Rest clears Stress = Instinct for you + allies\nRegeneration: Touch · 3 Hope → target clears 1d4 HP",
          text: "Clarity of Nature: Once per long rest, create serenity within Close range. Resting clears Stress equal to your Instinct among you and allies.\n\nRegeneration: Touch a creature, spend 3 Hope. They clear 1d4 HP."
        },
        specialization: {
          name: "Regenerative Reach / Warden's Protection", passive: false,
          summary: "Regenerative Reach: Use Regeneration within Very Close range\nWarden's Protection: Once per long rest · 2 Hope → clear 2 HP on 1d4 allies within Close",
          text: "Regenerative Reach: Use Regeneration within Very Close range.\n\nWarden's Protection: Once per long rest, spend 2 Hope to clear 2 HP on 1d4 allies within Close range."
        },
        mastery: {
          name: "Defender", passive: true,
          summary: "Passive (Beastform): Close ally marks 2+ HP · Mark Stress → reduce HP marked by 1",
          text: "Defender: In Beastform, when an ally within Close marks 2+ HP, mark a Stress to reduce HP they mark by 1."
        },
      },
    },
    hopeFeature: {
      name: "Evolution", passive: false,
      summary: "3 Hope · Enter Beastform without marking Stress · Choose one trait +1 until form ends",
      text: "Evolution: Spend 3 Hope to transform into Beastform without marking a Stress. When you do, choose one trait to raise by +1 until you drop out of that Beastform."
    },
    classFeatures: [
      {
        name: "Beastform", passive: false,
        summary: "1 Stress · Transform into creature (your tier or lower) · Gain Beastform features + Evasion bonus · Can't use weapons or domain spells · Drops automatically if last HP marked",
        text: "Beastform: Mark a Stress to magically transform into a creature of your tier or lower from the Beastform list. You can drop out of this form at any time. While transformed, you can't use weapons or cast spells from domain cards, but you can still use other features or abilities you have access to. Spells you cast before you transform stay active and last for their normal duration, and you can talk and communicate as normal. Additionally, you gain the Beastform's features, add their Evasion bonus to your Evasion, and use the trait specified in their statistics for your attack. While you're in a Beastform, your armor becomes part of your body and you mark Armor Slots as usual; when you drop out of a Beastform, those marked Armor Slots remain marked. If you mark your last Hit Point, you automatically drop out of this form."
      },
      {
        name: "Wildtouch", passive: true,
        summary: "Passive: Perform harmless nature effects at will (grow flower, gust of wind, start campfire)",
        text: "Wildtouch: You can perform harmless, subtle effects that involve nature—such as causing a flower to rapidly grow, summoning a slight gust of wind, or starting a campfire—at will."
      },
    ],
    items: "A small bag of rocks and bones or a strange pendant found in the dirt",
    suggestedTraits: { Agility: 0, Strength: -1, Finesse: 0, Instinct: 2, Presence: 1, Knowledge: 1 },
  },

  Guardian: { domains: ["Valor", "Blade"], evasion: 9, hp: 7,
    subclasses: {
      Stalwart: {
        spellcast: null, desc: "Take heavy blows and keep fighting",
        foundation: {
          name: "Unwavering / Iron Will", passive: true,
          statEffects: [{ stat: "thresholds", amount: 1 }],
          summary: "Unwavering: Passive · +1 to all damage thresholds (permanent)\nIron Will: On physical damage · Mark extra Armor Slot → reduce severity",
          text: "Unwavering: Permanent +1 to damage thresholds.\n\nIron Will: When you take physical damage, mark an additional Armor Slot to reduce severity."
        },
        specialization: {
          name: "Unrelenting / Partners-in-Arms", passive: true,
          statEffects: [{ stat: "thresholds", amount: 1 }],
          summary: "Unrelenting: Passive · +2 to all damage thresholds (permanent)\nPartners-in-Arms: Very Close ally takes damage · Mark Armor Slot → reduce severity by one threshold",
          text: "Unrelenting: Permanent +2 to damage thresholds.\n\nPartners-in-Arms: When an ally within Very Close takes damage, mark an Armor Slot to reduce severity by one threshold."
        },
        mastery: {
          name: "Undaunted / Loyal Protector", passive: true,
          statEffects: [{ stat: "thresholds", amount: 1 }],
          summary: "Undaunted: Passive · +3 to all damage thresholds (permanent)\nLoyal Protector: Close ally at 2 or fewer HP would take damage · Mark Stress → sprint to them and take damage instead",
          text: "Undaunted: Permanent +3 to damage thresholds.\n\nLoyal Protector: When an ally within Close has 2 or fewer HP and would take damage, mark Stress to sprint to them and take the damage."
        },
      },
      Vengeance: {
        spellcast: null, desc: "Strike down enemies who harm you or your allies",
        foundation: {
          name: "At Ease / Revenge", passive: false,
          statEffects: [{ stat: "stress", amount: 1 }],
          summary: "At Ease: Passive · +1 Stress slot\nRevenge: Melee adversary succeeds attack against you · 2 Stress → they mark 1 HP",
          text: "At Ease: Gain an additional Stress slot.\n\nRevenge: When an adversary within Melee succeeds on an attack against you, mark 2 Stress to force them to mark a HP."
        },
        specialization: {
          name: "Act of Reprisal", passive: true,
          summary: "Passive: Melee adversary damages an ally · +1 Proficiency on next attack against that adversary",
          text: "Act of Reprisal: When an adversary damages an ally within Melee, gain +1 Proficiency for the next attack against that adversary."
        },
        mastery: {
          name: "Nemesis", passive: false,
          summary: "2 Hope · Prioritize adversary until next rest · Swap Hope and Fear Dice when attacking them",
          text: "Nemesis: Spend 2 Hope to Prioritize an adversary until next rest. You can swap Hope and Fear Dice when attacking them."
        },
      },
    },
    hopeFeature: {
      name: "Frontline Tank", passive: false,
      summary: "3 Hope · Clear 2 Armor Slots",
      text: "Frontline Tank: Spend 3 Hope to clear 2 Armor Slots."
    },
    classFeatures: [
      {
        name: "Unstoppable", passive: false,
        summary: "Once per long rest · Unstoppable Die d4 (d6 at level 5) · After each HP dealt: increase die value · While active: −1 physical damage threshold, +die value to damage, immune to Restrained/Vulnerable · Ends when die maxes or scene ends",
        text: "Unstoppable: Once per long rest, you can become Unstoppable. You gain an Unstoppable Die. At level 1, your Unstoppable Die is a d4. Place it on this sheet in the space provided, starting with the 1 value facing up. After you make a damage roll that deals 1 or more Hit Points to a target, increase the Unstoppable Die value by one. When the die's value would exceed its maximum value or when the scene ends, remove the die and drop out of Unstoppable. At level 5, your Unstoppable Die increases to a d6.\n\nWhile Unstoppable, you gain the following benefits:\n• You reduce the severity of physical damage by one threshold (Severe to Major, Major to Minor, Minor to None).\n• You add the current value of the Unstoppable Die to your damage roll.\n• You can't be Restrained or Vulnerable."
      },
    ],
    items: "A totem from your mentor or a secret key",
    suggestedTraits: { Agility: 0, Strength: 2, Finesse: 0, Instinct: 1, Presence: -1, Knowledge: 1 },
  },

  Ranger: { domains: ["Bone", "Sage"], evasion: 12, hp: 6,
    subclasses: {
      Beastbound: {
        spellcast: "Agility", desc: "Form a deep bond with an animal ally",
        foundation: {
          name: "Companion", passive: true,
          summary: "Passive: Animal companion (GM's discretion) · See Ranger Companion sheet",
          text: "Companion: You have an animal companion (GM's discretion). Take the Ranger Companion sheet."
        },
        specialization: {
          name: "Expert Training / Battle-Bonded", passive: true,
          summary: "Expert Training: Additional companion level-up option\nBattle-Bonded: Passive · Attacked while within companion's Melee range → +2 Evasion",
          text: "Expert Training: Choose an additional companion level-up option.\n\nBattle-Bonded: When attacked while within companion's Melee range, +2 Evasion."
        },
        mastery: {
          name: "Advanced Training / Loyal Friend", passive: true,
          summary: "Advanced Training: Two additional companion level-up options\nLoyal Friend: Once per long rest · Damage would mark companion's last Stress or your last HP within Close → one takes damage instead",
          text: "Advanced Training: Two additional companion level-up options.\n\nLoyal Friend: Once per long rest, when damage would mark companion's last Stress or your last HP within Close range, one takes damage instead."
        },
      },
      Wayfinder: {
        spellcast: "Agility", desc: "Hunt your prey and strike with deadly force",
        foundation: {
          name: "Ruthless Predator / Path Forward", passive: false,
          summary: "Ruthless Predator: On damage roll · Mark Stress → +1 Proficiency · Severe damage forces adversary to mark Stress\nPath Forward: Passive · Identify shortest path to a previously visited place",
          text: "Ruthless Predator: On a damage roll, mark Stress for +1 Proficiency. Severe damage forces adversary to mark Stress.\n\nPath Forward: Identify shortest path to a previously visited place."
        },
        specialization: {
          name: "Elusive Predator", passive: true,
          summary: "Passive: When your Focus attacks you · +2 Evasion",
          text: "Elusive Predator: When your Focus attacks you, +2 Evasion."
        },
        mastery: {
          name: "Apex Predator", passive: false,
          summary: "Before attacking Focus · Spend Hope · On success → remove a Fear from GM's pool",
          text: "Apex Predator: Before attacking Focus, spend Hope. On success, remove a Fear from GM's pool."
        },
      },
    },
    hopeFeature: {
      name: "Hold Them Off", passive: false,
      summary: "3 Hope · On successful weapon attack · Apply same roll to 2 additional adversaries within range",
      text: "Hold Them Off: Spend 3 Hope when you succeed on an attack with a weapon to use that same roll against two additional adversaries within range of the attack."
    },
    classFeatures: [
      {
        name: "Ranger's Focus", passive: false,
        summary: "1 Hope · Attack a target · On success: normal damage + target becomes Focus · vs Focus: know direction, dealing damage forces Stress mark, failed attack can end Focus to reroll Duality Dice",
        text: "Ranger's Focus: Spend a Hope and make an attack against a target. On a success, deal your attack's normal damage and temporarily make the attack's target your Focus. Until this feature ends or you make a different creature your Focus, you gain the following benefits against your Focus:\n• You know precisely what direction they are in.\n• When you deal damage to them, they must mark a Stress.\n• When you fail an attack against them, you can end your Ranger's Focus feature to reroll your Duality Dice."
      },
    ],
    items: "A trophy from your first kill or a seemingly broken compass",
    suggestedTraits: { Agility: 2, Strength: 0, Finesse: 1, Instinct: 1, Presence: -1, Knowledge: 0 },
  },

  Rogue: { domains: ["Midnight", "Grace"], evasion: 12, hp: 6,
    subclasses: {
      Nightwalker: {
        spellcast: "Finesse", desc: "Manipulate shadows to maneuver",
        foundation: {
          name: "Shadow Stepper", passive: false,
          summary: "In darkness or shadow · Mark Stress → teleport to another shadow within Far · You are Cloaked",
          text: "Shadow Stepper: In darkness or shadow, mark Stress to teleport to another shadow within Far range. You are Cloaked."
        },
        specialization: {
          name: "Dark Cloud / Adrenaline", passive: false,
          summary: "Dark Cloud: Spellcast Roll (15) · Create dark cloud within Close · Cloaked from adversaries it blocks\nAdrenaline: Passive · While Vulnerable → add level to damage",
          text: "Dark Cloud: Spellcast Roll (15) to create dark cloud within Close range. Cloaked from adversaries it blocks.\n\nAdrenaline: While Vulnerable, add level to damage."
        },
        mastery: {
          name: "Fleeting Shadow / Vanishing Act", passive: false,
          statEffects: [{ stat: "evasion", amount: 1 }],
          summary: "Fleeting Shadow: Passive · Permanent +1 Evasion · Shadow Stepper extends to Very Far\nVanishing Act: Mark Stress → Cloaked · Auto-clear Restrained · Lasts until Fear roll or next rest",
          text: "Fleeting Shadow: Permanent +1 Evasion. Shadow Stepper extends to Very Far.\n\nVanishing Act: Mark Stress to become Cloaked. Auto-clear Restrained. Lasts until Fear roll or next rest."
        },
      },
      Syndicate: {
        spellcast: "Finesse", desc: "Have a web of contacts everywhere",
        foundation: {
          name: "Well-Connected", passive: true,
          summary: "Passive: In prominent town · Know someone · Name them and choose a fact about your relationship",
          text: "Well-Connected: In a prominent town, you know someone. Give them a name and choose a fact:\n• They owe me a favor, but hard to find.\n• They'll ask something in exchange.\n• They're always in trouble.\n• We used to be together.\n• We didn't part on great terms."
        },
        specialization: {
          name: "Contacts Everywhere", passive: false,
          summary: "Once per session · Call a contact for: handful of gold/tool/object, +3 to next Hope or Fear Die, or sniper (+2d8 damage)",
          text: "Contacts Everywhere: Once per session, call a contact:\n• 1 handful of gold, a tool, or mundane object.\n• +3 to next Hope or Fear Die.\n• They snipe from shadows, +2d8 damage."
        },
        mastery: {
          name: "Reliable Backup", passive: false,
          summary: "Contacts Everywhere 3× per session · Added: reduce HP marked by 1, or roll d20 as Hope Die on Presence Roll",
          text: "Reliable Backup: Contacts Everywhere 3x per session. Added:\n• When you mark HP, reduce by 1.\n• On Presence Roll, roll d20 as Hope Die."
        },
      },
    },
    hopeFeature: {
      name: "Rogue's Dodge", passive: false,
      summary: "3 Hope · +2 Evasion until next successful hit against you (or next rest)",
      text: "Rogue's Dodge: Spend 3 Hope to gain a +2 bonus to your Evasion until the next time an attack succeeds against you. Otherwise, this bonus lasts until your next rest."
    },
    classFeatures: [
      {
        name: "Cloaked", passive: true,
        summary: "Passive: Hidden → Cloaked · Remain unseen if stationary when adversary moves to see you · Ends after attack or ending move in adversary line of sight",
        text: "Cloaked: Any time you would be Hidden, you are instead Cloaked. In addition to the benefits of the Hidden condition, while Cloaked you remain unseen if you are stationary when an adversary moves to where they would normally see you. After you make an attack or end a move within line of sight of an adversary, you are no longer Cloaked."
      },
      {
        name: "Sneak Attack", passive: true,
        summary: "Passive: While Cloaked or ally in Melee of target · Add Tier d6s to damage (T1: 1d6, T2: 2d6, T3: 3d6, T4: 4d6)",
        text: "Sneak Attack: When you succeed on an attack while Cloaked or while an ally is within Melee range of your target, add a number of d6s equal to your tier to your damage roll.\n\nLevel 1 is Tier 1\nLevels 2–4 are Tier 2\nLevels 5–7 are Tier 3\nLevels 8–10 are Tier 4"
      },
    ],
    items: "A set of forgery tools or a grappling hook",
    suggestedTraits: { Agility: 1, Strength: -1, Finesse: 2, Instinct: 0, Presence: 1, Knowledge: 0 },
  },

  Seraph: { domains: ["Splendor", "Valor"], evasion: 9, hp: 7,
    subclasses: {
      "Divine Wielder": {
        spellcast: "Strength", desc: "Dominate the battlefield with a legendary weapon",
        foundation: {
          name: "Spirit Weapon / Sparing Touch", passive: false,
          summary: "Spirit Weapon: Melee/Very Close weapon flies to attack within Close and returns · Mark Stress for additional target\nSparing Touch: Once per long rest · Touch → clear 2 HP or 2 Stress",
          text: "Spirit Weapon: Melee/Very Close weapon flies to attack within Close range and returns. Mark Stress for additional target.\n\nSparing Touch: Once per long rest, touch to clear 2 HP or 2 Stress."
        },
        specialization: {
          name: "Devout", passive: true,
          summary: "Passive: Roll extra Prayer Die, discard lowest · Sparing Touch 2× per long rest",
          text: "Devout: Roll extra Prayer Die, discard lowest. Sparing Touch 2x per long rest."
        },
        mastery: {
          name: "Sacred Resonance", passive: true,
          summary: "Passive: Spirit Weapon — matching damage dice double their values",
          text: "Sacred Resonance: Spirit Weapon damage with matching dice doubles their values."
        },
      },
      "Winged Sentinel": {
        spellcast: "Strength", desc: "Take flight and strike crushing blows",
        foundation: {
          name: "Wings of Light", passive: false,
          summary: "Passive: You can fly · While flying: Mark Stress → carry willing creature your size or smaller · 1 Hope → +1d8 damage on successful attack",
          text: "Wings of Light: You can fly. While flying:\n• Mark Stress to carry a willing creature your size or smaller.\n• Spend Hope for extra 1d8 damage on a successful attack."
        },
        specialization: {
          name: "Ethereal Visage", passive: true,
          summary: "Passive: While flying · Advantage on Presence Rolls · Succeed with Hope on Presence → remove GM Fear instead of gaining Hope",
          text: "Ethereal Visage: While flying, advantage on Presence Rolls. Succeed with Hope on Presence to remove GM Fear instead of gaining Hope."
        },
        mastery: {
          name: "Ascendant / Power of the Gods", passive: true,
          statEffects: [{ stat: "severeThreshold", amount: 4 }],
          summary: "Ascendant: Passive · +4 to Severe threshold (permanent)\nPower of the Gods: Wings of Light deals 1d12 instead of 1d8",
          text: "Ascendant: Permanent +4 to Severe threshold.\n\nPower of the Gods: Wings of Light deals 1d12 instead of 1d8."
        },
      },
    },
    hopeFeature: {
      name: "Life Support", passive: false,
      summary: "3 Hope · Clear 1 HP on ally within Close",
      text: "Life Support: Spend 3 Hope to clear a Hit Point on an ally within Close range."
    },
    classFeatures: [
      {
        name: "Prayer Dice", passive: false,
        summary: "Start of session · Roll d4s = Spellcast trait · Spend dice to: reduce incoming damage, add to a roll after rolling, or gain Hope equal to result · Unspent clear at session end",
        text: "Prayer Dice: At the beginning of each session, roll a number of d4s equal to your subclass's Spellcast trait and place them on this sheet in the space provided. These are your Prayer Dice. You can spend any number of Prayer Dice to aid yourself or an ally within Far range. You can use a spent die's value to reduce incoming damage, add to a roll's result after the roll is made, or gain Hope equal to the result. At the end of each session, clear all unspent Prayer Dice."
      },
    ],
    items: "A bundle of offerings or a sigil of your god",
    suggestedTraits: { Agility: 0, Strength: 2, Finesse: 0, Instinct: 1, Presence: 1, Knowledge: -1 },
  },

  Sorcerer: { domains: ["Arcana", "Midnight"], evasion: 10, hp: 6,
    subclasses: {
      "Elemental Origin": {
        spellcast: "Instinct", desc: "Channel raw elemental power",
        foundation: {
          name: "Elementalist", passive: false,
          summary: "Choose element (air/earth/fire/lightning/water) · Shape into harmless effects at will · Spend Hope → +2 to action roll or +3 to damage",
          text: "Elementalist: Choose an element (air, earth, fire, lightning, water). Shape it into harmless effects. Spend Hope for +2 to action roll or +3 to damage."
        },
        specialization: {
          name: "Natural Evasion", passive: false,
          summary: "Reaction: When hit · Mark Stress · Roll d6 · Add to Evasion vs that attack",
          text: "Natural Evasion: When hit, mark Stress, roll d6, add to Evasion against the attack."
        },
        mastery: {
          name: "Transcendence", passive: false,
          summary: "Once per long rest · Become your element · Choose two until next rest: +4 Severe threshold, +1 character trait, +1 Proficiency, or +2 Evasion",
          text: "Transcendence: Once per long rest, become your element. Choose two until next rest:\n• +4 Severe threshold\n• +1 character trait\n• +1 Proficiency\n• +2 Evasion"
        },
      },
      "Primal Origin": {
        spellcast: "Instinct", desc: "Extend spell versatility",
        foundation: {
          name: "Manipulate Magic", passive: false,
          summary: "After casting or magic weapon attack · Mark Stress → choose: extend reach one range, +2 to roll result, double a damage die, or hit additional target in range",
          text: "Manipulate Magic: After casting or magic weapon attack, mark Stress to:\n• Extend reach one range\n• +2 to action roll result\n• Double a damage die\n• Hit additional target in range"
        },
        specialization: {
          name: "Enchanted Aid", passive: false,
          summary: "Help Ally Spellcast with d8 advantage die · Once per long rest: swap ally's Duality Dice after helping",
          text: "Enchanted Aid: Help Ally Spellcast with d8 advantage die. Once per long rest, swap ally's Duality Dice after helping."
        },
        mastery: {
          name: "Arcane Charge", passive: false,
          summary: "Take magic damage → Charged (or 2 Hope) · While Charged on magic attack · Clear Charge → +10 damage or +3 reaction Difficulty",
          text: "Arcane Charge: Take magic damage to become Charged (or spend 2 Hope). On magic attack while Charged, clear Charge for +10 damage or +3 reaction Difficulty."
        },
      },
    },
    hopeFeature: {
      name: "Volatile Magic", passive: false,
      summary: "3 Hope · On magic damage attack · Reroll any number of damage dice",
      text: "Volatile Magic: Spend 3 Hope to reroll any number of your damage dice on an attack that deals magic damage."
    },
    classFeatures: [
      {
        name: "Arcane Sense", passive: true,
        summary: "Passive: Sense magical people and objects within Close range",
        text: "Arcane Sense: You can sense the presence of magical people and objects within Close range."
      },
      {
        name: "Minor Illusion", passive: false,
        summary: "Spellcast Roll (10) · Create minor visual illusion up to your size within Close · Convincing at Close or farther",
        text: "Minor Illusion: Make a Spellcast Roll (10). On a success, you create a minor visual illusion no larger than yourself within Close range. This illusion is convincing to anyone at Close range or farther."
      },
      {
        name: "Channel Raw Power", passive: false,
        summary: "Once per long rest · Vault a domain card from loadout · Choose: gain Hope = card level, OR bonus to magic damage roll = 2× card level",
        text: "Channel Raw Power: Once per long rest, you can place a domain card from your loadout into your vault and choose to either:\n• Gain Hope equal to the level of the card.\n• Enhance a spell that deals damage, gaining a bonus to your damage roll equal to twice the level of the card."
      },
    ],
    items: "A whispering orb or a family heirloom",
    suggestedTraits: { Agility: 0, Strength: -1, Finesse: 1, Instinct: 2, Presence: 1, Knowledge: 0 },
  },

  Warrior: { domains: ["Blade", "Bone"], evasion: 11, hp: 6,
    subclasses: {
      "Call of the Brave": {
        spellcast: null, desc: "Fuel power from enemies' might",
        foundation: {
          name: "Courage / Battle Ritual", passive: false,
          summary: "Courage: Passive · Fail with Fear → gain a Hope\nBattle Ritual: Once per long rest before great danger · Describe ritual → clear 2 Stress, gain 2 Hope",
          text: "Courage: Fail with Fear → gain a Hope.\n\nBattle Ritual: Once per long rest before great danger, describe ritual. Clear 2 Stress, gain 2 Hope."
        },
        specialization: {
          name: "Rise to the Challenge", passive: true,
          summary: "Passive: 2 or fewer HP unmarked → roll d20 as Hope Die",
          text: "Rise to the Challenge: 2 or fewer HP unmarked → roll d20 as Hope Die."
        },
        mastery: {
          name: "Camaraderie", passive: true,
          summary: "Passive: Extra Tag Team Roll per session · Allies only spend 2 Hope to Tag Team with you",
          text: "Camaraderie: Extra Tag Team Roll per session. Allies only spend 2 Hope to Tag Team with you."
        },
      },
      "Call of the Slayer": {
        spellcast: null, desc: "Strike with immense force",
        foundation: {
          name: "Slayer", passive: false,
          summary: "Passive: On Hope rolls · Place d6 Slayer Die instead (max = Proficiency) · Spend on attack/damage rolls · Unspent at session end: gain Hope per die",
          text: "Slayer: On Hope rolls, place d6 instead of gaining Hope (max Proficiency). Spend on attack/damage rolls. Clear unspent at session end, gain Hope per die."
        },
        specialization: {
          name: "Weapon Specialist", passive: false,
          summary: "On success · Spend Hope → add secondary weapon damage die · Once per long rest: reroll 1s on Slayer Dice",
          text: "Weapon Specialist: On success, spend Hope to add secondary weapon damage die. Once per long rest, reroll 1s on Slayer Dice."
        },
        mastery: {
          name: "Martial Preparation", passive: false,
          summary: "Party gains Martial Preparation downtime · You and all allies each gain a d6 Slayer Die",
          text: "Martial Preparation: Party gains Martial Preparation downtime. You and allies each gain a d6 Slayer Die."
        },
      },
    },
    hopeFeature: {
      name: "No Mercy", passive: false,
      summary: "3 Hope · +1 to attack rolls until next rest",
      text: "No Mercy: Spend 3 Hope to gain a +1 bonus to your attack rolls until your next rest."
    },
    classFeatures: [
      {
        name: "Attack of Opportunity", passive: false,
        summary: "Reaction: Melee adversary attempts to leave range · Roll trait vs their Difficulty · On success choose 1 (crit: 2): prevent movement, deal primary weapon damage, or move with them",
        text: "Attack of Opportunity: When an adversary within Melee range attempts to leave that range, make a reaction roll using a trait of your choice against their Difficulty. Choose one effect on a success, or two if you critically succeed:\n• They can't move from where they are.\n• You deal damage to them equal to your primary weapon's damage.\n• You move with them."
      },
      {
        name: "Combat Training", passive: true,
        summary: "Passive: Ignore burden when equipping weapons · Physical damage deals bonus = your level",
        text: "Combat Training: You ignore burden when equipping weapons. When you deal physical damage, you gain a bonus to your damage roll equal to your level."
      },
    ],
    items: "The drawing of a lover or a sharpening stone",
    suggestedTraits: { Agility: 1, Strength: 2, Finesse: 0, Instinct: 0, Presence: -1, Knowledge: 1 },
  },

  Wizard: { domains: ["Codex", "Splendor"], evasion: 11, hp: 5,
    subclasses: {
      "School of Knowledge": {
        spellcast: "Knowledge", desc: "Keen understanding of the world",
        foundation: {
          name: "Prepared / Adept", passive: false,
          summary: "Prepared: Passive · Take an additional domain card\nAdept: Utilize an Experience by marking Stress instead of Hope · Double the modifier",
          text: "Prepared: Take an additional domain card.\n\nAdept: Utilize an Experience by marking Stress instead of Hope. Double the modifier."
        },
        specialization: {
          name: "Accomplished / Perfect Recall", passive: false,
          summary: "Accomplished: Passive · Take an additional domain card\nPerfect Recall: Once per rest · Reduce Recall Cost by 1",
          text: "Accomplished: Take an additional domain card.\n\nPerfect Recall: Once per rest, reduce Recall Cost by 1."
        },
        mastery: {
          name: "Brilliant / Honed Expertise", passive: false,
          summary: "Brilliant: Passive · Take an additional domain card\nHoned Expertise: When using an Experience, roll d6 · On 5+ → no Hope cost",
          text: "Brilliant: Take an additional domain card.\n\nHoned Expertise: When using an Experience, roll d6. On 5+, no Hope cost."
        },
      },
      "School of War": {
        spellcast: "Knowledge", desc: "Trained magic for violence",
        foundation: {
          name: "Battlemage / Face Your Fear", passive: false,
          statEffects: [{ stat: "hp", amount: 1 }],
          summary: "Battlemage: Passive · +1 HP slot\nFace Your Fear: Succeed with Fear on attack → extra 1d10 magic damage",
          text: "Battlemage: Gain an additional HP slot.\n\nFace Your Fear: Succeed with Fear on attack → extra 1d10 magic damage."
        },
        specialization: {
          name: "Conjure Shield / Fueled by Fear", passive: false,
          summary: "Conjure Shield: With 2+ Hope · Add Proficiency to Evasion\nFueled by Fear: Face Your Fear → 2d10 instead",
          text: "Conjure Shield: With 2+ Hope, add Proficiency to Evasion.\n\nFueled by Fear: Face Your Fear → 2d10."
        },
        mastery: {
          name: "Thrive in Chaos / Have No Fear", passive: false,
          summary: "Thrive in Chaos: On success · Mark Stress after damage → force target to mark extra HP\nHave No Fear: Face Your Fear → 3d10 instead",
          text: "Thrive in Chaos: On success, mark Stress after damage to force target to mark extra HP.\n\nHave No Fear: Face Your Fear → 3d10."
        },
      },
    },
    hopeFeature: {
      name: "Not This Time", passive: false,
      summary: "3 Hope · Force adversary within Far to reroll an attack or damage roll",
      text: "Not This Time: Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll."
    },
    classFeatures: [
      {
        name: "Prestidigitation", passive: true,
        summary: "Passive: Perform harmless subtle magical effects at will (change color, create smell, light candle, float object, illuminate room, repair small object)",
        text: "Prestidigitation: You can perform harmless, subtle magical effects at will. For example, you can change an object's color, create a smell, light a candle, cause a tiny object to float, illuminate a room, or repair a small object."
      },
      {
        name: "Strange Patterns", passive: false,
        summary: "Choose a number 1–12 · When you roll that number on a Duality Die → gain a Hope or clear a Stress · Change number on long rest",
        text: "Strange Patterns: Choose a number between 1 and 12. When you roll that number on a Duality Die, gain a Hope or clear a Stress. You can change this number when you take a long rest."
      },
    ],
    items: "A book you're trying to translate or a tiny, harmless elemental pet",
    suggestedTraits: { Agility: -1, Strength: 0, Finesse: 0, Instinct: 1, Presence: 1, Knowledge: 2 },
  },
};
