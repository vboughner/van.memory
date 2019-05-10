'use strict'

const rest = {}

rest.storeStatement = function(userId, deviceId, text) {
  const console = require('console')
  if (userId !== null && text !== null) {
    const util = require('util')
    const configAndSecrets = util.getConfigAndSecrets()
    console.log('rest.storeMemory storing a memory for userId', userId, 'statement:', text)
    // TODO: implement
    return "Okay, I will remember you said " + text
  } else {
    console.error('rest.storeMemory received null userId or text')
    return "Unfortunately, I had a problem and could not store what you said. Please try again."
  }
}

rest.askQuestion = function(userId, text) {
  const console = require('console')
  if (userId !== null && text !== null) {
    const util = require('util')
    const configAndSecrets = util.getConfigAndSecrets()
    console.log('rest.askQuestion recalling memories for userId', userId, 'question:', text)
    // TODO: implement
    return 'symons birthday is march 27th'
  } else {
    console.error('rest.askQuestion received null userId or text')
    return 'Unfortunately, I had a problem and do not know who is asking this question.'
  }
}

module.exports = rest
