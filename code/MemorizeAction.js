'use strict'

/**
 * Gets response when saving information to memory.
 */
module.exports.function = function memorizeAction(memorizeInput, $vivContext) {
  const util = require("util.js")
  const rest = require("rest.js")
  const cleanedInput = util.cleanString(memorizeInput)
  const response = rest.storeStatement($vivContext.userId, $vivContext.deviceId, cleanedInput)
  return response
}
