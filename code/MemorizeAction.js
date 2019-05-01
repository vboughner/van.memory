'use strict'

/**
 * Gets response when saving information to memory.
 */
module.exports.function = function memorizeAction(memorizeInput, $vivContext) {
  const console = require('console');
  const utility = require("util.js");
  const db = require("db.js")
  const cleanedInput = utility.cleanString(memorizeInput);
  console.log("memorizeAction exact input is:", memorizeInput);
  console.log("memorizeAction cleaned input is", cleanedInput);
  const success = db.storeMemory($vivContext.userId, cleanedInput)
  if (success) {
    return "Okay, I will remember you said " + cleanedInput;
  } else {
    return "Unfortunately, I had a problem and could not store what you said. Please try again.";
  }
}
