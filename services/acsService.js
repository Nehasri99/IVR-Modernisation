exports.processACS = (digit) => {
  // Use a switch statement for cleaner code
  switch (String(digit)) {
    case "1":
      return "Your account balance is ₹500.";
    case "2":
      return "Your recharge has been processed successfully. ₹100 has been added to your account.";
    case "3":
      return "Your last transaction was ₹200 at ABC Store.";
    case "4":
      return "You have an active home loan with ₹5,00,000 remaining.";
    default:
      return "ACS: Unknown request.";
  }
};



// Digit 1: Check Balance (ACS)

// Digit 2: Recharge Account (ACS)

// Digit 3: Last Transaction (ACS) 

// Digit 4: Loan Info (ACS)

// Digit 5: Talk to a Live Agent (BAP)

// Digit 6: Update Your Details (BAP) 

// Digit 7: Cancel a Request (BAP) 

// Digit 9: Repeat This Menu (Handled by the controller)