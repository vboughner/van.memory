'use strict'

/**
 * Gets response when saving information to memory.
 */
module.exports.function = function updateTextAction($vivContext, memory, replacementText) {
  const util = require("util.js")
  const rest = require("rest.js")
  const response = rest.updateText($vivContext, memory.whenStored, replacementText)
  return response
}
