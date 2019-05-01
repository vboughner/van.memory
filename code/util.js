'use strict'

const utility = {};

utility.cleanString = function(utterance) {
  if (utterance !== null) {
    utterance = utterance.toLowerCase();
    utterance = utterance.replace(/[,?.!;']/g,"");
    utterance = utterance.trim();
  }
  return utterance;
}

module.exports = utility;
