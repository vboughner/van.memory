'use strict'

/**
 * Deletes the memory that was just memorized
 */
module.exports.function = function deleteJustMemorizedAction($vivContext, memorizeResponse) {
  const rest = require("rest.js")
  if (memorizeResponse.memories && memorizeResponse.memories.length === 1) {
    const response = rest.deleteOne($vivContext, memorizeResponse.memories[0])
    return response
  } else {
    return 'I did not delete anything. There should have been just a single memory there.'
  }
}
