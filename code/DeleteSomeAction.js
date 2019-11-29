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
      if (response.success) {
        count++
      }
    }
  }
  const success = Boolean(count == recallResponse.memories.length)
  return {
    success: success,
    count: count,
  }
}
