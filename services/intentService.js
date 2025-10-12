

// --- LAYER 1: The Broad Sorter ---
function detectIntent(query) {
  if (!query || typeof query !== 'string') {
    return "UNKNOWN";
  }

  query = query.toLowerCase();
  
  // ACS Keywords (Balance, Recharge, Transaction, Loan)
  if (query.includes("balance") || query.includes("recharge") || query.includes("transaction") || query.includes("loan")) {
    return "ACS";
  }
  
  // BAP Keywords (Agent, Update, Cancel)
  if (query.includes("agent") || query.includes("update") || query.includes("cancel") || query.includes("help")) {
    return "BAP";
  }
  
  return "UNKNOWN";
}


// --- LAYER 2: The Main Class with Detailed Logic ---
class IntentDetector {
  constructor() {
    // The "Rulebook" with all known intents
    this.intents = {
      balance_inquiry: { service: 'acs', digit: '1' },
      recharge_account: { service: 'acs', digit: '2' },
      last_transaction: { service: 'acs', digit: '3' }, // NEW
      loan_info: { service: 'acs', digit: '4' }, // NEW
      agent_support: { service: 'bap', digit: '5' }, // Digit updated
      update_details: { service: 'bap', digit: '6' }, // NEW
      cancel_action: { service: 'bap', digit: '7' }, // NEW
    };
  }

  // The Main Orchestrator Method
  detectIntent(query) {
    if (!query || typeof query !== 'string') {
      return { intent: "unknown", service: "unknown", digit: "0", confidence: 0.0 };
    }

    const simpleResult = detectIntent(query); // Ask the broad sorter first
    
    if (simpleResult === "UNKNOWN") {
      return { intent: "unknown", service: "unknown", digit: "0", confidence: 0.0 };
    }

    // Now, call the correct specialist based on the broad result
    if (simpleResult === "ACS") {
      return this.determineACSIntent(query);
    } else if (simpleResult === "BAP") {
      return this.determineBAPIntent(query);
    }

    return { intent: "unknown", service: "unknown", digit: "0", confidence: 0.0 };
  }

  // ACS Specialist: Figures out which of the 4 ACS tasks is needed
  determineACSIntent(query) {
    query = query.toLowerCase();
    
    if (query.includes("transaction")) {
      return { intent: "last_transaction", service: "acs", digit: "3", confidence: 0.9 };
    }
    if (query.includes("loan")) {
      return { intent: "loan_info", service: "acs", digit: "4", confidence: 0.9 };
    }
    if (query.includes("recharge") || query.includes("top up")) {
      return { intent: "recharge_account", service: "acs", digit: "2", confidence: 0.85 };
    }
    // Default to balance inquiry if other keywords are present
    return { intent: "balance_inquiry", service: "acs", digit: "1", confidence: 0.8 };
  }

  // BAP Specialist: Figures out which of the 3 BAP tasks is needed
  determineBAPIntent(query) {
    query = query.toLowerCase();

    if (query.includes("update")) {
      return { intent: "update_details", service: "bap", digit: "6", confidence: 0.9 };
    }
    if (query.includes("cancel")) {
      return { intent: "cancel_action", service: "bap", digit: "7", confidence: 0.9 };
    }
    // Default to agent support for other help-related keywords
    return { intent: "agent_support", service: "bap", digit: "5", confidence: 0.8 };
  }

  getIntentMapping() {
    return this.intents;
  }
}

module.exports = {
  IntentDetector: new IntentDetector()
};
