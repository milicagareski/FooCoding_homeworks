// 1. Write a console.log statement saying "Hello World!" for each language that you know.

console.log(`Hello world`); // English
console.log(`Zdravo svet`); // Macedonian
console.log(`Zdravo svete`); // Serbian
console.log(`Hola mundo`); // Spanish
console.log(`Hallo Welt`); // German
console.log(`Ciao mundo`); // Italian

// 2 Consider the following code. console.log('I'm awesome'). Find a solution for this error

console.log(`I'm awesome`);

// 3.  Declare a variable x and initialize it with an integer
//  3.1 First, declare your variable x (do not initialize it yet).
let x;
// 3.2 Add a console.log statement that explains in words what you think the value of x is, like in this example:
console.log(`The value of x will be undefined`);
// 3.3 Add a console.log statement that logs the value of x.
console.log(x);
//  3.4 Now initialize your variable x with an integer.
x = 5;
//  3.5 Next, add a console.log statement that explains what you think the value of x is.
console.log(`The value of x will be 5`);
//  3.6 Add a console.log statement that logs the value of x.
console.log(x);

// 4. Declare a variable y and assign a string to it.
let y = "Hello John";
// 4.1 Write a console.log statement in which you explain in words what you think the value of the string is.
console.log(`The value of my string will be Hello John`);
//  4.2 Now console.log the variable y.
console.log(y);
//  4.3 Now assign a new string to the variable y.
y = "Hello Anna";
// 4.4 Just like what you did before write a console.log statement that explains in words what you think will be logged to the console.
console.log(`The value of my string will be Hello Anna`);
//  4.5 Now console.log y again.
console.log(y);

// 5. How do you round the number 7.25, to the nearest integer (i.e., whole number)?

//  5.1 Declare a variable z and assign the number 7.25 to it.
let z = 7.25;
//  5.2 console.log z.
console.log(z);
//  5.3 Declare another variable a that has the value of z but rounded to the nearest integer.
let a = Math.round(z);
//  5.4 console.log a.
console.log(a);
// 5.5 So now we have z and a find a way to compare the two values and store the highest of the two in a new variable.
let highestNumber = z > a ? z : a;
//  5.6 console.log the highest value.
console.log(highestNumber);

// 6. Arrays
// 6.1 Declare an empty array. Make sure that the name you choose indicates 'plurality', because an array is capable of containing more than one element. (See Naming conventions).
let numbers = [];
//  6.2 Write a console.log statement that explains in words what you think the value of the array is.
console.log(`The value of the array will be empthy array`);
//  6.3 console.log your array.
console.log(numbers);
// 6.4 Create an array that has your favorite animals inside (see if you can find a good name that exactly describes what this variable will hold).
let favouriteAnimals = [`fish`, `rabbit`, `dog`];
//  6.5 Log your array.
console.log(favouriteAnimals);
//  6.6 Add a statement that adds Daan's favorite animal ('baby pig') to the existing array.
favouriteAnimals.push(`baby pig`);
//  6.7 Log your new array!
console.log(favouriteAnimals);
//  Let's consider the following string: let myString = "this is a test".
// 7.1 Add the string to your file and console.log it.
let myString = `this is a test`;
console.log(myString);
//  7.2 Find a way to get the length of myString.
let countLetters = myString.length;
// 7.3 console.log the length of myString.
console.log(countLetters);
//8. Write a program that checks the types of two variables and prints out SAME TYPE if they are the same type.
//  8.1 First declare at least four variables and assign them different data types.
//  8.2 For each variable write a console.log statement that logs the value
let color = `red`;
console.log(`The value of my variable is ${color}`);
let number = 7;
console.log(`The value of my variable is ${number}`);
let checkbox = true;
console.log(`The value of my variable is ${checkbox}`);
let colors = [`red`, `green`, `yellow`];
console.log(`The value of my variable is ${colors}`);
// 8.3 Now write a console.log statement wherein you first explain in words what you think the type of your variables is.
console.log(`Type of my variable ${color} is string`);
console.log(`Type of my variable ${number} is number`);
console.log(`Type of my variable ${checkbox} is boolean`);
console.log(`Type of my variable ${colors} is object`);
//  8.4 Now use typeof to log the actual type of your variables.
console.log(typeof color);
console.log(typeof number);
console.log(typeof checkbox);
console.log(typeof colors);

//  8.5 Now compare the types of your different variables with one another.
//  8.6 Make sure to also show a message when the variables you are comparing are not the same type.

let compareTypes =
  typeof color === typeof number
    ? console.log(`The variables are same type`)
    : console.log(`The variables are NOT same type`);

let anotherCompareOfTypes =
  typeof checkbox === typeof colors
    ? console.log(`The variables are same type`)
    : console.log(`The variables are NOT same type`);

let lastCompareOfTypes =
  typeof color === typeof colors
    ? console.log(`The variables are same type`)
    : console.log(`The variables are NOT same type`);

// 9. If x equals 7, and the only other statement is x = x % 3, what would be the new value of x?

// ANSWER: The new value of x would be 1.

//  9.1 Add at least 3 console.log statements in which you show that you understand what % does.
let modulosOperator = 10 % 3;
console.log(
  `The modulos operator returns the remainder left  when one operand is divided by another.`
);
console.log(
  `For example, number 10 fully contains number 3 three times. 3 + 3 + 3 = 9.`
);
console.log(`When we subtract 9 from 10 it remains 1. So 10 % 3 would be 1`);
console.log(modulosOperator);

//10. Write a program to answer the following questions:
//  10.1 Can you store multiple types in an array? Numbers and strings? Make an example that illustrates your answer.
//  10.2 Can you compare infinities? (Not in Eyad's world) - does 6/0 === 10/0? How can you test this?

let numbersAndStrings = [1, 2, 4, "red", "green", "purple"];
let compareInfinities = 6 / 0 === 10 / 0;
function question(question, answer, example) {
  console.log(question);
  console.log(answer);
  console.log(example);
}
question(
  `Can you store multiple types in an array? Numbers and strings?`,
  `Yes`,
  numbersAndStrings
);
question(`Can you compare infinities?`, `Yes`, compareInfinities);
// 10.3 Add console.log statements to the above program in which you show that you understand the concepts (just like you've done in the above assignments).
console.log(
  `For this assignment I made a function that contains question, answer and example of it.`
);
console.log(
  `In array it can be stored values of different type like numbers, strings, booleans. Even an array can contain another array, object or function. And the example used in this task show that.`
);
console.log(
  `Infinities can be compared in Javascript.For example Infinity === Infinity returns true. Infinity === -Infinity returns false.`
);
