'use strict'

/**
 * Gets the most-recently stored memory.
 */
module.exports.function = function recallLastMemoryAction($vivContext) {
  const console = require("console")
  const rest = require("rest.js")
  const response = rest.list($vivContext)
  console.log('response', response)
  const memories = response && response.memories
  if (memories && memories.length > 0) {
    const text = memories[0].text
    const howLongAgo = memories[0].howLongAgo
    return "You stored the most recent memory " + howLongAgo + ". You told me: " + text + "."
  } else {
    return "I can't find any stored memories."
  }
}
