'use strict'

const rest = {}

rest.storeStatement = function(userId, deviceId, text) {
  const console = require('console')
  if (userId !== null && text !== null) {
    const http = require('http')
    const util = require('util')
    const configAndSecrets = util.getConfigAndSecrets()
    console.log('statement:', text)
    const params = {
      statement: text,
      userId: userId,
      deviceId: deviceId,
      secretClientApiKey: configAndSecrets['secretClientApiKey'],
    }
    const options = {
      format: 'json',
      passAsJson: true,
      returnHeaders: true,
    }
    const response = http.postUrl(configAndSecrets['questionUrl'], params, options)
    const responseText = JSON.parse(response['responseText'])
    const body = responseText['body']
    const answer = body['answer']
    console.log('answer:', answer)
    return answer
  } else {
    console.error('rest.storeMemory received null userId or text')
    return "Unfortunately, I had a problem and could not store what you said. Please try again."
  }
}

rest.askQuestion = function(userId, text) {
  const console = require('console')
  if (userId !== null && text !== null) {
    const http = require('http')
    const util = require('util')
    const configAndSecrets = util.getConfigAndSecrets()
    console.log('question:', text)
    const params = {
      question: text,
      userId: userId,
      secretClientApiKey: configAndSecrets['secretClientApiKey'],
    }
    const options = {
      format: 'json',
      passAsJson: true,
      returnHeaders: true,
    }
    const response = http.postUrl(configAndSecrets['statementUrl'], params, options)
    const responseText = JSON.parse(response['responseText'])
    const body = responseText['body']
    const answer = body['answer']
    console.log('answer:', answer)
    return answer
  } else {
    console.error('rest.askQuestion received null userId or text')
    return 'Unfortunately, I had a problem and do not know who is asking this question.'
  }
}

module.exports = rest
