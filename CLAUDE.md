# CLAUDE.md — Daggerheart Character Sheet

Developer notes for Claude Code sessions on this project.

---

## File Structure

```
/
├── app.jsx                        # Entry point: CharacterSelect + App shell, localStorage persistence
├── index.html
├── styles.css
├── vite.config.js
├── package.json
├── netlify.toml
│
├── components/
│   ├── CharacterSheet.jsx         # Orchestrator: all useState, stat calculations, modals, header, tab bar
│   ├── companion-tab.jsx          # Companion tab (Beastbound subclass only)
│   ├── level-up-modal.jsx         # Level-up progression modal
│   ├── trait-modal.jsx            # Trait assignment modal
│   ├── ui.jsx                     # Shared UI primitives: Card, Lbl, Inp, Sel, Pip, Feat, Grid, RichBody, TabBar, PickerAccordion
│   └── tabs/
│       ├── PlayTab.jsx            # "Play" tab UI — receives computed props from CharacterSheet
│       ├── CharacterTab.jsx       # "Character" tab UI — receives computed props from CharacterSheet
│       └── RulesNotesTab.jsx      # "Rules/Notes" tab UI — receives computed props from CharacterSheet
│
├── data/
│   ├── classes.js                 # Class + subclass definitions (CLASSES)
│   ├── ancestries.js              # Ancestry + community data (ANCESTRIES, COMMUNITIES, helpers)
│   ├── domain-cards/              # Split from domain-cards.js — one file per domain
│   │   ├── index.js               # Re-exports DOMAIN_CARDS + DOMAIN_COLORS — import from here
│   │   ├── arcana.js
│   │   ├── blade.js
│   │   ├── bone.js
│   │   ├── codex.js
│   │   ├── grace.js
│   │   ├── midnight.js
│   │   ├── sage.js
│   │   ├── splendor.js
│   │   └── valor.js
│   ├── equipment.js               # Weapons + armor (WEAPONS_PRIMARY, WEAPONS_SECONDARY, ARMOR)
│   ├── rules.js                   # Rules reference entries (RULES)
│   ├── themes.js                  # Color themes (THEMES, THEME_META, P, sBtn, mono)
│   └── config.js                  # Trait keys/labels (TRAIT_KEYS, TRAIT_SHORT, TRAIT_ACTIONS)
│
└── utils/
    └── advancement.js             # Leveling helpers (getTrait, ADV_MAX, ADV_COST, advTierKey, advRemainingUses)
```

---

## Architecture Notes

### CharacterSheet.jsx is the single source of truth
All `useState`, all stat calculations (`maxHp`, `fEv`, `mT`/`sT`, `aS`, `prof`, `effTraits`, etc.), all helper functions (`parseCost`, `spendCost`, `canAfford`, `costDisplay`), and all modal state live here. The three tab components receive everything they need as **explicit props** — no Context.

### Tab components are pure UI
`PlayTab`, `CharacterTab`, and `RulesNotesTab` contain only JSX. They import data files and UI primitives directly; computed values and state setters come from props.

### Domain cards import path
Always import from `data/domain-cards/index.js`, never from individual domain files or the old `data/domain-cards.js`.

### Do not touch without explicit instruction
`companion-tab.jsx`, `level-up-modal.jsx`, `trait-modal.jsx`, `ui.jsx` — stable, separate components.

---

## Data File Structure

### domain-cards (each card object)
```js
{
  level: 1,                  // 1–9, used for level-gating in the card selector
  name: "Bolt Beacon",
  type: "Spell",             // "Spell" | "Ability" | "Grimoire"
  recallCost: 1,
  cost: { type: "hope", amount: 1 },          // null if no cost
  optionalCost: { type: "stress", amount: 1, label: "..." }, // null if none
  passive: false,            // false = Quick Actions; true = Passives
  summary: "One-liner core mechanic for Quick Actions display",
  text: "Full description shown on expand",
  statEffects: [             // omit or null if none
    { stat: "evasion", amount: 1 },
    { stat: "thresholds", amount: "proficiency" },
    { stat: "armorScore", amount: 1, condition: "armored" },
    { stat: "thresholds", type: "override", condition: "unarmored" }, // Bare Bones only
    { playerChoice: true, choose: 2, options: [...] },                // Vitality only
  ],
}
```

### classes.js (subclass tier objects)
```js
foundation: {
  name: "Feature Name",
  passive: false,
  summary: "One-liner",
  text: "Full description",
  statEffects: [...],   // omitted if none
}
// Same shape for specialization and mastery
```

