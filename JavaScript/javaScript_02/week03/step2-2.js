'use strict';

function threeFive(startIndex, stopIndex, threeCallback, fiveCallback) {
  const numbers = [];
  for (let i = startIndex; i <= stopIndex; i++) {
    numbers.push(i);
  }

  numbers.forEach(number => {
    if (number % 3 === 0 && number % 5 === 0) {
      threeCallback(number), fiveCallback(number);
    } else if (number % 3 === 0) {
      threeCallback(number);
    } else if (number % 5 === 0) {
      fiveCallback(number);
    } else {
      console.log('The number is not divisible by 3 or 5');
    }
  });
}

function sayThree(number) {
  console.log(`The number is divisible by 3`);
}

function sayFive(number) {
  console.log(`The number is divisible by 5`);
}

threeFive(10, 15, sayThree, sayFive);

// Do not change or remove anything below this line
module.exports = threeFive;
