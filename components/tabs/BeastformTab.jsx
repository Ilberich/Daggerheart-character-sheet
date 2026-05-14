import { useState } from 'react';
import { P, mono } from '../../data/themes.js';
import { Card } from '../ui.jsx';
import { BEASTFORMS } from '../../data/beastforms.js';

export function BeastformTab({ c, u, effTraits, subclassLevel }) {
  const [filter,    setFilter]    = useState("All");
  const [openForms, setOpenForms] = useState(new Set());

  const currentTier = c.level >= 8 ? 4 : c.level >= 5 ? 3 : c.level >= 2 ? 2 : 1;
  const crs          = c.classResourceState || {};
  const activeFormName = crs["Beastform"] || null;
  const activeForm     = BEASTFORMS.find(f => f.name === activeFormName) || null;

  const setActiveForm = (name) => u("classResourceState", { ...crs, Beastform: name });
  const clearForm     = ()     => u("classResourceState", { ...crs, Beastform: null });

  const toggleOpen = (name) => setOpenForms(prev => {
    const s = new Set(prev);
    s.has(name) ? s.delete(name) : s.add(name);
    return s;
  });

  const tierFilter   = filter === "All" ? null : parseInt(filter.split(" ")[1]);
  const visibleForms = BEASTFORMS.filter(f =>
    f.tier <= currentTier && (tierFilter === null || f.tier === tierFilter)
  );
  const availableTiers = [1, 2, 3, 4].filter(t => t <= currentTier);

  const FilterBtn = ({ label }) => (
    <button
      onClick={() => setFilter(label)}
      style={{
        padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
        border: `2px solid ${filter === label ? P.accent : P.border}`,
        background: filter === label ? P.accent + "22" : "transparent",
        color: filter === label ? P.accent : P.textMuted,
        cursor: "pointer", fontFamily: "inherit",
      }}>
      {label}
    </button>
  );

  return (
    <div style={{ padding: "12px 8px" }}>

      {/* Filter buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        <FilterBtn label="All" />
        {availableTiers.map(t => <FilterBtn key={t} label={`Tier ${t}`} />)}
      </div>

      {/* Summary bar */}
      <Card style={{ marginBottom: 10 }}>
        {activeForm ? (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: P.accent, marginBottom: 2 }}>{activeForm.name}</div>
            <div style={{ fontSize: 11, color: P.textMuted }}>
              {activeForm.traitBonus && `+${activeForm.traitBonus.amount} ${activeForm.traitBonus.trait}`}
              {activeForm.evasionBonus != null && ` · +${activeForm.evasionBonus} Evasion`}
              {activeForm.attack && ` · ${activeForm.attack.range} · ${activeForm.attack.trait} ${activeForm.attack.damage} (${activeForm.attack.damageType})`}
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 12, color: P.textMuted, textAlign: "center" }}>No form selected</div>
        )}
      </Card>

      {/* Form list */}
      {visibleForms.map(form => {
        const isOpen    = openForms.has(form.name);
        const isActive  = activeFormName === form.name;
        const isEvolved = form.traitBonus === null && form.attack === null;

        return (
          <div key={form.name}
            style={{
              marginBottom: 6, borderRadius: 8,
              border: `1px solid ${isActive ? P.accent : P.border}`,
              background: P.surface, overflow: "hidden",
            }}>

            {/* Collapsed header */}
            <div
              onClick={() => toggleOpen(form.name)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 12px", cursor: "pointer", userSelect: "none",
              }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? P.accent : P.text }}>{form.name}</div>
                <div style={{ fontSize: 10, color: P.textMuted }}>{form.examples}</div>
              </div>
              <div style={{ textAlign: "right", fontSize: 11, color: P.textMuted, minWidth: 60 }}>
                {form.traitBonus && <div>+{form.traitBonus.amount} {form.traitBonus.trait}</div>}
                {form.evasionBonus != null && <div>+{form.evasionBonus} Eva</div>}
                <div style={{ color: P.textMuted, fontSize: 9 }}>{isOpen ? "▲" : "▾"}</div>
              </div>
            </div>

            {/* Expanded body */}
            {isOpen && (
              <div style={{ padding: "0 12px 12px", borderTop: `1px solid ${P.border}` }}>

                {form.specialCost && (
                  <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 8, marginBottom: 6 }}>
                    {form.specialCost}
                  </div>
                )}

                {!isEvolved && (
                  <div style={{ marginTop: 8, marginBottom: 8 }}>
                    {form.traitBonus && (
                      <div style={{ fontSize: 11, color: P.text, marginBottom: 2 }}>
                        <span style={{ color: P.textMuted }}>Trait bonus: </span>+{form.traitBonus.amount} {form.traitBonus.trait}
                      </div>
                    )}
                    {form.evasionBonus != null && (
                      <div style={{ fontSize: 11, color: P.text, marginBottom: 2 }}>
                        <span style={{ color: P.textMuted }}>Evasion: </span>+{form.evasionBonus}
                      </div>
                    )}
                    {form.attack && (
                      <div style={{ fontSize: 11, color: P.text, marginBottom: 2 }}>
                        <span style={{ color: P.textMuted }}>Attack: </span>
                        {form.attack.range} · {form.attack.trait} · <span style={{ fontFamily: mono }}>{form.attack.damage}</span> {form.attack.damageType}
                      </div>
                    )}
                    {form.advantages.length > 0 && (
                      <div style={{ fontSize: 11, color: P.textMuted, marginBottom: 2 }}>
                        Advantage on: {form.advantages.join(", ")}
                      </div>
                    )}
                  </div>
                )}

                {form.features.map(feat => (
                  <div key={feat.name} style={{ marginBottom: 6, fontSize: 12, color: P.text, lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 700 }}>{feat.name}.</span>{" "}{feat.text}
                  </div>
                ))}

                <button
                  onClick={() => isActive ? clearForm() : setActiveForm(form.name)}
                  style={{
                    marginTop: 8, width: "100%", padding: "8px 0", borderRadius: 6,
                    border: `2px solid ${isActive ? P.fear : P.accent}`,
                    background: isActive ? P.fear + "22" : P.accent + "22",
                    color: isActive ? P.fear : P.accent,
                    fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  }}>
                  {isActive ? "Deselect" : "Select"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
