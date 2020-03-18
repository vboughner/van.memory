'use strict'

const rest = {}

const CLIENT_VERSION = '1.4.1'
const SERVICE_URL = '/list'

var types = require('types.js')
var console = require('console')

/**
 * Makes a REST api call, given the urlSuffix (which describes which api method is called), as well
 * as additional parameters that help define the call. Returns the body of the response.
 *
 * @param $vivContext
 * @param {string} urlSuffix
 * @param {Object} additionalParams
 * @returns {Object}
 */
const postQuery = function($vivContext, urlSuffix, additionalParams) {
  console.log('$vivContext', $vivContext)
  console.log('urlSuffix', urlSuffix)
  console.log('additionalParams', additionalParams)
  if (urlSuffix !== null && additionalParams !== null) {
    const http = require('http')
    const util = require('util')
    const configAndSecrets = util.getConfigAndSecrets()
    const secretClientApiKey = configAndSecrets['secretClientApiKey']
    const params = {
      secretClientApiKey: secretClientApiKey,
      clientVersion: CLIENT_VERSION,
      // limit what we place in vivContext so story caching will work
      vivContext: {
        bixbyUserId: $vivContext.bixbyUserId,
        canTypeId: $vivContext.canTypeId,
        device: $vivContext.device,
        deviceModel: $vivContext.deviceModel,
        handsFree: $vivContext.handsFree,
        is24HourFormat: $vivContext.is24HourFormat,
        locale: $vivContext.locale,
        timezone: $vivContext.timezone,
        storeCountry: $vivContext.storeCountry,
        userId: $vivContext.userId,
      },
    }
    const combinedParams = Object.assign(params, additionalParams)
    const options = {
      format: 'json',
      passAsJson: true,
      cacheTime: 0,
    }
    const combinedUrl = configAndSecrets['brainLambdaUrl'] + urlSuffix
    const response = http.postUrl(combinedUrl, combinedParams, options)
    // response contains properties set in the brain lambda code: statusCode and body
    return response.body
  } else {
    console.error('rest.postQuery received null urlSuffix or null additionalParams')
    return {}
  }
}

/**
 * Makes a new array so that the elements contain only what is defined in Memory concept.
 *
 * @param {Array} answers
 * @returns {Array}
 */
const makeMemoriesFromAnswers = function(answers) {
  if (answers && answers.length > 0) {
    const memories = []
    for (let i = 0; i < answers.length; i++) {
      memories.push({
        text: answers[i].text,
        whenStored: answers[i].whenStored,
        howLongAgo: answers[i].howLongAgo,
      })
    }
    return memories
  }
  return answers
}

/**
 * Gets a statement memorized and returns an object that contains the response,
 * as well as information about the item just memorized:
 *
 * {
 *   success,
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
 * @param {string} statement
 * @returns {Object}
 */
rest.memorize = function($vivContext, statement) {
  if ($vivContext && statement) {
    const params = {
      actionType: types.ACTION_TYPE_MEMORIZE,
      statement: statement,
    }
    const body = postQuery($vivContext, SERVICE_URL, params)
    if (body['success']) {
      return {
        success: true,
        memories: [
          {
            text: body['text'],
            whenStored: body['whenStored'],
            howLongAgo: body['howLongAgo'],
          },
        ],
      }
    } else {
      console.error('rest.memorize received an error: ', body['errorCode'], body['errorMessage'])
    }
  } else {
    console.error('rest.memorize received null $vivContext or statement')
  }
  return {
    success: false,
    memories: [],
  }
}

/**
 * Recalls a previously memorized statement, returns an object that contains the response text as
 * well an array of all the answers. The first answer in the array is the best answer.
 *
 * {
 *   success,
 *   question,
 *   memories: [
 *     {
 *       text,
 *       whenStored,
 *       howLongAgo,
 *       userId,
 *       deviceId,
 *       score,
 *     },
 *   ],
 *   memoryCount,
 *   searchText,
 * }
 *
 * @param $vivContext
 * @param {string} question
 * @returns {Object}
 */
