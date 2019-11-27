'use strict'

/**
 * Gets help about how to use the capsule.
 */
module.exports.function = function helpAction() {
  return {
    success: true,
    speech: "Tell me to remember something, and I'll remember it. Ask me a question that includes a few words from that memory, and I'll find it for you.",
  }
}
