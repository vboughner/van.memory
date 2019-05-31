'use strict'

/**
 * Deletes one specific stored memory
 */
module.exports.function = function deleteOneAction($vivContext, whenStored) {
  const rest = require("rest.js")
  const response = rest.deleteOne($vivContext, whenStored)
  return response
}
