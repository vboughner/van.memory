'use strict'

/**
 * Deletes one or more stored memories
 */
module.exports.function = function deleteSomeAction($vivContext, recallResponse) {
  const rest = require("rest.js")
  const deletedMemories = []
  if (recallResponse.memories) {
    for (let i = 0; i < recallResponse.memories.length; i++) {
      // TODO: replace with a more efficient REST api for deleting some memories
      const response = rest.deleteOne($vivContext, recallResponse.memories[i])
      if (response.success) {
        deletedMemories.push(recallResponse.memories[i])
      }
    }
  }
  const success = Boolean(deletedMemories.length == recallResponse.memories.length)
  return {
    success: success,
    deletedMemories: deletedMemories,
  }
}
