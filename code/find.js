var find = {}

// given a line of text containing words to search for, look through the array
// of memory objects for the memories that match, with the best match first
find.findTextInMemories = function(text, memories) {
  var console = require('console');
  if (text !== null && text.length > 0 && memories && memories.length > 0) {
    // TODO: implement the search, for now return everything
    return memories;
  } else {
    console.error('findTextInMemories has issues with inputs:', text, memories)
    return [];
  }
}

module.exports = find;
