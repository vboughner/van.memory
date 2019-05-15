'use strict'

const rest = {}

const clientVersion = '1.0.0'

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
      clientVersion: clientVersion,
    }
    const options = {
      format: 'json',
      passAsJson: true,
      returnHeaders: true,
    }
    const response = http.postUrl(configAndSecrets['questionUrl'], params, options)
    const responseText = JSON.parse(response['responseText'])
    const body = responseText['body']
    console.log('body:', body)
    if (body['success']) {
      return body['englishDebug']
    } else {
      console.error('rest.storeMemory received an error: ', body['errorCode'], body['errorMessage'])
      return body['errorMessage'] || body['englishDebug']
    }
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
      clientVersion: clientVersion,
    }
    const options = {
      format: 'json',
      passAsJson: true,
      returnHeaders: true,
    }
    const response = http.postUrl(configAndSecrets['statementUrl'], params, options)
    const responseText = JSON.parse(response['responseText'])
    const body = responseText['body']
    console.log('body:', body)
    if (body['success']) {
      return body['englishDebug']
    } else {
      console.error('rest.askQuestion received an error: ', body['errorCode'], body['errorMessage'])
      return body['errorMessage'] || body['englishDebug']
    }    
  } else {
    console.error('rest.askQuestion received null userId or text')
    return 'Unfortunately, I had a problem and do not know who is asking this question.'
  }
}

rest.recallAll = function(userId) {
  const console = require('console')
  if (userId !== null) {
    const http = require('http')
    const util = require('util')
    const configAndSecrets = util.getConfigAndSecrets()
    console.log('recall')
    const params = {
      recall: true,
      userId: userId,
      secretClientApiKey: configAndSecrets['secretClientApiKey'],
      clientVersion: clientVersion,
    }
    const options = {
      format: 'json',
      passAsJson: true,
      returnHeaders: true,
    }
    const response = http.postUrl(configAndSecrets['recallUrl'], params, options)
    const responseText = JSON.parse(response['responseText'])
    const body = responseText['body']
    console.log('body:', body)
    if (body['success'] && body['answers']) {
      const answers = body['answers']
      const memories = []
      for (let i = 0; i < answers.length; i++) {
        memories.push({
          text: answers[i].text,
          whenStored: answers[i].whenStored,
        })
      }
      return {
        memories: memories,
      }
    } else {
      console.error('rest.recallAll received an error: ', body['errorCode'], body['errorMessage'])
      return []
    }    
  } else {
    console.error('rest.recallAll received null userId')
    return []
  }
}

module.exports = rest
