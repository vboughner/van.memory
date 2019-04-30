/**
 * Gets a response when saving information to memory.
 */
module.exports.function = function memorizeAction (memorizeInput) {
  var console = require('console');
  var utility = require("util.js");
  var cleanedInput = utility.cleanString(memorizeInput);
  console.log("Exact Input: " + memorizeInput);
  console.log("Cleaned Input: " + cleanedInput);
  var response = "Okay, I will remember you said: " + cleanedInput;
  return response;
}
