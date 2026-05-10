import { useState, useCallback, useEffect } from 'react';
import { CLASSES } from '../data/classes.js';
import { ANCESTRIES, COMMUNITIES, COMMUNITY_HAS_NOTES, hasAncestryFeature, getActiveAncestryFeatures, getMixedAncestryLabel } from '../data/ancestries.js';
import { DOMAIN_CARDS, DOMAIN_COLORS } from '../data/domain-cards/index.js';
import { RULES } from '../data/rules.js';
import { THEMES, THEME_META, P, sBtn, mono } from '../data/themes.js';
import { TRAIT_KEYS, TRAIT_SHORT, TRAIT_ACTIONS } from '../data/config.js';
import { WEAPONS_PRIMARY, WEAPONS_SECONDARY, ARMOR } from '../data/equipment.js';
import { ADV_MAX, ADV_COST, getTrait, advTierKey, advRemainingUses } from '../utils/advancement.js';
import { TabBar, Card, Lbl, Inp, Sel, Pip, Feat, Grid, RichBody, PickerAccordion } from './ui.jsx';
import { CompanionTab } from './companion-tab.jsx';
import { TraitModal } from './trait-modal.jsx';
import { LevelUpModal } from './level-up-modal.jsx';
import { PlayTab } from './tabs/PlayTab.jsx';
import { CharacterTab } from './tabs/CharacterTab.jsx';
import { RulesNotesTab } from './tabs/RulesNotesTab.jsx';


function lookupFeatureRecharge(key) {
  const sep = key.indexOf('::');
  if (sep === -1) return null;
  const source = key.slice(0, sep);
  const name = key.slice(sep + 2);

  // Domain cards
  for (const card of (DOMAIN_CARDS[source] || [])) {
    if (card.name === name && card.uses) return card.uses.recharge;
    for (const ab of (card.abilities || []))
      if (ab.name === name && ab.uses) return ab.uses.recharge;
  }

  // Classes (class features + all subclass tiers)
  if (CLASSES[source]) {
    const cls = CLASSES[source];
    for (const feat of (cls.classFeatures || [])) {
      if (feat.name === name && feat.uses) return feat.uses.recharge;
      for (const ab of (feat.abilities || []))
        if (ab.name === name && ab.uses) return ab.uses.recharge;
    }
    for (const sub of Object.values(cls.subclasses || {})) {
      for (const tier of ["foundation", "specialization", "mastery"]) {
        const obj = sub[tier];
        if (!obj) continue;
        if (obj.name === name && obj.uses) return obj.uses.recharge;
        for (const ab of (obj.abilities || []))
          if (ab.name === name && ab.uses) return ab.uses.recharge;
      }
    }
  }

  // Ancestries
  for (const feat of (ANCESTRIES[source]?.features || []))
    if (feat.name === name && feat.uses) return feat.uses.recharge;

  // Communities
  const comm = COMMUNITIES[source];
  if (comm) {
    if (comm.name === name && comm.uses) return comm.uses.recharge;
    for (const ab of (comm.abilities || []))
      if (ab.name === name && ab.uses) return ab.uses.recharge;
  }

  return null;
}

