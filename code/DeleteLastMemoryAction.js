'use strict'

/**
 * Deletes the last memory stored
 */
module.exports.function = function deleteLastMemoryAction($vivContext, recallLastMemoryResponse) {
  const rest = require("rest.js")
  if (recallLastMemoryResponse.memories && recallLastMemoryResponse.memories.length === 1) {
    return rest.deleteOne($vivContext, recallLastMemoryResponse.memories[0])
  }
  return {
    success: false,
  }
}
