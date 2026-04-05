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
  // ── GM Dashboard themes ───────────────────────────────────────────
  "Mother Tree":     { bg: "#0e0c0a", surface: "#15120e", card: "#1e1a13", cardHover: "#272019", border: "#38301f", borderActive: "#4e4028", text: "#e8e0d0", textMuted: "#7a6a54", accent: "#d4a843", accentGlow: "rgba(212,168,67,0.25)",   hope: "#facc15", fear: "#c8403a", hp: "#5a9e72", stress: "#6366f1", gold: "#d4a843" },
  "Void Court":      { bg: "#080c12", surface: "#0d1220", card: "#131b2e", cardHover: "#1a2438", border: "#1e2e48", borderActive: "#2a3e5e", text: "#d8e4f0", textMuted: "#4a6080", accent: "#a8c8e8", accentGlow: "rgba(168,200,232,0.25)",  hope: "#facc15", fear: "#c8403a", hp: "#4a90b8", stress: "#6366f1", gold: "#a8c8e8" },
  "Ember Keep":      { bg: "#120a06", surface: "#1e1008", card: "#2a1810", cardHover: "#342018", border: "#4a2818", borderActive: "#603420", text: "#f0dcc8", textMuted: "#786040", accent: "#d4682a", accentGlow: "rgba(212,104,42,0.25)",   hope: "#facc15", fear: "#c8403a", hp: "#7a5a30", stress: "#6366f1", gold: "#d4682a" },
  "Sunken Archive":  { bg: "#060f10", surface: "#0a1820", card: "#102028", cardHover: "#182c34", border: "#1e3840", borderActive: "#284a54", text: "#c8f0ec", textMuted: "#3a6860", accent: "#2dd4c8", accentGlow: "rgba(45,212,200,0.25)",   hope: "#facc15", fear: "#c8403a", hp: "#2a9890", stress: "#6366f1", gold: "#2dd4c8" },
  "Iron Reliquary":  { bg: "#0a0c10", surface: "#10141c", card: "#181c28", cardHover: "#1e2430", border: "#282e3e", borderActive: "#343c50", text: "#d8dce8", textMuted: "#4a5068", accent: "#7a9ab8", accentGlow: "rgba(122,154,184,0.25)",  hope: "#facc15", fear: "#c8403a", hp: "#5a7898", stress: "#6366f1", gold: "#7a9ab8" },
  "Crimson Pact":    { bg: "#0e060e", surface: "#180a18", card: "#220e22", cardHover: "#2c142c", border: "#401840", borderActive: "#542054", text: "#f0d0e8", textMuted: "#784068", accent: "#d44878", accentGlow: "rgba(212,72,120,0.25)",   hope: "#facc15", fear: "#c8403a", hp: "#a03870", stress: "#6366f1", gold: "#d44878" },
  "Verdant Spire":   { bg: "#060e08", surface: "#0a1810", card: "#102018", cardHover: "#162a20", border: "#1e3828", borderActive: "#284a34", text: "#c8f0d0", textMuted: "#386848", accent: "#4ab870", accentGlow: "rgba(74,184,112,0.25)",   hope: "#facc15", fear: "#c8403a", hp: "#3a9858", stress: "#6366f1", gold: "#4ab870" },
  "Starfall":        { bg: "#060810", surface: "#0a0e1c", card: "#101628", cardHover: "#181e32", border: "#202840", borderActive: "#2c3650", text: "#f0e8c8", textMuted: "#5a5030", accent: "#d4b848", accentGlow: "rgba(212,184,72,0.25)",   hope: "#facc15", fear: "#c8403a", hp: "#a08840", stress: "#6366f1", gold: "#d4b848" },
  "Ashwood":         { bg: "#0c0e0c", surface: "#141614", card: "#1c1e1c", cardHover: "#242624", border: "#303430", borderActive: "#3e423e", text: "#dce8dc", textMuted: "#607060", accent: "#8ab898", accentGlow: "rgba(138,184,152,0.25)",  hope: "#facc15", fear: "#c8403a", hp: "#6a9878", stress: "#6366f1", gold: "#8ab898" },
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
  "Hearth":         { label: "Hearth",         dot: "#e07b54", desc: "Warm ember — Trunk market lanterns" },
  // ── GM Dashboard themes ───────────────────────────────────────────
  "Mother Tree":    { label: "Mother Tree",    dot: "#d4a843", desc: "Ancient woodland gold" },
  "Void Court":     { label: "Void Court",     dot: "#a8c8e8", desc: "Cold blue-grey void" },
  "Ember Keep":     { label: "Ember Keep",     dot: "#d4682a", desc: "Scorched stone and flame" },
  "Sunken Archive": { label: "Sunken Archive", dot: "#2dd4c8", desc: "Drowned teal depths" },
  "Iron Reliquary": { label: "Iron Reliquary", dot: "#7a9ab8", desc: "Steel-blue iron vaults" },
  "Crimson Pact":   { label: "Crimson Pact",   dot: "#d44878", desc: "Blood-rose covenant" },
  "Verdant Spire":  { label: "Verdant Spire",  dot: "#4ab870", desc: "Living tower of leaves" },
  "Starfall":       { label: "Starfall",       dot: "#d4b848", desc: "Golden meteor dusk" },
  "Ashwood":        { label: "Ashwood",        dot: "#8ab898", desc: "Grey-green misty forest" },
};
const P = { ...THEMES["Pulse"] };
const sBtn = { width: 26, height: 26, borderRadius: 6, border: `1px solid ${P.border}`, background: P.surface, color: P.text, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", flexShrink: 0 };
const mono = "'JetBrains Mono', monospace";