rest.recall = function($vivContext, question) {
  if ($vivContext !== null && question !== null) {
    const params = {
      actionType: types.ACTION_TYPE_RECALL,
      question: question,
    }
    const body = postQuery($vivContext, SERVICE_URL, params)
    if (body['success']) {
      const memories = makeMemoriesFromAnswers(body['answers'])
      return {
        success: true,
        question: question,
        memories: memories,
        memoryCount: body['memoryCount'],
        searchText: body['searchText']
      }
    } else {
      console.error('rest.recall received an error: ', body['errorCode'], body['errorMessage'])
      return {
        success: false,
        question: question,
        memories: [],
        memoryCount: body['memoryCount'],
        searchText: body['searchText']
      }
    }
  } else {
    console.error('rest.recall received null $vivContext or question')
    return {
      success: false,
      question: question,
      memories: [],
      memoryCount: 0,
      searchText: '',
    }
  }
}

/**
 * Gets a list of all memorized statements, returns an object that contains success information and an
 * array of memory objects, or an empty array when something went wrong:
 *
 * {
 *   success,
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
 * @returns {Object}
 */
rest.list = function($vivContext) {
  if ($vivContext !== null) {
    const params = {
      actionType: types.ACTION_TYPE_LIST,
    }
    const body = postQuery($vivContext, SERVICE_URL, params)
    if (body['success'] && body['answers']) {
      const memories = makeMemoriesFromAnswers(body['answers'])
      return {
        success: body['success'],
        memories: memories,
      }
    } else {
      console.error('rest.list received an error: ', body['errorCode'], body['errorMessage'])
    }
  } else {
    console.error('rest.list received null $vivContext')
  }
  return {
    success: false,
    memories: [],
  }
}

/**
 * Deletes all memories, returns an output structure describing if the effort succeeded.
 *
 * @param $vivContext
 * @returns {object}
 */
rest.deleteAll = function($vivContext) {
  if ($vivContext !== null) {
    const params = {
      actionType: types.ACTION_TYPE_DELETE_ALL,
    }
    const body = postQuery($vivContext, SERVICE_URL, params)
    if (body['success']) {
      return {
        success: true,
      }
    } else {
      console.error('rest.deleteAll received an error: ', body['errorCode'], body['errorMessage'])
    }
  } else {
    console.error('rest.deleteAll received null $vivContext')
  }
  return {
    success: false,
  }
}

/**
 * Deletes one memory, an output structure describing if the effort succeeded.
 *
 * @param $vivContext
 * @param {object} memory
 * @returns {object}
 */
rest.deleteOne = function($vivContext, memory) {
  if ($vivContext !== null && memory && memory.whenStored !== null) {
    const params = {
      actionType: types.ACTION_TYPE_DELETE_ONE,
      whenStored: memory.whenStored,
    }
    const body = postQuery($vivContext, SERVICE_URL, params)
    if (body['success']) {
      return {
        success: true,
      }
    } else {
      console.error('rest.deleteOne received an error: ', body['errorCode'], body['errorMessage'])
    }
  } else {
    console.error('rest.deleteOne received null $vivContext, memory, or memory.whenStored')
  }
  return {
    success: false,
  }
}

/**
 * Get server version and number of memories.
 */
rest.getVersion = function($vivContext) {
  const params = {
    actionType: types.ACTION_TYPE_LIST,
  }
  const body = postQuery($vivContext, SERVICE_URL, params)
  if (body['success']) {
    return {
      success: true,
      serverVersion: body['serverVersion'],
      memoryCount: body['answers'] ? body['answers'].length : 0,
    }
  } else {
    console.error('rest.getVersion received an error: ', body['errorCode'], body['errorMessage'])
    return {
      success: false,
      serverVersion: 'unknown',
      memoryCount: 0,
    }
  }
}

/**
 * Update the text of a memory.
 */
rest.updateText = function($vivContext, whenStored, replacementText) {
  const params = {
    actionType: types.ACTION_TYPE_UPDATE_TEXT,
    whenStored: whenStored,
    replacementText: replacementText,
  }
  const body = postQuery($vivContext, SERVICE_URL, params)
  if (body['success']) {
    return {
      success: true,
      memories: [
        {
          text: body['text'],
          whenStored: body['whenStored'],
          howLongAgo: body['howLongAgo'],
        },
      ],
    }
  } else {
    console.error('rest.updateText received an error: ', body['errorCode'], body['errorMessage'])
    return {
      success: false,
      memories: [],
    }
  }
}

module.exports = rest
