'use strict'

const util = {};

util.cleanString = function(utterance) {
  if (utterance !== null) {
    utterance = utterance.trim();
  }
  return utterance;
}

util.getConfigAndSecrets = function() {
  const config = require('config');
  const secret = require('secret');
  const whereami = config.get('whereami');
  const brainLambdaUrl = config.get('brainLambdaUrl');
  const secretClientApiKey = secret.get('secretClientApiKey');
  return {
    whereami: whereami,
    brainLambdaUrl: brainLambdaUrl,
    secretClientApiKey: secretClientApiKey,
  }
}

module.exports = util;
