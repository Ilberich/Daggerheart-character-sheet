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

### Do not touch
`companion-tab.jsx`, `level-up-modal.jsx`, `trait-modal.jsx`, `ui.jsx` — these are stable, separate components.

---

## Tooling Conventions

### Use bash + sed/python for large file operations
When extracting sections of large files into new files, **do not read the content into context** — pipe it directly with `sed` or a short Python script. This avoids burning tokens on source code that just passes through unchanged.

```bash
# Extract lines 100-200 of a file into a new file
sed -n '100,200p' source.jsx >> dest.jsx

# Find exact line boundaries with Python before slicing
python3 -c "
with open('file.jsx') as f:
    lines = f.readlines()
for i, l in enumerate(lines):
    if 'marker string' in l:
        print(i+1, l[:60])
"
```

Similarly, use `sed -i` for simple single-line substitutions rather than reading+editing via the Edit tool when the match is unambiguous.

### Build command
```bash
npx vite build    # vite is not on PATH; always use npx
```

### Dev server
```bash
npx vite
```

---

## Branch conventions
- Feature branches follow the pattern `claude/<description>-<id>`
- Never push to `main` directly — changes go to a feature branch for Netlify preview review
