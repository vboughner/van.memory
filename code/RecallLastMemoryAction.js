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
    const whenStored = memories[0].whenStored
    const howLongAgo = memories[0].howLongAgo
    const speech = "You stored the most recent memory " + howLongAgo + ". You told me: " + text + "."
    return {
      success: true,
      speech: speech,
      memory: {
        text: text,
        whenStored: whenStored,
        howLongAgo: howLongAgo,
      }
    }
  } else {
    return {
      success: false,
      speech: "I can't find any stored memories.",
      memory: null,
    }
  }
}
