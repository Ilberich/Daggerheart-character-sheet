import { useState } from 'react';
import { P, mono, sBtn } from '../../data/themes.js';
import { DOMAIN_CARDS, DOMAIN_COLORS } from '../../data/domain-cards/index.js';
import { COMMUNITIES, getActiveAncestryFeatures } from '../../data/ancestries.js';
import { getTrait } from '../../utils/advancement.js';
import { TRAIT_KEYS, TRAIT_ACTIONS } from '../../data/config.js';
import { Card, Lbl, Inp, Pip } from '../ui.jsx';

function ClassResourcesPanel({ c, u, cls, sub, prof }) {
  const [trackerAdd, setTrackerAdd] = useState({});
  const [trackerDel, setTrackerDel] = useState({});

  const crs = c.classResourceState || {};
  const updateRes = (name, val) => u("classResourceState", { ...crs, [name]: val });

  const resolveMax = (maxSpec) => {
    if (typeof maxSpec === "number") return maxSpec;
    if (!maxSpec || !maxSpec.of) return 99;
    if (maxSpec.of === "proficiency") return prof;
    if (maxSpec.of === "spellcast") return Math.max(1, getTrait(c, sub?.spellcast || "Strength"));
    return 99;
  };

  const resources = cls.classResources || [];

  return (
    <Card>
      <Lbl>Class Resources</Lbl>
      <div style={{ marginTop: 4 }}>
        {resources.map(res => {
          const { name, type } = res;
          const state = crs[name];

          if (type === "bool") {
            const hasTarget = !!res.hasTarget;
            const active = hasTarget ? (state?.active ?? res.defaultValue ?? false) : (state ?? res.defaultValue ?? false);
            const col = P.accent;
            const onToggle = () => {
              if (hasTarget) updateRes(name, { active: !active, target: state?.target || "" });
              else updateRes(name, !active);
            };
            return (
              <div key={name} style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: active ? col : P.text }}>{name}</div>
                  <button onClick={onToggle} style={{ padding: "4px 12px", borderRadius: 6, border: `2px solid ${active ? col : P.border}`, background: active ? col + "22" : "transparent", color: active ? col : P.textMuted, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    {active ? "Active" : "Inactive"}
                  </button>
                </div>
                {hasTarget && active && (
                  <Inp value={state?.target || ""} onChange={v => updateRes(name, { active, target: v })} placeholder="Target name…" style={{ marginTop: 4 }} />
                )}
              </div>
            );
          }

          if (type === "pool" && res.display === "counter") {
            const effectiveMax = (res.upgradesAt && c.level >= res.upgradesAt.level) ? res.upgradesAt.max : res.max;
            const val = state ?? res.defaultValue ?? res.min ?? 0;
            return (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>{name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => updateRes(name, Math.max(res.min ?? 0, val - 1))} disabled={val <= (res.min ?? 0)} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 16, cursor: val > (res.min ?? 0) ? "pointer" : "default", fontFamily: "inherit", opacity: val <= (res.min ?? 0) ? 0.4 : 1 }}>−</button>
                  <span style={{ fontSize: 16, fontWeight: 800, fontFamily: mono, color: P.accent, minWidth: 24, textAlign: "center" }}>{val}</span>
                  <button onClick={() => updateRes(name, Math.min(effectiveMax, val + 1))} disabled={val >= effectiveMax} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 16, cursor: val < effectiveMax ? "pointer" : "default", fontFamily: "inherit", opacity: val >= effectiveMax ? 0.4 : 1 }}>+</button>
                </div>
              </div>
            );
          }

          if (type === "pool" && res.display === "dicePool") {
            const maxDice = resolveMax(res.max);
            const dice = Array.isArray(state) ? state : [];
            const effectiveSides = (res.upgradesAt && c.level >= res.upgradesAt.level) ? res.upgradesAt.sides : res.sides;
            const canAdd = dice.length < maxDice;
            return (
              <div key={name} style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>{name}</div>
                    <div style={{ fontSize: 10, color: P.textMuted }}>d{effectiveSides} · max {maxDice} · tap to spend</div>
                  </div>
                  <button onClick={() => { if (canAdd) updateRes(name, [...dice, Math.floor(Math.random() * effectiveSides) + 1]); }} disabled={!canAdd} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.hope}`, background: canAdd ? P.hope + "22" : "transparent", color: canAdd ? P.hope : P.textMuted, fontSize: 11, fontWeight: 700, cursor: canAdd ? "pointer" : "default", fontFamily: "inherit", opacity: canAdd ? 1 : 0.5 }}>+ Roll d{effectiveSides}</button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {dice.length === 0 && <span style={{ fontSize: 11, color: P.textMuted, fontStyle: "italic" }}>No dice</span>}
                  {dice.map((val, i) => (
                    <button key={i} onClick={() => updateRes(name, dice.filter((_, j) => j !== i))} style={{ width: 36, height: 36, borderRadius: 8, border: `2px solid ${P.hope}`, background: P.hope + "22", color: P.hope, fontSize: 14, fontWeight: 800, fontFamily: mono, cursor: "pointer" }} title="Tap to spend">{val}</button>
                  ))}
                </div>
              </div>
            );
          }

          if (type === "setting" && res.inputType === "number") {
            const val = state ?? res.defaultValue ?? res.min ?? 0;
            return (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>{name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => updateRes(name, Math.max(res.min ?? 0, val - 1))} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>−</button>
                  <span style={{ fontSize: 18, fontWeight: 800, fontFamily: mono, color: P.accent, minWidth: 28, textAlign: "center" }}>{val}</span>
                  <button onClick={() => updateRes(name, Math.min(res.max ?? 99, val + 1))} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${P.border}`, background: P.surface, color: P.text, cursor: "pointer", fontFamily: "inherit" }}>+</button>
                </div>
              </div>
            );
          }

          if (type === "tracker") {
            const effectiveSides = (res.upgradesAt && c.level >= res.upgradesAt.level) ? res.upgradesAt.sides : res.sides;
            const items = Array.isArray(state) ? state : [];
            const addText = trackerAdd[name];
            let delTimer = null;
            const startDelMode = (i) => { delTimer = setTimeout(() => setTrackerDel(d => ({ ...d, [name]: i })), 500); };
            const cancelDelMode = () => { clearTimeout(delTimer); };
            return (
              <div key={name} style={{ padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>{name}</div>
                    <div style={{ fontSize: 10, color: P.textMuted }}>d{effectiveSides} · hold to delete</div>
                  </div>
                  {trackerDel[name] != null
                    ? <button onClick={() => setTrackerDel(d => ({ ...d, [name]: null }))} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, cursor: "pointer", fontFamily: "inherit" }}>Done</button>
                    : null}
                </div>
                {items.length === 0 && addText === undefined && (
                  <div style={{ fontSize: 11, color: P.textMuted, fontStyle: "italic", marginBottom: 4 }}>No allies added yet</div>
                )}
                {items.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}
                    onPointerDown={() => startDelMode(i)}
                    onPointerUp={cancelDelMode}
                    onPointerLeave={cancelDelMode}>
                    <input type="checkbox" checked={item.used} onChange={() => {
                      const next = items.map((it, j) => j === i ? { ...it, used: !it.used } : it);
                      updateRes(name, next);
                    }} style={{ width: 16, height: 16, cursor: "pointer", accentColor: P.accent }} />
                    <span style={{ fontSize: 12, color: item.used ? P.textMuted : P.text, textDecoration: item.used ? "line-through" : "none", flex: 1 }}>{item.name}</span>
                    {trackerDel[name] === i && (
                      <button onClick={() => { updateRes(name, items.filter((_, j) => j !== i)); setTrackerDel(d => ({ ...d, [name]: null })); }}
                        style={{ fontSize: 11, padding: "2px 8px", borderRadius: 5, border: `1px solid ${P.fear}`, background: P.fear + "22", color: P.fear, cursor: "pointer", fontFamily: "inherit" }}>✕</button>
                    )}
                  </div>
                ))}
                {addText !== undefined ? (
                  <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                    <Inp value={addText} onChange={v => setTrackerAdd(a => ({ ...a, [name]: v }))} placeholder="Ally name…" style={{ flex: 1 }} />
                    <button onClick={() => {
                      if (addText.trim()) updateRes(name, [...items, { name: addText.trim(), used: false }]);
                      setTrackerAdd(a => { const n = { ...a }; delete n[name]; return n; });
                    }} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.accent}`, background: P.accent + "22", color: P.accent, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Add</button>
                    <button onClick={() => setTrackerAdd(a => { const n = { ...a }; delete n[name]; return n; })}
                      style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() => setTrackerAdd(a => ({ ...a, [name]: "" }))}
                    style={{ marginTop: 4, fontSize: 11, padding: "3px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, cursor: "pointer", fontFamily: "inherit" }}>+ Add ally</button>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>
    </Card>
  );
}

export function PlayTab({
  c, u, tog,
  fEv, aS, mT, sT, maxHp, maxStress, prof,
  shieldBonus, hasBareBones, hasUntouchable, eM, bbTier,
  sA, sw,
  actions,
  canAfford, spendCost, costDisplay, parseCost,
  allExps, editExp, setEditExp,
  setRestModal, setRestChoices,
  onNewSession,
  sub, subclassLevel, cls,
}) {
  const [combatOpen,   setCombatOpen]   = useState(true);
  const [resOpen,      setResOpen]      = useState(true);
  const [expOpen,      setExpOpen]      = useState(true);
  const [qaOpen,       setQaOpen]       = useState(true);
const [passivesOpen, setPassivesOpen] = useState(true);
  const [goldOpen,     setGoldOpen]     = useState(true);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const toggleExpand = (key) => setExpandedRows(s => {
    const n = new Set(s);
    n.has(key) ? n.delete(key) : n.add(key);
    return n;
  });
  const CooldownBtn = ({ label, used, onToggle, recharge }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: `1px solid ${P.border}`, marginTop: 6 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: used ? P.textMuted : P.text }}>{label}</div>
        {recharge && <div style={{ fontSize: 10, color: P.textMuted }}>{recharge}</div>}
      </div>
      <input
        type="checkbox"
        checked={used}
        onChange={(e) => { e.stopPropagation(); onToggle(); }}
        onClick={(e) => e.stopPropagation()}
        style={{ cursor: "pointer", width: 16, height: 16, accentColor: P.accent }}
      />
    </div>
  );
  return <>
          {/* __ Combat Stats collapsible __ */}
          <div>
            <div onClick={() => setCombatOpen(o => !o)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", background:P.surface, borderRadius:8, border:`1px solid ${P.border}`, cursor:"pointer", marginBottom:6, userSelect:"none" }}>
              <span style={{ fontSize:13, fontWeight:700, color:P.text }}>Combat Stats</span>
              <span style={{ display:"inline-block", transition:"transform 0.2s", transform:combatOpen ? "rotate(0deg)" : "rotate(180deg)", color:P.textMuted }}>▾</span>
            </div>
            {combatOpen && <>
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
            </>
            }
          </div>

          {/* __ Resources collapsible __ */}
          <div>
            <div onClick={() => setResOpen(o => !o)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", background:P.surface, borderRadius:8, border:`1px solid ${P.border}`, cursor:"pointer", marginBottom:6, userSelect:"none" }}>
              <span style={{ fontSize:13, fontWeight:700, color:P.text }}>Resources</span>
              <span style={{ display:"inline-block", transition:"transform 0.2s", transform:resOpen ? "rotate(0deg)" : "rotate(180deg)", color:P.textMuted }}>▾</span>
            </div>
            {resOpen && <>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <Lbl style={{ marginBottom: 0 }}>Hit Points ({c.hp.filter(Boolean).length} / {maxHp})</Lbl>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={onNewSession}
                  style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, letterSpacing: 0.3 }}>✦ Session</button>
                <button onClick={() => { setRestModal("choose"); setRestChoices([]); }}
                  style={{ fontSize: 11, padding: "4px 12px", borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.hope, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, letterSpacing: 0.3 }}>⛺ Rest</button>
              </div>
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
          {c.className && cls?.classResources?.length > 0 && (
            <ClassResourcesPanel c={c} u={u} cls={cls} sub={sub} prof={prof} />
          )}
            </>
            }
          </div>

          {/* __ Quick Actions collapsible __ */}
          <div>
            <div onClick={() => setQaOpen(o => !o)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", background:P.surface, borderRadius:8, border:`1px solid ${P.border}`, cursor:"pointer", marginBottom:6, userSelect:"none" }}>
              <span style={{ fontSize:13, fontWeight:700, color:P.text }}>Quick Actions</span>
              <span style={{ display:"inline-block", transition:"transform 0.2s", transform:qaOpen ? "rotate(0deg)" : "rotate(180deg)", color:P.textMuted }}>▾</span>
            </div>
            {qaOpen && (() => {
              // Build unified item list in spec order
              const qaItems = [];

              // 1. Weapons + spellcast (from actions prop — keep existing format, no chevron)
              actions.filter(a => a.type === "primary" || a.type === "secondary" || a.type === "spell").forEach(a => {
                qaItems.push({ _weaponRow: true, a });
              });

              // 2. Domain cards in loadout where passive: false
              c.selectedCards.forEach(key => {
                const [domain, cardName] = key.split("::");
                const card = (DOMAIN_CARDS[domain] || []).find(cd => cd.name === cardName);
                if (!card) return;
                const domColor = DOMAIN_COLORS[domain] || P.accent;
                const feats = card.abilities?.length ? card.abilities.filter(a => a.passive === false) : (card.passive === false ? [card] : []);
                feats.forEach(f => {
                  const cd = costDisplay(f);
                  qaItems.push({
                    key: `dc-${key}-${f.name}`,
                    icon: <span style={{ width:8, height:8, borderRadius:"50%", background:domColor, flexShrink:0, display:"inline-block" }} />,
                    name: f.name,
                    nameColor: domColor,
                    source: domain,
                    summary: f.summary,
                    fullText: f.text,
                    cost: f.cost,
                    costText: f.cost ? cd.text : null,
                    costColor: cd.color,
                    optionalCost: f.optionalCost || null,
                    clickCost: f.cost,
                    uses: f.uses || null,
                    usesKey: `${domain}::${f.name}`,
                  });
                });
              });

              // 3. Hope feature
              if (cls && cls.hopeFeature) {
                const hf = cls.hopeFeature;
                const hfCost = { type: "hope", amount: 3 };
                if (hf.abilities?.length) {
                  hf.abilities.filter(a => a.passive === false).forEach(f => {
                    const cost = f.cost;
                    const cd = costDisplay(f);
                    qaItems.push({
                      key: `hf-${f.name}`,
                      icon: <span style={{ color: P.hope, flexShrink:0 }}>✦</span>,
                      name: f.name,
                      nameColor: P.hope,
                      source: c.className,
                      summary: f.summary,
                      fullText: f.text,
                      cost,
                      costText: cost ? cd.text : null,
                      costColor: cd.color,
                      optionalCost: null,
                      clickCost: cost,
                      uses: f.uses || null,
                      usesKey: `${c.className}::${f.name}`,
                    });
                  });
                } else {
                  qaItems.push({
                    key: `hf-${hf.name}`,
                    icon: <span style={{ color: P.hope, flexShrink:0 }}>✦</span>,
                    name: hf.name,
                    nameColor: P.hope,
                    source: c.className,
                    summary: hf.summary,
                    fullText: hf.text,
                    cost: hfCost,
                    costText: "3 ✦Hope",
                    costColor: P.hope,
                    optionalCost: null,
                    clickCost: hfCost,
                    uses: hf.uses || null,
                    usesKey: `${c.className}::${hf.name}`,
                  });
                }
              }

              // 4. Class features where passive: false
              if (cls) {
                cls.classFeatures.forEach(feat => {
                  const feats = feat.abilities?.length ? feat.abilities.filter(a => a.passive === false) : (feat.passive === false ? [feat] : []);
                  feats.forEach(f => {
                    const cost = parseCost(f.text);
                    qaItems.push({
                      key: `cf-${f.name}`,
                      icon: <span style={{ color: P.accent, flexShrink:0 }}>✦</span>,
                      name: f.name,
                      nameColor: P.text,
                      source: c.className,
                      summary: f.summary,
                      fullText: f.text,
                      cost,
                      costText: cost ? (cost.type === "hope" ? `${cost.amount} ✦Hope` : `${cost.amount} Stress`) : null,
                      costColor: cost?.type === "hope" ? P.hope : P.stress,
                      optionalCost: null,
                      clickCost: cost,
                      uses: f.uses || null,
                      usesKey: `${c.className}::${f.name}`,
                    });
                  });
                });
              }

              // 5. Subclass features where passive: false and tier unlocked
              if (sub) {
                [
                  { obj: sub.foundation,     minSubLv: 1, tier: "Foundation" },
                  { obj: sub.specialization, minSubLv: 2, tier: "Specialization" },
                  { obj: sub.mastery,        minSubLv: 3, tier: "Mastery" },
                ].forEach(({ obj, minSubLv, tier }) => {
                  if (!obj || subclassLevel < minSubLv) return;
                  const src = `${c.subclass} · ${tier}`;
                  const feats = obj.abilities?.length ? obj.abilities.filter(a => a.passive === false) : (obj.passive === false ? [obj] : []);
                  feats.forEach(f => {
                    const cost = parseCost(f.text);
                    qaItems.push({
                      key: `sf-${tier}-${f.name}`,
                      icon: <span style={{ color: P.accent, flexShrink:0 }}>✦</span>,
                      name: f.name,
                      nameColor: P.text,
                      source: src,
                      summary: f.summary,
                      fullText: f.text,
                      cost,
                      costText: cost ? (cost.type === "hope" ? `${cost.amount} ✦Hope` : `${cost.amount} Stress`) : null,
                      costColor: cost?.type === "hope" ? P.hope : P.stress,
                      optionalCost: null,
                      clickCost: cost,
                      uses: f.uses || null,
                      usesKey: `${c.className}::${f.name}`,
                    });
                  });
                });
              }

              // 6. Ancestry features where passive: false
              getActiveAncestryFeatures(c).forEach(feat => {
                if (!feat) return;
                const ancSrc = c.isMixedAncestry ? (c.mixedAncestryLabel || "Ancestry") : c.ancestry;
                const feats = feat.abilities?.length ? feat.abilities.filter(a => a.passive === false) : (feat.passive === false ? [feat] : []);
                feats.forEach(f => {
                  const cost = parseCost(f.text);
                  qaItems.push({
                    key: `af-${f.name}`,
                    icon: <span style={{ color: P.accent, flexShrink:0 }}>✦</span>,
                    name: f.name,
                    nameColor: P.text,
                    source: ancSrc,
                    summary: f.summary,
                    fullText: f.text,
                    cost,
                    costText: cost ? (cost.type === "hope" ? `${cost.amount} ✦Hope` : `${cost.amount} Stress`) : null,
                    costColor: cost?.type === "hope" ? P.hope : P.stress,
                    optionalCost: null,
                    clickCost: cost,
                    uses: f.uses || null,
                    usesKey: `${ancSrc}::${f.name}`,
                  });
                });
              });

              // 7. Community ability where passive: false
              if (c.community && COMMUNITIES[c.community]) {
                const commObj = COMMUNITIES[c.community];
                const feats = commObj.abilities?.length ? commObj.abilities.filter(a => a.passive === false) : (commObj.passive === false ? [commObj] : []);
                feats.forEach(f => {
                  const cost = parseCost(f.text);
                  qaItems.push({
                    key: `ca-${f.name}`,
                    icon: <span style={{ color: P.accent, flexShrink:0 }}>✦</span>,
                    name: f.name,
                    nameColor: P.accent,
                    source: c.community,
                    summary: f.summary,
                    fullText: f.text,
                    cost,
                    costText: cost ? (cost.type === "hope" ? `${cost.amount} ✦Hope` : `${cost.amount} Stress`) : null,
                    costColor: cost?.type === "hope" ? P.hope : P.stress,
                    optionalCost: null,
                    clickCost: cost,
                    uses: f.uses || null,
                    usesKey: `${c.community}::${f.name}`,
                  });
                });
              }

              return (
                <Card>
                  <Lbl>Quick Actions</Lbl>
                  {qaItems.length === 0 && <div style={{ fontSize: 12, color: P.textMuted, fontStyle: "italic" }}>Select weapons and class to see actions</div>}
                  {qaItems.map((item, i) => {
                    if (item._weaponRow) {
                      const a = item.a;
                      const costColor = a.cost?.type === "hope" ? P.hope : P.stress;
                      return (
                        <div key={i}
                          onClick={() => { if (a.cost && canAfford(a.cost)) spendCost(a.cost); }}
                          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 10px", background: P.surface, borderRadius: 8, border: `1px solid ${P.border}`, marginBottom: 6, opacity: a.cost && !canAfford(a.cost) ? 0.4 : 1, cursor: a.cost ? (canAfford(a.cost) ? "pointer" : "not-allowed") : "default" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: a.type === "spell" ? P.hope : P.text }}>
                              {a.type === "primary" ? "⚔ " : a.type === "secondary" ? "🛡 " : "✦ "}{a.label}
                            </div>
                            {a.sub && <div style={{ fontSize: 10, color: P.textMuted, marginTop: 2, whiteSpace: "pre-line", lineHeight: 1.45 }}>{a.sub}</div>}
                          </div>
                          {a.detail && (
                            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: mono, color: a.cost ? costColor : P.textMuted, whiteSpace: "nowrap", marginLeft: 8, flexShrink: 0 }}>{a.detail}</span>
                          )}
                        </div>
                      );
                    }
                    // Feature row
                    const { key, icon, name, nameColor, source, summary, fullText, cost, costText, costColor, optionalCost, clickCost } = item;
                    const affordable = canAfford(clickCost);
                    const expanded = expandedRows.has(key);
                    return (
                      <div key={key} style={{ marginBottom: 6 }}>
                        <div
                          onClick={() => { if (clickCost && affordable) spendCost(clickCost); }}
                          style={{ padding: "8px 10px", background: P.surface, borderRadius: expanded ? "8px 8px 0 0" : 8, border: `1px solid ${P.border}`, borderBottom: expanded ? "none" : `1px solid ${P.border}`, opacity: clickCost && !affordable ? 0.4 : 1, cursor: clickCost ? (affordable ? "pointer" : "not-allowed") : "default" }}>
                          {/* Header row: icon · name · source · cost badge · chevron */}
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {icon}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: nameColor }}>{name}</span>
                              <span style={{ fontSize: 9, color: P.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginLeft: 8 }}>{source}</span>
                            </div>
                            {costText && (
                              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: mono, color: costColor, whiteSpace: "nowrap", flexShrink: 0 }}>{costText}</span>
                            )}
                            {fullText && (
                              <span
                                onClick={(e) => { e.stopPropagation(); toggleExpand(key); }}
                                style={{ fontSize: 14, color: P.textMuted, flexShrink: 0, cursor: "pointer", display: "inline-block", transition: "transform 0.2s", transform: expanded ? "rotate(0deg)" : "rotate(180deg)" }}>
                                ▾
                              </span>
                            )}
                          </div>
                          {/* Summary below, full width */}
                          {summary && <div style={{ fontSize: 11, color: P.textMuted, lineHeight: 1.4, marginTop: 4, paddingLeft: 16 }}>{summary}</div>}
                          {item.uses && (
                            <CooldownBtn
                              label={name}
                              used={!!c.featureUses?.[item.usesKey]}
                              onToggle={() => u("featureUses", { ...c.featureUses, [item.usesKey]: !c.featureUses?.[item.usesKey] })}
                              recharge={item.uses.recharge === "longRest" ? "Long rest" : item.uses.recharge === "rest" ? "Rest" : "Session"}
                            />
                          )}
                        </div>
                        {fullText && expanded && (
                          <div style={{ fontSize: 11, color: P.textMuted, lineHeight: 1.65, whiteSpace: "pre-line", padding: "8px 12px", background: P.surface + "88", borderRadius: "0 0 8px 8px", border: `1px solid ${P.border}`, borderTop: "none" }}>
                            {fullText}
                            {optionalCost && (
                              <div
                                onClick={(e) => { e.stopPropagation(); if (canAfford(optionalCost)) spendCost(optionalCost); }}
                                style={{ fontSize: 10, fontWeight: 700, fontFamily: mono, color: optionalCost.type === "hope" ? P.hope : P.stress, marginTop: 8, padding: "4px 10px", border: `1px dashed ${optionalCost.type === "hope" ? P.hope + "66" : P.stress + "66"}`, borderRadius: 6, display: "inline-block", cursor: canAfford(optionalCost) ? "pointer" : "not-allowed", opacity: canAfford(optionalCost) ? 1 : 0.45 }}>
                                ⚡ {optionalCost.amount} {optionalCost.type === "hope" ? "Hope" : "Stress"} → {optionalCost.label}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Card>
              );
            })()}
          </div>

          {/* __ Passives collapsible __ */}
          <div>
            <div onClick={() => setPassivesOpen(o => !o)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", background:P.surface, borderRadius:8, border:`1px solid ${P.border}`, cursor:"pointer", marginBottom:6, userSelect:"none" }}>
              <span style={{ fontSize:13, fontWeight:700, color:P.text }}>Passives</span>
              <span style={{ display:"inline-block", transition:"transform 0.2s", transform:passivesOpen ? "rotate(0deg)" : "rotate(180deg)", color:P.textMuted }}>▾</span>
            </div>
            {passivesOpen && <>
          {/* Passives — passive: true features from all sources */}
          {(() => {
            const passives = [];

            // Ancestry features where passive: true
            getActiveAncestryFeatures(c).forEach(feat => {
              if (!feat) return;
              const ancSrc = c.isMixedAncestry ? (c.mixedAncestryLabel || "Ancestry") : c.ancestry;
              const feats = feat.abilities?.length ? feat.abilities.filter(a => a.passive !== false) : (feat.passive !== false ? [feat] : []);
              feats.forEach(f => { passives.push({ source: ancSrc, name: f.name, desc: f.text, uses: f.uses || null, usesKey: `${ancSrc}::${f.name}` }); });
            });

            // Community feature where passive: true
            if (c.community && COMMUNITIES[c.community]) {
              const ct = COMMUNITIES[c.community];
              const feats = ct.abilities?.length ? ct.abilities.filter(a => a.passive !== false) : (ct.passive !== false ? [ct] : []);
              feats.forEach(f => { passives.push({ source: c.community, name: f.name, desc: f.text, uses: f.uses || null, usesKey: `${c.community}::${f.name}` }); });
            }

            // Subclass features where passive: true and tier unlocked
            if (sub) {
              [
                { obj: sub.foundation,     minSubLv: 1, tier: "Foundation" },
                { obj: sub.specialization, minSubLv: 2, tier: "Specialization" },
                { obj: sub.mastery,        minSubLv: 3, tier: "Mastery" },
              ].forEach(({ obj, minSubLv, tier }) => {
                if (!obj || subclassLevel < minSubLv) return;
                const src = `${c.subclass} · ${tier}`;
                const feats = obj.abilities?.length ? obj.abilities.filter(a => a.passive !== false) : (obj.passive !== false ? [obj] : []);
                feats.forEach(f => { passives.push({ source: src, name: f.name || tier, desc: f.text || "", uses: f.uses || null, usesKey: `${c.className}::${f.name || tier}` }); });
              });
            }

            // Class features where passive: true
            if (cls) {
              cls.classFeatures.forEach(feat => {
                const feats = feat.abilities?.length ? feat.abilities.filter(a => a.passive !== false) : (feat.passive !== false ? [feat] : []);
                feats.forEach(f => { passives.push({ source: c.className, name: f.name, desc: f.text, uses: f.uses || null, usesKey: `${c.className}::${f.name}` }); });
              });
            }

            // Passive domain cards from loadout
            c.selectedCards.forEach(key => {
              const [domain, cardName] = key.split("::");
              const card = (DOMAIN_CARDS[domain] || []).find(cd => cd.name === cardName);
              if (!card) return;
              const feats = card.abilities?.length ? card.abilities.filter(a => a.passive !== false) : (card.passive !== false ? [card] : []);
              feats.forEach(f => { passives.push({ source: domain, name: f.name, desc: f.text, uses: f.uses || null, usesKey: `${domain}::${f.name}` }); });
            });

            if (passives.length === 0) return null;
            return (
              <Card>
                <Lbl>Passives</Lbl>
                {passives.map((p, i) => (
                  <div key={i} style={{ marginBottom: 8, padding: "8px 10px", background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: P.text }}>{p.name}</span>
                      <span style={{ fontSize: 9, fontWeight: 600, color: P.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginLeft: 8, flexShrink: 0 }}>{p.source}</span>
                    </div>
                    <div style={{ fontSize: 11, color: P.textMuted, lineHeight: 1.55, whiteSpace: "pre-line" }}>{p.desc}</div>
                    {p.uses && (
                      <CooldownBtn
                        label={p.name}
                        used={!!c.featureUses?.[p.usesKey]}
                        onToggle={() => u("featureUses", { ...c.featureUses, [p.usesKey]: !c.featureUses?.[p.usesKey] })}
                        recharge={p.uses.recharge === "longRest" ? "Long rest" : p.uses.recharge === "rest" ? "Rest" : "Session"}
                      />
                    )}
                  </div>
                ))}
              </Card>
            );
          })()}
            </>
            }
          </div>

          {/* __ Experiences collapsible __ */}
          <div>
            <div onClick={() => setExpOpen(o => !o)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", background:P.surface, borderRadius:8, border:`1px solid ${P.border}`, cursor:"pointer", marginBottom:6, userSelect:"none" }}>
              <span style={{ fontSize:13, fontWeight:700, color:P.text }}>Experiences</span>
              <span style={{ display:"inline-block", transition:"transform 0.2s", transform:expOpen ? "rotate(0deg)" : "rotate(180deg)", color:P.textMuted }}>▾</span>
            </div>
            {expOpen && <>
          {/* Experiences */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <Lbl style={{ marginBottom: 0 }}>Experiences</Lbl>
              <button onClick={() => setEditExp(!editExp)} className={!editExp && allExps.some(e => !c[e.key]) ? "btn-pulse" : ""} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: editExp ? P.accent : P.surface, color: editExp ? "#fff" : P.accent, cursor: "pointer", fontFamily: "inherit" }}>{editExp ? "Done" : "Edit"}</button>
            </div>
            <div style={{ fontSize: 10, color: P.textMuted, marginBottom: 8 }}>Spend a Hope to add modifier to a roll</div>
            {editExp ? (
              <>
                {allExps.map(({ key: ek, valKey: vk }, i) => (
                  <div key={ek} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
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
                {allExps.map(({ key: ek, valKey: vk }, i) => (
                  c[ek] ? <div key={ek} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: P.surface, borderRadius: 6, border: `1px solid ${P.border}` }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c[ek]}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: P.accent, fontFamily: mono }}>+{c[vk]}</span>
                  </div> : <div key={ek} style={{ fontSize: 12, color: P.textMuted, fontStyle: "italic", padding: "6px 10px" }}>Tap Edit to set Experience {i + 1}</div>
                ))}
              </div>
            )}
          </Card>
            </>
            }
          </div>

          {/* __ Gold collapsible __ */}
          <div>
            <div onClick={() => setGoldOpen(o => !o)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", background:P.surface, borderRadius:8, border:`1px solid ${P.border}`, cursor:"pointer", marginBottom:6, userSelect:"none" }}>
              <span style={{ fontSize:13, fontWeight:700, color:P.text }}>Gold</span>
              <span style={{ display:"inline-block", transition:"transform 0.2s", transform:goldOpen ? "rotate(0deg)" : "rotate(180deg)", color:P.textMuted }}>▾</span>
            </div>
            {goldOpen && <>
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
            </>
            }
          </div>
  </>
}
