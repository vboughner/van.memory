'use strict'

/**
 * Gets help about how to use the capsule.
 */
module.exports.function = function helpAction($vivContext) {
  const rest = require("rest.js")
  const response = rest.help($vivContext)
  return response
}
