import { useState } from 'react';
import { P, mono } from '../data/themes.js';

export function TabBar({ tabs, active, onChange, glowing = new Set() }) { return <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${P.border}`, background: P.bg, position: "sticky", top: 0, zIndex: 100 }}>{tabs.map(t => <button key={t} onClick={() => onChange(t)} className={glowing.has(t) && active !== t ? "tab-pulse" : ""} style={{ flex: 1, padding: "10px 4px", fontSize: 13, fontWeight: active === t ? 700 : 500, color: active === t ? P.accent : glowing.has(t) && active !== t ? P.accent : P.textMuted, background: "none", border: "none", borderBottom: active === t ? `2px solid ${P.accent}` : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", textAlign: "center", fontFamily: "inherit" }}>{t}</button>)}</div>; }
export function Card({ children, style, className }) { return <div className={className || ""} style={{ background: P.card, borderRadius: 12, padding: 14, border: `1px solid ${P.border}`, ...style }}>{children}</div>; }
export function Lbl({ children, style }) { return <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: P.textMuted, marginBottom: 4, ...style }}>{children}</div>; }
export function Inp({ value, onChange, placeholder, style }) { return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", ...style }} />; }
export function Sel({ value, onChange, children, className }) { return <select value={value} onChange={e => onChange(e.target.value)} className={className || ""} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%238890b0' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32 }}>{children}</select>; }
export function Pip({ filled, color, onClick, size = 22 }) { return <div onClick={onClick} style={{ width: size, height: size, borderRadius: size / 2, border: `2px solid ${color}`, background: filled ? color : "transparent", cursor: "pointer", transition: "all .15s", flexShrink: 0 }} />; }

export function Feat({ title, text, startOpen }) {
  const [open, setOpen] = useState(!!startOpen);
  return <div style={{ background: P.surface, borderRadius: 8, border: `1px solid ${P.border}`, marginBottom: 8, overflow: "hidden" }}>
    <div onClick={() => setOpen(!open)} style={{ padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: P.text }}>{title}</span>
      <span style={{ fontSize: 11, color: P.textMuted, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
    </div>
    {open && <div style={{ padding: "0 12px 12px", fontSize: 12, lineHeight: 1.7, color: P.textMuted, whiteSpace: "pre-line" }}>{text}</div>}
  </div>;
}

export function Grid({ items, selected, onSelect, render }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
    {items.map(item => { const k = typeof item === "string" ? item : item.name; const s = selected === k;
      return <div key={k} onClick={() => onSelect(k)} style={{ background: s ? P.cardHover : P.surface, border: `1px solid ${s ? P.borderActive : P.border}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", boxShadow: s ? `0 0 12px ${P.accentGlow}` : "none", transition: "all .2s" }}>{render(item, s)}</div>; })}
  </div>;
}

// ── RICH TEXT RENDERER ──────────────────────────────────────
// Parses structured body strings into formatted JSX.
// Markers:
//   ## Title        → section header (accent color, uppercase, tracked)
//   **Name**: text  → bold gold feature name + muted body
//   • item          → bullet point
//   blank line      → spacer
//   plain text      → muted paragraph line
export function RichBody({ text }) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((line, i) => {
        if (!line.trim()) {
          return <div key={i} style={{ height: 7 }} />;
        }
        // ## Section header
        if (line.startsWith("## ")) {
          return (
            <div key={i} style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase",
              letterSpacing: 1.8, color: P.accent, marginTop: 14, marginBottom: 5,
              paddingBottom: 4, borderBottom: `1px solid ${P.accent}44` }}>
              {line.slice(3)}
            </div>
          );
        }
        // • bullet
        if (line.startsWith("• ")) {
          return (
            <div key={i} style={{ display: "flex", gap: 7, marginBottom: 3, paddingLeft: 2 }}>
              <span style={{ color: P.accent, flexShrink: 0, fontSize: 11, lineHeight: "1.7" }}>•</span>
              <span style={{ fontSize: 12, lineHeight: 1.7, color: P.textMuted }}>{line.slice(2)}</span>
            </div>
          );
        }
        // **Feature Name**: rest  →  bold gold name + muted text
        const boldMatch = line.match(/^\*\*(.+?)\*\*:(.*)$/);
        if (boldMatch) {
          return (
            <div key={i} style={{ fontSize: 12, lineHeight: 1.7, marginBottom: 2 }}>
              <span style={{ fontWeight: 800, color: P.hope }}>{boldMatch[1]}</span>
              <span style={{ color: P.text }}>:</span>
              <span style={{ color: P.textMuted }}>{boldMatch[2]}</span>
            </div>
          );
        }
        // Plain text
        return (
          <div key={i} style={{ fontSize: 12, lineHeight: 1.7, color: P.textMuted, marginBottom: 1 }}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

export function PickerAccordion({ items, selected, onSelect, accentColor }) {
  const [openKey, setOpenKey] = useState(null);
  const accent = accentColor || P.accent;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map(({ key, label, meta, body }) => {
        const isSelected = selected === key;
        const isOpen = openKey === key;
        return (
          <div key={key}
            style={{ borderRadius: 10, border: `2px solid ${isSelected ? accent : isOpen ? P.borderActive + "88" : P.border}`,
              background: isSelected ? accent + "14" : P.surface,
              overflow: "hidden", transition: "border-color .15s, background .15s" }}>
            <div onClick={() => setOpenKey(isOpen ? null : key)}
              style={{ padding: "11px 13px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${isSelected ? accent : P.border}`,
                background: isSelected ? accent : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isSelected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: isSelected ? accent : P.text }}>{label}</div>
                {meta && <div style={{ fontSize: 11, color: P.textMuted, marginTop: 1 }}>{meta}</div>}
              </div>
              <span style={{ fontSize: 11, color: P.textMuted, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}>▼</span>
            </div>
            {isOpen && (
              <div style={{ borderTop: `1px solid ${isSelected ? accent + "44" : P.border}`, padding: "14px 14px 12px" }}>
                <RichBody text={body} />
                <button onClick={() => { onSelect(key); setOpenKey(null); }}
                  style={{ width: "100%", padding: "10px", borderRadius: 8, marginTop: 16,
                    border: `2px solid ${isSelected ? P.border : accent}`,
                    background: isSelected ? P.surface : accent,
                    color: isSelected ? P.textMuted : "#fff",
                    fontSize: 13, fontWeight: 800, cursor: isSelected ? "default" : "pointer",
                    fontFamily: "inherit", letterSpacing: 0.3, transition: "all .15s" }}>
                  {isSelected ? "✓ Selected" : "Select"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
