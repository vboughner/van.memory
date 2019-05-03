'use strict'

/**
 * Gets response when user wishes to recall information from memory.
 */
module.exports.function = function recallAction(recallInput, $vivContext) {
  const console = require('console');
  const utility = require("util.js");
  const db = require("db.js")
  const find = require("find.js")
  const cleanedInput = utility.cleanString(recallInput);
  console.log("recallAction exact input is:", recallInput);
  console.log("recallAction cleaned input is", cleanedInput);
  const memories = db.loadMemories($vivContext.userId);
  const bestMemories = find.findTextInMemories(cleanedInput, memories);
  if (bestMemories && bestMemories.length > 0) {
    console.log('recallAction final sorted memories are', bestMemories)
    const numWordsInInput = cleanedInput.split(' ').length;
    // TODO: add in an indicator of how long ago you told me
    // TODO: add layouts that show the other possible options
    if (bestMemories[0].numWords === 0) {
      return "You asked me to recall " + cleanedInput + '. I do not have a memory of anything like that.';
    } else if (bestMemories[0].numWords < numWordsInInput) {
      return "You asked me to recall " + cleanedInput + '. The closest thing I can remember is that you told me ' + bestMemories[0].text + '.';
    } else {
      return "You asked me to recall " + cleanedInput + '. You told me ' + bestMemories[0].text + '.';
    }
  } else {
    return 'I do not have any memories yet, please give me something to remember first.'
  }
}
