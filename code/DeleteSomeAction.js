'use strict'

/**
 * Deletes one or more stored memories
 */
module.exports.function = function deleteSomeAction($vivContext, recallResponse) {
  const rest = require("rest.js")
  let count = 0
  if (recallResponse.memories) {
    for (let i = 0; i < recallResponse.memories.length; i++) {
      // TODO: replace with a more efficient REST api for deleting some memories
      const response = rest.deleteOne($vivContext, recallResponse.memories[i])
      count++
    }
  }
  // TODO: replace speech with what comes from the new REST api and think about returning a more complex response
  const speech = (count == 1) ? 'I deleted 1 memory.' : 'I deleted ' + count + ' memories.'
  return speech
}
