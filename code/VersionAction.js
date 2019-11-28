'use strict'

/**
 * Gets a list of all stored memories.
 */
module.exports.function = function versionAction($vivContext) {
  const rest = require("rest.js")
  const response = rest.getVersion($vivContext)
  return {
    success: response.success,
    memoryCount: response.memoryCount,
    serverVersion: response.serverVersion,
  }
}
