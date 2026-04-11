function DaggerheartSheet({ c, setC, onBack, themeName, setTheme }) {
  const [tab, setTab] = useState("Play");
  const [rulesSearch, setRulesSearch] = useState("");
  const [rulesCat, setRulesCat] = useState("All");
  const [editHdr, setEditHdr] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [restModal, setRestModal] = useState(null); // null | 'choose' | 'short' | 'long'
  const [restChoices, setRestChoices] = useState([]);
  const [restResults, setRestResults] = useState(null); // null | { type, lines[] }
  const [editingClass, setEditingClass] = useState(false);
  const [editingSubclass, setEditingSubclass] = useState(false);
  const [editingAncestry, setEditingAncestry] = useState(false);
  const [editingAncestrySecondary, setEditingAncestrySecondary] = useState(false);
  const [editingMixed, setEditingMixed] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState(false);
  const [swapCardsOnRest, setSwapCardsOnRest] = useState(false);
  const [cardSwapOpen, setCardSwapOpen] = useState(false);
  const [unchosenCardsOpen, setUnchosenCardsOpen] = useState(false); // collapsible unchosen domain cards section
  const [classOpen, setClassOpen] = useState(false);
  const [heritageOpen, setHeritageOpen] = useState(false);
  const [domainsOpen, setDomainsOpen] = useState(false);
  const [gearOpen, setGearOpen] = useState(false);
  const [traitModalOpen, setTraitModalOpen] = useState(false);
  const [levelUpOpen, setLevelUpOpen] = useState(false);
  const u = useCallback((k, v) => setC(p => ({ ...p, [k]: v })), [setC]);
  const tog = useCallback((k, i) => setC(p => { const a = [...p[k]]; a[i] = !a[i]; return { ...p, [k]: a }; }), [setC]);