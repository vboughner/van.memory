'use strict'

/**
 * Deletes one specific stored memory
 */
module.exports.function = function deleteOneAction($vivContext, memory) {
  const rest = require("rest.js")
  const response = rest.deleteOne($vivContext, memory)
  return response
}
