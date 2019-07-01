'use strict'

/**
 * Deletes the last memory stored
 */
module.exports.function = function deleteLastMemoryAction($vivContext, recallLastMemoryResponse) {
  const rest = require("rest.js")
  if (recallLastMemoryResponse.memories && recallLastMemoryResponse.memories.length === 1) {
    const response = rest.deleteOne($vivContext, recallLastMemoryResponse.memories[0])
    return response
  } else {
    return 'I did not delete anything. There should have been just a single last memory.'
  }
}
