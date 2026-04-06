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
