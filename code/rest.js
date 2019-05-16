'use strict'

const rest = {}

const CLIENT_VERSION = '1.0.0'
const STORE_STATEMENT_URL = '/statement'
const ASK_QUESTION_URL = '/question'
const RECALL_ALL_URL = '/recall'

postQuery = function(urlSuffix, additionalParams) {
  const console = require('console')
  console.log('urlSuffix', urlSuffix)
  console.log('additionalParams', additionalParams)
  if (urlSuffix !== null && params !== null) {
    const http = require('http')
    const util = require('util')
    const configAndSecrets = util.getConfigAndSecrets()
    const secretClientApiKey = configAndSecrets['secretClientApiKey']
    const params = {
      secretClientApiKey: secretClientApiKey,
      clientVersion: CLIENT_VERSION,
    }
    const combinedParams = Object.assign(params, additionalParams)
    const options = {
      format: 'json',
      passAsJson: true,
      returnHeaders: true,
    }
    const combinedUrl = configAndSecrets['brainLambdaUrl'] + urlSuffix
    const response = http.postUrl(combinedUrl, combinedParams, options)
    const responseText = JSON.parse(response['responseText'])
    const body = responseText['body']
    console.log('body:', body)
    return body
  } else {
    console.error('rest.postQuery received null urlSuffix or null additionalParams')
    return {}
  }
}

rest.storeStatement = function(userId, deviceId, text) {
  const console = require('console')
  if (userId !== null && text !== null) {
    const params = {
      statement: text,
      userId: userId,
      deviceId: deviceId,
    }
    const body = postQuery(STORE_STATEMENT_URL, params)
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
    const params = {
      question: text,
      userId: userId,
    }
    const body = postQuery(ASK_QUESTION_URL, params)
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
    const params = {
      recall: true,
      userId: userId,
    }
    const body = postQuery(RECALL_ALL_URL, params)
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
