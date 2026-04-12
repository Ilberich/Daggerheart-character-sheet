import { P, mono, sBtn } from '../../data/themes.js';
import { CLASSES } from '../../data/classes.js';
import { ANCESTRIES, COMMUNITIES, COMMUNITY_HAS_NOTES, getActiveAncestryFeatures, getMixedAncestryLabel } from '../../data/ancestries.js';
import { DOMAIN_CARDS, DOMAIN_COLORS } from '../../data/domain-cards/index.js';
import { WEAPONS_PRIMARY, WEAPONS_SECONDARY, ARMOR } from '../../data/equipment.js';
import { getTrait } from '../../utils/advancement.js';
import { Card, Lbl, Inp, Sel, Feat, RichBody, PickerAccordion } from '../ui.jsx';

export function CharacterTab({
  c, u,
  cls, sub, pw, sw, sA,
  mT, sT, prof, maxLoadout,
  classIncomplete, heritageIncomplete, gearIncomplete, domainsIncomplete,
  fmtMod, costDisplay,
  editingClass, setEditingClass,
  editingSubclass, setEditingSubclass,
  editingAncestry, setEditingAncestry,
  editingAncestrySecondary, setEditingAncestrySecondary,
  editingMixed, setEditingMixed,
  editingCommunity, setEditingCommunity,
  classOpen, setClassOpen,
  heritageOpen, setHeritageOpen,
  domainsOpen, setDomainsOpen,
  gearOpen, setGearOpen,
  unchosenCardsOpen, setUnchosenCardsOpen,
}) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* ── CLASS SECTION ── */}
          <div>
            <div onClick={() => setClassOpen(v => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: P.card, borderRadius: classOpen ? "12px 12px 0 0" : 12, border: `1px solid ${classIncomplete && !classOpen ? P.accent + "88" : P.border}`, cursor: "pointer", userSelect: "none", boxShadow: classIncomplete && !classOpen ? `0 0 10px ${P.accent}22` : "none", transition: "border-color .15s, box-shadow .15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {classIncomplete && <div style={{ width: 7, height: 7, borderRadius: "50%", background: P.accent, boxShadow: `0 0 6px ${P.accent}` }} />}
                <span style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, color: classIncomplete ? P.accent : P.text }}>Class</span>
              </div>
              <span style={{ fontSize: 14, color: P.textMuted, transform: classOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
            </div>
            {classOpen && <div style={{ border: `1px solid ${P.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
          {(() => {
            const classItems = Object.keys(CLASSES).map(n => {
              const cl = CLASSES[n];
              const featureLines = cl.classFeatures.map(f => `**${f.name}**:${f.text}`).join("\n\n");
              const hopeFormatted = `**${cl.hopeFeature.name}**:${cl.hopeFeature.text}`;
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
                  {c.className && !c.cardsConfirmed && <button onClick={() => setEditingClass(e => !e)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: editingClass ? P.accent + "22" : P.surface, color: editingClass ? P.accent : P.textMuted, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{editingClass ? "Done" : "Change"}</button>}
                  {c.className && c.cardsConfirmed && <span style={{ fontSize: 10, color: P.textMuted, fontStyle: "italic" }}>Locked — unconfirm loadout to change</span>}
                </div>
                {(!c.className || editingClass) && !c.cardsConfirmed && (
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
                    body: `${sc.desc}${sc.spellcast ? `\n**Spellcast Trait**: ${sc.spellcast}` : ""}\n\n## Foundation\n${fmt(sc.foundation?.text || "")}\n\n## Specialization\n${fmt(sc.specialization?.text || "")}\n\n## Mastery\n${fmt(sc.mastery?.text || "")}`,
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
                <Card><Lbl>Hope Feature (3 Hope)</Lbl><div style={{ fontSize: 12, lineHeight: 1.6, color: P.textMuted }}>{cls.hopeFeature.text}</div></Card>
                <Card><Lbl>Class Features</Lbl>{cls.classFeatures.map((f, i) => <Feat key={i} title={f.name} text={f.text} />)}</Card>
                {sub && <Card><Lbl>Subclass — {c.subclass}</Lbl><Feat title="Foundation" text={sub.foundation?.text} /><Feat title="Specialization" text={sub.specialization?.text} /><Feat title="Mastery" text={sub.mastery?.text} /></Card>}

                <Card><Lbl>Starting Items</Lbl><div style={{ fontSize: 12, color: P.textMuted }}>{cls.items}</div></Card>
          </>}
            </div>}
          </div>

          {/* ── HERITAGE SECTION ── */}
          <div>
            <div onClick={() => setHeritageOpen(v => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: P.card, borderRadius: heritageOpen ? "12px 12px 0 0" : 12, border: `1px solid ${heritageIncomplete && !heritageOpen ? P.accent + "88" : P.border}`, cursor: "pointer", userSelect: "none", boxShadow: heritageIncomplete && !heritageOpen ? `0 0 10px ${P.accent}22` : "none", transition: "border-color .15s, box-shadow .15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {heritageIncomplete && <div style={{ width: 7, height: 7, borderRadius: "50%", background: P.accent, boxShadow: `0 0 6px ${P.accent}` }} />}
                <span style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, color: heritageIncomplete ? P.accent : P.text }}>Heritage</span>
              </div>
              <span style={{ fontSize: 14, color: P.textMuted, transform: heritageOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
            </div>
            {heritageOpen && <div style={{ border: `1px solid ${P.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Ancestry */}
          <Card className={!c.ancestry ? "card-pulse" : ""}>
            {(() => {
              const ancestryItems = (excludeKey) => Object.keys(ANCESTRIES)
                .filter(a => a !== excludeKey)
                .map(a => {
                  return {
                    key: a,
                    label: a,
                    meta: ANCESTRIES[a].map(f => f.name).join(" · "),
                    body: `## Ancestry Features\n\n` + ANCESTRIES[a].map(f => `**${f.name}**:${f.text}`).join("\n\n"),
                  };
                });

              const activeFeatures = getActiveAncestryFeatures(c);
              const displayLabel = getMixedAncestryLabel(c);

              // Feature pick options for mixed ancestry
              const primary = c.ancestry ? ANCESTRIES[c.ancestry] : null;
              const secondary = c.ancestrySecondary ? ANCESTRIES[c.ancestrySecondary] : null;
              const optionA = primary && secondary
                ? { feat1: primary[0]?.name, feat2: secondary[1]?.name, from1: c.ancestry, from2: c.ancestrySecondary }
                : null;
              const optionB = primary && secondary
                ? { feat1: primary[1]?.name, feat2: secondary[0]?.name, from1: c.ancestry, from2: c.ancestrySecondary }
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
                          <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{ANCESTRIES[c.ancestry].map(f => f.name).join(" · ")}</div>
                        </div>
                        {ANCESTRIES[c.ancestry].map((f, i) => <Feat key={i} title={f.name} text={f.text} />)}
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
                    {activeFeatures.map((f, i) => f && <Feat key={i} title={f.name} text={f.text} />)}
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
                          <div style={{ fontSize: 10, color: P.textMuted, marginTop: 1 }}>{(ANCESTRIES[c.ancestry] || []).map((f,i) => `${i===0?"①":"②"} ${f.name}`).join("  ")}</div>
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
                          <div style={{ fontSize: 10, color: P.textMuted, marginTop: 1 }}>{(ANCESTRIES[c.ancestrySecondary] || []).map((f,i) => `${i===0?"①":"②"} ${f.name}`).join("  ")}</div>
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
                const obj = COMMUNITIES[k];
                return {
                  key: k,
                  label: k,
                  meta: obj.name,
                  body: `## Community Feature\n\n**${obj.name}**:${obj.text}`,
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
                        <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{COMMUNITIES[c.community].name}</div>
                      </div>
                      <div style={{ marginBottom: 10, padding: 10, background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}>
                        <div style={{ fontSize: 12, lineHeight: 1.6, color: P.textMuted }}>{COMMUNITIES[c.community].text}</div>
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
            </div>}
          </div>

          {/* ── GEAR SECTION ── */}
          <div>
            <div onClick={() => setGearOpen(v => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: P.card, borderRadius: gearOpen ? "12px 12px 0 0" : 12, border: `1px solid ${gearIncomplete && !gearOpen ? P.accent + "88" : P.border}`, cursor: "pointer", userSelect: "none", boxShadow: gearIncomplete && !gearOpen ? `0 0 10px ${P.accent}22` : "none", transition: "border-color .15s, box-shadow .15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {gearIncomplete && <div style={{ width: 7, height: 7, borderRadius: "50%", background: P.accent, boxShadow: `0 0 6px ${P.accent}` }} />}
                <span style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, color: gearIncomplete ? P.accent : P.text }}>Gear</span>
              </div>
              <span style={{ fontSize: 14, color: P.textMuted, transform: gearOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
            </div>
            {gearOpen && <div style={{ border: `1px solid ${P.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
          <Card><Lbl>Primary Weapon</Lbl><Sel className={!c.primaryWeapon ? "btn-pulse" : ""} value={c.primaryWeapon} onChange={v => u("primaryWeapon", v)}><option value="">— Select —</option><optgroup label="Physical">{WEAPONS_PRIMARY.filter(w => w.type === "phy").map(w => <option key={w.name} value={w.name}>{w.name} — {w.trait} {w.range} {w.damage} ({w.burden})</option>)}</optgroup><optgroup label="Magic (Spellcast)">{WEAPONS_PRIMARY.filter(w => w.type === "mag").map(w => <option key={w.name} value={w.name}>{w.name} — {w.trait} {w.range} {w.damage} ({w.burden})</option>)}</optgroup></Sel>
            {pw && <div style={{ marginTop: 8, padding: 10, background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}><div style={{ fontSize: 14, fontWeight: 700 }}>{pw.name}</div><div style={{ fontSize: 12, color: P.textMuted, marginTop: 3 }}>{pw.trait} ({fmtMod(getTrait(c, pw.trait))}) | {pw.range} | {prof}{pw.damage} {pw.type} | {pw.burden}</div>{pw.feature && <div style={{ fontSize: 11, color: P.accent, marginTop: 3 }}>{pw.feature}</div>}</div>}
          </Card>
          <Card><Lbl>Secondary Weapon</Lbl><Sel value={c.secondaryWeapon} onChange={v => u("secondaryWeapon", v)}><option value="">— None —</option>{WEAPONS_SECONDARY.map(w => <option key={w.name} value={w.name}>{w.name} — {w.trait} {w.range} {w.damage}</option>)}</Sel>
            {sw && <div style={{ marginTop: 8, padding: 10, background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}><div style={{ fontSize: 14, fontWeight: 700 }}>{sw.name}</div><div style={{ fontSize: 12, color: P.textMuted, marginTop: 3 }}>{sw.trait} ({fmtMod(getTrait(c, sw.trait))}) | {sw.range} | {prof}{sw.damage} {sw.type} | {sw.burden}</div>{sw.feature && <div style={{ fontSize: 11, color: P.accent, marginTop: 3 }}>{sw.feature}</div>}</div>}
          </Card>
          <Card><Lbl>Armor</Lbl><Sel value={c.armor} onChange={v => u("armor", v)}><option value="">— Select —</option>{ARMOR.map(a => <option key={a.name} value={a.name}>{a.name} — {a.thresholds} | Score {a.score}</option>)}</Sel>
            {sA && <div style={{ marginTop: 8, padding: 10, background: P.surface, borderRadius: 8, border: `1px solid ${P.border}` }}><div style={{ fontSize: 14, fontWeight: 700 }}>{sA.name}</div><div style={{ fontSize: 12, color: P.textMuted, marginTop: 3 }}>Base: {sA.thresholds} → Lv{c.level}: {mT}/{sT} | Score: {sA.score}</div>{sA.feature && <div style={{ fontSize: 11, color: P.accent, marginTop: 3 }}>{sA.feature}</div>}</div>}
          </Card>
          <Card><Lbl>Inventory</Lbl><div style={{ fontSize: 10, color: P.textMuted, marginBottom: 6 }}>Starts with: torch, 50ft rope, basic supplies, handful of gold, Minor Health or Stamina Potion</div><textarea value={c.inventory} onChange={e => u("inventory", e.target.value)} placeholder="Items..." rows={5} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", resize: "vertical" }} /></Card>
            </div>}
          </div>

          {/* ── DOMAINS SECTION ── */}
          <div>
            <div onClick={() => setDomainsOpen(v => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: P.card, borderRadius: domainsOpen ? "12px 12px 0 0" : 12, border: `1px solid ${domainsIncomplete && !domainsOpen ? P.accent + "88" : P.border}`, cursor: "pointer", userSelect: "none", boxShadow: domainsIncomplete && !domainsOpen ? `0 0 10px ${P.accent}22` : "none", transition: "border-color .15s, box-shadow .15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {domainsIncomplete && <div style={{ width: 7, height: 7, borderRadius: "50%", background: P.accent, boxShadow: `0 0 6px ${P.accent}` }} />}
                <span style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, color: domainsIncomplete ? P.accent : P.text }}>Domain Cards</span>
              </div>
              <span style={{ fontSize: 14, color: P.textMuted, transform: domainsOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
            </div>
            {domainsOpen && <div style={{ border: `1px solid ${P.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
              {(() => {
                if (!c.className) return (
                  <Card><div style={{ fontSize: 13, color: P.textMuted, fontStyle: "italic", textAlign: "center", padding: 16 }}>Choose a class in the Class section above to see your domain cards.</div></Card>
                );
          const domains = CLASSES[c.className]?.domains || [];
          const typeColor = { Ability: P.accent, Spell: "#a855f7", Grimoire: "#3b82f6" };
          const selCount = c.selectedCards.length;

          // earnedCards/maxLoadout derived from outer scope (updated by levelUps)
          const isConfirmed = !!c.cardsConfirmed;
          const isFull = selCount >= maxLoadout;
          const isEditing = !isConfirmed;
          const canAdd = !isFull && isEditing;
          const canRemove = isEditing;

          const toggleCard = (domain, name) => {
            const key = `${domain}::${name}`;
            const already = c.selectedCards.includes(key);
            if (already && canRemove) u("selectedCards", c.selectedCards.filter(k => k !== key));
            else if (!already && canAdd) u("selectedCards", [...c.selectedCards, key]);
          };

          // Helper: renders a single domain card element
          // isReadOnly = true when confirmed and the card should not be interactive
          // dimmed = true for unchosen cards shown in the collapsed section
          const renderCard = (domain, card, { isReadOnly = false, dimmed = false } = {}) => {
            const key = `${domain}::${card.name}`;
            const isSelected = c.selectedCards.includes(key);
            const domColor = DOMAIN_COLORS[domain] || P.accent;
            return (
              <div key={card.name}
                onClick={() => {
                  if (isReadOnly) return;
                  if (isSelected && canRemove) toggleCard(domain, card.name);
                  else if (!isSelected && canAdd) toggleCard(domain, card.name);
                }}
                style={{ marginBottom: 10, borderRadius: 12, padding: 14,
                  border: `2px solid ${isSelected ? domColor : P.border}`,
                  background: isSelected ? domColor + "18" : P.card,
                  opacity: dimmed ? 0.4 : (!isSelected && isFull && !isReadOnly ? 0.5 : 1),
                  cursor: isReadOnly ? "default" : (!isSelected && isFull ? "default" : "pointer"),
                  boxShadow: isSelected && !dimmed ? `0 0 16px ${domColor}33` : "none",
                  transition: "all .2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: typeColor[card.type] || P.textMuted }}>{card.type}</div>
                      {isSelected && !dimmed && <div style={{ fontSize: 9, fontWeight: 800, color: domColor, background: domColor + "22", borderRadius: 4, padding: "1px 6px", letterSpacing: 0.5 }}>IN LOADOUT</div>}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: isSelected && !dimmed ? domColor : P.text }}>{card.name}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                    <div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700, marginBottom: 2 }}>RECALL</div>
                    <div style={{ fontSize: 13, fontWeight: 800, fontFamily: mono, color: card.recallCost === 0 ? P.textMuted : P.stress }}>{card.recallCost === 0 ? "Free" : `⚡${card.recallCost} Stress`}</div>
                    {(() => { const cd = costDisplay(card); return <div style={{ fontSize: 10, fontWeight: 700, fontFamily: mono, color: cd.color, marginTop: 2 }}>USE: {cd.text}</div>; })()}
                  </div>
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.7, color: P.textMuted, whiteSpace: "pre-line", borderTop: `1px solid ${isSelected && !dimmed ? domColor + "44" : P.border}`, paddingTop: 8, marginTop: 4 }}>{card.text}</div>
                {card.optionalCost && <div style={{ fontSize: 10, fontWeight: 700, fontFamily: mono, color: card.optionalCost.type === "hope" ? P.hope : P.stress, marginTop: 4, padding: "3px 8px", border: `1px dashed ${card.optionalCost.type === "hope" ? P.hope + "66" : P.stress + "66"}`, borderRadius: 6, display: "inline-block" }}>⚡ {card.optionalCost.amount} {card.optionalCost.type === "hope" ? "Hope" : "Stress"} → {card.optionalCost.label}</div>}
              </div>
            );
          };

          return <>
            {/* Status bar */}
            <Card style={{ background: isFull ? "#1a2a1a" : P.card, borderColor: isFull ? P.hp + "88" : P.border }}>
              <div style={{ fontSize: 12, color: P.textMuted, marginBottom: 4 }}>
                {!isFull && selCount === 0 && <span style={{ color: P.hope }}>Choose {maxLoadout} domain cards for your starting loadout.</span>}
                {!isFull && selCount > 0 && <span>Selected {selCount} of {maxLoadout} — <span style={{ color: P.hope }}>choose {maxLoadout - selCount} more</span></span>}
                {isFull && !isConfirmed && <span style={{ color: P.hope }}>✓ Ready! Deselect to swap, or confirm your loadout.</span>}
                {isFull && isConfirmed && <span style={{ color: P.hp }}>✓ Loadout confirmed</span>}
              </div>
              {!isFull && <div style={{ fontSize: 11, color: P.textMuted, fontStyle: "italic" }}>Tap a card to add it to your loadout.</div>}
              {isFull && !isConfirmed && (
                <button onClick={() => u("cardsConfirmed", true)}
                  style={{ marginTop: 6, width: "100%", padding: "8px", borderRadius: 8, border: "none", background: P.accent, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                  Confirm ✓
                </button>
              )}
            </Card>

            {/* ── EDITING MODE: show all domain cards interactively ── */}
            {isEditing && domains.map(domain => (
              <div key={domain}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, marginTop: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: DOMAIN_COLORS[domain] || P.accent }} />
                  <Lbl style={{ marginBottom: 0, color: DOMAIN_COLORS[domain] || P.accent }}>{domain} Domain</Lbl>
                </div>
                {(DOMAIN_CARDS[domain] || []).filter(card => !card.level || card.level <= c.level).map(card => renderCard(domain, card))}
              </div>
            ))}

            {/* ── CONFIRMED MODE: selected cards bright, unchosen cards in collapsible ── */}
            {isConfirmed && <>
              {/* Selected (loadout) cards grouped by domain — bright and non-interactive */}
              {domains.map(domain => {
                const domainSelectedCards = (DOMAIN_CARDS[domain] || []).filter(card =>
                  c.selectedCards.includes(`${domain}::${card.name}`)
                );
                if (domainSelectedCards.length === 0) return null;
                return (
                  <div key={domain}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, marginTop: 4 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: DOMAIN_COLORS[domain] || P.accent }} />
                      <Lbl style={{ marginBottom: 0, color: DOMAIN_COLORS[domain] || P.accent }}>{domain} Domain</Lbl>
                    </div>
                    {domainSelectedCards.map(card => renderCard(domain, card, { isReadOnly: true }))}
                  </div>
                );
              })}

              {/* Unchosen domain cards — collapsible, read-only, dimmed */}
              {/* FUTURE EXPANSION: When vault mechanics are added (level 5+), unchosen cards
                  become the player's vault pool. Cards in the vault can be recalled by spending
                  their recall cost, or swapped freely during a rest. The collapsible below will
                  naturally extend into that vault UI — add recall buttons and vault state here. */}
              {(() => {
                const unchosenByDomain = domains
                  .map(domain => ({
                    domain,
                    cards: (DOMAIN_CARDS[domain] || []).filter(card =>
                      !c.selectedCards.includes(`${domain}::${card.name}`)
                    )
                  }))
                  .filter(d => d.cards.length > 0);
                const totalUnchosen = unchosenByDomain.reduce((n, d) => n + d.cards.length, 0);
                if (totalUnchosen === 0) return null;
                return (
                  <div style={{ marginTop: 8 }}>
                    <div
                      onClick={() => setUnchosenCardsOpen(v => !v)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 14px", borderRadius: 10, border: `1px solid ${P.border}`,
                        background: P.surface, cursor: "pointer", userSelect: "none", marginBottom: unchosenCardsOpen ? 8 : 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: P.textMuted }}>
                        Unchosen Domain Cards ({totalUnchosen})
                      </div>
                      <div style={{ fontSize: 16, color: P.textMuted, transform: unchosenCardsOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</div>
                    </div>
                    {unchosenCardsOpen && (
                      <div>
                        <div style={{ fontSize: 11, color: P.textMuted, fontStyle: "italic", marginBottom: 10, padding: "0 4px" }}>
                          These are the domain cards you didn't take — view only.
                        </div>
                        {unchosenByDomain.map(({ domain, cards }) => (
                          <div key={domain}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, marginTop: 4 }}>
                              <div style={{ width: 10, height: 10, borderRadius: "50%", background: DOMAIN_COLORS[domain] || P.accent }} />
                              <Lbl style={{ marginBottom: 0, color: DOMAIN_COLORS[domain] || P.accent }}>{domain} Domain</Lbl>
                            </div>
                            {cards.map(card => renderCard(domain, card, { isReadOnly: true, dimmed: true }))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Edit Loadout button — at the bottom, less intrusive */}
              <button onClick={() => u("cardsConfirmed", false)}
                style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: 8,
                  border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted,
                  fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Edit Loadout
              </button>
            </>}
          </>;
              })()}
            </div>}
          </div>

  </div>
}
