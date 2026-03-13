function newChar(id) {
  return {
    _id: id, name: "", pronouns: "", level: 1, className: "", subclass: "",
    ancestry: "", isMixedAncestry: false, ancestrySecondary: "", mixedFeaturePick: "A",
    mixedAncestryLabel: "", community: "", communityNotes: "",
    traits: { Agility: 0, Strength: 0, Finesse: 0, Instinct: 0, Presence: 0, Knowledge: 0 },
    hp: Array(10).fill(false), stress: Array(7).fill(false),
    hope: [true, true, false, false, false, false], armorSlots: Array(12).fill(false),
    primaryWeapon: "", secondaryWeapon: "", armor: "",
    exp1: "", exp1Val: 2, exp2: "", exp2Val: 2,
    inventory: "", goldH: 1, goldB: 0, goldC: 0, notes: "",
    selectedCards: [], cardsConfirmed: false,
    companionName: "", companionType: "", companionEvasion: 10,
    companionStress: Array(3).fill(false), companionDamageDieIdx: 0,
    companionRange: "Melee", companionAttackDesc: "",
    companionExp1: "", companionExp1Val: 2, companionExp2: "", companionExp2Val: 2,
    companionLevelUps: {}, companionLightHope: false, companionComfortUsed: false,
    // ── Class Resources ──────────────────────────────────────
    // Bard
    rallyUsed: false,
    troubadourSong1Used: false, troubadourSong2Used: false, troubadourSong3Used: false,
    wordsmithSpeechUsed: false,
    // Druid
    beastformActive: false, druidClarityUsed: false, druidWardensProtectionUsed: false,
    // Guardian
    unstoppableActive: false, unstoppableDieValue: 1, unstoppableUsed: false,
    // Ranger
    rangerFocusActive: false, rangerFocusTarget: "",
    // Rogue
    cloaked: false,
    // Seraph
    prayerDice: [],
    // Sorcerer
    channelRawPowerUsed: false, arcaneChargeActive: false, transcendenceUsed: false,
    // Warrior
    battleRitualUsed: false, slayerDice: [],
    // Wizard
    strangePatternNumber: 7,
    // Blood Hunter
    crimsonRiteActive: false, wolfFormActive: false, mutagen: "",
    // Witch
    hexActive: false, hexTarget: "", communeUsed: false,
    talismanExists: false, walkBetweenWorldsTokens: 0, circleOfPowerTokens: 0,
    moonbeamUsed: false, lunarPhase: 0,
    // Assassin
    markedForDeathActive: false, markedForDeathTarget: "", poisonTokens: 0,
    firstStrikeUsed: false, trueStrikeUsed: false,
    // Warlock
    favor: 3, patronSphere1Name: "", patronSphere1Value: 2,
    patronSphere2Name: "", patronSphere2Value: 2, patronsMantleActive: false,
    // Brawler
    comboDieSize: "d4", focusTokens: 0, limitBreakerUsed: false, eyeForAnEyeUsed: false,
  };
}

// ── CLASS COLOR MAP ──────────────────────────────────────────
const CLASS_COLORS = { Bard: "#ec4899", Druid: "#22c55e", Guardian: "#f97316", Ranger: "#84cc16", Rogue: "#a855f7", Seraph: "#facc15", Sorcerer: "#ef4444", Warrior: "#f59e0b", Wizard: "#3b82f6" };

