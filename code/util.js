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
  let secretClientApiKey = secret.get('secretClientApiKey');
  if (!secretClientApiKey) {
    // get an example key from the capsule.properties file
    secretClientApiKey = config.get('secretClientApiKey');
  }

  return {
    whereami: whereami,
    brainLambdaUrl: brainLambdaUrl,
    secretClientApiKey: secretClientApiKey,
  }
}

module.exports = util;
