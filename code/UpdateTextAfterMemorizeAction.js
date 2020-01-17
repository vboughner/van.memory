'use strict'

/**
 * Gets response when saving information to memory.
 */
module.exports.function = function updateTextAfterMemorizeAction($vivContext, memorizeResponse, replacementText) {
  const rest = require("rest.js")
  const memory = memorizeResponse.memories[0]
  if (replacementText.valueOf() !== memory.text.valueOf()) {
    return rest.updateText($vivContext, memory.whenStored, replacementText)
  } else {
    return {
      success: true,
      memories: [ memory ],
    }
  }
}
