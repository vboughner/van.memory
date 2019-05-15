'use strict'

/**
 * Gets a list of all stored memories.
 */
module.exports.function = function listAction ($vivContext) {
  const rest = require("rest.js")
  const response = rest.recallAll($vivContext.userId)
  return response
}
