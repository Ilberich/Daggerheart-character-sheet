// ═══════════════════════════════════════════════════════════════
// COMPANION TAB — Beastbound Ranger only
// ═══════════════════════════════════════════════════════════════
const COMPANION_DAMAGE_DICE = ["d6", "d8", "d10", "d12"];
const COMPANION_RANGES = ["Melee", "Very Close", "Close", "Far", "Very Far"];

function CompanionTab({ c, u, prof }) {
  const [editComp, setEditComp] = useState(false);
  const [editExp, setEditExp]   = useState(false);

  const lu          = c.companionLevelUps || {};
  const awareCount  = lu.aware || 0;
  const evasion     = (c.companionEvasion || 10) + awareCount * 2;
  const dieIdx      = c.companionDamageDieIdx || 0;
  const damageDie   = COMPANION_DAMAGE_DICE[dieIdx] || "d6";
  const range       = c.companionRange || "Melee";
  const stress      = c.companionStress || [false, false, false];
  const totalSlots  = stress.length;
  const marked      = stress.filter(Boolean).length;
  const dropped     = marked >= totalSlots;

  const lightHopeOn = (lu.lightInDark    || 0) >= 1;
  const comfortOn   = (lu.creatureComfort || 0) >= 1;
  const armoredOn   = (lu.armored        || 0) >= 1;
  const bondedOn    = (lu.bonded         || 0) >= 1;

  const toggleStress = i => {
    const next = [...stress]; next[i] = !next[i]; u("companionStress", next);
  };

  const name = c.companionName || "";
  const type = c.companionType || "";

  return <>
    {/* Name / type / edit */}
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: name ? P.hope : P.textMuted }}>{name || "Unnamed Companion"}</div>
          {type && <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{type}</div>}
        </div>
        <button onClick={() => setEditComp(e => !e)} className={!editComp && !name ? "btn-pulse" : ""} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, border: `1px solid ${P.border}`, background: editComp ? P.accent : P.surface, color: editComp ? "#fff" : P.accent, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>
          {editComp ? "Done" : "Edit"}
        </button>
      </div>
      {editComp && (
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <Inp value={name} onChange={v => u("companionName", v)} placeholder="Companion name" style={{ flex: 2 }} />
            <Inp value={type} onChange={v => u("companionType", v)} placeholder="Animal type" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: P.textMuted, fontWeight: 700, minWidth: 56 }}>BASE EVA</span>
            <button onClick={() => u("companionEvasion", Math.max(1, (c.companionEvasion || 10) - 1))} style={{ ...sBtn, width: 22, height: 22 }}>−</button>
            <span style={{ fontSize: 14, fontWeight: 800, fontFamily: mono, minWidth: 24, textAlign: "center", color: P.accent }}>{c.companionEvasion || 10}</span>
            <button onClick={() => u("companionEvasion", (c.companionEvasion || 10) + 1)} style={{ ...sBtn, width: 22, height: 22 }}>+</button>
            {awareCount > 0 && <span style={{ fontSize: 10, color: P.hp, marginLeft: 4 }}>+{awareCount * 2} (Aware)</span>}
          </div>
        </div>
      )}
    </Card>

    {/* Stat strip */}
    <Card>
      <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", marginBottom: 10 }}>
        <div><div style={{ fontSize: 22, fontWeight: 800, color: P.accent, fontFamily: mono }}>{evasion}</div><div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>EVASION</div></div>
        <div><div style={{ fontSize: 22, fontWeight: 800, color: P.gold, fontFamily: mono }}>{damageDie}</div><div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>DAMAGE</div></div>
        <div><div style={{ fontSize: 22, fontWeight: 800, color: P.textMuted, fontFamily: mono }}>{prof}</div><div style={{ fontSize: 9, color: P.textMuted, fontWeight: 700 }}>PROFICIENCY</div></div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", fontSize: 9, color: P.textMuted }}>
        <span>Range: <span style={{ color: P.text, fontWeight: 600 }}>{range}</span></span>
        <span>Roll: <span style={{ color: P.accent, fontWeight: 600 }}>Agility (Spellcast)</span></span>
      </div>
    </Card>

    {/* Stress */}
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <Lbl style={{ marginBottom: 0 }}>Companion Stress ({marked}/{totalSlots})</Lbl>
      </div>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
        {stress.map((f, i) => <Pip key={i} filled={f} color={P.stress} onClick={() => toggleStress(i)} size={26} />)}
      </div>
      {dropped && <div style={{ marginTop: 8, padding: "8px 10px", borderRadius: 8, background: P.fear + "18", border: `1px solid ${P.fear}44`, fontSize: 11, color: P.fear, lineHeight: 1.6 }}>Out of scene — returns next long rest with 1 Stress cleared.</div>}
      <div style={{ marginTop: 8, fontSize: 10, color: P.textMuted }}>Damage → mark Stress. All marked → companion drops from scene.</div>
    </Card>

    {/* Light in the Dark (unlocked only) */}
    {lightHopeOn && <Card style={{ border: `1px solid ${P.hope}44` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <Lbl style={{ marginBottom: 0, color: P.hope }}>Light in the Dark</Lbl>
        <span style={{ fontSize: 9, color: P.hope, fontWeight: 700, background: P.hope + "22", borderRadius: 4, padding: "2px 6px" }}>ACTIVE</span>
      </div>
      <div style={{ display: "flex", gap: 7 }}>
        <Pip filled={c.companionLightHope || false} color={P.hope} onClick={() => u("companionLightHope", !c.companionLightHope)} size={26} />
      </div>
      <div style={{ marginTop: 6, fontSize: 10, color: P.textMuted }}>Extra Hope slot for your character.</div>
    </Card>}

    {/* Creature Comfort (unlocked only) */}
    {comfortOn && <Card style={{ border: `1px solid ${P.hp}44` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <Lbl style={{ marginBottom: 0, color: P.hp }}>Creature Comfort</Lbl>
        <span style={{ fontSize: 9, color: P.hp, fontWeight: 700, background: P.hp + "22", borderRadius: 4, padding: "2px 6px" }}>ACTIVE</span>
      </div>
      <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
        <Pip filled={c.companionComfortUsed || false} color={P.hp} onClick={() => u("companionComfortUsed", !c.companionComfortUsed)} size={26} />
        <span style={{ fontSize: 12, color: c.companionComfortUsed ? P.textMuted : P.text }}>{c.companionComfortUsed ? "Used this rest" : "Available — give companion attention"}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 10, color: P.textMuted }}>Once per rest: gain a Hope or both clear a Stress.</div>
    </Card>}

    {/* Armored (unlocked only) */}
    {armoredOn && <Card style={{ border: `1px solid ${P.accent}44` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Lbl style={{ marginBottom: 0 }}>Armored</Lbl>
        <span style={{ fontSize: 9, color: P.accent, fontWeight: 700, background: P.accent + "22", borderRadius: 4, padding: "2px 6px" }}>ACTIVE</span>
      </div>
      <div style={{ fontSize: 12, color: P.textMuted, marginTop: 4, lineHeight: 1.6 }}>Mark one of your own Armor Slots instead of the companion's Stress when they take damage.</div>
    </Card>}

    {/* Bonded (unlocked only) */}
    {bondedOn && <Card style={{ border: `1px solid ${P.gold}44` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Lbl style={{ marginBottom: 0, color: P.gold }}>Bonded</Lbl>
        <span style={{ fontSize: 9, color: P.gold, fontWeight: 700, background: P.gold + "22", borderRadius: 4, padding: "2px 6px" }}>ACTIVE</span>
      </div>
      <div style={{ fontSize: 12, color: P.textMuted, marginTop: 4, lineHeight: 1.6 }}>
        When you mark your last HP, companion rushes to help. Roll <strong style={{ color: P.text, fontFamily: mono }}>{totalSlots - marked}d6</strong> (their unmarked slots, marking them). Any 6 → clear your last HP and return to the scene.
      </div>
    </Card>}

    {/* Experiences */}
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <Lbl style={{ marginBottom: 0 }}>Companion Experiences</Lbl>
        <button onClick={() => setEditExp(e => !e)} className={!editExp && (!c.companionExp1 || !c.companionExp2) ? "btn-pulse" : ""} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: editExp ? P.accent : P.surface, color: editExp ? "#fff" : P.accent, cursor: "pointer", fontFamily: "inherit" }}>{editExp ? "Done" : "Edit"}</button>
      </div>
      <div style={{ fontSize: 10, color: P.textMuted, marginBottom: 8 }}>Spend a Hope to add to Spellcast Roll when commanding companion</div>
      {editExp ? (
        <>
          {[["companionExp1","companionExp1Val"],["companionExp2","companionExp2Val"]].map(([ek, vk], i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <Inp value={c[ek] || ""} onChange={v => u(ek, v)} placeholder={`Experience ${i + 1}…`} style={{ flex: 1, fontSize: 13, padding: "6px 10px" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <button onClick={() => u(vk, Math.max(0, (c[vk] ?? 2) - 1))} style={{ ...sBtn, width: 20, height: 20, fontSize: 12 }}>−</button>
                <span style={{ fontSize: 14, fontWeight: 800, color: P.accent, fontFamily: mono, minWidth: 20, textAlign: "center" }}>+{c[vk] ?? 2}</span>
                <button onClick={() => u(vk, (c[vk] ?? 2) + 1)} style={{ ...sBtn, width: 20, height: 20, fontSize: 12 }}>+</button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[["companionExp1","companionExp1Val"],["companionExp2","companionExp2Val"]].map(([ek, vk], i) => (
            c[ek] ? (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: P.surface, borderRadius: 6, border: `1px solid ${P.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{c[ek]}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: P.accent, fontFamily: mono }}>+{c[vk] ?? 2}</span>
              </div>
            ) : (
              <div key={i} style={{ fontSize: 12, color: P.textMuted, fontStyle: "italic", padding: "6px 10px" }}>Tap Edit to set Experience {i + 1}</div>
            )
          ))}
        </div>
      )}
    </Card>

    {/* Attack reference */}
    <Card>
      <Lbl>Attack & Damage</Lbl>
      {editComp && (
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <Lbl>Damage Die</Lbl>
            <Sel value={damageDie} onChange={v => { const idx = COMPANION_DAMAGE_DICE.indexOf(v); if (idx >= 0) u("companionDamageDieIdx", idx); }}>
              {COMPANION_DAMAGE_DICE.map(d => <option key={d}>{d}</option>)}
            </Sel>
          </div>
          <div style={{ flex: 1 }}>
            <Lbl>Range</Lbl>
            <Sel value={range} onChange={v => u("companionRange", v)}>
              {COMPANION_RANGES.map(r => <option key={r}>{r}</option>)}
            </Sel>
          </div>
        </div>
      )}
      {editComp && <Inp value={c.companionAttackDesc || ""} onChange={v => u("companionAttackDesc", v)} placeholder="Describe attack (e.g. Claw Strike, Bite, Ram)" style={{ marginBottom: 8 }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: P.surface, borderRadius: 8, border: `1px solid ${P.border}`, marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: P.hope }}>⚡ Command Companion</div>
          <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>Agility (Spellcast) · {range} · {prof}{damageDie}</div>
          {c.companionAttackDesc && <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{c.companionAttackDesc}</div>}
        </div>
      </div>
      <div style={{ fontSize: 10, color: P.textMuted, lineHeight: 1.7 }}>Spend a Hope to add an Experience. On a success with Hope, if your next action builds on their success, gain <strong style={{ color: P.text }}>Advantage</strong>.</div>
    </Card>
  </>;
}
