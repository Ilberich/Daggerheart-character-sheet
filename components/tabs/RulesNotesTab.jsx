import { P } from '../../data/themes.js';
import { RULES } from '../../data/rules.js';
import { Card, Lbl, Feat } from '../ui.jsx';

export function RulesNotesTab({ c, u, rulesSearch, setRulesSearch, rulesCat, setRulesCat }) {
  return <>
          <Card><Lbl>Notes & Backstory</Lbl><textarea value={c.notes} onChange={e => u("notes", e.target.value)} placeholder="Background, connections, session notes..." rows={14} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.7 }} /></Card>
          <Card>
            <Lbl>Rules Reference</Lbl>
            <input
              value={rulesSearch}
              onChange={e => { setRulesSearch(e.target.value); }}
              placeholder="Search rules..."
              style={{ width: "100%", padding: "8px 10px", borderRadius: 7, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 8 }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
              {["All", ...RULES.map(r => r.cat).filter((c, i, a) => a.indexOf(c) === i)].map(cat => (
                <button key={cat} onClick={() => setRulesCat(cat)}
                  style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, border: `1px solid ${rulesCat === cat ? P.accent : P.border}`, background: rulesCat === cat ? P.surface : "transparent", color: rulesCat === cat ? P.accent : P.textMuted, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
                  {cat}
                </button>
              ))}
            </div>
            {(() => {
              const q = rulesSearch.toLowerCase();
              const filtered = RULES.filter(r => {
                const catOk = rulesCat === "All" || r.cat === rulesCat;
                const textOk = !q || r.name.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q) || r.body.toLowerCase().includes(q);
                return catOk && textOk;
              });
              return filtered.length > 0
                ? filtered.map(r => <Feat key={r.id} title={r.name} text={r.body} />)
                : <div style={{ fontSize: 12, color: P.textMuted, textAlign: "center", padding: "12px 0" }}>No rules match.</div>;
            })()}
          </Card>
          <Card><Lbl>Export</Lbl><div style={{ display: "flex", flexDirection: "column", gap: 8 }}><button onClick={() => { const b = new Blob([JSON.stringify(c, null, 2)], { type: "application/json" }); const x = URL.createObjectURL(b); const a = document.createElement("a"); a.href = x; a.download = `${c.name || "character"}_daggerheart.json`; a.click(); URL.revokeObjectURL(x); }} style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${P.borderActive}`, background: P.surface, color: P.accent, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Download JSON</button><button onClick={() => { const body = encodeURIComponent(`**Describe the bug:**\n[A clear description of what went wrong]\n\n**Steps to reproduce:**\n1. \n2. \n\n**Expected behavior:**\n[What you expected to happen]\n\n**Browser & OS:**\n${navigator.userAgent}\n\n**Additional context:**\n[Any other relevant info]`); window.open(`https://github.com/Ilberich/Daggerheart-character-sheet/issues/new?title=Bug+Report&body=${body}`, '_blank'); }} style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.textMuted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Report a Bug</button></div></Card>
  </>
}
