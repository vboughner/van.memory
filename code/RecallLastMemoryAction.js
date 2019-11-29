'use strict'

/**
 * Gets the most-recently stored memory.
 */
module.exports.function = function recallLastMemoryAction($vivContext) {
  const rest = require("rest.js")
  const response = rest.list($vivContext)
  const memories = response && response.memories
  if (memories && memories.length > 0) {
    const text = memories[0].text
    const whenStored = memories[0].whenStored
    const howLongAgo = memories[0].howLongAgo
    return {
      success: true,
      memories: [
        {
          text: text,
          whenStored: whenStored,
          howLongAgo: howLongAgo,
        },
      ],
    }
  } else {
    return {
      success: false,
      memories: [],
    }
  }
}