function CharacterSelect({ characters, onSelect, onCreate, onDelete, onImport }) {
  const fileRef = useRef(null);
  return (
    <div style={{ minHeight: "100vh", background: P.bg, color: P.text, fontFamily: "'Crimson Pro','Georgia',serif", maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "20px 16px 14px", background: `linear-gradient(135deg, ${P.surface} 0%, ${P.bg} 100%)`, borderBottom: `1px solid ${P.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: P.accent }}>⬥</span>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1 }}>DAGGERHEART</span>
        </div>
        <div style={{ fontSize: 12, color: P.textMuted, letterSpacing: 0.5 }}>CHARACTER ROSTER</div>
      </div>

      {/* Character List */}
      <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        {characters.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: P.textMuted, fontSize: 13 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚔️</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: P.text, marginBottom: 6 }}>No characters yet</div>
            <div>Create your first character to begin your adventure.</div>
          </div>
        )}
        {characters.map((ch, idx) => {
          const cls = ch.className ? CLASSES[ch.className] : null;
          const clsColor = CLASS_COLORS[ch.className] || P.accent;
          const prof = ch.level <= 1 ? 1 : ch.level <= 4 ? 2 : ch.level <= 7 ? 3 : 4;
          const hpMarked = ch.hp.filter(Boolean).length;
          const maxHp = (cls ? cls.hp : 6) + (hasAncestryFeature(ch, "Giant", 0) ? 1 : 0) + (ch.className === "Wizard" && ch.subclass === "School of War" ? 1 : 0);
          return (
            <div key={ch._id} style={{ background: P.card, borderRadius: 14, border: `1px solid ${P.border}`, overflow: "hidden", transition: "border-color .2s", cursor: "pointer" }}
              onClick={() => onSelect(idx)}>
              {/* Color bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${clsColor}, ${clsColor}55)` }} />
              <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar placeholder */}
                <div style={{ width: 46, height: 46, borderRadius: 12, background: clsColor + "22", border: `2px solid ${clsColor}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {ch.className ? { Bard: "🎵", Druid: "🌿", Guardian: "🛡", Ranger: "🏹", Rogue: "🗡", Seraph: "✨", Sorcerer: "🔮", Warrior: "⚔️", Wizard: "📖" }[ch.className] || "⚔️" : "?"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: ch.name ? P.text : P.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {ch.name || "Unnamed Character"}
                    {ch.pronouns && <span style={{ fontSize: 11, color: P.textMuted, fontWeight: 400 }}> ({ch.pronouns})</span>}
                  </div>
                  <div style={{ fontSize: 12, color: clsColor, fontWeight: 700, marginTop: 1 }}>
                    {ch.className ? `Lv${ch.level} ${ch.className}${ch.subclass ? ` · ${ch.subclass}` : ""}` : <span style={{ color: P.textMuted, fontWeight: 400 }}>No class selected</span>}
                  </div>
                  {ch.ancestry && <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{getMixedAncestryLabel(ch)}{ch.community ? ` · ${ch.community}` : ""}</div>}
                </div>
                {/* Mini stat block */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: P.fear, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>HP {hpMarked}/{maxHp}</div>
                  <div style={{ fontSize: 10, color: P.textMuted, fontFamily: "'JetBrains Mono',monospace" }}>Prof +{prof}</div>
                  <button onClick={e => { e.stopPropagation(); if (window.confirm(`Delete "${ch.name || "Unnamed"}"? This cannot be undone.`)) onDelete(idx); }}
                    style={{ fontSize: 11, padding: "2px 8px", borderRadius: 5, border: `1px solid ${P.border}`, background: "transparent", color: P.textMuted, cursor: "pointer", fontFamily: "inherit", marginTop: 2 }}>✕</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div style={{ padding: "14px", borderTop: `1px solid ${P.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={onCreate}
          style={{ width: "100%", padding: "14px", borderRadius: 12, border: `2px solid ${P.accent}`, background: P.accent, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 }}>
          + New Character
        </button>
        <button onClick={() => fileRef.current?.click()}
          style={{ width: "100%", padding: "11px", borderRadius: 12, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Import JSON
        </button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }}
          onChange={e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => { try { const d = JSON.parse(ev.target.result); onImport(d); } catch { alert("Invalid JSON file."); } }; r.readAsText(f); e.target.value = ""; }} />
        <div style={{ textAlign: "center", fontSize: 9, color: P.textMuted, paddingTop: 2 }}>Daggerheart © Darrington Press 2025 — Fan-made digital sheet</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
function App() {
  const [characters, setCharacters] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dh-chars') || '[]'); }
    catch { return []; }
  });
  const [activeIdx, setActiveIdx] = useState(null);
  const [themeName, setThemeName] = useState(() => localStorage.getItem('dh-theme') || 'Pulse');

  // Apply theme to global P before rendering — all children pick it up on each render
  Object.assign(P, THEMES[themeName] || THEMES['Pulse']);
  const handleSetTheme = (name) => { localStorage.setItem('dh-theme', name); setThemeName(name); };

  const nextId = useRef((() => {
    try { return parseInt(localStorage.getItem('dh-nextid') || '1', 10); }
    catch { return 1; }
  })());

  // Persist characters to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem('dh-chars', JSON.stringify(characters)); }
    catch(e) { console.warn('localStorage save failed:', e); }
  }, [characters]);

  const handleCreate = () => {
    const id = nextId.current++;
    try { localStorage.setItem('dh-nextid', String(nextId.current)); } catch {}
    setCharacters(prev => [...prev, newChar(id)]);
    setActiveIdx(characters.length);
  };
  const handleSelect = idx => setActiveIdx(idx);
  const handleBack = () => setActiveIdx(null);
  const handleDelete = idx => {
    setCharacters(prev => prev.filter((_, i) => i !== idx));
    setActiveIdx(null);
  };
  const handleImport = data => {
    const id = nextId.current++;
    try { localStorage.setItem('dh-nextid', String(nextId.current)); } catch {}
    setCharacters(prev => [...prev, { ...data, _id: id }]);
    setActiveIdx(characters.length);
  };

  if (activeIdx === null || !characters[activeIdx]) {
    return <CharacterSelect characters={characters} onSelect={handleSelect} onCreate={handleCreate} onDelete={handleDelete} onImport={handleImport} />;
  }

  const setC = updater => setCharacters(prev => {
    const next = [...prev];
    next[activeIdx] = typeof updater === "function" ? updater(prev[activeIdx]) : { ...prev[activeIdx], ...updater };
    return next;
  });

  return <DaggerheartSheet c={characters[activeIdx]} setC={setC} onBack={handleBack} themeName={themeName} setTheme={handleSetTheme} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
