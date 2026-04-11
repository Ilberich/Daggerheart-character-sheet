// ═══════════════════════════════════════════════════════════════
// LEVEL UP MODAL
// ═══════════════════════════════════════════════════════════════
function LevelUpModal({ c, onConfirm, onClose }) {
  const newLevel = c.level + 1;
  const isNewTier = [2, 5, 8].includes(newLevel);
  const tierLabel = newLevel <= 4 ? "Tier 2" : newLevel <= 7 ? "Tier 3" : "Tier 4";
  const advUsed = c.advUsed || { tier2: {}, tier3: {}, tier4: {} };

  const [picks, setPicks] = useState([]);
  const [traitPicker, setTraitPicker] = useState(null); // { tier } when open
  const [tempTraits, setTempTraits] = useState([]);
  const [expPicker, setExpPicker] = useState(null);   // { tier } when open
  const [tempExpKeys, setTempExpKeys] = useState([]);

  const pointsSpent = picks.reduce((sum, p) => sum + ADV_COST[p.type], 0);
  const pointsLeft  = 2 - pointsSpent;

  const committedCount = (tier, opt) => (advUsed[tier]?.[opt]) || 0;
  const pendingCount   = (tier, opt) => picks.filter(p => p.fromTier === tier && p.type === opt).length;
  const totalUsed      = (tier, opt) => committedCount(tier, opt) + pendingCount(tier, opt);

  const effectiveSubLv = (c.subclassLevel ?? 1) + picks.filter(p => p.type === "subclass").length;

  const canAddPick = (tier, opt) => {
    if (ADV_COST[opt] > pointsLeft) return false;
    if (totalUsed(tier, opt) >= ADV_MAX[opt]) return false;
    if (opt === "subclass") {
      if (totalUsed(tier, "multiclass") > 0) return false;
      if (effectiveSubLv >= 3) return false;
      if (tier === "tier3" && effectiveSubLv >= 2) return false;
    }
    if (opt === "multiclass") {
      if (totalUsed(tier, "subclass") > 0) return false;
    }
    return true;
  };

  const removePendingPick = (tier, opt) => {
    const all = picks.map((p, i) => ({ p, i })).filter(({ p }) => p.fromTier === tier && p.type === opt);
    const last = all[all.length - 1];
    if (last) setPicks(prev => prev.filter((_, i) => i !== last.i));
  };

  const handleSlotClick = (tier, opt) => {
    if (!canAddPick(tier, opt)) return;
    if (opt === "traits")   { setTraitPicker({ tier }); setTempTraits([]); }
    else if (opt === "exp") { setExpPicker({ tier }); setTempExpKeys([]); }
    else setPicks(prev => [...prev, { type: opt, fromTier: tier }]);
  };

  const handleConfirmTraits = () => {
    if (tempTraits.length !== 2) return;
    setPicks(prev => [...prev, { type: "traits", fromTier: traitPicker.tier, traits: tempTraits }]);
    setTraitPicker(null); setTempTraits([]);
  };

  const handleConfirmExp = () => {
    if (tempExpKeys.length !== 2) return;
    setPicks(prev => [...prev, { type: "exp", fromTier: expPicker.tier, keys: tempExpKeys }]);
    setExpPicker(null); setTempExpKeys([]);
  };


  // Experience slots with a name
  const allExpsLU = [
    { key: "exp1", valKey: "exp1Val" },
    { key: "exp2", valKey: "exp2Val" },
    ...(c.level >= 2 ? [{ key: "exp3", valKey: "exp3Val" }] : []),
    ...(c.level >= 5 ? [{ key: "exp4", valKey: "exp4Val" }] : []),
    ...(c.level >= 8 ? [{ key: "exp5", valKey: "exp5Val" }] : []),
  ].filter(e => c[e.key]);

  const tiersToShow = advAccessibleTiers(newLevel);

  // ── Sub-view: trait picker ──────────────────────────────────────
  if (traitPicker) {
    const effectiveMarks = {};
    (c.advUsed?.[traitPicker.tier]?.traitsPicked || []).forEach(t => { effectiveMarks[t] = true; });
    picks.filter(p => p.type === "traits" && p.fromTier === traitPicker.tier).forEach(p => {
      (p.traits || []).forEach(t => { effectiveMarks[t] = true; });
    });
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 1004, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 480, background: P.card, borderRadius: "20px 20px 0 0", padding: 20, paddingBottom: 32, border: `1px solid ${P.border}`, borderBottom: "none" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: P.accent, marginBottom: 4 }}>Choose Two Traits to Increase</div>
          <div style={{ fontSize: 12, color: P.textMuted, marginBottom: 16 }}>Select 2 unmarked traits to gain +1 to each. Chosen traits will be marked for this tier.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {TRAIT_KEYS.map(t => {
              const isMarked   = !!effectiveMarks[t];
              const isSelected = tempTraits.includes(t);
              const curVal     = getTrait(c, t);
              return (
                <div key={t} onClick={() => {
                  if (isMarked) return;
                  if (isSelected) setTempTraits(prev => prev.filter(x => x !== t));
                  else if (tempTraits.length < 2) setTempTraits(prev => [...prev, t]);
                }} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px", borderRadius: 8,
                  border: `1px solid ${isSelected ? P.accent : P.border}`,
                  background: isSelected ? P.accent + "22" : P.surface,
                  cursor: isMarked ? "not-allowed" : "pointer",
                  opacity: isMarked ? 0.4 : 1
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? P.accent : P.text }}>{t}</div>
                    {isMarked && <div style={{ fontSize: 9, color: P.textMuted }}>Marked — cannot increase this tier</div>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, fontFamily: mono, color: P.text }}>{curVal >= 0 ? `+${curVal}` : `${curVal}`}</span>
                    {isSelected && <span style={{ fontSize: 12, color: P.accent, fontWeight: 700 }}>→ {curVal + 1 >= 0 ? `+${curVal + 1}` : `${curVal + 1}`}</span>}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setTraitPicker(null); setTempTraits([]); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={handleConfirmTraits} disabled={tempTraits.length !== 2} style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: tempTraits.length === 2 ? P.accent : P.border, color: tempTraits.length === 2 ? "#fff" : P.textMuted, fontSize: 14, fontWeight: 800, cursor: tempTraits.length === 2 ? "pointer" : "default", fontFamily: "inherit" }}>
              {tempTraits.length === 2 ? `Confirm +1 to ${tempTraits.map(t => TRAIT_SHORT[t]).join(", ")}` : `Select ${2 - tempTraits.length} more trait${2 - tempTraits.length !== 1 ? "s" : ""}`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Sub-view: experience picker ────────────────────────────────
  if (expPicker) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 1004, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 480, background: P.card, borderRadius: "20px 20px 0 0", padding: 20, paddingBottom: 32, border: `1px solid ${P.border}`, borderBottom: "none" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: P.accent, marginBottom: 4 }}>Choose Two Experiences to Boost</div>
          <div style={{ fontSize: 12, color: P.textMuted, marginBottom: 16 }}>Select 2 existing experiences to permanently gain +1 to each.</div>
          {allExpsLU.length < 2 && (
            <div style={{ fontSize: 12, color: P.textMuted, fontStyle: "italic", marginBottom: 12, padding: "10px 14px", background: P.surface, borderRadius: 8 }}>
              You need at least 2 named experiences. Add them on the Play tab first.
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {allExpsLU.map(({ key, valKey }) => {
              const isSelected = tempExpKeys.includes(valKey);
              return (
                <div key={key} onClick={() => {
                  if (isSelected) setTempExpKeys(prev => prev.filter(x => x !== valKey));
                  else if (tempExpKeys.length < 2) setTempExpKeys(prev => [...prev, valKey]);
                }} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px", borderRadius: 8,
                  border: `1px solid ${isSelected ? P.accent : P.border}`,
                  background: isSelected ? P.accent + "22" : P.surface,
                  cursor: "pointer"
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: isSelected ? P.accent : P.text }}>{c[key]}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, fontFamily: mono, color: P.accent }}>
                    +{c[valKey]}{isSelected ? ` → +${c[valKey] + 1}` : ""}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { setExpPicker(null); setTempExpKeys([]); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={handleConfirmExp} disabled={tempExpKeys.length !== 2 || allExpsLU.length < 2} style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: tempExpKeys.length === 2 && allExpsLU.length >= 2 ? P.accent : P.border, color: tempExpKeys.length === 2 && allExpsLU.length >= 2 ? "#fff" : P.textMuted, fontSize: 14, fontWeight: 800, cursor: tempExpKeys.length === 2 && allExpsLU.length >= 2 ? "pointer" : "default", fontFamily: "inherit" }}>
              {tempExpKeys.length === 2 ? "Confirm +1 to Selected" : `Select ${2 - tempExpKeys.length} more`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main modal ─────────────────────────────────────────────────
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 1004, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: "100%", maxWidth: 480, background: P.card, borderRadius: "20px 20px 0 0", maxHeight: "90vh", display: "flex", flexDirection: "column", border: `1px solid ${P.border}`, borderBottom: "none" }}>

        {/* Header */}
        <div style={{ padding: "20px 20px 14px", borderBottom: `1px solid ${P.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: P.accent }}>Level Up to {newLevel}</div>
              <div style={{ fontSize: 12, color: P.textMuted, marginTop: 2 }}>{tierLabel} · 2 points to spend</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: mono, color: pointsLeft > 0 ? P.hope : P.hp }}>{pointsLeft}</div>
              <div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700, letterSpacing: 0.5 }}>PTS LEFT</div>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>

          {/* Tier transition auto-bonus */}
          {isNewTier && (
            <div style={{ marginBottom: 16, padding: "12px 14px", borderRadius: 10, background: P.surface, border: `1px solid ${P.accent}55` }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: P.accent, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Auto-Applied Tier Bonus</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 12, color: P.text }}>✓ Gain a new Experience slot</div>
                <div style={{ fontSize: 12, color: P.text }}>✓ Proficiency increases (tier formula)</div>
                {newLevel >= 5 && <div style={{ fontSize: 12, color: P.text }}>✓ All trait marks cleared</div>}
              </div>
            </div>
          )}

          {/* Tier option sections */}
          {tiersToShow.map((tier, tIdx) => {
            const tierName = { tier2: "Tier 2", tier3: "Tier 3", tier4: "Tier 4" }[tier];
            const sharedOpts = [
              { opt: "traits",  label: "Increase Two Traits",    slots: ADV_MAX.traits  },
              { opt: "hp",      label: "+1 HP Slot",             slots: ADV_MAX.hp      },
              { opt: "stress",  label: "+1 Stress Slot",         slots: ADV_MAX.stress  },
              { opt: "exp",     label: "+1 to Two Experiences",  slots: ADV_MAX.exp     },
              { opt: "evasion", label: "+1 Evasion",             slots: ADV_MAX.evasion },
            ];
            const exclusiveOpts = tier !== "tier2" ? [
              { opt: "subclass",    label: tier === "tier3" ? "Upgrade: Foundation → Spec" : "Upgrade: Spec → Mastery", slots: ADV_MAX.subclass    },
              { opt: "proficiency", label: "+1 Proficiency",  slots: ADV_MAX.proficiency, cost2: true },
              { opt: "multiclass",  label: "Multiclass",      slots: ADV_MAX.multiclass,  cost2: true },
            ] : [];
            const allOpts = [...sharedOpts, ...exclusiveOpts];

            return (
              <div key={tier} style={{ marginBottom: tIdx < tiersToShow.length - 1 ? 20 : 0 }}>
                {tiersToShow.length > 1 && (
                  <div style={{ fontSize: 10, fontWeight: 800, color: P.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${P.border}` }}>
                    {tierName} Options
                  </div>
                )}
                {allOpts.map(({ opt, label, slots, cost2 }) => {
                  const committed = committedCount(tier, opt);
                  const pending   = pendingCount(tier, opt);
                  const used      = committed + pending;
                  const addable   = canAddPick(tier, opt);
                  const allFull   = used >= slots;
                  const mutexBlk  = (opt === "subclass"   && totalUsed(tier, "multiclass") > 0)
                                 || (opt === "multiclass" && totalUsed(tier, "subclass")   > 0);
                  const subImposs = opt === "subclass" && !mutexBlk && (
                    effectiveSubLv >= (tier === "tier3" ? 2 : 3)
                  );
                  const dimmed = (allFull && pending === 0) || mutexBlk || subImposs;

                  return (
                    <div key={opt} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9, opacity: dimmed ? 0.42 : 1 }}>
                      {/* Checkbox slots */}
                      <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                        {cost2 ? (
                          <div
                            onClick={() => {
                              if (committed > 0) return;
                              if (pending > 0) removePendingPick(tier, opt);
                              else if (addable) setPicks(prev => [...prev, { type: opt, fromTier: tier }]);
                            }}
                            style={{
                              width: 48, height: 22, borderRadius: 4,
                              border: `2px solid ${committed > 0 || pending > 0 ? P.accent : addable ? P.textMuted : P.border}`,
                              background: committed > 0 ? P.accent + "99" : pending > 0 ? P.accent + "33" : "transparent",
                              cursor: committed > 0 ? "default" : (addable || pending > 0) ? "pointer" : "default",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 10, fontWeight: 800,
                              color: committed > 0 || pending > 0 ? P.accent : P.textMuted
                            }}>
                            {committed > 0 || pending > 0 ? "✓" : "2pt"}
                          </div>
                        ) : (
                          Array.from({ length: slots }, (_, i) => {
                            const isCom  = i < committed;
                            const isPen  = i >= committed && i < committed + pending;
                            const isNext = i === committed + pending && !allFull;
                            return (
                              <div key={i}
                                onClick={() => {
                                  if (isCom) return;
                                  if (isPen) removePendingPick(tier, opt);
                                  else if (isNext) handleSlotClick(tier, opt);
                                }}
                                style={{
                                  width: 22, height: 22, borderRadius: 4,
                                  border: `1px solid ${isCom ? P.accent : isPen ? P.accent : (isNext && addable ? P.textMuted : P.border)}`,
                                  background: isCom ? P.accent + "99" : isPen ? P.accent + "33" : "transparent",
                                  cursor: (isCom || (!isNext && !isPen)) ? "default" : "pointer",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  fontSize: 11, color: P.accent, fontWeight: 800
                                }}>
                                {(isCom || isPen) ? "✓" : ""}
                              </div>
                            );
                          })
                        )}
                      </div>
                      {/* Label */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: dimmed ? P.textMuted : P.text, fontWeight: 600 }}>
                          {label}
                          {cost2 && <span style={{ fontSize: 10, color: P.textMuted, marginLeft: 6, fontWeight: 400 }}>(2 pts)</span>}
                        </div>
                        {mutexBlk && opt === "subclass"   && <div style={{ fontSize: 9, color: P.fear, marginTop: 1 }}>Blocked by Multiclass this tier</div>}
                        {mutexBlk && opt === "multiclass" && <div style={{ fontSize: 9, color: P.fear, marginTop: 1 }}>Blocked by Subclass upgrade this tier</div>}
                        {subImposs && tier === "tier3"    && <div style={{ fontSize: 9, color: P.textMuted, marginTop: 1 }}>Mastery upgrade available in Tier 4</div>}
                        {subImposs && tier === "tier4"    && <div style={{ fontSize: 9, color: P.textMuted, marginTop: 1 }}>Already at Mastery</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${P.border}`, display: "flex", gap: 10, flexShrink: 0 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 10, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={() => onConfirm(picks)} disabled={pointsSpent < 2}
            style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: pointsSpent >= 2 ? P.accent : P.border, color: pointsSpent >= 2 ? "#fff" : P.textMuted, fontSize: 14, fontWeight: 800, cursor: pointsSpent >= 2 ? "pointer" : "default", fontFamily: "inherit", transition: "all .15s" }}>
            {pointsSpent >= 2 ? `Level Up to ${newLevel}! ⬆` : `Spend ${pointsLeft} more pt${pointsLeft !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}
