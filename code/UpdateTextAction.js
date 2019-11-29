'use strict'

/**
 * Gets response when saving information to memory.
 */
module.exports.function = function updateTextAction($vivContext, memory, replacementText) {
  const util = require("util.js")
  const rest = require("rest.js")
  if (replacementText.valueOf() !== memory.text.valueOf()) {
    return rest.updateText($vivContext, memory.whenStored, replacementText)
  } else {
    return {
      success: true,
      memories: [ memory ],
    }
  }
}
