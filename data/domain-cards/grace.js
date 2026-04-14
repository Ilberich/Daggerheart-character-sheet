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
    uses: { recharge: "rest", amount: 1 },
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
    uses: { recharge: "rest", amount: 1 },
    summary: "Taunt/provoke within Far · Presence Roll · Once per rest on success: roll Proficiency d4s · Target marks Stress = highest result",
    text: "When you taunt or provoke a target within Far range, make a Presence Roll against them. Once per rest on a success, roll a number of d4s equal to your Proficiency. The target must mark Stress equal to the highest result rolled."
  },
  // Level 3
  {
    level: 3, name: "Hypnotic Shimmer", type: "Spell", recallCost: 1,
    cost: null,
    passive: false,
    uses: { recharge: "rest", amount: 1 },
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
    uses: { recharge: "rest", amount: 1 },
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
];
