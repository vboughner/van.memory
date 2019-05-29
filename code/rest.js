'use strict'

const rest = {}

const CLIENT_VERSION = '1.0.0'
const MEMORIZE_URL = '/statement'
const RECALL_URL = '/question'
const LIST_URL = '/list'
const DELETE_ALL_URL = '/delete-all'

postQuery = function($vivContext, urlSuffix, additionalParams) {
  const console = require('console')
  console.log('$vivContext', $vivContext)
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
      userId: $vivContext.userId,
      deviceModel: $vivContext.deviceModel,
      canTypeId: $vivContext.canTypeId,
      handsFree: $vivContext.handsFree,
      timezone: $vivContext.timezone,
      storeCountry: $vivContext.storeCountry,
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

rest.memorize = function($vivContext, text) {
  const console = require('console')
  if ($vivContext !== null && text !== null) {
    const params = {
      statement: text,
    }
    const body = postQuery($vivContext, MEMORIZE_URL, params)
    if (body['success']) {
      return body['englishDebug']
    } else {
      console.error('rest.memorize received an error: ', body['errorCode'], body['errorMessage'])
      return body['errorMessage'] || body['englishDebug']
    }
  } else {
    console.error('rest.memorize received null $vivContext or text')
    return 'Unfortunately, I had a problem and could not store what you said. Please try again.'
  }
}

rest.recall = function($vivContext, text) {
  const console = require('console')
  if ($vivContext !== null && text !== null) {
    const params = {
      question: text,
    }
    const body = postQuery($vivContext, RECALL_URL, params)
    if (body['success']) {
      return body['englishDebug']
    } else {
      console.error('rest.recall received an error: ', body['errorCode'], body['errorMessage'])
      return body['errorMessage'] || body['englishDebug']
    }
  } else {
    console.error('rest.recall received null $vivContext or text')
    return 'Unfortunately, I had a problem and do not know who is asking this question.'
  }
}

rest.list = function($vivContext) {
  const console = require('console')
  if ($vivContext !== null) {
    const params = {
      list: true,
    }
    const body = postQuery($vivContext, LIST_URL, params)
    if (body['success'] && body['answers']) {
      const answers = body['answers']
      const memories = []
      for (let i = 0; i < answers.length; i++) {
        memories.push({
          text: answers[i].text,
          whenStored: answers[i].whenStored,
          howLongAgo: answers[i].howLongAgo,
        })
      }
      return {
        memories: memories,
      }
    } else {
      console.error('rest.list received an error: ', body['errorCode'], body['errorMessage'])
      return []
    }
  } else {
    console.error('rest.list received null $vivContext')
    return []
  }
}

rest.deleteAll = function($vivContext) {
  const console = require('console')
  if ($vivContext !== null) {
    const params = {
      deleteAll: true,
    }
    const body = postQuery($vivContext, DELETE_ALL_URL, params)
    if (body['success']) {
      return body['englishDebug']
    } else {
      console.error('rest.deleteAll received an error: ', body['errorCode'], body['errorMessage'])
      return body['errorMessage'] || body['englishDebug']
    }
  } else {
    console.error('rest.deleteAll received null $vivContext')
    return 'Unfortunately, I had a problem and do not know who is asking to delete memories.'
  }
}

module.exports = rest
