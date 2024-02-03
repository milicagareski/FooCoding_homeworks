"use strict";

const values = ["a", "b", "c", "d", "a", "e", "f", "c"];

function makeUnique(arr) {
  const uniqueArray = [];
  for (let i of values) {
    if (!uniqueArray.includes(i)) {
      uniqueArray.push(i);
    }
  }
  return uniqueArray;
}

const uniqueValues = makeUnique(values);
console.log(uniqueValues);

// Do not change or remove anything below this line
module.exports = makeUnique;
