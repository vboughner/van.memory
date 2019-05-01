/**
 * Gets a verbal response when saving information to memory.
 */
module.exports.function = function memorizeAction (memorizeInput, $vivContext) {
  var console = require('console');
  var utility = require("util.js");
  var db = require("db.js")
  var cleanedInput = utility.cleanString(memorizeInput);
  console.log("Exact Input: " + memorizeInput);
  console.log("Cleaned Input: " + cleanedInput);
  var success = db.storeMemory($vivContext.userId, cleanedInput)
  if (success) {
    return "Okay, I will remember you said " + cleanedInput;
  } else {
    return "Unfortunately, I had a problem and could not store what you said. Please try again.";
  }
}
