// Get market-relevant keywords - used for filtering market-impacting news
export const marketKeywords = {
  positive: [
    "growth",
    "profit",
    "gain",
    "surge",
    "rise",
    "increase",
    "up",
    "higher",
    "rally",
    "bull",
    "bullish",
    "rebound",
    "recovery",
    "boom",
    "exceed expectations",
    "outperform",
    "beat",
    "strong",
    "positive",
    "optimistic",
    "confidence",
    "dividend",
    "upgrade",
    "innovation",
    "expansion",
    "acquisition",
    "merger",
  ],
  negative: [
    "decline",
    "loss",
    "drop",
    "fall",
    "plunge",
    "decrease",
    "down",
    "lower",
    "slump",
    "bear",
    "bearish",
    "recession",
    "crisis",
    "crash",
    "miss expectations",
    "underperform",
    "weak",
    "negative",
    "pessimistic",
    "fear",
    "concern",
    "worry",
    "warning",
    "downgrade",
    "layoff",
    "restructuring",
    "bankruptcy",
    "lawsuit",
    "investigation",
  ],
  // Financial metrics that could indicate important news
  metrics: [
    "earnings",
    "revenue",
    "sales",
    "profit",
    "margin",
    "forecast",
    "guidance",
    "outlook",
    "projection",
    "target",
    "estimate",
    "quarter",
    "annual",
    "fiscal",
    "eps",
    "pe ratio",
    "market cap",
    "valuation",
    "debt",
    "cash flow",
  ],
  // Market events and conditions
  events: [
    "announcement",
    "report",
    "release",
    "conference",
    "statement",
    "testimony",
    "meeting",
    "vote",
    "decision",
    "approval",
    "rejection",
    "launch",
    "debut",
    "ipo",
    "offering",
    "split",
    "dividend",
    "buyback",
    "acquisition",
    "merger",
    "takeover",
    "spinoff",
    "regulation",
    "policy",
    "law",
    "bill",
    "act",
  ],
};

export const marketSentimentLabels = {
  // Extend the default sentiment vocabulary with market-specific terms

  // Positive market terms (with their respective weights)
  labels: {
    // Strong positive market terms (weight: 2)
    outperform: 2,
    breakthrough: 2,
    exceed: 2,
    beat: 2,
    surge: 2,
    soar: 2,
    rally: 2,
    boom: 2,
    robust: 2,
    bullish: 2,
    upgrade: 2,
    innovation: 2,
    "stronger-than-expected": 2,
    recovery: 2,
    upside: 2,
    growth: 2,
    profitability: 2,
    outperformed: 2,
    exceeded: 2,
    consensus: 2,
    // Moderate positive market terms (weight: 1)
    gain: 1,
    increase: 1,
    rise: 1,
    up: 1,
    higher: 1,
    positive: 1,
    profit: 1,
    advantage: 1,
    opportunity: 1,
    strength: 1,
    strong: 1,
    improve: 1,
    improved: 1,
    expanding: 1,
    expanded: 1,
    momentum: 1,
    confident: 1,
    confidence: 1,
    progress: 1,
    successful: 1,
    achieves: 1,
    advancing: 1,
    growing: 1,
    favorable: 1,
    stability: 1,
    stable: 1,
    optimistic: 1,
    upward: 1,
    promising: 1,
    efficiency: 1,
    efficient: 1,
    dividend: 1,
    innovative: 1,
    leading: 1,
    resilient: 1,
    resilience: 1,

    // Strong negative market terms (weight: -2)
    crash: -2,
    collapse: -2,
    plummet: -2,
    plunge: -2,
    bankrupt: -2,
    bankruptcy: -2,
    default: -2,
    recession: -2,
    crisis: -2,
    bearish: -2,
    downgrade: -2,
    miss: -2,
    missed: -2,
    disappointing: -2,
    disappointment: -2,
    warning: -2,
    "weaker-than-expected": -2,
    liquidation: -2,
    shortfall: -2,
    restructuring: -2,
    layoffs: -2,
    investigation: -2,
    penalty: -2,
    fine: -2,
    lawsuit: -2,
    litigation: -2,
    scandal: -2,
    fraud: -2,
    violation: -2,

    // Moderate negative market terms (weight: -1)
    decline: -1,
    decrease: -1,
    lower: -1,
    drop: -1,
    fall: -1,
    fell: -1,
    down: -1,
    negative: -1,
    loss: -1,
    weak: -1,
    weakness: -1,
    volatile: -1,
    volatility: -1,
    concern: -1,
    concerned: -1,
    uncertainty: -1,
    uncertain: -1,
    risk: -1,
    risky: -1,
    struggle: -1,
    struggling: -1,
    pressure: -1,
    pressured: -1,
    challenge: -1,
    challenging: -1,
    slowdown: -1,
    slowing: -1,
    slower: -1,
    caution: -1,
    cautious: -1,
    below: -1,
    underperform: -1,
    cut: -1,
    cutting: -1,
    suspension: -1,
    suspended: -1,
    delay: -1,
    delayed: -1,
    postpone: -1,
    postponed: -1,
    dispute: -1,
    shortage: -1,
    deficit: -1,
    debt: -1,
    oversupply: -1,
    recall: -1,
    recalled: -1,
    regulatory: -1,
    regulation: -1,
    burden: -1,
    costly: -1,
    expenses: -1,
    expense: -1,
    expensive: -1,
  },
};