function DaggerheartSheet({ c, setC, onBack, themeName, setTheme }) {
  const [tab, setTab] = useState("Play");
  const [rulesSearch, setRulesSearch] = useState("");
  const [rulesCat, setRulesCat] = useState("All");
  const [editHdr, setEditHdr] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [restModal, setRestModal] = useState(null); // null | 'choose' | 'short' | 'long'
  const [restChoices, setRestChoices] = useState([]);
  const [restResults, setRestResults] = useState(null); // null | { type, lines[] }
  const [editingClass, setEditingClass] = useState(false);
  const [editingSubclass, setEditingSubclass] = useState(false);
  const [editingAncestry, setEditingAncestry] = useState(false);
  const [editingAncestrySecondary, setEditingAncestrySecondary] = useState(false);
  const [editingMixed, setEditingMixed] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState(false);
  const [swapCardsOnRest, setSwapCardsOnRest] = useState(false);
  const [cardSwapOpen, setCardSwapOpen] = useState(false);
  const [unchosenCardsOpen, setUnchosenCardsOpen] = useState(false); // collapsible unchosen domain cards section
  const [classOpen, setClassOpen] = useState(false);
  const [heritageOpen, setHeritageOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [gearOpen, setGearOpen] = useState(false);
  const [traitModalOpen, setTraitModalOpen] = useState(false);
  const [levelUpOpen, setLevelUpOpen] = useState(false);
  const u = useCallback((k, v) => setC(p => ({ ...p, [k]: v })), [setC]);
  const tog = useCallback((k, i) => setC(p => { const a = [...p[k]]; a[i] = !a[i]; return { ...p, [k]: a }; }), [setC]);
  const handleNewSession = useCallback(() => {
    setC(prev => {
      const fu = { ...(prev.featureUses || {}) };
      for (const key of Object.keys(fu))
        if (fu[key] && lookupFeatureRecharge(key) === "session") delete fu[key];
      return { ...prev, featureUses: fu };
    });
  }, []);
  const toggleRestChoice = useCallback((id) => {
    setRestChoices(prev => {
      const idx = prev.indexOf(id);
      if (idx !== -1) { const next = [...prev]; next.splice(idx, 1); return next; }
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }, []);

  const applyLevelUp = (picks) => {
    const newLevel = c.level + 1;
    const isNewTier = [2, 5, 8].includes(newLevel);
    setC(prev => {
      const next = { ...prev, level: newLevel };
      const au = JSON.parse(JSON.stringify(prev.advUsed || { tier2: {}, tier3: {}, tier4: {} }));
      for (const pick of picks) {
        const t = pick.fromTier;
        au[t][pick.type] = (au[t][pick.type] || 0) + 1;
        if (pick.type === "traits") {
          const traits = { ...next.traits };
          for (const tr of pick.traits) { traits[tr] = (traits[tr] || 0) + 1; }
          next.traits = traits;
          au[t].traitsPicked = [...(au[t].traitsPicked || []), ...pick.traits];
        }
        if (pick.type === "hp")          next.hp = [...(next.hp || prev.hp), false];
        if (pick.type === "stress")      next.stress = [...(next.stress || prev.stress), false];
        if (pick.type === "exp")         { for (const k of (pick.keys || [])) next[k] = ((next[k] !== undefined ? next[k] : prev[k]) || 2) + 1; }
        if (pick.type === "evasion")     next.evasionBonus = ((next.evasionBonus !== undefined ? next.evasionBonus : prev.evasionBonus) || 0) + 1;
        if (pick.type === "subclass")    next.subclassLevel = ((next.subclassLevel !== undefined ? next.subclassLevel : prev.subclassLevel) || 1) + 1;
        if (pick.type === "proficiency") next.profBonus = ((next.profBonus !== undefined ? next.profBonus : prev.profBonus) || 0) + 1;
      }
      next.advUsed = au;
      next.levelUps = {
        ...(prev.levelUps || {}),
        [String(newLevel)]: {
          choices: picks,
          autoBonus: isNewTier ? { newExp: true, profTier: true, marksCleared: newLevel >= 5 } : null,
        }
      };
      return next;
    });
    setLevelUpOpen(false);
  };

  const handleLevelDown = () => {
    setC(prev => {
      const currentLevel = prev.level;
      if (currentLevel <= 1) return prev;

      const next = { ...prev, level: currentLevel - 1 };
      const entry = prev.levelUps?.[String(currentLevel)];

      if (entry?.choices?.length) {
        const au = JSON.parse(JSON.stringify(prev.advUsed || { tier2: {}, tier3: {}, tier4: {} }));

        for (const pick of entry.choices) {
          const t = pick.fromTier;
          au[t][pick.type] = Math.max(0, (au[t][pick.type] || 0) - 1);

          if (pick.type === "traits") {
            const inc = { ...(next.traitIncreases ?? prev.traitIncreases ?? {}) };
            for (const tr of (pick.traits || [])) { inc[tr] = (inc[tr] || 0) - 1; }
            next.traitIncreases = inc;
          }
          if (pick.type === "hp")          { const hp = [...(next.hp ?? prev.hp)]; hp.pop(); next.hp = hp; }
          if (pick.type === "stress")      { const stress = [...(next.stress ?? prev.stress)]; stress.pop(); next.stress = stress; }
          if (pick.type === "exp")         { for (const k of (pick.keys || [])) next[k] = ((next[k] !== undefined ? next[k] : prev[k]) || 2) - 1; }
          if (pick.type === "evasion")     next.evasionBonus = ((next.evasionBonus !== undefined ? next.evasionBonus : prev.evasionBonus) || 0) - 1;
          if (pick.type === "subclass")    next.subclassLevel = Math.max(1, ((next.subclassLevel !== undefined ? next.subclassLevel : prev.subclassLevel) || 1) - 1);
          if (pick.type === "proficiency") next.profBonus = ((next.profBonus !== undefined ? next.profBonus : prev.profBonus) || 0) - 1;
        }

        next.advUsed = au;
      }

      const levelUps = { ...(prev.levelUps || {}) };
      delete levelUps[String(currentLevel)];
      next.levelUps = levelUps;

      // Recompute traitMarks by scanning remaining levelUps in the current tier
      const newLevel = next.level;
      const tierStart = newLevel >= 8 ? 8 : newLevel >= 5 ? 5 : newLevel >= 2 ? 2 : null;
      const freshMarks = { Agility: false, Strength: false, Finesse: false, Instinct: false, Presence: false, Knowledge: false };
      if (tierStart !== null) {
        for (let lvl = tierStart; lvl <= newLevel; lvl++) {
          const lvlEntry = next.levelUps[String(lvl)];
          if (lvlEntry?.choices) {
            for (const pick of lvlEntry.choices) {
              if (pick.type === "traits") { for (const tr of (pick.traits || [])) freshMarks[tr] = true; }
            }
          }
        }
      }
      next.traitMarks = freshMarks;

      return next;
    });
  };

  const handleOpenLevelUp = () => {
    if (c.level >= 10) return;
    if (!c.className)      { alert("Select a class before leveling up."); return; }
    if (!c.cardsConfirmed) { alert("Confirm your starting domain card loadout before leveling up."); return; }
    setLevelUpOpen(true);
  };

  const cls = c.className ? CLASSES[c.className] : null;
  const sub = cls && c.subclass ? cls.subclasses[c.subclass] : null;
  const subclassLevel = c.subclassLevel ?? (c.level >= 8 ? 3 : c.level >= 5 ? 2 : 1);

  // ── Gear references (needed early for trait modifiers) ──────────────
  const pw = WEAPONS_PRIMARY.find(x => x.name === c.primaryWeapon);
  const sw = WEAPONS_SECONDARY.find(x => x.name === c.secondaryWeapon);
  const sA = ARMOR.find(a => a.name === c.armor);

  // ── Trait modifiers from equipment ───────────────────────────────────
  // Full Plate: "Very Heavy: −2 Eva; −1 Agility"
  const armorAgiPen = (sA && sA.feature.includes("−1 Agility")) ? -1 : 0;
  // Cumbersome primary weapons (Halberd, Spear, Longbow): −1 Finesse
  const weaponFinPen = (pw && pw.feature.includes("Cumbersome")) ? -1 : 0;
  // Effective traits = base traits + all equipment modifiers
  const traitMods = { Agility: armorAgiPen, Strength: 0, Finesse: weaponFinPen, Instinct: 0, Presence: 0, Knowledge: 0 };
  const effTraits = {};
  TRAIT_KEYS.forEach(t => { effTraits[t] = getTrait(c, t) + traitMods[t]; });

  // ── Proficiency ───────────────────────────────────────────────────────
  const baseProf = c.level <= 1 ? 1 : c.level <= 4 ? 2 : c.level <= 7 ? 3 : 4;
  const prof = baseProf + (c.profBonus || 0);

  // ── Stat bonuses — driven by statEffects in data ──────────────────────
  let hpBonus            = 0;
  let stressBonus        = 0;
  let evasionBonus       = c.evasionBonus || 0;
  let thresholdBonus     = 0;
  let severeThresholdBonus = 0;
  let armorScoreBonus    = 0;
  let hasBareBones       = false; // set true by { stat:"thresholds", type:"override" } (Bare Bones)

  const selectedCards  = c.selectedCards || [];
  const hasUntouchable = selectedCards.includes("Bone::Untouchable"); // kept for display badges
  const isArmored      = !!c.armor;

  // Resolve computed amount strings to numeric values
  const resolveAmount = (amount) => {
    if (amount === "proficiency") return prof;
    if (amount === "halfAgility") return Math.ceil(effTraits.Agility / 2);
    if (amount === "3+strength")  return Math.max(0, 3 + effTraits.Strength);
    return amount;
  };

  // Apply a single statEffect object to the bonus accumulators
  const applyStatEffect = (effect) => {
    if (effect.playerChoice) {
      // TODO: Vitality playerChoice — requires UI prompt and stored character choices; skip for now
      return;
    }
    const condOk = !effect.condition ||
      (effect.condition === "armored"   &&  isArmored) ||
      (effect.condition === "unarmored" && !isArmored);
    if (!condOk) return;

    if (effect.type === "override") {
      // Bare Bones: thresholds use BB_THRESHOLDS table instead of the default level formula
      if (effect.stat === "thresholds") hasBareBones = true;
      return;
    }

    const amt = resolveAmount(effect.amount);
    switch (effect.stat) {
      case "hp":              hpBonus              += amt; break;
      case "stress":          stressBonus          += amt; break;
      case "evasion":         evasionBonus         += amt; break;
      case "thresholds":      thresholdBonus       += amt; break;
      case "severeThreshold": severeThresholdBonus += amt; break;
      case "armorScore":      armorScoreBonus      += amt; break;
    }
  };

  // 1. Ancestry — getActiveAncestryFeatures handles mixed ancestry correctly
  getActiveAncestryFeatures(c).forEach(feature => {
    (feature.statEffects || []).forEach(applyStatEffect);
  });

  // 2. Subclass tiers — apply only tiers the character has unlocked
  if (sub) {
    if (subclassLevel >= 1 && sub.foundation?.statEffects)
      sub.foundation.statEffects.forEach(applyStatEffect);
    if (subclassLevel >= 2 && sub.specialization?.statEffects)
      sub.specialization.statEffects.forEach(applyStatEffect);
    if (subclassLevel >= 3 && sub.mastery?.statEffects)
      sub.mastery.statEffects.forEach(applyStatEffect);
  }

  // 3. Domain cards in loadout
  selectedCards.forEach(key => {
    const [domain, name] = key.split("::");
    const card = (DOMAIN_CARDS[domain] || []).find(cd => cd.name === name);
    (card?.statEffects || []).forEach(applyStatEffect);
  });

  const hpFromLevelUp     = Object.values(c.advUsed || {}).reduce((sum, t) => sum + (t.hp     || 0), 0);
  const stressFromLevelUp = Object.values(c.advUsed || {}).reduce((sum, t) => sum + (t.stress || 0), 0);
  const maxHp     = (cls ? cls.hp : 6) + hpBonus     + hpFromLevelUp;
  const maxStress = 6                  + stressBonus  + stressFromLevelUp;
  const baseEv = cls ? cls.evasion : 10;

  // ── Damage thresholds ────────────────────────────────────────────────
  const bbTier = c.level <= 4 ? 0 : c.level <= 7 ? 1 : c.level <= 10 ? 2 : 3;
  const BB_THRESHOLDS = [[9,19],[11,24],[13,31],[15,38]];
  const mT = sA ? parseInt(sA.thresholds.split("/")[0]) + c.level + thresholdBonus
           : hasBareBones ? BB_THRESHOLDS[bbTier][0] + c.level + thresholdBonus
           : c.level + thresholdBonus;
  const sT = sA ? parseInt(sA.thresholds.split("/")[1]) + c.level + thresholdBonus + severeThresholdBonus
           : hasBareBones ? BB_THRESHOLDS[bbTier][1] + c.level + thresholdBonus + severeThresholdBonus
           : c.level * 2 + thresholdBonus + severeThresholdBonus;

  // ── Armor Score — base + shield bonuses ─────────────────────────────
  // Round Shield: +1 Armor Score  |  Tower Shield: +2 Armor Score
  const shieldBonus = sw ? (sw.feature.includes("+2 Armor Score") ? 2 : sw.feature.includes("+1 Armor Score") ? 1 : 0) : 0;
  const aS = (sA ? sA.score : 0) + armorScoreBonus + shieldBonus;

  // ── Evasion modifier — armor + weapons + shields ─────────────────────
  // Armor: Gambeson +1, Chainmail −1, Full Plate −2
  let eM = 0;
  if (sA) {
    if (sA.feature.includes("+1 Evasion") || sA.feature.includes("+1 Eva")) eM += 1;
    if (sA.feature.includes("−1 Eva") || sA.feature.includes("−1 Evasion")) eM -= 1;
    if (sA.feature.includes("−2 Eva") || sA.feature.includes("−2 Evasion")) eM -= 2;
  }
  // Primary weapons: Greatsword "Massive: −1 Eva", Warhammer "Heavy: −1 Evasion"
  if (pw) {
    if (pw.feature.includes("−1 Eva") || pw.feature.includes("−1 Evasion")) eM -= 1;
    if (pw.feature.includes("−2 Eva")) eM -= 2;
  }
  // Secondary weapons: Tower Shield "Barrier: +2 Armor Score; −1 Eva"
  if (sw) {
    if (sw.feature.includes("−1 Eva") || sw.feature.includes("−1 Evasion")) eM -= 1;
  }
  const fEv = baseEv + eM + evasionBonus;

  // ── Resource helpers (used by Quick Actions and Domain Cards) ────────
  const parseCost = (text) => {
    if (!text) return null;
    const h3 = text.match(/[Ss]pend (\d+) Hope/); if (h3) return { type: "hope", amount: parseInt(h3[1]) };
    const h1 = text.match(/[Ss]pend a Hope/);      if (h1) return { type: "hope", amount: 1 };
    const sN = text.match(/[Mm]ark (\d+) Stress/); if (sN) return { type: "stress", amount: parseInt(sN[1]) };
    const s1 = text.match(/[Mm]ark(?: a)? Stress/);if (s1) return { type: "stress", amount: 1 };
    return null;
  };
  const currentHope   = c.hope.filter(Boolean).length;
  const currentStress = c.stress.slice(0, maxStress).filter(Boolean).length;
  const freeStress    = maxStress - currentStress;
  const canAfford = (cost) => {
    if (!cost) return true;
    if (cost.type === "hope") return currentHope >= cost.amount;
    if (cost.type === "hp") { const freeHp = c.hp.slice(0, maxHp).filter(v => !v).length; return freeHp >= cost.amount; }
    return freeStress >= cost.amount;
  };
  const spendCost = (cost) => {
    if (!cost) return;
    if (cost.type === "hope") {
      const next = [...c.hope]; let n = cost.amount;
      for (let i = next.length - 1; i >= 0 && n > 0; i--) { if (next[i]) { next[i] = false; n--; } }
      u("hope", next);
    } else if (cost.type === "hp") {
      const next = [...c.hp]; let n = cost.amount;
      for (let i = 0; i < maxHp && n > 0; i++) { if (!next[i]) { next[i] = true; n--; } }
      u("hp", next);
    } else {
      const next = [...c.stress]; let n = cost.amount;
      for (let i = 0; i < maxStress && n > 0; i++) { if (!next[i]) { next[i] = true; n--; } }
      u("stress", next);
    }
  };
  const costDisplay = (card) => {
    if (!card.cost && !card.optionalCost) return { text: "Free", color: P.textMuted };
    if (!card.cost && card.optionalCost) return { text: "Free", color: P.textMuted };
    const co = card.cost;
    if (co.type === "hope") return { text: `${co.amount} Hope`, color: P.hope };
    if (co.type === "hp") return { text: `${co.amount} HP`, color: P.fear };
    return { text: `${co.amount} Stress`, color: P.stress };
  };

  // Build quick actions (pw/sw already declared above; use effTraits for accurate modifiers)
  const actions = [];
  if (pw) {
    const mod = effTraits[pw.trait] || 0;
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    actions.push({ label: pw.name, detail: `${pw.trait} ${modStr} | ${pw.range} | ${prof}${pw.damage} ${pw.type}`, sub: pw.feature, type: "primary" });
  }
  if (sw) {
    const mod = effTraits[sw.trait] || 0;
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    actions.push({ label: sw.name, detail: `${sw.trait} ${modStr} | ${sw.range} | ${prof}${sw.damage} ${sw.type}`, sub: sw.feature, type: "secondary" });
  }
  if (sub && sub.spellcast) {
    const mod = effTraits[sub.spellcast] || 0;
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    actions.push({ label: "Spellcast", detail: `${sub.spellcast} ${modStr}`, sub: "", type: "spell" });
  }
  // Common trait actions (use effective traits to reflect equipment penalties)
  TRAIT_KEYS.forEach(t => {
    const v = effTraits[t]; const d = v >= 0 ? `+${v}` : `${v}`;
    actions.push({ label: `${t} Roll`, detail: d, sub: TRAIT_ACTIONS[t], type: "trait" });
  });

  const tabs = [
    "Play",
    ...(c.subclass === "Beastbound" ? ["Companion"] : []),
    "Character",
    "Rules/Notes"
  ];

  // ── Incomplete-indicator logic ────────────────────────────
  const bt = c.baseTraits ?? c.traits ?? {};
  const traitsIncomplete = JSON.stringify(TRAIT_KEYS.map(t => bt[t] ?? 0).sort((a,b) => a-b)) !== JSON.stringify([-1,0,0,1,1,2]);
  const glowingTabs = new Set();
  const startingCards = (c.className === "Wizard" && c.subclass === "School of Knowledge") ? 3 : 2;
  const earnedCards   = startingCards + Object.keys(c.levelUps || {}).length;
  const handMax       = 5;
  const hasVaultOverflow = earnedCards > handMax;
  const maxLoadout    = Math.min(earnedCards, handMax);
  const allExps = [
    { key: "exp1", valKey: "exp1Val" },
    { key: "exp2", valKey: "exp2Val" },
    ...(c.level >= 2 ? [{ key: "exp3", valKey: "exp3Val" }] : []),
    ...(c.level >= 5 ? [{ key: "exp4", valKey: "exp4Val" }] : []),
    ...(c.level >= 8 ? [{ key: "exp5", valKey: "exp5Val" }] : []),
  ];
  const classIncomplete    = !c.className || !c.subclass;
  const heritageIncomplete = !c.ancestry;
  const gearIncomplete     = !c.primaryWeapon;
  const domainsIncomplete  = !c.selectedCards || c.selectedCards.length < maxLoadout || !c.cardsConfirmed;
  if (classIncomplete || heritageIncomplete || gearIncomplete || domainsIncomplete) glowingTabs.add("Character");
  if (c.subclass === "Beastbound" && !c.companionName)                     glowingTabs.add("Companion");
  // traitsAllZero check handled inline on the Edit Stats button

  const fmtMod = v => v >= 0 ? `+${v}` : `${v}`;

  // Auto-expand incomplete Character tab sections on mount
  useEffect(() => {
    if (!c.className || !c.subclass) setClassOpen(true);
    if (!c.ancestry)                 setHeritageOpen(true);
    if (!c.selectedCards || c.selectedCards.length < 2 || !c.cardsConfirmed) setDomainsOpen(true);
    if (!c.primaryWeapon)            setGearOpen(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ minHeight: "100vh", background: P.bg, color: P.text, fontFamily: "'Crimson Pro', 'Georgia', serif", maxWidth: 480, margin: "0 auto" }}>



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
                            <div style={{ fontSize: 13, fontWeight: 800, fontFamily: mono, color: card.recallCost === 0 ? P.textMuted : P.stress }}>{card.recallCost === 0 ? "Free" : `⚡${card.recallCost} Stress`}</div>
                            {(() => { const cd = costDisplay(card); return <div style={{ fontSize: 10, fontWeight: 700, fontFamily: mono, color: cd.color, marginTop: 2 }}>USE: {cd.text}</div>; })()}
                          </div>
                        </div>
                        <div style={{ fontSize: 12, lineHeight: 1.7, color: P.textMuted, whiteSpace: "pre-line", borderTop: `1px solid ${isSelected ? domColor + "44" : P.border}`, paddingTop: 8, marginTop: 4 }}>{card.text}</div>
                        {card.optionalCost && <div style={{ fontSize: 10, fontWeight: 700, fontFamily: mono, color: card.optionalCost.type === "hope" ? P.hope : P.stress, marginTop: 4, padding: "3px 8px", border: `1px dashed ${card.optionalCost.type === "hope" ? P.hope + "66" : P.stress + "66"}`, borderRadius: 6, display: "inline-block" }}>⚡ {card.optionalCost.amount} {card.optionalCost.type === "hope" ? "Hope" : "Stress"} → {card.optionalCost.label}</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ═══ TRAIT ASSIGNMENT MODAL ═══ */}
      {traitModalOpen && (() => {
        // The 6 modifier tokens — indices matter for identity (two +1s and two 0s are distinct slots)
        const POOL = [
          { id: 0, val: 2,  label: "+2" },
          { id: 1, val: 1,  label: "+1" },
          { id: 2, val: 1,  label: "+1" },
          { id: 3, val: 0,  label: "0"  },
          { id: 4, val: 0,  label: "0"  },
          { id: 5, val: -1, label: "−1" },
        ];
        // Draft state lives inside this IIFE render — we lift it into a child component so it has its own useState
        return <TraitModal
          currentTraits={c.baseTraits ?? c.traits ?? {}}
          suggestedTraits={CLASSES[c.className]?.suggestedTraits}
          pool={POOL}
          onConfirm={baseTraits => { setC(p => ({ ...p, baseTraits })); setTraitModalOpen(false); }}
          onClose={() => setTraitModalOpen(false)}
        />;
      })()}

      {/* ═══ LEVEL UP MODAL ═══ */}
      {levelUpOpen && <LevelUpModal c={c} onConfirm={applyLevelUp} onClose={() => setLevelUpOpen(false)} />}

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
            // ── Class resource resets ────────────────────────────
            // On any rest: active states that end on rest
            next.beastformActive = false;
            next.unstoppableActive = false;
            next.arcaneChargeActive = false;
            next.cloaked = false;
            // On any rest: clear rest-recharge feature uses
            {
              const fu = { ...(next.featureUses || {}) };
              for (const key of Object.keys(fu))
                if (fu[key] && lookupFeatureRecharge(key) === "rest") delete fu[key];
              next.featureUses = fu;
            }
            // On long rest: clear longRest-recharge feature uses + other resources
            if (isLong) {
              const fu = { ...next.featureUses };
              for (const key of Object.keys(fu))
                if (fu[key] && lookupFeatureRecharge(key) === "longRest") delete fu[key];
              next.featureUses = fu;
              next.poisonTokens = 0;
              next.slayerDice = [];
              next.prayerDice = [];
            }

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
                {/* FUTURE EXPANSION: At level 5, players earn their 6th card but hand max is 5.
                    This creates vault overflow, enabling the rest-swap mechanic.
                    Do not show this option until the player has more cards than their hand can hold (level >= 5).
                    When the level-up system is implemented, the threshold should be:
                      (earned cards > handMax), where earned = 1 + (level - 1) + classBonus
                      and handMax = 5 (constant per rules). */}
                {c.className && c.level >= 5 && (
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

      <div style={{ position: "sticky", top: 0, zIndex: 20, background: P.bg }}>
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
              <button onClick={handleLevelDown} style={{ ...sBtn, width: 22, height: 22 }}>−</button>
              <span style={{ fontSize: 16, fontWeight: 800, fontFamily: mono, minWidth: 20, textAlign: "center" }}>{c.level}</span>
              <button onClick={handleOpenLevelUp} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${c.level >= 10 ? P.border : P.accent}`, background: c.level >= 10 ? P.surface : P.accent + "22", color: c.level >= 10 ? P.textMuted : P.accent, cursor: c.level >= 10 ? "default" : "pointer", fontFamily: "inherit", fontWeight: 700 }}>{c.level >= 10 ? "Max" : "▲"}</button>
              {cls && <button onClick={() => setC(p => ({ ...p, baseTraits: { ...cls.suggestedTraits } }))} style={{ marginLeft: "auto", fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.accent, cursor: "pointer", fontFamily: "inherit" }}>Suggested Traits</button>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
              <Lbl style={{ marginBottom: 0 }}>Traits</Lbl>
              <button onClick={() => setTraitModalOpen(true)} className={traitsIncomplete ? "btn-pulse" : ""} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 6, border: `1px solid ${P.accent}`, background: P.surface, color: P.accent, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Edit Stats</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 6 }}>
              {TRAIT_KEYS.map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: P.surface, borderRadius: 6, padding: "5px 8px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: P.textMuted }}>{TRAIT_SHORT[t]}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, fontFamily: mono, color: getTrait(c, t) > 0 ? P.hp : getTrait(c, t) < 0 ? P.fear : P.textMuted }}>{fmtMod(getTrait(c, t))}</span>
                </div>
              ))}
            </div>
            {/* ── Theme Picker ── */}
            <div style={{ marginTop: 6, paddingTop: 10, borderTop: `1px solid ${P.border}` }}>
              <Lbl style={{ marginBottom: 8 }}>Theme</Lbl>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {Object.keys(THEMES).map(name => {
                  const meta = THEME_META[name];
                  const isActive = themeName === name;
                  return (
                    <div key={name} onClick={() => setTheme(name)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8,
                        border: `2px solid ${isActive ? meta.dot : P.border}`,
                        background: isActive ? meta.dot + "18" : P.surface,
                        cursor: "pointer", transition: "all .15s" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: meta.dot, flexShrink: 0,
                        boxShadow: isActive ? `0 0 8px ${meta.dot}` : "none" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? meta.dot : P.text }}>{meta.label}</div>
                        <div style={{ fontSize: 10, color: P.textMuted, marginTop: 1 }}>{meta.desc}</div>
                      </div>
                      {isActive && <span style={{ fontSize: 11, color: meta.dot, fontWeight: 800 }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginTop: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: c.name ? P.hope : P.textMuted }}>{c.name || "Unnamed"}</span>
              {c.pronouns && <span style={{ fontSize: 11, color: P.textMuted }}> ({c.pronouns})</span>}
              <span style={{ fontSize: 11, color: P.textMuted, marginLeft: 8 }}>Lv{c.level}{cls ? ` ${c.className}` : ""}{c.subclass ? ` · ${c.subclass}` : ""}</span>
            </div>
            {/* Trait bar — shows effective traits (base + equipment modifiers) */}
            <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
              {TRAIT_KEYS.map(t => {
                const base = getTrait(c, t);
                const mod  = traitMods[t] || 0;
                const eff  = effTraits[t];
                return (
                  <div key={t} style={{ fontSize: 11, color: P.textMuted }}>
                    <span style={{ fontWeight: 700, fontSize: 10 }}>{TRAIT_SHORT[t]}</span>{" "}
                    <span style={{ fontWeight: 800, fontFamily: mono, color: eff > 0 ? P.hp : eff < 0 ? P.fear : P.textMuted }}>{fmtMod(eff)}</span>
                    {mod !== 0 && <span title={mod < 0 ? `${mod} from equipment` : `+${mod} from equipment`} style={{ fontSize: 8, color: mod < 0 ? P.fear : P.hp, marginLeft: 1, verticalAlign: "super" }}>▼</span>}
                  </div>
                );
              })}
            </div>
            {/* Stat bar */}
            <div style={{ display: "flex", gap: 10, marginTop: 4, fontSize: 11, color: P.textMuted, flexWrap: "wrap" }}>
              <span>Eva <strong style={{ color: P.accent }}>{fEv}</strong>
                {hasUntouchable && <span title="Untouchable: +½ Agility" style={{ fontSize: 9, color: "#f97316", marginLeft: 2 }}>✦</span>}
                {eM > 0 && <span title={`Equipment: +${eM} Evasion`} style={{ fontSize: 9, color: P.hp, marginLeft: 2 }}>▲</span>}
                {eM < 0 && <span title={`Equipment: ${eM} Evasion`} style={{ fontSize: 9, color: P.fear, marginLeft: 2 }}>▼</span>}
              </span>
              <span>HP <strong style={{ color: P.fear }}>{maxHp}</strong></span>
              <span>Armor <strong style={{ color: P.text }}>{aS}</strong>
                {shieldBonus > 0 && <span title={`${sw.name}: +${shieldBonus} Armor Score`} style={{ fontSize: 9, color: P.hp, marginLeft: 2 }}>▲</span>}
                {hasBareBones && !sA && <span title="Bare Bones: 3+Strength" style={{ fontSize: 9, color: "#f59e0b", marginLeft: 2 }}>✦</span>}
              </span>
              <span>Thresh <strong style={{ color: P.stress }}>{mT}/{sT}</strong>{hasBareBones && !sA && <span title="Bare Bones thresholds" style={{ fontSize: 9, color: "#f59e0b", marginLeft: 2 }}>✦</span>}</span>
              <span>Prof <strong style={{ color: P.accent }}>{prof}</strong></span>
            </div>
          </>
        )}
      </div>

      <TabBar tabs={tabs} active={tab} onChange={setTab} glowing={glowingTabs} />
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>

        {/* ═══ PLAY TAB ═══ */}
        {tab === "Play" && (
          <PlayTab
            c={c} u={u} tog={tog}
            fEv={fEv} aS={aS} mT={mT} sT={sT}
            maxHp={maxHp} maxStress={maxStress} prof={prof}
            shieldBonus={shieldBonus} hasBareBones={hasBareBones}
            hasUntouchable={hasUntouchable} eM={eM} bbTier={bbTier}
            sA={sA} sw={sw}
            actions={actions}
            canAfford={canAfford} spendCost={spendCost} costDisplay={costDisplay} parseCost={parseCost}
            allExps={allExps} editExp={editExp} setEditExp={setEditExp}
            setRestModal={setRestModal} setRestChoices={setRestChoices}
            onNewSession={handleNewSession}
            sub={sub} subclassLevel={subclassLevel} cls={cls}
          />
        )}

        {tab === "Character" && (
          <CharacterTab
            c={c} u={u}
            cls={cls} sub={sub} pw={pw} sw={sw} sA={sA}
            mT={mT} sT={sT} prof={prof} maxLoadout={maxLoadout}
            classIncomplete={classIncomplete} heritageIncomplete={heritageIncomplete}
            gearIncomplete={gearIncomplete} domainsIncomplete={domainsIncomplete}
            fmtMod={fmtMod} costDisplay={costDisplay}
            editingClass={editingClass} setEditingClass={setEditingClass}
            editingSubclass={editingSubclass} setEditingSubclass={setEditingSubclass}
            editingAncestry={editingAncestry} setEditingAncestry={setEditingAncestry}
            editingAncestrySecondary={editingAncestrySecondary} setEditingAncestrySecondary={setEditingAncestrySecondary}
            editingMixed={editingMixed} setEditingMixed={setEditingMixed}
            editingCommunity={editingCommunity} setEditingCommunity={setEditingCommunity}
            classOpen={classOpen} setClassOpen={setClassOpen}
            heritageOpen={heritageOpen} setHeritageOpen={setHeritageOpen}
            domainsOpen={domainsOpen} setDomainsOpen={setDomainsOpen}
            gearOpen={gearOpen} setGearOpen={setGearOpen}
            unchosenCardsOpen={unchosenCardsOpen} setUnchosenCardsOpen={setUnchosenCardsOpen}
          />
        )}

        {tab === "Rules/Notes" && (
          <RulesNotesTab
            c={c} u={u}
            rulesSearch={rulesSearch} setRulesSearch={setRulesSearch}
            rulesCat={rulesCat} setRulesCat={setRulesCat}
          />
        )}
        {tab === "Companion" && <CompanionTab c={c} u={u} prof={prof} />}
      </div>
      <div style={{ padding: "16px", textAlign: "center", fontSize: 9, color: P.textMuted, borderTop: `1px solid ${P.border}` }}>Daggerheart © Darrington Press 2025 — Fan-made digital sheet</div>
    </div>
  );
}

export default DaggerheartSheet;
