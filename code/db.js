'use strict'

const db = {};

// memories in the database look like this:
// {
//     userId: 'name@samsung.com',
//     whenStored: 235834734,
//     text: 'my mothers birthday is in February',
// }

// stores a line of text in the db as another memory,
// returns true if successful, false if not successful
db.storeMemory = function(userId, text) {
  const console = require('console');
  if (userId !== null && text !== null) {
    console.log('db.storeMemory stored a memory for userId', userId, text)
    // TODO: implement db store
    return true;
  } else {
    console.error('db.storeMemory received null userId or text')
    return false;
  }
}

// loads everything from memory in the db for this user, returns an array of
// objects that represent the memories and when they were stored
db.loadMemories = function(userId) {
  const console = require('console');
  if (userId !== null) {
    console.log('db.loadMemories recalling all memories for userId', userId)
    // TODO: replace with real database load
    return [
      {
        text: 'symons birthday is march 27th',
        whenStored: 10004560,
      },
      {
        text: 'davids birthday is december 23rd',
        whenStored: 10008300,

      },
      {
        text: 'i hid the cookies in the cupboard under the sink',
        whenStored: 10001200,
      },
      {
        text: 'i took my medication at 2 oclock',
        whenStored: 10003200,
      },
      {
        text: 'i left the keys in the mess drawer in the kitchen',
        whenStored: 10001155,
      },
    ]
  } else {
    console.error('db.loadMemories received null userId')
    return [];
  }
}

// removes one memory from the database, given the original memory object made when recalling it,
// returns true if successful, false if not successful
db.eraseOneMemory = function(memory) {
  // TODO: implement
  return false;
}

// removes all memories for a user from the database,
// returns true if successful, false if not successful
db.eraseAllMemories = function(userId) {
  // TODO: implement
  return false;
}

module.exports = db;
