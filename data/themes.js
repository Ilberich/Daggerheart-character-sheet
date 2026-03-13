const THEMES = {
  // ── Original dark themes ──────────────────────────────────────────
  "Pulse":   { bg: "#0d0f14", surface: "#161922", card: "#1c2030", cardHover: "#232840", border: "#2a3050", borderActive: "#6366f1", text: "#e2e4f0",  textMuted: "#8890b0", accent: "#6366f1", accentGlow: "rgba(99,102,241,0.25)",  hope: "#facc15", fear: "#ef4444", hp: "#22c55e", stress: "#f97316", gold: "#fbbf24" },
  "Canopy":  { bg: "#081009", surface: "#0e1a0f", card: "#132016", cardHover: "#1a2e1c", border: "#1d3421", borderActive: "#4ade80", text: "#d4f0da",  textMuted: "#6a9a74", accent: "#4ade80", accentGlow: "rgba(74,222,128,0.25)",   hope: "#fbbf24", fear: "#ef4444", hp: "#86efac", stress: "#f97316", gold: "#fbbf24" },
  "Roots":   { bg: "#0f0907", surface: "#1a1008", card: "#22150c", cardHover: "#2a1c12", border: "#3a2010", borderActive: "#f97316", text: "#e8d5c4",  textMuted: "#9a7060", accent: "#f97316", accentGlow: "rgba(249,115,22,0.25)",   hope: "#fb7185", fear: "#ef4444", hp: "#22c55e", stress: "#fb923c", gold: "#fbbf24" },
  "Trunk":   { bg: "#0d0b08", surface: "#181410", card: "#201a12", cardHover: "#2a2218", border: "#352c1e", borderActive: "#d97706", text: "#ede0c8",  textMuted: "#9a8060", accent: "#d97706", accentGlow: "rgba(217,119,6,0.25)",    hope: "#facc15", fear: "#ef4444", hp: "#22c55e", stress: "#f97316", gold: "#fbbf24" },
  "Gilded":  { bg: "#080810", surface: "#0d0d1a", card: "#121228", cardHover: "#181838", border: "#1e1e40", borderActive: "#eab308", text: "#e8dfc0",  textMuted: "#7a7868", accent: "#eab308", accentGlow: "rgba(234,179,8,0.25)",    hope: "#fbbf24", fear: "#dc2626", hp: "#22c55e", stress: "#f97316", gold: "#eab308" },
  // ── Softer mid-tone themes ────────────────────────────────────────
  "Dusk":    { bg: "#1e1b2e", surface: "#272440", card: "#302d4e", cardHover: "#3a375c", border: "#48446a", borderActive: "#a78bfa", text: "#e8e2ff",  textMuted: "#9990c0", accent: "#a78bfa", accentGlow: "rgba(167,139,250,0.25)",  hope: "#fde68a", fear: "#f87171", hp: "#6ee7b7", stress: "#fb923c", gold: "#fcd34d" },
  "Loam":    { bg: "#1c1914", surface: "#28231c", card: "#332c24", cardHover: "#3d352c", border: "#4e4236", borderActive: "#86b050", text: "#e8dfc8",  textMuted: "#a09070", accent: "#86b050", accentGlow: "rgba(134,176,80,0.25)",   hope: "#fcd34d", fear: "#f87171", hp: "#86efac", stress: "#fb923c", gold: "#fcd34d" },
  "Mist":    { bg: "#161c22", surface: "#1e2730", card: "#25313c", cardHover: "#2d3c48", border: "#3a4e5c", borderActive: "#67c4d8", text: "#ddeef5",  textMuted: "#7aa0b0", accent: "#67c4d8", accentGlow: "rgba(103,196,216,0.25)",  hope: "#fde68a", fear: "#f87171", hp: "#6ee7b7", stress: "#fb923c", gold: "#fcd34d" },
  "Hearth":  { bg: "#1e1814", surface: "#2a211a", card: "#352920", cardHover: "#403228", border: "#524038", borderActive: "#e07b54", text: "#f0ddd0",  textMuted: "#a08070", accent: "#e07b54", accentGlow: "rgba(224,123,84,0.25)",   hope: "#fde68a", fear: "#f87171", hp: "#6ee7b7", stress: "#fb923c", gold: "#fcd34d" },
};
const THEME_META = {
  "Pulse":  { label: "Pulse",  dot: "#6366f1", desc: "The Sync — living tree energy" },
  "Canopy": { label: "Canopy", dot: "#4ade80", desc: "Emerald Sea — solarpunk green" },
  "Roots":  { label: "Roots",  dot: "#f97316", desc: "The Iron Deep — rust & biolume" },
  "Trunk":  { label: "Trunk",  dot: "#d97706", desc: "Barkwood — warm market amber" },
  "Gilded": { label: "Gilded", dot: "#eab308", desc: "Sky-Dread — ominous ancient gold" },
  "Dusk":   { label: "Dusk",   dot: "#a78bfa", desc: "Soft purple — evening at the Spires" },
  "Loam":   { label: "Loam",   dot: "#86b050", desc: "Rich earth — bark and leaf-shadow" },
  "Mist":   { label: "Mist",   dot: "#67c4d8", desc: "Cool blue-grey — morning canopy fog" },
  "Hearth": { label: "Hearth", dot: "#e07b54", desc: "Warm ember — Trunk market lanterns" },
};
const P = { ...THEMES["Pulse"] };
const sBtn = { width: 26, height: 26, borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", flexShrink: 0 };
const mono = "'JetBrains Mono', monospace";
