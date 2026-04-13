import { useState } from 'react';
import { P, mono, sBtn } from '../../data/themes.js';
import { DOMAIN_CARDS, DOMAIN_COLORS } from '../../data/domain-cards/index.js';
import { COMMUNITIES, getActiveAncestryFeatures } from '../../data/ancestries.js';
import { getTrait } from '../../utils/advancement.js';
import { TRAIT_KEYS, TRAIT_ACTIONS } from '../../data/config.js';
import { Card, Lbl, Inp, Pip } from '../ui.jsx';

export function PlayTab({
  c, u, tog,
  fEv, aS, mT, sT, maxHp, maxStress, prof,
  shieldBonus, hasBareBones, hasUntouchable, eM, bbTier,
  sA, sw,
  actions,
  canAfford, spendCost, costDisplay, parseCost,
  allExps, editExp, setEditExp,
  setRestModal, setRestChoices,
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
              const traitVal = Math.max(1, getTrait(c, spellcastTrait));
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
                if (!card || card.passive !== false) return;
                const domColor = DOMAIN_COLORS[domain] || P.accent;
                const cd = costDisplay(card);
                qaItems.push({
                  key: `dc-${key}`,
                  icon: <span style={{ width:8, height:8, borderRadius:"50%", background:domColor, flexShrink:0, display:"inline-block" }} />,
                  name: card.name,
                  nameColor: domColor,
                  source: domain,
                  summary: card.summary,
                  fullText: card.text,
                  cost: card.cost,
                  costText: card.cost ? cd.text : null,
                  costColor: cd.color,
                  optionalCost: card.optionalCost || null,
                  clickCost: card.cost,
                });
              });

              // 3. Hope feature
              if (cls && cls.hopeFeature) {
                const hf = cls.hopeFeature;
                const hfCost = { type: "hope", amount: 3 };
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
                });
              }

              // 4. Class features where passive: false
              if (cls) {
                cls.classFeatures.filter(f => f.passive === false).forEach(feat => {
                  const cost = parseCost(feat.text);
                  qaItems.push({
                    key: `cf-${feat.name}`,
                    icon: <span style={{ color: P.accent, flexShrink:0 }}>✦</span>,
                    name: feat.name,
                    nameColor: P.text,
                    source: c.className,
                    summary: feat.summary,
                    fullText: feat.text,
                    cost,
                    costText: cost ? (cost.type === "hope" ? `${cost.amount} ✦Hope` : `${cost.amount} Stress`) : null,
                    costColor: cost?.type === "hope" ? P.hope : P.stress,
                    optionalCost: null,
                    clickCost: cost,
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
                  if (!obj || subclassLevel < minSubLv || obj.passive !== false) return;
                  const cost = parseCost(obj.text);
                  qaItems.push({
                    key: `sf-${tier}-${obj.name}`,
                    icon: <span style={{ color: P.accent, flexShrink:0 }}>✦</span>,
                    name: obj.name || tier,
                    nameColor: P.text,
                    source: `${c.subclass} · ${tier}`,
                    summary: obj.summary,
                    fullText: obj.text,
                    cost,
                    costText: cost ? (cost.type === "hope" ? `${cost.amount} ✦Hope` : `${cost.amount} Stress`) : null,
                    costColor: cost?.type === "hope" ? P.hope : P.stress,
                    optionalCost: null,
                    clickCost: cost,
                  });
                });
              }

              // 6. Ancestry features where passive: false
              getActiveAncestryFeatures(c).forEach(feat => {
                if (!feat || feat.passive !== false) return;
                const cost = parseCost(feat.text);
                qaItems.push({
                  key: `af-${feat.name}`,
                  icon: <span style={{ color: P.accent, flexShrink:0 }}>✦</span>,
                  name: feat.name,
                  nameColor: P.text,
                  source: c.isMixedAncestry ? (c.mixedAncestryLabel || "Ancestry") : c.ancestry,
                  summary: feat.summary,
                  fullText: feat.text,
                  cost,
                  costText: cost ? (cost.type === "hope" ? `${cost.amount} ✦Hope` : `${cost.amount} Stress`) : null,
                  costColor: cost?.type === "hope" ? P.hope : P.stress,
                  optionalCost: null,
                  clickCost: cost,
                });
              });

              // 7. Community ability where passive: false
              if (c.community && COMMUNITIES[c.community]) {
                const commObj = COMMUNITIES[c.community];
                if (commObj.passive === false) {
                  const cost = parseCost(commObj.text);
                  qaItems.push({
                    key: `ca-${commObj.name}`,
                    icon: <span style={{ color: P.accent, flexShrink:0 }}>✦</span>,
                    name: commObj.name,
                    nameColor: P.accent,
                    source: c.community,
                    summary: commObj.summary,
                    fullText: commObj.text,
                    cost,
                    costText: cost ? (cost.type === "hope" ? `${cost.amount} ✦Hope` : `${cost.amount} Stress`) : null,
                    costColor: cost?.type === "hope" ? P.hope : P.stress,
                    optionalCost: null,
                    clickCost: cost,
                  });
                }
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
              if (!feat || feat.passive === false) return;
              passives.push({ source: c.isMixedAncestry ? (c.mixedAncestryLabel || "Ancestry") : c.ancestry, name: feat.name, desc: feat.text });
            });

            // Community feature where passive: true
            if (c.community && COMMUNITIES[c.community]) {
              const ct = COMMUNITIES[c.community];
              if (ct.passive !== false) {
                passives.push({ source: c.community, name: ct.name, desc: ct.text });
              }
            }

            // Subclass features where passive: true and tier unlocked
            if (sub) {
              [
                { obj: sub.foundation,     minSubLv: 1, tier: "Foundation" },
                { obj: sub.specialization, minSubLv: 2, tier: "Specialization" },
                { obj: sub.mastery,        minSubLv: 3, tier: "Mastery" },
              ].forEach(({ obj, minSubLv, tier }) => {
                if (!obj || subclassLevel < minSubLv || obj.passive === false) return;
                passives.push({
                  source: `${c.subclass} · ${tier}`,
                  name: obj.name || tier,
                  desc: obj.text || ""
                });
              });
            }

            // Class features where passive: true
            if (cls) {
              cls.classFeatures.filter(f => f.passive !== false).forEach(feat => {
                passives.push({ source: c.className, name: feat.name, desc: feat.text });
              });
            }

            // Passive domain cards from loadout
            c.selectedCards.forEach(key => {
              const [domain, cardName] = key.split("::");
              const card = (DOMAIN_CARDS[domain] || []).find(cd => cd.name === cardName);
              if (!card || card.passive === false) return;
              passives.push({ source: domain, name: card.name, desc: card.text });
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
