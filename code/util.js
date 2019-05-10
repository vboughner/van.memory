'use strict'

const util = {};

util.cleanString = function(utterance) {
  if (utterance !== null) {
    utterance = utterance.toLowerCase();
    utterance = utterance.replace(/[,?.!;']/g,"");
    utterance = utterance.trim();
  }
  return utterance;
}

util.getConfigAndSecrets = function() {
  const config = require('config');
  const whereami = config.get('whereami');
  const secret = require('secret');
  const secretClientApiKey = secret.get('secretClientApiKey');
  return {
    whereami: whereami,
    secretClientApiKey: secretClientApiKey,
  }
}

module.exports = util;
