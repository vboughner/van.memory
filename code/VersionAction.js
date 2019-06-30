'use strict'

/**
 * Gets a list of all stored memories.
 */
module.exports.function = function versionAction($vivContext) {
  const rest = require("rest.js")
  const response = rest.getVersion($vivContext)
  const speech = response.success ?
    'My Brain lambda version is ' + response.serverVersion
    :
    'I had a problem trying to get the server version.'
  return {
    success: response.success,
    memoryCount: response.memoryCount,
    serverVersion: response.serverVersion,
    speech: speech,
  }
}
