// ═══════════════════════════════════════════════════════════════
// TRAIT ASSIGNMENT MODAL
// ═══════════════════════════════════════════════════════════════
function TraitModal({ currentTraits, suggestedTraits, pool, onConfirm, onClose }) {
  // assignment: { AGI: poolId | null, ... }
  const [assignment, setAssignment] = useState(() => {
    // Pre-fill from current traits by greedily matching pool slots
    const remaining = [...pool];
    const result = {};
    TRAIT_KEYS.forEach(t => {
      const val = currentTraits[t];
      const idx = remaining.findIndex(p => p.val === val);
      if (idx >= 0) { result[t] = remaining[idx].id; remaining.splice(idx, 1); }
      else result[t] = null;
    });
    return result;
  });
  const [selected, setSelected] = useState(null); // pool id of currently selected chip

  const usedIds = new Set(Object.values(assignment).filter(v => v !== null));
  const availablePool = pool.filter(p => !usedIds.has(p.id));
  const allAssigned = TRAIT_KEYS.every(t => assignment[t] !== null);

  const chipColor = val => val === 2 ? P.hp : val === 1 ? P.accent : val === 0 ? P.textMuted : P.fear;

  const handleChipClick = id => {
    setSelected(prev => prev === id ? null : id);
  };

  const handleStatClick = t => {
    if (selected !== null) {
      // Assign selected chip to this stat, returning any previous chip to pool
      setAssignment(prev => ({ ...prev, [t]: selected }));
      setSelected(null);
    } else if (assignment[t] !== null) {
      // Deselect: unassign this stat
      setAssignment(prev => ({ ...prev, [t]: null }));
    }
  };

  const handleSuggested = () => {
    if (!suggestedTraits) return;
    const remaining = [...pool];
    const result = {};
    TRAIT_KEYS.forEach(t => {
      const val = suggestedTraits[t] ?? 0;
      const idx = remaining.findIndex(p => p.val === val);
      if (idx >= 0) { result[t] = remaining[idx].id; remaining.splice(idx, 1); }
      else result[t] = null;
    });
    setAssignment(result);
    setSelected(null);
  };

  const handleConfirm = () => {
    const traits = {};
    TRAIT_KEYS.forEach(t => {
      const p = pool.find(p => p.id === assignment[t]);
      traits[t] = p ? p.val : 0;
    });
    onConfirm(traits);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1002, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
      <div style={{ width: "100%", maxWidth: 480, background: P.card, borderRadius: "20px 20px 0 0", padding: "20px 16px 32px", border: `1px solid ${P.border}`, borderBottom: "none" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: P.accent }}>Assign Traits</div>
            <div style={{ fontSize: 11, color: P.textMuted, marginTop: 2 }}>Tap a modifier, then tap a stat to assign it</div>
          </div>
          {suggestedTraits && (
            <button onClick={handleSuggested} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.hope, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Suggested</button>
          )}
        </div>

        {/* Modifier chips */}
        <div style={{ marginBottom: 16 }}>
          <Lbl>Available Modifiers</Lbl>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {pool.map(p => {
              const isUsed = usedIds.has(p.id);
              const isSel  = selected === p.id;
              const color  = chipColor(p.val);
              return (
                <div key={p.id} onClick={() => !isUsed && handleChipClick(p.id)} style={{
                  width: 48, height: 48, borderRadius: 10,
                  border: `2px solid ${isSel ? color : isUsed ? P.border : color + "88"}`,
                  background: isSel ? color + "33" : isUsed ? P.surface : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 800, fontFamily: mono,
                  color: isUsed ? P.border : color,
                  cursor: isUsed ? "default" : "pointer",
                  opacity: isUsed ? 0.3 : 1,
                  boxShadow: isSel ? `0 0 12px ${color}66` : "none",
                  transition: "all .15s",
                }}>{p.label}</div>
              );
            })}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 8, fontSize: 11, color: P.hope, fontWeight: 600 }}>
              ✦ {pool.find(p => p.id === selected)?.label} selected — now tap a stat below to assign it
            </div>
          )}
        </div>

        {/* Stat rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
          {TRAIT_KEYS.map(t => {
            const assignedPoolItem = pool.find(p => p.id === assignment[t]);
            const val   = assignedPoolItem?.val ?? null;
            const color = val !== null ? chipColor(val) : P.border;
            const isTarget = selected !== null;
            return (
              <div key={t} onClick={() => handleStatClick(t)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 10,
                border: `2px solid ${isTarget && val === null ? P.accent + "88" : val !== null ? color + "66" : P.border}`,
                background: isTarget && val === null ? P.accent + "0d" : val !== null ? color + "12" : P.surface,
                cursor: "pointer", transition: "all .15s",
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: P.text }}>{t}</div>
                  <div style={{ fontSize: 10, color: P.textMuted }}>{TRAIT_ACTIONS[t]}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {val !== null ? (
                    <>
                      <span style={{ fontSize: 22, fontWeight: 800, fontFamily: mono, color }}>{assignedPoolItem.label}</span>
                      <span style={{ fontSize: 10, color: P.textMuted }}>✕</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 18, fontWeight: 800, fontFamily: mono, color: P.border }}>—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 10, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={handleConfirm} disabled={!allAssigned} style={{ flex: 2, padding: "12px", borderRadius: 10, border: "none", background: allAssigned ? P.accent : P.border, color: allAssigned ? "#fff" : P.textMuted, fontSize: 14, fontWeight: 800, cursor: allAssigned ? "pointer" : "default", fontFamily: "inherit", transition: "all .2s" }}>
            {allAssigned ? "Confirm ✓" : `${TRAIT_KEYS.filter(t => assignment[t] === null).length} stat${TRAIT_KEYS.filter(t => assignment[t] === null).length !== 1 ? "s" : ""} remaining`}
          </button>
        </div>
      </div>
    </div>
  );
}

function DaggerheartSheet({ c, setC, onBack, themeName, setTheme }) {
  const [tab, setTab] = useState("Play");
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
  const [traitModalOpen, setTraitModalOpen] = useState(false);
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
  if (hasAncestryFeature(c, "Giant",  0)) hpBonus      += 1; // Endurance (feat 0)
  if (hasAncestryFeature(c, "Human",  0)) stressBonus  += 1; // High Stamina (feat 0)
  if (hasAncestryFeature(c, "Simiah", 1)) evasionBonus += 1; // Nimble (feat 1)
  // Subclass bonuses
  if (c.className === "Wizard"   && c.subclass === "School of War") hpBonus     += 1; // Battlemage
  if (c.className === "Guardian" && c.subclass === "Vengeance")     stressBonus += 1; // At Ease
  // Threshold bonuses
  let thresholdBonus = 0;
  // Proficiency bonus (needed for Galapa Shell feature and Guardian/Stalwart subclass)
  const prof = c.level <= 1 ? 1 : c.level <= 4 ? 2 : c.level <= 7 ? 3 : 4;
  if (hasAncestryFeature(c, "Galapa", 0)) thresholdBonus += prof; // Shell: +Prof to both thresholds
  // Guardian/Stalwart subclass bonuses (based on level tiers)
  if (c.className === "Guardian" && c.subclass === "Stalwart") {
    if (c.level >= 1) thresholdBonus += 1;  // Foundation: Unwavering +1
    if (c.level >= 5) thresholdBonus += 1;  // Specialization: Unrelenting +2 total
    if (c.level >= 8) thresholdBonus += 1;  // Mastery: Undaunted +3 total
  }

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
  TRAIT_KEYS.forEach(t => { effTraits[t] = (c.traits[t] || 0) + traitMods[t]; });

  // ── Domain card flags ────────────────────────────────────────────────
  const selectedCards = c.selectedCards || [];
  const hasUntouchable = selectedCards.includes("Bone::Untouchable");
  const hasBareBones   = selectedCards.includes("Valor::Bare Bones");
  // Bone::Untouchable — passive Evasion bonus = ½ effective Agility (rounded down)
  if (hasUntouchable) evasionBonus += Math.floor(effTraits.Agility / 2);

  const maxHp     = (cls ? cls.hp : 6) + hpBonus;
  const maxStress = 6 + stressBonus;
  const baseEv = cls ? cls.evasion : 10;

  // ── Damage thresholds ────────────────────────────────────────────────
  const bbTier = c.level <= 4 ? 0 : c.level <= 7 ? 1 : c.level <= 10 ? 2 : 3;
  const BB_THRESHOLDS = [[9,19],[11,24],[13,31],[15,38]];
  const mT = sA ? parseInt(sA.thresholds.split("/")[0]) + c.level + thresholdBonus
           : hasBareBones ? BB_THRESHOLDS[bbTier][0] + c.level + thresholdBonus
           : c.level + thresholdBonus;
  const sT = sA ? parseInt(sA.thresholds.split("/")[1]) + c.level + thresholdBonus
           : hasBareBones ? BB_THRESHOLDS[bbTier][1] + c.level + thresholdBonus
           : c.level * 2 + thresholdBonus;

  // ── Armor Score — base + shield bonuses ─────────────────────────────
  // Round Shield: +1 Armor Score  |  Tower Shield: +2 Armor Score
  const shieldBonus = sw ? (sw.feature.includes("+2 Armor Score") ? 2 : sw.feature.includes("+1 Armor Score") ? 1 : 0) : 0;
  const aS = (sA ? sA.score : hasBareBones ? Math.max(0, 3 + effTraits.Strength) : 0) + shieldBonus;

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
  // Ancestry abilities
  const ancestryFeatures = getActiveAncestryFeatures(c);
  ancestryFeatures.forEach(feature => {
    const colonIdx = feature.indexOf(":");
    if (colonIdx > -1) {
      const abilityName = feature.substring(0, colonIdx).trim();
      const abilityDesc = feature.substring(colonIdx + 1).trim();
      // Filter out purely passive/descriptive features (those without game mechanics)
      const mechFeatures = ["Kick", "Elemental Breath", "Luckbender", "Wings", "Charge", "Fungril Network", "Death Connection", "Retract", "Reach", "Danger Sense", "Internal Compass", "Adaptability", "Dread Visage", "Retracting Claws", "Tusks", "Long Tongue"];
      if (mechFeatures.includes(abilityName)) {
        actions.push({ label: abilityName, detail: "", sub: abilityDesc, type: "ability" });
      }
    }
  });
  // Common trait actions (use effective traits to reflect equipment penalties)
  TRAIT_KEYS.forEach(t => {
    const v = effTraits[t]; const d = v >= 0 ? `+${v}` : `${v}`;
    actions.push({ label: `${t} Roll`, detail: d, sub: TRAIT_ACTIONS[t], type: "trait" });
  });

  const tabs = ["Play", ...(c.subclass === "Beastbound" ? ["Companion"] : []), "Domains", "Class", "Heritage", "Gear", "Notes"];

  // ── Incomplete-indicator logic ────────────────────────────
  const traitsIncomplete = JSON.stringify(TRAIT_KEYS.map(t => c.traits[t]).sort((a,b) => a-b)) !== JSON.stringify([-1,0,0,1,1,2]);
  const glowingTabs = new Set();
  const maxLoadout = (c.className === "Wizard" && c.subclass === "School of Knowledge") ? 3 : 2;
  if (!c.className || !c.subclass)                                        glowingTabs.add("Class");
  if (!c.ancestry)                                                         glowingTabs.add("Heritage");
  if (!c.primaryWeapon)                                                    glowingTabs.add("Gear");
  if (!c.selectedCards || c.selectedCards.length < maxLoadout)             glowingTabs.add("Domains");
  if (c.subclass === "Beastbound" && !c.companionName)                     glowingTabs.add("Companion");
  // traitsAllZero check handled inline on the Edit Stats button

  const fmtMod = v => v >= 0 ? `+${v}` : `${v}`;

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
          currentTraits={c.traits}
          suggestedTraits={CLASSES[c.className]?.suggestedTraits}
          pool={POOL}
          onConfirm={traits => { setC(p => ({ ...p, traits })); setTraitModalOpen(false); }}
          onClose={() => setTraitModalOpen(false)}
        />;
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
            // ── Class resource resets ────────────────────────────
            // On any rest: active states that end on rest
            next.beastformActive = false;
            next.wolfFormActive  = false;
            next.unstoppableActive = false;
            next.crimsonRiteActive = false;
            next.arcaneChargeActive = false;
            next.patronsMantleActive = false;
            next.cloaked = false;
            // On long rest: cooldowns and once-per-long-rest resources
            if (isLong) {
              next.troubadourSong1Used = false; next.troubadourSong2Used = false; next.troubadourSong3Used = false;
              next.wordsmithSpeechUsed = false;
              next.druidClarityUsed = false; next.druidWardensProtectionUsed = false;
              next.unstoppableUsed = false;
              next.channelRawPowerUsed = false; next.transcendenceUsed = false;
              next.battleRitualUsed = false;
              next.communeUsed = false;
              next.talismanExists = false;
              next.trueStrikeUsed = false;
              next.limitBreakerUsed = false; next.eyeForAnEyeUsed = false;
              next.poisonTokens = 0;
              next.slayerDice = [];
              next.prayerDice = [];
              // Brawler Martial Artist: roll Focus on rest
              if (next.className === "Brawler" && next.subclass === "Martial Artist") {
                const instinct = Math.max(1, next.traits?.Instinct || 0);
                const focusDice = Array.from({ length: instinct }, () => Math.floor(Math.random() * 6) + 1);
                next.focusTokens = Math.max(...focusDice);
              }
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
              <Lbl style={{ marginBottom: 0 }}>Traits</Lbl>
              <button onClick={() => setTraitModalOpen(true)} className={traitsIncomplete ? "btn-pulse" : ""} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 6, border: `1px solid ${P.accent}`, background: P.surface, color: P.accent, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Edit Stats</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginTop: 6 }}>
              {TRAIT_KEYS.map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: P.surface, borderRadius: 6, padding: "5px 8px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: P.textMuted }}>{TRAIT_SHORT[t]}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, fontFamily: mono, color: c.traits[t] > 0 ? P.hp : c.traits[t] < 0 ? P.fear : P.textMuted }}>{fmtMod(c.traits[t])}</span>
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
                const base = c.traits[t] || 0;
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
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>

        {/* ═══ PLAY TAB ═══ */}
        {tab === "Play" && <>
          {/* Trackers */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: P.accent, fontFamily: mono }}>{fEv}</div>
                <div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>EVASION{hasUntouchable ? <span style={{ color: "#f97316" }}> ✦</span> : ""}{eM > 0 ? <span style={{ color: P.hp }}> ▲</span> : ""}{eM < 0 ? <span style={{ color: P.fear }}> ▼</span> : ""}</div>
                {hasUntouchable && <div style={{ fontSize: 8, color: "#f97316", marginTop: 1 }}>+½ Agility (Untouchable)</div>}
                {eM !== 0 && <div style={{ fontSize: 8, color: eM > 0 ? P.hp : P.fear, marginTop: hasUntouchable ? 0 : 1 }}>{eM > 0 ? `+${eM}` : eM} from gear</div>}
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: P.text, fontFamily: mono }}>{aS}</div>
                <div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>ARMOR{shieldBonus > 0 ? <span style={{ color: P.hp }}> ▲</span> : ""}{hasBareBones && !sA ? <span style={{ color: "#f59e0b" }}> ✦</span> : ""}</div>
                {shieldBonus > 0 && <div style={{ fontSize: 8, color: P.hp, marginTop: 1 }}>+{shieldBonus} from shield</div>}
                {hasBareBones && !sA && <div style={{ fontSize: 8, color: "#f59e0b", marginTop: 1 }}>3+STR (Bare Bones)</div>}
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: P.stress, fontFamily: mono }}>{mT}/{sT}</div>
                <div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>THRESHOLDS{hasBareBones && !sA ? <span style={{ color: "#f59e0b" }}> ✦</span> : ""}</div>
                {hasBareBones && !sA && <div style={{ fontSize: 8, color: "#f59e0b", marginTop: 1 }}>Bare Bones (Tier {bbTier+1})</div>}
              </div>
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
            <Lbl>Armor Slots ({c.armorSlots.slice(0, aS).filter(Boolean).length}/{aS})
              {hasBareBones && !sA ? <span style={{ fontSize: 9, color: "#f59e0b", fontWeight: 400, marginLeft: 4 }}>✦ Bare Bones</span> : ""}
              {shieldBonus > 0 ? <span style={{ fontSize: 9, color: P.hp, fontWeight: 400, marginLeft: 4 }}>▲ +{shieldBonus} from {sw.name}</span> : ""}
            </Lbl>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{c.armorSlots.slice(0, aS).map((f, i) => <Pip key={i} filled={f} color={P.accent} onClick={() => tog("armorSlots", i)} size={24} />)}</div>
          </Card>}

          {/* ── CLASS RESOURCES ─────────────────────────────── */}
          {c.className && c.subclass && (() => {
            // Reusable helpers
            const CooldownBtn = ({ label, used, onToggle, recharge }) => (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: used ? P.textMuted : P.text }}>{label}</div>
                  {recharge && <div style={{ fontSize: 10, color: P.textMuted }}>{recharge}</div>}
                </div>
                <button onClick={onToggle} style={{ padding: "4px 12px", borderRadius: 6, border: `1px solid ${used ? P.border : P.accent}`, background: used ? P.surface : P.accent + "22", color: used ? P.textMuted : P.accent, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {used ? "✓ Used" : "Available"}
                </button>
              </div>
            );
            const ActiveToggle = ({ label, active, onToggle, activeColor }) => {
              const col = activeColor || P.accent;
              return (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: active ? col : P.text }}>{label}</div>
                  <button onClick={onToggle} style={{ padding: "4px 12px", borderRadius: 6, border: `2px solid ${active ? col : P.border}`, background: active ? col + "22" : "transparent", color: active ? col : P.textMuted, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    {active ? "Active" : "Inactive"}
                  </button>
                </div>
              );
            };
            const Counter = ({ label, value, onInc, onDec, min = 0, max = 99, note }) => (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>{label}</div>
                  {note && <div style={{ fontSize: 10, color: P.textMuted }}>{note}</div>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={onDec} disabled={value <= min} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 16, cursor: value > min ? "pointer" : "default", fontFamily: "inherit", opacity: value <= min ? 0.4 : 1 }}>−</button>
                  <span style={{ fontSize: 16, fontWeight: 800, fontFamily: mono, color: P.accent, minWidth: 24, textAlign: "center" }}>{value}</span>
                  <button onClick={onInc} disabled={value >= max} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 16, cursor: value < max ? "pointer" : "default", fontFamily: "inherit", opacity: value >= max ? 0.4 : 1 }}>+</button>
                </div>
              </div>
            );

            const resources = [];

            // ── BARD ──────────────────────────────────────────
            if (c.className === "Bard") {
              resources.push(
                <CooldownBtn key="rally" label="Rally" used={c.rallyUsed || false} onToggle={() => u("rallyUsed", !(c.rallyUsed || false))} recharge="Once per session — give party Rally Dice" />
              );
              if (c.subclass === "Troubadour") {
                resources.push(
                  <CooldownBtn key="song1" label="Relaxing Song" used={c.troubadourSong1Used || false} onToggle={() => u("troubadourSong1Used", !(c.troubadourSong1Used || false))} recharge="Long rest" />,
                  <CooldownBtn key="song2" label="Epic Song" used={c.troubadourSong2Used || false} onToggle={() => u("troubadourSong2Used", !(c.troubadourSong2Used || false))} recharge="Long rest" />,
                  <CooldownBtn key="song3" label="Heartbreaking Song" used={c.troubadourSong3Used || false} onToggle={() => u("troubadourSong3Used", !(c.troubadourSong3Used || false))} recharge="Long rest" />
                );
              }
              if (c.subclass === "Wordsmith") {
                resources.push(
                  <CooldownBtn key="speech" label="Rousing Speech" used={c.wordsmithSpeechUsed || false} onToggle={() => u("wordsmithSpeechUsed", !(c.wordsmithSpeechUsed || false))} recharge="Long rest" />
                );
              }
            }

            // ── DRUID ─────────────────────────────────────────
            if (c.className === "Druid") {
              resources.push(
                <ActiveToggle key="beastform" label="Beastform" active={c.beastformActive || false} onToggle={() => u("beastformActive", !(c.beastformActive || false))} activeColor="#22c55e" />
              );
              if (c.subclass === "Warden of Renewal") {
                resources.push(
                  <CooldownBtn key="clarity" label="Clarity of Nature" used={c.druidClarityUsed || false} onToggle={() => u("druidClarityUsed", !(c.druidClarityUsed || false))} recharge="Long rest" />,
                  <CooldownBtn key="wardens" label="Warden's Protection" used={c.druidWardensProtectionUsed || false} onToggle={() => u("druidWardensProtectionUsed", !(c.druidWardensProtectionUsed || false))} recharge="Long rest" />
                );
              }
            }

            // ── GUARDIAN ──────────────────────────────────────
            if (c.className === "Guardian") {
              const dieMax = c.level >= 5 ? 6 : 4;
              const dieVal = c.unstoppableDieValue || 1;
              resources.push(
                <div key="unstoppable" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: (c.unstoppableActive || false) ? P.fear : P.text }}>Unstoppable {(c.unstoppableActive || false) ? `(d${dieMax}, value: ${dieVal})` : ""}</div>
                      <div style={{ fontSize: 10, color: P.textMuted }}>Once per long rest</div>
                    </div>
                    {!(c.unstoppableUsed || false) && !(c.unstoppableActive || false) && (
                      <button onClick={() => { u("unstoppableActive", true); u("unstoppableDieValue", 1); u("unstoppableUsed", true); }} style={{ padding: "4px 12px", borderRadius: 6, border: `2px solid ${P.fear}`, background: P.fear + "22", color: P.fear, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Activate</button>
                    )}
                    {(c.unstoppableUsed || false) && !(c.unstoppableActive || false) && (
                      <span style={{ fontSize: 11, color: P.textMuted, fontWeight: 700 }}>✓ Used</span>
                    )}
                    {(c.unstoppableActive || false) && (
                      <button onClick={() => u("unstoppableActive", false)} style={{ padding: "4px 12px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>End</button>
                    )}
                  </div>
                  {(c.unstoppableActive || false) && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: P.textMuted }}>Die value:</span>
                      <button onClick={() => u("unstoppableDieValue", Math.max(1, dieVal - 1))} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>−</button>
                      <span style={{ fontSize: 18, fontWeight: 800, fontFamily: mono, color: P.fear, minWidth: 24, textAlign: "center" }}>{dieVal}</span>
                      <button onClick={() => { if (dieVal < dieMax) u("unstoppableDieValue", dieVal + 1); else u("unstoppableActive", false); }} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>{dieVal < dieMax ? "+" : "⚡"}</button>
                      <span style={{ fontSize: 10, color: P.textMuted }}>max {dieMax} (⚡ = auto-end)</span>
                    </div>
                  )}
                </div>
              );
            }

            // ── RANGER ────────────────────────────────────────
            if (c.className === "Ranger") {
              resources.push(
                <div key="focus" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: (c.rangerFocusActive || false) ? 6 : 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: (c.rangerFocusActive || false) ? "#84cc16" : P.text }}>Ranger's Focus</div>
                    <button onClick={() => { u("rangerFocusActive", !(c.rangerFocusActive || false)); if (c.rangerFocusActive) u("rangerFocusTarget", ""); }} style={{ padding: "4px 12px", borderRadius: 6, border: `2px solid ${(c.rangerFocusActive || false) ? "#84cc16" : P.border}`, background: (c.rangerFocusActive || false) ? "#84cc1622" : "transparent", color: (c.rangerFocusActive || false) ? "#84cc16" : P.textMuted, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      {(c.rangerFocusActive || false) ? "Active" : "Inactive"}
                    </button>
                  </div>
                  {(c.rangerFocusActive || false) && (
                    <Inp value={c.rangerFocusTarget || ""} onChange={v => u("rangerFocusTarget", v)} placeholder="Target name…" style={{ marginTop: 4 }} />
                  )}
                </div>
              );
            }

            // ── ROGUE ─────────────────────────────────────────
            if (c.className === "Rogue") {
              resources.push(
                <ActiveToggle key="cloaked" label="Cloaked" active={c.cloaked || false} onToggle={() => u("cloaked", !(c.cloaked || false))} activeColor="#a855f7" />
              );
            }

            // ── SERAPH ────────────────────────────────────────
            if (c.className === "Seraph") {
              const spellcastTrait = sub?.spellcast || "Strength";
              const traitVal = Math.max(1, c.traits[spellcastTrait] || 0);
              const dice = c.prayerDice || [];
              resources.push(
                <div key="prayer" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>Prayer Dice</div>
                      <div style={{ fontSize: 10, color: P.textMuted }}>Rolled each session ({spellcastTrait} = {traitVal} dice)</div>
                    </div>
                    <button onClick={() => { const rolled = Array.from({ length: traitVal }, () => Math.floor(Math.random() * 4) + 1); u("prayerDice", rolled); }} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.hope}`, background: P.hope + "22", color: P.hope, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Roll d4s</button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {dice.length === 0 && <span style={{ fontSize: 11, color: P.textMuted, fontStyle: "italic" }}>No dice — tap Roll at session start</span>}
                    {dice.map((val, i) => (
                      <button key={i} onClick={() => u("prayerDice", dice.filter((_, j) => j !== i))} style={{ width: 36, height: 36, borderRadius: 8, border: `2px solid ${P.hope}`, background: P.hope + "22", color: P.hope, fontSize: 14, fontWeight: 800, fontFamily: mono, cursor: "pointer" }} title="Tap to spend">{val}</button>
                    ))}
                  </div>
                </div>
              );
            }

            // ── SORCERER ──────────────────────────────────────
            if (c.className === "Sorcerer") {
              resources.push(
                <CooldownBtn key="channel" label="Channel Raw Power" used={c.channelRawPowerUsed || false} onToggle={() => u("channelRawPowerUsed", !(c.channelRawPowerUsed || false))} recharge="Long rest" />
              );
              if (c.subclass === "Elemental Origin") {
                resources.push(
                  <CooldownBtn key="transcend" label="Transcendence" used={c.transcendenceUsed || false} onToggle={() => u("transcendenceUsed", !(c.transcendenceUsed || false))} recharge="Long rest" />
                );
              }
              if (c.subclass === "Primal Origin") {
                resources.push(
                  <ActiveToggle key="charge" label="Arcane Charge" active={c.arcaneChargeActive || false} onToggle={() => u("arcaneChargeActive", !(c.arcaneChargeActive || false))} />
                );
              }
            }

            // ── WARRIOR ───────────────────────────────────────
            if (c.className === "Warrior") {
              if (c.subclass === "Call of the Brave") {
                resources.push(
                  <CooldownBtn key="ritual" label="Battle Ritual" used={c.battleRitualUsed || false} onToggle={() => u("battleRitualUsed", !(c.battleRitualUsed || false))} recharge="Long rest" />
                );
              }
              if (c.subclass === "Call of the Slayer") {
                const dice = c.slayerDice || [];
                resources.push(
                  <div key="slayer" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>Slayer Dice</div>
                        <div style={{ fontSize: 10, color: P.textMuted }}>Gained on Hope rolls (max = Proficiency)</div>
                      </div>
                      <button onClick={() => u("slayerDice", [...dice, Math.floor(Math.random() * 6) + 1])} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.hope}`, background: P.hope + "22", color: P.hope, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>+ d6</button>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {dice.length === 0 && <span style={{ fontSize: 11, color: P.textMuted, fontStyle: "italic" }}>No dice yet</span>}
                      {dice.map((val, i) => (
                        <button key={i} onClick={() => u("slayerDice", dice.filter((_, j) => j !== i))} style={{ width: 36, height: 36, borderRadius: 8, border: `2px solid ${P.hope}`, background: P.hope + "22", color: P.hope, fontSize: 14, fontWeight: 800, fontFamily: mono, cursor: "pointer" }} title="Tap to spend">{val}</button>
                      ))}
                    </div>
                  </div>
                );
              }
            }

            // ── WIZARD ────────────────────────────────────────
            if (c.className === "Wizard") {
              const spn = c.strangePatternNumber || 7;
              resources.push(
                <div key="pattern" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>Strange Pattern Number</div>
                    <div style={{ fontSize: 10, color: P.textMuted }}>Gain Hope/clear Stress when you roll this on a Duality Die</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => u("strangePatternNumber", Math.max(1, spn - 1))} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>−</button>
                    <span style={{ fontSize: 18, fontWeight: 800, fontFamily: mono, color: P.accent, minWidth: 28, textAlign: "center" }}>{spn}</span>
                    <button onClick={() => u("strangePatternNumber", Math.min(12, spn + 1))} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>+</button>
                  </div>
                </div>
              );
            }

            // ── BLOOD HUNTER ──────────────────────────────────
            if (c.className === "Blood Hunter") {
              resources.push(
                <ActiveToggle key="rite" label="Crimson Rite (weapon enchanted)" active={c.crimsonRiteActive || false} onToggle={() => u("crimsonRiteActive", !(c.crimsonRiteActive || false))} activeColor="#ef4444" />
              );
              if (c.subclass === "Order of the Lycan") {
                resources.push(
                  <ActiveToggle key="wolf" label="Wolf Form" active={c.wolfFormActive || false} onToggle={() => u("wolfFormActive", !(c.wolfFormActive || false))} activeColor="#f97316" />
                );
              }
              if (c.subclass === "Order of the Mutant") {
                const mutagens = ["None", "Celerity", "Durable", "Hunter's Senses"];
                resources.push(
                  <div key="mutagen" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                    <Lbl style={{ marginBottom: 4 }}>Active Mutagen</Lbl>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {mutagens.map(m => (
                        <button key={m} onClick={() => u("mutagen", m === "None" ? "" : m)} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${(c.mutagen || "") === (m === "None" ? "" : m) ? P.accent : P.border}`, background: (c.mutagen || "") === (m === "None" ? "" : m) ? P.accent + "22" : P.surface, color: (c.mutagen || "") === (m === "None" ? "" : m) ? P.accent : P.textMuted }}>{m}</button>
                      ))}
                    </div>
                    {c.mutagen && <div style={{ marginTop: 6, fontSize: 11, color: P.textMuted }}>Active: +1 trait of choice, −1 different trait</div>}
                  </div>
                );
              }
            }

            // ── WITCH ─────────────────────────────────────────
            if (c.className === "Witch") {
              resources.push(
                <div key="hex" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: (c.hexActive || false) ? 6 : 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: (c.hexActive || false) ? "#a855f7" : P.text }}>Hex</div>
                    <button onClick={() => { u("hexActive", !(c.hexActive || false)); if (c.hexActive) u("hexTarget", ""); }} style={{ padding: "4px 12px", borderRadius: 6, border: `2px solid ${(c.hexActive || false) ? "#a855f7" : P.border}`, background: (c.hexActive || false) ? "#a855f722" : "transparent", color: (c.hexActive || false) ? "#a855f7" : P.textMuted, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      {(c.hexActive || false) ? "Active" : "Inactive"}
                    </button>
                  </div>
                  {(c.hexActive || false) && (
                    <Inp value={c.hexTarget || ""} onChange={v => u("hexTarget", v)} placeholder="Hexed target…" style={{ marginTop: 4 }} />
                  )}
                </div>,
                <CooldownBtn key="commune" label="Commune" used={c.communeUsed || false} onToggle={() => u("communeUsed", !(c.communeUsed || false))} recharge="Long rest" />
              );
              if (c.subclass === "Hedge") {
                resources.push(
                  <ActiveToggle key="talisman" label="Tethered Talisman (exists)" active={c.talismanExists || false} onToggle={() => u("talismanExists", !(c.talismanExists || false))} />,
                  <Counter key="wbw" label="Walk Between Worlds Tokens" value={c.walkBetweenWorldsTokens || 0} onInc={() => u("walkBetweenWorldsTokens", (c.walkBetweenWorldsTokens || 0) + 1)} onDec={() => u("walkBetweenWorldsTokens", Math.max(0, (c.walkBetweenWorldsTokens || 0) - 1))} />,
                  <Counter key="circle" label="Circle of Power Tokens" value={c.circleOfPowerTokens || 0} onInc={() => u("circleOfPowerTokens", (c.circleOfPowerTokens || 0) + 1)} onDec={() => u("circleOfPowerTokens", Math.max(0, (c.circleOfPowerTokens || 0) - 1))} />
                );
              }
              if (c.subclass === "Moon") {
                const phaseLabels = { 0: "Not rolled", 1: "New Moon — reduce Minor damage to None (spend Hope)", 2: "Waxing — +2 damage rolls", 3: "Full Moon — +2 damage thresholds", 4: "Waning — +1 Evasion" };
                resources.push(
                  <CooldownBtn key="moonbeam" label="Moonbeam" used={c.moonbeamUsed || false} onToggle={() => u("moonbeamUsed", !(c.moonbeamUsed || false))} recharge="Once per session" />,
                  <div key="phase" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>Lunar Phase</div>
                        <div style={{ fontSize: 10, color: P.textMuted }}>Roll at session start</div>
                      </div>
                      <button onClick={() => u("lunarPhase", Math.floor(Math.random() * 4) + 1)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.accent}`, background: P.accent + "22", color: P.accent, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Roll d4</button>
                    </div>
                    <div style={{ fontSize: 11, color: (c.lunarPhase || 0) > 0 ? P.accent : P.textMuted, background: P.surface, borderRadius: 6, padding: "6px 8px" }}>
                      {phaseLabels[c.lunarPhase || 0]}
                    </div>
                  </div>
                );
              }
            }

            // ── ASSASSIN ──────────────────────────────────────
            if (c.className === "Assassin") {
              resources.push(
                <div key="mfd" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: (c.markedForDeathActive || false) ? 6 : 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: (c.markedForDeathActive || false) ? P.fear : P.text }}>Marked for Death</div>
                    <button onClick={() => { u("markedForDeathActive", !(c.markedForDeathActive || false)); if (c.markedForDeathActive) u("markedForDeathTarget", ""); }} style={{ padding: "4px 12px", borderRadius: 6, border: `2px solid ${(c.markedForDeathActive || false) ? P.fear : P.border}`, background: (c.markedForDeathActive || false) ? P.fear + "22" : "transparent", color: (c.markedForDeathActive || false) ? P.fear : P.textMuted, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      {(c.markedForDeathActive || false) ? "Active" : "Inactive"}
                    </button>
                  </div>
                  {(c.markedForDeathActive || false) && (
                    <Inp value={c.markedForDeathTarget || ""} onChange={v => u("markedForDeathTarget", v)} placeholder="Target name…" style={{ marginTop: 4 }} />
                  )}
                </div>
              );
              if (c.subclass === "Poisoners Guild") {
                resources.push(
                  <Counter key="poison" label="Poison Tokens" value={c.poisonTokens || 0} onInc={() => u("poisonTokens", (c.poisonTokens || 0) + 1)} onDec={() => u("poisonTokens", Math.max(0, (c.poisonTokens || 0) - 1))} max={8} note="Cleared on long rest" />
                );
              }
              if (c.subclass === "Executioners Guild") {
                resources.push(
                  <CooldownBtn key="firststrike" label="First Strike" used={c.firstStrikeUsed || false} onToggle={() => u("firstStrikeUsed", !(c.firstStrikeUsed || false))} recharge="Per scene (first attack)" />,
                  <CooldownBtn key="truestrike" label="True Strike" used={c.trueStrikeUsed || false} onToggle={() => u("trueStrikeUsed", !(c.trueStrikeUsed || false))} recharge="Long rest" />
                );
              }
            }

            // ── WARLOCK ───────────────────────────────────────
            if (c.className === "Warlock") {
              resources.push(
                <Counter key="favor" label="Favor" value={c.favor ?? 3} onInc={() => u("favor", (c.favor ?? 3) + 1)} onDec={() => u("favor", Math.max(0, (c.favor ?? 3) - 1))} note="Spend on patron abilities" />,
                <div key="spheres" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <Lbl style={{ marginBottom: 6 }}>Patron Spheres of Influence</Lbl>
                  {[["patronSphere1Name", "patronSphere1Value"], ["patronSphere2Name", "patronSphere2Value"]].map(([nk, vk], i) => (
                    <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                      <Inp value={c[nk] || ""} onChange={v => u(nk, v)} placeholder={`Sphere ${i + 1} name…`} style={{ flex: 1 }} />
                      <button onClick={() => u(vk, Math.max(2, (c[vk] ?? 2) - 1))} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>−</button>
                      <span style={{ fontSize: 14, fontWeight: 800, fontFamily: mono, color: P.accent, minWidth: 24, textAlign: "center" }}>+{c[vk] ?? 2}</span>
                      <button onClick={() => u(vk, (c[vk] ?? 2) + 1)} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>+</button>
                    </div>
                  ))}
                </div>
              );
              if (c.subclass === "Pact of the Endless") {
                resources.push(
                  <ActiveToggle key="mantle" label="Patron's Mantle" active={c.patronsMantleActive || false} onToggle={() => u("patronsMantleActive", !(c.patronsMantleActive || false))} />
                );
              }
            }

            // ── BRAWLER ───────────────────────────────────────
            if (c.className === "Brawler") {
              const dieSizes = ["d4", "d6", "d8", "d10", "d12"];
              const curDie = c.comboDieSize || "d4";
              resources.push(
                <div key="combo" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                  <Lbl style={{ marginBottom: 6 }}>Combo Die</Lbl>
                  <div style={{ display: "flex", gap: 6 }}>
                    {dieSizes.map(d => (
                      <button key={d} onClick={() => u("comboDieSize", d)} style={{ flex: 1, padding: "6px 0", borderRadius: 7, border: `2px solid ${curDie === d ? P.accent : P.border}`, background: curDie === d ? P.accent + "22" : P.surface, color: curDie === d ? P.accent : P.textMuted, fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>{d}</button>
                    ))}
                  </div>
                </div>,
                <CooldownBtn key="limbreak" label="Limit Breaker" used={c.limitBreakerUsed || false} onToggle={() => u("limitBreakerUsed", !(c.limitBreakerUsed || false))} recharge="Long rest" />
              );
              if (c.subclass === "Martial Artist") {
                const instinct = Math.max(1, c.traits?.Instinct || 0);
                resources.push(
                  <div key="focus" style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>Focus Tokens</div>
                        <div style={{ fontSize: 10, color: P.textMuted }}>Roll {instinct}d6 during rest, keep highest</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <button onClick={() => { const dice = Array.from({ length: instinct }, () => Math.floor(Math.random() * 6) + 1); u("focusTokens", Math.max(...dice)); }} style={{ padding: "4px 8px", borderRadius: 6, border: `1px solid ${P.accent}`, background: P.accent + "22", color: P.accent, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Roll</button>
                        <button onClick={() => u("focusTokens", Math.max(0, (c.focusTokens || 0) - 1))} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>−</button>
                        <span style={{ fontSize: 18, fontWeight: 800, fontFamily: mono, color: P.accent, minWidth: 24, textAlign: "center" }}>{c.focusTokens || 0}</span>
                        <button onClick={() => u("focusTokens", (c.focusTokens || 0) + 1)} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>+</button>
                      </div>
                    </div>
                  </div>
                );
              }
              if (c.subclass === "Juggernaut") {
                resources.push(
                  <CooldownBtn key="eyeforeye" label="Eye for an Eye" used={c.eyeForAnEyeUsed || false} onToggle={() => u("eyeForAnEyeUsed", !(c.eyeForAnEyeUsed || false))} recharge="Long rest" />
                );
              }
            }

            if (resources.length === 0) return null;
            return (
              <Card>
                <Lbl>Class Resources</Lbl>
                <div style={{ marginTop: 4 }}>
                  {resources}
                </div>
              </Card>
            );
          })()}

          {/* Experiences */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <Lbl style={{ marginBottom: 0 }}>Experiences</Lbl>
              <button onClick={() => setEditExp(!editExp)} className={!editExp && (!c.exp1 || !c.exp2) ? "btn-pulse" : ""} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: editExp ? P.accent : P.surface, color: editExp ? "#fff" : P.accent, cursor: "pointer", fontFamily: "inherit" }}>{editExp ? "Done" : "Edit"}</button>
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
                    {a.type === "primary" ? "⚔ " : a.type === "secondary" ? "🛡 " : a.type === "ability" ? "🌟 " : "✦ "}{a.label}
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
                body: `## Overview\n**Domains**: ${cl.domains.join(" & ")}\n**Starting HP**: ${cl.hp}\n**Base Evasion**: ${cl.evasion}\n\n## Hope Feature\n${hopeFormatted}\n\n## Class Features\n\n${featureLines}\n\n## Starting Items\n${cl.items}`,
              };
            });
            return (
              <Card className={!c.className ? "card-pulse" : ""}>
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
            <Card className={!c.subclass ? "card-pulse" : ""}>
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
          <Card className={!c.ancestry ? "card-pulse" : ""}>
            {(() => {
              const ancestryItems = (excludeKey) => Object.keys(ANCESTRIES)
                .filter(a => a !== excludeKey)
                .map(a => {
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

              const activeFeatures = getActiveAncestryFeatures(c);
              const displayLabel = getMixedAncestryLabel(c);

              // Feature pick options for mixed ancestry
              const primary = c.ancestry ? ANCESTRIES[c.ancestry] : null;
              const secondary = c.ancestrySecondary ? ANCESTRIES[c.ancestrySecondary] : null;
              const optionA = primary && secondary
                ? { feat1: primary[0]?.split(":")[0], feat2: secondary[1]?.split(":")[0], from1: c.ancestry, from2: c.ancestrySecondary }
                : null;
              const optionB = primary && secondary
                ? { feat1: primary[1]?.split(":")[0], feat2: secondary[0]?.split(":")[0], from1: c.ancestry, from2: c.ancestrySecondary }
                : null;

              // Mixed is fully locked when both ancestries + pick exist and not in edit mode
              const mixedComplete = c.isMixedAncestry && c.ancestry && c.ancestrySecondary && c.mixedFeaturePick;
              const mixedLocked = mixedComplete && !editingMixed;
              // Can confirm once both ancestries are picked
              const canConfirmMixed = c.ancestry && c.ancestrySecondary && c.mixedFeaturePick;

              return (
                <>
                  {/* ── HEADER ROW ── */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <Lbl style={{ marginBottom: 0 }}>Ancestry</Lbl>
                    <div style={{ display: "flex", gap: 4 }}>
                      {/* Show Change button when locked (standard or mixed) */}
                      {((!c.isMixedAncestry && c.ancestry && !editingAncestry) || mixedLocked) && (
                        <button
                          onClick={() => { if (c.isMixedAncestry) { setEditingMixed(true); setEditingAncestry(false); setEditingAncestrySecondary(false); } else { setEditingAncestry(true); } }}
                          style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                          Change
                        </button>
                      )}
                      {/* Confirm button during mixed edit, once ready */}
                      {c.isMixedAncestry && editingMixed && canConfirmMixed && (
                        <button
                          onClick={() => { setEditingMixed(false); setEditingAncestry(false); setEditingAncestrySecondary(false); }}
                          style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.accent}`, background: P.accent, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                          Confirm
                        </button>
                      )}
                      {/* Mode toggle — only visible when not locked */}
                      {(!mixedLocked && (!c.ancestry || editingAncestry || c.isMixedAncestry)) && (
                        <>
                          <button
                            onClick={() => { u("isMixedAncestry", false); setEditingMixed(false); setEditingAncestry(false); setEditingAncestrySecondary(false); }}
                            style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, border: `1px solid ${P.border}`, background: !c.isMixedAncestry ? P.accent : P.surface, color: !c.isMixedAncestry ? "#fff" : P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, letterSpacing: 0.5 }}>
                            STANDARD
                          </button>
                          <button
                            onClick={() => { u("isMixedAncestry", true); setEditingMixed(true); setEditingAncestry(false); setEditingAncestrySecondary(false); }}
                            style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, border: `1px solid ${P.border}`, background: c.isMixedAncestry ? P.accent : P.surface, color: c.isMixedAncestry ? "#fff" : P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, letterSpacing: 0.5 }}>
                            MIXED
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* ── STANDARD ANCESTRY ── */}
                  {!c.isMixedAncestry && <>
                    {(!c.ancestry || editingAncestry) && (
                      <PickerAccordion items={ancestryItems(null)} selected={c.ancestry} onSelect={v => { u("ancestry", v); setEditingAncestry(false); }} />
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
                  </>}

                  {/* ── MIXED ANCESTRY — LOCKED VIEW ── */}
                  {mixedLocked && <>
                    <div style={{ padding: "8px 12px", borderRadius: 8, background: P.accent + "14", border: `2px solid ${P.accent}`, marginBottom: 8 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: P.accent }}>{displayLabel || "Mixed Ancestry"}</div>
                      <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>
                        {c.ancestry} + {c.ancestrySecondary}
                        {c.mixedAncestryLabel ? ` · "${c.mixedAncestryLabel}"` : ""}
                      </div>
                    </div>
                    {activeFeatures.map((f, i) => <Feat key={i} title={f.split(":")[0]} text={f} />)}
                  </>}

                  {/* ── MIXED ANCESTRY — EDIT VIEW ── */}
                  {c.isMixedAncestry && !mixedLocked && <>
                    {/* Rulebook reminder */}
                    <div style={{ fontSize: 11, color: P.textMuted, background: P.surface, borderRadius: 6, padding: "6px 10px", marginBottom: 12, lineHeight: 1.5, border: `1px solid ${P.border}` }}>
                      <span style={{ color: P.accent, fontWeight: 700 }}>Mixed Ancestry:</span> Choose the <strong>1st feature</strong> from one ancestry and the <strong>2nd feature</strong> from another.
                    </div>

                    {/* Primary ancestry picker */}
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: P.textMuted, letterSpacing: 0.5 }}>PRIMARY ANCESTRY</div>
                        {c.ancestry && !editingAncestry && (
                          <button onClick={() => setEditingAncestry(e => !e)} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Change</button>
                        )}
                      </div>
                      {(!c.ancestry || editingAncestry) && (
                        <PickerAccordion items={ancestryItems(c.ancestrySecondary)} selected={c.ancestry} onSelect={v => { u("ancestry", v); setEditingAncestry(false); }} />
                      )}
                      {c.ancestry && !editingAncestry && (
                        <div style={{ padding: "6px 10px", borderRadius: 7, background: P.accent + "14", border: `1px solid ${P.accent}55` }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: P.accent }}>{c.ancestry}</div>
                          <div style={{ fontSize: 10, color: P.textMuted, marginTop: 1 }}>{(ANCESTRIES[c.ancestry] || []).map((f,i) => `${i===0?"①":"②"} ${f.split(":")[0]}`).join("  ")}</div>
                        </div>
                      )}
                    </div>

                    {/* Secondary ancestry picker */}
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: P.textMuted, letterSpacing: 0.5 }}>SECONDARY ANCESTRY</div>
                        {c.ancestrySecondary && !editingAncestrySecondary && (
                          <button onClick={() => setEditingAncestrySecondary(e => !e)} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Change</button>
                        )}
                      </div>
                      {(!c.ancestrySecondary || editingAncestrySecondary) && (
                        <PickerAccordion items={ancestryItems(c.ancestry)} selected={c.ancestrySecondary} onSelect={v => { u("ancestrySecondary", v); setEditingAncestrySecondary(false); }} />
                      )}
                      {c.ancestrySecondary && !editingAncestrySecondary && (
                        <div style={{ padding: "6px 10px", borderRadius: 7, background: P.accent + "14", border: `1px solid ${P.accent}55` }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: P.accent }}>{c.ancestrySecondary}</div>
                          <div style={{ fontSize: 10, color: P.textMuted, marginTop: 1 }}>{(ANCESTRIES[c.ancestrySecondary] || []).map((f,i) => `${i===0?"①":"②"} ${f.split(":")[0]}`).join("  ")}</div>
                        </div>
                      )}
                    </div>

                    {/* Feature combination picker — only shown once both ancestries are chosen */}
                    {c.ancestry && c.ancestrySecondary && optionA && optionB && (
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: P.textMuted, letterSpacing: 0.5, marginBottom: 6 }}>CHOOSE YOUR FEATURES</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {[
                            { val: "A", opt: optionA },
                            { val: "B", opt: optionB },
                          ].map(({ val, opt }) => (
                            <button key={val} onClick={() => u("mixedFeaturePick", val)}
                              style={{ textAlign: "left", padding: "8px 12px", borderRadius: 8, border: `2px solid ${c.mixedFeaturePick === val ? P.accent : P.border}`, background: c.mixedFeaturePick === val ? P.accent + "18" : P.surface, cursor: "pointer", fontFamily: "inherit", transition: "border-color .15s, background .15s" }}>
                              <div style={{ fontSize: 12, fontWeight: 800, color: c.mixedFeaturePick === val ? P.accent : P.text, marginBottom: 2 }}>
                                ① {opt.feat1} <span style={{ color: P.textMuted, fontWeight: 400 }}>({opt.from1})</span>
                                <span style={{ color: P.textMuted }}> + </span>
                                ② {opt.feat2} <span style={{ color: P.textMuted, fontWeight: 400 }}>({opt.from2})</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom name */}
                    {c.ancestry && c.ancestrySecondary && (
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: P.textMuted, letterSpacing: 0.5, marginBottom: 4 }}>CUSTOM ANCESTRY NAME <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span></div>
                        <input
                          type="text"
                          value={c.mixedAncestryLabel}
                          onChange={e => u("mixedAncestryLabel", e.target.value)}
                          placeholder={`e.g. "${c.ancestry.toLowerCase()}-${c.ancestrySecondary.toLowerCase()}" or a custom name`}
                          style={{ width: "100%", padding: "7px 10px", borderRadius: 7, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 12, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                        />
                      </div>
                    )}

                    {/* Confirm strip — sticky at bottom of edit section */}
                    {canConfirmMixed && (
                      <button
                        onClick={() => { setEditingMixed(false); setEditingAncestry(false); setEditingAncestrySecondary(false); }}
                        style={{ width: "100%", marginTop: 4, padding: "10px", borderRadius: 8, border: `2px solid ${P.accent}`, background: P.accent, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: 13, letterSpacing: 0.5 }}>
                        Confirm Mixed Ancestry
                      </button>
                    )}
                  </>}
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
          <Card><Lbl>Primary Weapon</Lbl><Sel className={!c.primaryWeapon ? "btn-pulse" : ""} value={c.primaryWeapon} onChange={v => u("primaryWeapon", v)}><option value="">— Select —</option><optgroup label="Physical">{WEAPONS_PRIMARY.filter(w => w.type === "phy").map(w => <option key={w.name} value={w.name}>{w.name} — {w.trait} {w.range} {w.damage} ({w.burden})</option>)}</optgroup><optgroup label="Magic (Spellcast)">{WEAPONS_PRIMARY.filter(w => w.type === "mag").map(w => <option key={w.name} value={w.name}>{w.name} — {w.trait} {w.range} {w.damage} ({w.burden})</option>)}</optgroup></Sel>
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
        {tab === "Companion" && <CompanionTab c={c} u={u} prof={prof} />}
      </div>
      <div style={{ padding: "16px", textAlign: "center", fontSize: 9, color: P.textMuted, borderTop: `1px solid ${P.border}` }}>Daggerheart © Darrington Press 2025 — Fan-made digital sheet</div>
    </div>
  );
}
