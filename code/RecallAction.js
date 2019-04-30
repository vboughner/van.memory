/**
 * Gets a response when recalling information from memory.
 */
module.exports.function = function recallAction (recallInput) {
  var console = require('console');
  var utility = require("util.js");
  var db = require("db.js")
  var find = require("find.js")
  var cleanedInput = utility.cleanString(recallInput);
  console.log("Exact Input: " + recallInput);
  console.log("Cleaned Input: " + cleanedInput);
  var memories = db.loadMemories('TODO:userId');
  var bestMemories = find.findTextInMemories(cleanedInput, memories);
  if (bestMemories && bestMemories.length > 0) {
    return "You asked me to recall " + cleanedInput + '. You told me ' + bestMemories[0].text;
  } else {
    return 'I cannot recall that right now.'
  }
}
