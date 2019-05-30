'use strict'

const rest = {}

const CLIENT_VERSION = '1.0.0'
const MEMORIZE_URL = '/statement'
const RECALL_URL = '/question'
const LIST_URL = '/list'
const DELETE_ALL_URL = '/delete-all'

/**
 * Makes a REST api call, given the urlSuffix (which describes which api method is called), as well
 * as additional parameters that help define the call. Returns the body of the response.
 *
 * @param $vivContext
 * @param urlSuffix
 * @param additionalParams
 * @returns {object}
 */
const postQuery = function($vivContext, urlSuffix, additionalParams) {
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

/**
 * Gets a statement memorized and returns an object that contains the response text as
 * well as information about the item just memorized:
 *
 * {
 *   success,
 *   statement,
 *   text,
 *   whenStored,
 *   howLongAgo,
 *   speech,
 * }
 *
 * @param $vivContext
 * @param statement
 * @returns {object}
 */
rest.memorize = function($vivContext, statement) {
  const console = require('console')
  if ($vivContext !== null && statement !== null) {
    const params = {
      statement: statement,
    }
    const body = postQuery($vivContext, MEMORIZE_URL, params)
    if (body['success']) {
      return {
        success: body['success'],
        statement: statement,
        text: statement,
        whenStored: body['whenStored'],
        howLongAgo: body['howLongAgo'],
        speech: body['speech'],
      }
    } else {
      console.error('rest.memorize received an error: ', body['errorCode'], body['errorMessage'])
      return {
        success: body['success'],
        statement: statement,
        text: statement,
        whenStored: '',
        howLongAgo: '',
        speech: body['errorMessage'] || body['speech']
      }
    }
  } else {
    console.error('rest.memorize received null $vivContext or statement')
    return {
      success: false,
      statement: statement,
      text: statement,
      whenStored: '',
      howLongAgo: '',
      speech: 'Unfortunately, I had a problem and could not store what you said. Please try again.',
    }
  }
}

/**
 * Recalls a previously memorized statement, returns an object that contains the response text as
 * well as information about the item memorized, as well as an array of all the answers.
 * The first answer in the array is the same as the highlighted items and speech.
 *
 * {
 *   success,
 *   question,
 *   text,
 *   whenStored,
 *   howLongAgo,
 *   speech,
 *   answers: [
 *     {
 *       text,
 *       whenStored,
 *       howLongAgo,
 *       userId,
 *       deviceId,
 *       score,
 *     },
 *   ],
 * }
 *
 * @param $vivContext
 * @param question
 * @returns {object}
 */
rest.recall = function($vivContext, question) {
  const console = require('console')
  if ($vivContext !== null && question !== null) {
    const params = {
      question: question,
    }
    const body = postQuery($vivContext, RECALL_URL, params)
    if (body['success']) {
      const bestAnswer = body['answers'][0]
      return {
        success: body['success'],
        question: question,
        text: bestAnswer['text'],
        whenStored: bestAnswer['whenStored'],
        howLongAgo: bestAnswer['howLongAgo'],
        speech: body['speech'],
        answers: body['answers'],
      }
    } else {
      console.error('rest.recall received an error: ', body['errorCode'], body['errorMessage'])
      return {
        success: body['success'],
        question: question,
        text: '',
        whenStored: 0,
        howLongAgo: '',
        speech: body['errorMessage'] || body['speech'],
        answers: [],
      }
    }
  } else {
    console.error('rest.recall received null $vivContext or question')
    return {
      success: false,
      question: question,
      text: '',
      whenStored: 0,
      howLongAgo: '',
      speech: 'Unfortunately, I had a problem and do not know who is asking this question.',
      answers: [],
    }
  }
}

/**
 * Gets a list of all memorized statements, returns an object that contains success information and an
 * array of memory objects, or an empty array when something went wrong:
 *
 * {
 *   success,
 *   speech,
 *   memories: [
 *     {
 *       text,
 *       whenStored,
 *       howLongAgo,
 *     },
 *   ],
 * }
 *
 * @param $vivContext
 * @returns {array}
 */
rest.list = function($vivContext) {
  const console = require('console')
  if ($vivContext !== null) {
    const params = {
      list: true,
    }
    const body = postQuery($vivContext, LIST_URL, params)
    if (body['success'] && body['answers']) {
      const answers = body['answers']
      const memories = [] // new array required so it contains only what is defined in ListResponse concept
      for (let i = 0; i < answers.length; i++) {
        memories.push({
          text: answers[i].text,
          whenStored: answers[i].whenStored,
          howLongAgo: answers[i].howLongAgo,
        })
      }
      return {
        success: body['success'],
        memories: memories,
        speech: body['speech'],
      }
    } else {
      console.error('rest.list received an error: ', body['errorCode'], body['errorMessage'])
      return {
        success: false,
        memories: [],
        speech: body['errorMessage'] || body['speech'],
      }
    }
  } else {
    console.error('rest.list received null $vivContext')
    return {
      success: false,
      memories: [],
      speech: 'I could not understand who was asking.',
    }
  }
}

/**
 * Deletes all memories, returns a simple speech string describing the effort.
 *
 * @param $vivContext
 * @returns {string}
 */
rest.deleteAll = function($vivContext) {
  const console = require('console')
  if ($vivContext !== null) {
    const params = {
      deleteAll: true,
    }
    const body = postQuery($vivContext, DELETE_ALL_URL, params)
    if (body['success']) {
      return body['speech']
    } else {
      console.error('rest.deleteAll received an error: ', body['errorCode'], body['errorMessage'])
      return body['errorMessage'] || body['speech']
    }
  } else {
    console.error('rest.deleteAll received null $vivContext')
    return 'Unfortunately, I had a problem and do not know who is asking to delete memories.'
  }
}

module.exports = rest
