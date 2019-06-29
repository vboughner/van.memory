'use strict'

const CLIENT_VERSION = '1.0.8'

/**
 * Gets a list of all stored memories.
 */
module.exports.function = function versionAction($vivContext) {
  const rest = require("rest.js")
  const response = rest.getVersion($vivContext)
  const speech = response.success ?
    'Your client version is ' + CLIENT_VERSION + ', your server version is ' +
      response.serverVersion + ', the number of memories currently stored for you is ' +
      response.memoryCount :
    'I had a problem trying to get the server version.'
  return {
    success: response.success,
    memoryCount: response.memoryCount,
    serverVersion: response.serverVersion,
    clientVersion: CLIENT_VERSION,
    speech: speech,
  }
}
