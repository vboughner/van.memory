'use strict'

const find = {}

// once built up by analysis by functions in this file, the memories passed as output
// from findTextInMemories look something like this:
// {
//     userId: 'name@samsung.com',
//     whenStored: 235834734,
//     text: 'my mothers birthday is in February',
//     distance: 22,
//     numWords: 1,
// }
//
// distance is the LevenshteinDistance between the memory and user search text,
// numWords is the count of how many of the input words were found in the memory

// given an array of memories, returns a similar array, but includes a new
// distance property that reflects the differences between each text in the
// array and the given text
function augmentMemoriesWithDistance(text, memories) {
  const console = require('console');
  const textLib = require('textLib');
  if (text !== null && text.length > 0 && memories && memories.length > 0) {
    const retval = [];
    for (let i = 0; i < memories.length; i++) {
      if (memories[i].text) {
        const distance = textLib.levenshteinDistance(memories[i].text, text);
        retval.push(Object.assign({}, memories[i], { distance: distance }));
      } else {
        console.error('augmentMemoriesWithDistance: no text property on memory, index', i);
      }
    }
    return retval;
  } else {
    console.error('augmentMemoriesWithDistance given empty text or memories')
    return [];
  }
}

// given an array of memories, returns a similar array, but includes a new numWords property
// that reflects how many of the given words have been found within each memory
function augmentMemoriesWithNumWords(words, memories) {
  const console = require('console');
  if (words && words.length > 0 && memories && memories.length > 0) {
    const retval = [];
    for (let i = 0; i < memories.length; i++) {
      if (memories[i].text) {
        let numWords = 0;
        for (let w = 0; w < words.length; w++) {
          if (memories[i].text.includes(words[w])) {
            numWords++;
          }
        }
        retval.push(Object.assign({}, memories[i], { numWords: numWords }));
      } else {
        console.error('augmentMemoriesWithNumWords: no text property on memory, index', i);
      }
    }
    return retval;
  } else {
    console.error('augmentMemoriesWithNumWords given empty text or memories')
    return [];
  }
}

// comparison function for an array sort, given two memories, comparies them by distance,
// number of words from the input that are found, as well as how long ago the memory was stored,
// having the highest number of words from the input that are included is the most important
function compareAugmentedMemories(a, b) {
  const console = require('console');
  // num words is critical and checked first
  if (a.numWords > b.numWords) {
    return -1;
  }
  if (a.numWords < b.numWords) {
    return 1;
  }
  // distance breaks ties
  if (a.distance < b.distance) {
    return -1;
  }
  if (a.distance > b.distance) {
    return 1;
  }
  // TODO: take into account when stored?
  return 0;
}

// given an array of memory objects, sorts the array by the distance
// between the elements, shortest distance elements first, ties are broken by
// when the memory was stored and how many input words are in the memory.
// returns a new array of memories in the right order, best ones first
function sortAugmentedMemories(memories) {
  const console = require('console');
  if (memories && memories.length > 0) {
    let retval = memories.slice();
    console.log('before the sort result is', retval)
    retval.sort(compareAugmentedMemories);
    console.log('after the sort result is', retval)
    return retval;
  } else {
    console.error('sortAugmentedMemories given empty memories')
    return [];
  }
}

// given a line of text containing words to search for, look through the array
// of memory objects for the memories that match, with the best match first
find.findTextInMemories = function(text, memories) {
  const console = require('console');
  const textLib = require('textLib');
  if (text !== null && text.length > 0 && memories && memories.length > 0) {
    let augmentedMemories = augmentMemoriesWithDistance(text, memories);
    const words = text.split(' ');
    augmentedMemories = augmentMemoriesWithNumWords(words, augmentedMemories);
    const sortedMemories = sortAugmentedMemories(augmentedMemories);
    return sortedMemories;
  } else {
    console.error('findTextInMemories has issues with inputs:', text, memories)
    return [];
  }
}

module.exports = find;