### ancestries.js (feature objects)
```js
{ name: "Endurance", passive: true, summary: "...", text: "...", statEffects: [...] }
```

### communities (object per community, not array)
```js
Highborne: { name: "Privilege", passive: true, summary: "...", text: "..." }
```

### statEffects reference

| `amount` value | meaning |
|---|---|
| number | flat bonus |
| `"proficiency"` | current `prof` value (computed at runtime) |
| `"halfAgility"` | `Math.floor(effTraits.Agility / 2)` — **floor, not ceil** |
| `"3+strength"` | `Math.max(0, 3 + effTraits.Strength)` |

| `condition` | meaning |
|---|---|
| `"armored"` | only if `c.armor` is set |
| `"unarmored"` | only if `c.armor` is not set |

| `type` | meaning |
|---|---|
| `"override"` | replace base threshold calc entirely (Bare Bones only) — do NOT add to `thresholdBonus` |

### Domain card levels
- Level 1: 3 cards per domain
- Levels 2–9: 2 cards per domain per level
- Cards are level-gated: only show `card.level <= c.level`
- **Levels 6–9 not yet written** — do not add placeholder cards

---

## Key Computed Values (`CharacterSheet.jsx`)

| Variable | Formula / source |
|---|---|
| `prof` | `baseProf + (c.profBonus \|\| 0)` — baseProf: L1=1, L2–4=2, L5–7=3, L8–10=4 |
| `subclassLevel` | `c.subclassLevel ?? (L≥8→3, L≥5→2, else 1)` — stored value from level-up picks takes precedence over tier fallback |
| `maxHp` | `cls.hp + hpBonus + hpFromLevelUp` |
| `maxStress` | `6 + stressBonus + stressFromLevelUp` |
| `fEv` | `cls.evasion + eM + evasionBonus` — `eM` from stat effects, `evasionBonus` from level-up picks |
| `mT / sT` | Minor/Severe thresholds — armor base or Bare Bones table + bonuses |
| `aS` | Armor Score — armor base or `3+STR` (Bare Bones) + `armorScoreBonus` + shield |
| `effTraits` | Base traits + equipment modifiers (armor Agility pen, weapon Finesse pen) |

---

## Tooling Conventions

### ⚠️ CRITICAL: Use bash + sed for all large file operations
**This is the most important instruction in this file for session efficiency.**
Never read an entire large file into context. Use `sed` or Python to extract only what's needed. Ignoring this will burn your token budget on file I/O alone.

```bash
# Extract lines 100–200 into a new file
sed -n '100,200p' source.jsx >> dest.jsx

# Find line boundaries before slicing
python3 -c "
with open('file.jsx') as f:
    for i, l in enumerate(f, 1):
        if 'marker string' in l:
            print(i, l[:60])
"

# Simple in-place substitution (no need to read + Edit)
sed -i 's/old string/new string/' file.jsx
```

### Build + dev commands
```bash
npx vite build    # vite is not on PATH — always use npx
npx vite          # dev server
```

---

## Workflow Rules

1. **Analysis before code** — if asked to evaluate a plan, provide analysis only. Do not write code until explicitly told to proceed.
2. **Branch first** — always create a feature branch before making any changes.
3. **Build check** — run `npx vite build` before pushing. Do not push a broken build.
4. **No behaviour changes** during structural refactors — UI and logic must be identical before and after.
5. **Minimal file reads** — use bash/sed/python. Only read a file into context if you genuinely need to reason about its contents, not just copy or transform it.

---

## Licensing

This app is built on the Daggerheart SRD v1.0 under the Darrington Press Community Gaming License. **Only SRD content is permitted.** Custom/homebrew content (e.g. Blood Hunter class, non-SRD domains) has been removed. Do not add non-SRD content to data files.

---

## Known TODOs

- Domain card levels 6–9 not yet written
- Vitality (Blade L5) requires a player-choice UI in the level-up modal — `playerChoice: true` in statEffects, choices permanently stored in character state, irreversible — requires a confirmation warning
- Play tab: consolidate all active features into Quick Actions with `summary` one-liners and inline expand for full `text`

---

## Branch conventions
- Feature branches follow the pattern `claude/<description>-<id>`
- **Never push to `main` directly** — push to feature branch → Netlify auto-deploys a preview URL → review → merge manually
