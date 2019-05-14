'use strict'

const util = {};

util.cleanString = function(utterance) {
  if (utterance !== null) {
    // utterance = utterance.toLowerCase();
    // utterance = utterance.replace(/[,?.!;']/g,"");
    utterance = utterance.trim();
  }
  return utterance;
}

util.getConfigAndSecrets = function() {
  const config = require('config');
  const whereami = config.get('whereami');
  const questionUrl = config.get('questionUrl');
  const statementUrl = config.get('statementUrl');
  const secret = require('secret');
  const secretClientApiKey = secret.get('secretClientApiKey');
  return {
    whereami: whereami,
    questionUrl: questionUrl,
    statementUrl: statementUrl,
    secretClientApiKey: secretClientApiKey,
  }
}

module.exports = util;
