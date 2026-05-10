export const Grace = [
  {
    level: 1, name: "Deft Deceiver", type: "Ability", recallCost: 0,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "1 Hope · Advantage on deception roll",
    text: "Spend a Hope to gain advantage on a roll to deceive or trick someone into believing a lie you tell them."
  },
  {
    level: 1, name: "Enrapture", type: "Spell", recallCost: 0,
    cost: null, optionalCost: { type: "stress", amount: 1, label: "Target marks Stress" },
    passive: false,
    summary: "Spellcast Roll · Close · Enraptured · Optional: 1 Stress (once/rest) → target marks Stress",
    text: "Make a Spellcast Roll against a target within Close range. On a success, they become temporarily Enraptured. While Enraptured, a target's attention is fixed on you, narrowing their field of view and drowning out any sound but your voice. Once per rest on a success, you can mark a Stress to force the Enraptured target to mark a Stress as well."
  },
  {
    level: 1, name: "Inspirational Words", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Token pool = Presence (refills on long rest) · Spend 1 token → ally: clear Stress, clear HP, or gain Hope",
    text: "Your speech is imbued with power. After a long rest, place a number of tokens on this card equal to your Presence. When you speak with an ally, you can spend a token from this card to give them one benefit:\n• Your ally clears a Stress.\n• Your ally clears a Hit Point.\n• Your ally gains a Hope.\nWhen you take a long rest, clear all unspent tokens."
  },
  // Level 2
  {
    level: 2, name: "Tell No Lies", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Very Close · Target can't lie while within Close · Refusing to answer = mark Stress + effect ends · Target typically unaware",
    text: "Make a Spellcast Roll against a target within Very Close range. On a success, they can't lie to you while they remain within Close range, but they are not compelled to speak. If you ask them a question and they refuse to answer, they must mark a Stress and the effect ends. The target is typically unaware this spell has been cast on them until it causes them to utter the truth."
  },
  {
    level: 2, name: "Troublemaker", type: "Ability", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Taunt/provoke within Far · Presence Roll · Once per rest on success: roll Proficiency d4s · Target marks Stress = highest result",
    text: "When you taunt or provoke a target within Far range, make a Presence Roll against them. Once per rest on a success, roll a number of d4s equal to your Proficiency. The target must mark Stress equal to the highest result rolled."
  },
  // Level 3
  {
    level: 3, name: "Hypnotic Shimmer", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Close (all in front) · Once per rest on success: Stunned + mark Stress · Stunned: no reactions or actions until cleared",
    text: "Make a Spellcast Roll against all adversaries in front of you within Close range. Once per rest on a success, create an illusion of flashing colors and lights that temporarily Stuns targets you succeed against and forces them to mark a Stress. While Stunned, they can't use reactions and can't take any other actions until they clear this condition."
  },
  {
    level: 3, name: "Invisibility", type: "Spell", recallCost: 1,
    cost: { type: "stress", amount: 1 },
    passive: false,
    summary: "Spellcast Roll (10) · 1 Stress · Self or Melee ally → Invisible · Tokens = Spellcast · Each action costs 1 token · One target at a time",
    text: "Make a Spellcast Roll (10). On a success, mark a Stress and choose yourself or an ally within Melee range to become Invisible. An Invisible creature can't be seen except through magical means and attack rolls against them are made with disadvantage. Place a number of tokens on this card equal to your Spellcast trait. When the Invisible creature takes an action, spend a token from this card. After the action that spends the last token is resolved, the effect ends.\nYou can only hold Invisibility on one creature at a time."
  },
  // Level 4
  {
    level: 4, name: "Soothing Speech", type: "Ability", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Short rest · Comfort ally while using Tend to Wounds → +1 HP cleared on them · You also clear 2 HP",
    text: "During a short rest, when you take the time to comfort another character while using the Tend to Wounds downtime move on them, clear an additional Hit Point on that character. When you do, you also clear 2 Hit Points."
  },
  {
    level: 4, name: "Through Your Eyes", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Choose target within Very Far · See and hear through their senses freely · Lasts until you cast another spell or next rest",
    text: "Choose a target within Very Far range. You can see through their eyes and hear through their ears. You can transition between using your own senses or the target's freely until you cast another spell or until your next rest."
  },
  // Level 5
  {
    level: 5, name: "Thought Delver", type: "Spell", recallCost: 2,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "1 Hope → read vague surface thoughts of Far target · Spellcast Roll vs target → deeper hidden thoughts · Fear: target may notice",
    text: "You can peek into the minds of others. Spend a Hope to read the vague surface thoughts of a target within Far range. Make a Spellcast Roll against the target to delve for deeper, more hidden thoughts.\nOn a roll with Fear, the target might, at the GM's discretion, become aware that you're reading their thoughts."
  },
  {
    level: 5, name: "Words of Discord", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Spellcast Roll (13) · Melee target · On success: mark Stress + must attack another adversary · −5 penalty to reuse on same target",
    text: "Whisper words of discord to an adversary within Melee range and make a Spellcast Roll (13). On a success, the target must mark a Stress and make an attack against another adversary instead of against you or your allies.\nOnce this attack is over, the target realizes what happened. The next time you cast Words of Discord on them, gain a −5 penalty to the Spellcast Roll."
  },
  // Level 6
  {
    level: 6, name: "Never Upstaged", type: "Ability", recallCost: 2,
    cost: null,
    passive: false,
    summary: "Mark HP from attack · Place tokens = HP marked · Next successful attack: +5 damage per token, then clear all tokens",
    text: "When you mark 1 or more Hit Points from an attack, you can mark a Stress to place a number of tokens equal to the number of Hit Points you marked on this card. On your next successful attack, gain a +5 bonus to your damage roll for each token on this card, then clear all tokens."
  },
  {
    level: 6, name: "Share the Burden", type: "Spell", recallCost: 0,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
    summary: "Once per rest · Melee willing creature · Transfer any number of their Stress to you · Gain Hope per Stress transferred",
    text: "Once per rest, take on the Stress from a willing creature within Melee range. The target describes what intimate knowledge or emotions telepathically leak from their mind in this moment between you. Transfer any number of their marked Stress to you, then gain a Hope for each Stress transferred."
  },
  // Level 7
  {
    level: 7, name: "Endless Charisma", type: "Ability", recallCost: 1,
    cost: { type: "hope", amount: 1 },
    passive: false,
    summary: "After persuade/lie/garner favor roll · 1 Hope → reroll Hope or Fear Die",
    text: "After you make an action roll to persuade, lie, or garner favor, you can spend a Hope to reroll the Hope or Fear Die."
  },
  {
    level: 7, name: "Grace-Touched", type: "Ability", recallCost: 2,
    cost: null,
    passive: true,
    text: "When 4 or more of the domain cards in your loadout are from the Grace domain, gain the following benefits:\n• You can mark an Armor Slot instead of marking a Stress.\n• When you would force a target to mark a number of Hit Points, you can choose instead to force them to mark that number of Stress.",
    abilities: [
      {
        name: "Grace-Touched",
        passive: true,
        summary: "Passive: 4+ Grace cards in loadout → Mark Armor Slot instead of Stress",
        text: "When 4 or more of the domain cards in your loadout are from the Grace domain, you can mark an Armor Slot instead of marking a Stress.",
      },
      {
        name: "Graceful Ruin",
        passive: true,
        summary: "Passive: 4+ Grace cards · When forcing target to mark HP → can force Stress instead",
        text: "When 4 or more of the domain cards in your loadout are from the Grace domain and you would force a target to mark a number of Hit Points, you can choose instead to force them to mark that number of Stress.",
      },
    ],
  },
  // Level 8
  {
    level: 8, name: "Astral Projection", type: "Spell", recallCost: 0,
    cost: { type: "stress", amount: 1 },
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Mark Stress · Projected copy appears anywhere visited · See/hear/affect world through it · Lasts until next rest or projection takes damage",
    text: "Once per long rest, mark a Stress to create a projected copy of yourself that can appear anywhere you've been before.\nYou can see and hear through the projection as though it were you and affect the world as though you were there. A creature investigating the projection can tell it's of magical origin. This effect lasts until your next rest or your projection takes any damage."
  },
  {
    level: 8, name: "Mass Enrapture", type: "Spell", recallCost: 3,
    cost: null,
    passive: false,
    summary: "Spellcast Roll · Far (all targets) · Enraptured · Mark Stress → all Enraptured targets mark Stress, spell ends",
    text: "Make a Spellcast Roll against all targets within Far range. Targets you succeed against become temporarily Enraptured. While Enraptured, a target's attention is fixed on you, narrowing their field of view and drowning out any sound but your voice. Mark a Stress to force all Enraptured targets to mark a Stress, ending this spell."
  },
  // Level 9
  {
    level: 9, name: "Copycat", type: "Spell", recallCost: 3,
    cost: null,
    passive: false,
    uses: { recharge: "longRest", amount: 1 },
    summary: "Once per long rest · Mimic features of another player's domain card (level 8 or lower) · Spend Hope = half card's level · Lasts until next rest or they vault the card",
    text: "Once per long rest, this card can mimic the features of another domain card of level 8 or lower in another player's loadout. Spend Hope equal to half the card's level to gain access to the feature. It lasts until your next rest or they place the card in their vault."
  },
  {
    level: 9, name: "Master of the Craft", type: "Ability", recallCost: 0,
    cost: null,
    passive: false,
    summary: "On take: permanently +2 to two Experiences OR +3 to one Experience · Card vaulted permanently",
    text: "Gain a permanent +2 bonus to two of your Experiences or a permanent +3 bonus to one of your Experiences. Then place this card in your vault permanently."
  },
  // Level 10
  {
    level: 10, name: "Encore", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    summary: "Close ally deals damage → Spellcast Roll vs same target · On success: deal same damage · On Fear success: card goes to vault",
    text: "When an ally within Close range deals damage to an adversary, you can make a Spellcast Roll against that same target. On a success, you deal the same damage to the target that your ally dealt. If your Spellcast Roll succeeds with Fear, place this card in your vault."
  },
  {
    level: 10, name: "Notorious", type: "Ability", recallCost: 0,
    cost: { type: "stress", amount: 1 },
    passive: true,
    summary: "Passive: Leverage notoriety → mark Stress before roll for +10 · Food/drinks always free · Other purchases: −1 bag of gold (min 1 handful) · Doesn't count against loadout limit · Can't be vaulted",
    text: "People know who you are and what you've done, and they treat you differently because of it. When you leverage your notoriety to get what you want, you can mark a Stress before you roll to gain a +10 bonus to the result. Your food and drinks are always free wherever you go, and everything else you buy is reduced in price by one bag of gold (to a minimum of one handful).\nThis card doesn't count against your loadout's domain card maximum of 5 and can't be placed in your vault."
  },
];
