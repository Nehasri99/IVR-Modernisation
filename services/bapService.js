exports.processBAP = (digit) => {
  switch (String(digit)) {
    case "5":
      return "Connecting you to a live agent. Please hold while we transfer your call.";
    case "6":
      return "Your details have been updated successfully.";
    case "7":
      return "Your request has been canceled.";
    default:
      return "BAP: Unknown request.";
  }
};