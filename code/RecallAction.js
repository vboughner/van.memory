/**
 * Gets a response when recalling information from memory.
 */
module.exports.function = function recallAction (recallInput) {
  var console = require('console');
  var utility = require("util.js");
  var cleanedInput = utility.cleanString(recallInput);
  console.log("Exact Input: " + recallInput);
  console.log("Cleaned Input: " + cleanedInput);
  var response = "You asked me to recall: " + cleanedInput;
  return response;
}
