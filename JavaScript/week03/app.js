//  1.Strings
//  1.1 Add the string to your file and log it.
// 1.2 Log the length of myString.
// 1.3 The commas make that the sentence is quite hard to read. Find a way to remove the commas from the string and replace them with spaces.
// 1.4 Log myString to see if you succeeded.

let myString = "hello,this,is,a,difficult,to,read,sentence";
console.log(myString);
console.log(myString.length);
myString = myString.replaceAll(",", " ");
console.log(myString);

// 2. Arrays!
// Consider the following array:
// 2.1 Add a statement that adds Mauro's favorite animal 'turtle' to the existing array.
// 2.2 Log your new array!
// 2.3 Now add Jim's favorite animal to the array, it's 'meerkat', but make sure it will be placed after 'blowfish' and before 'capricorn'.
// 2.4 Write a console.log statement that explains in words you think the new value of the array is.
// 2.5 Log your new array!
// 2.6 Log the length of the array, add a message: 'The array has a length of: ' (here you should show the length of the array).
// 2.7 Jason does not like 'giraffe', delete this animal from the array.
// 2.8 Again log your new array.
// 2.9 Now if unlike Jim, you don't like 'meerkat' and you want to delete it from the array, but you don't know the position or the index of the item in the array, how can you find it?
// 2.10 Log the index of 'meerkat'. Add a message so it says: 'The item you are looking for is at index: ' (here you should show the index of the item).

let favoriteAnimals = ["blowfish", "capricorn", "giraffe"];
favoriteAnimals.push(`turtle`);
console.log(favoriteAnimals);
favoriteAnimals.splice(1, 0, "meerkat");
console.log(
  `The new value of the array will be ["blowfish", "meerkat", "capricorn", "giraffe", "turtle"]`
);
console.log(favoriteAnimals);
console.log(`The array has a length of: ${favoriteAnimals.length}`);
favoriteAnimals.splice(3, 1);
console.log(favoriteAnimals);
console.log(
  `The item you are looking for is at index:${favoriteAnimals.indexOf(
    "meerkat"
  )} `
);

// 1.More JavaScript
// 3.1 Create a function that takes 3 arguments and returns the sum of the these arguments.

function summary(num1, num2, num3) {
  return num1 + num2 + num3;
}
console.log(summary(2, 3, 5));

// 3.2 Create a function named colorCar that receives a color, and prints out, 'a red car' for example.

function colorCar(color) {
  return `a ${color} car`;
}
console.log(colorCar("red"));

// 3.3 Create an object and a function that takes the object as a parameter and prints out all of its properties and values.

let person = {
  firstName: "John",
  secondName: "Smith",
  age: 30,
  job: "developer",
};

function getPersonInfo(info) {
  for (let i in info) {
    console.log(i + ":" + info[i]);
  }
}
getPersonInfo(person);

// 3.4 Create a function named vehicleType that receives a color, and a code, 1 for car, 2 for motorbike. And prints 'a blue motorbike' for example when called as vehicleType("blue", 2)

function vehicleType(color, code) {
  if (code === 1) {
    console.log(`a ${color}, car`);
  } else if (code === 2) {
    console.log(`a ${color}, motorbike`);
  } else {
    console.log(`Please choose number one or number two. `);
  }
}

vehicleType("green", 6);

// 3.5 Can you write the following without the if statement, but with just as a single line with console.log(...);?

// if (3 === 3) {
//   console.log("yes");
// } else {
//   console.log("no");
// }

console.log(3 === 3 ? "yes" : "no");

// 3.6 Create a function called vehicle, like before, but takes another parameter called age, so that vehicle("blue", 1, 5) prints 'a blue used car'

function vehicle(color, code, age) {
  if (code === 1 && age > 1) {
    console.log(`a ${color}, used car`);
  } else if (code === 1 && age >= 0 && age <= 1) {
    console.log(`a ${color} new car`);
  } else if (code === 2 && age > 1) {
    console.log(`a ${color}, used motorbike`);
  } else if (code === 2 && age >= 0 && age <= 1) {
    console.log(`a ${color} new motorbike`);
  } else {
    console.log(`Please choose number one or number two. `);
  }
}
vehicle("blue", 1, 0);
vehicle("green", 2, 1);
vehicle("orange", 2, 8);
vehicle("purple", 1, 4);

// 3.7 Make a list of vehicles, you can add "motorbike", "caravan", "bike", or more.

let listOfVehicles = ["motorbike", "caravan", "bike", "car", "train"];

// 3.8 How do you get the third element from that list?

console.log(listOfVehicles[2]);

// 3.9 Change the function vehicle to use the list of question 7. So that vehicle("green", 3, 1) prints "a green new bike".

function vehicles(color, code, age) {
  let newCode;
  for (let i = 0; i < listOfVehicles.length; i++) {
    newCode = listOfVehicles[code];
  }
  if (typeof newCode === "undefined") {
    console.log(
      `please enter code number between 0 and ${listOfVehicles.length - 1}`
    );
  } else if (age > 1) {
    console.log(`a ${color} used ${newCode}`);
  } else if (age >= 0 && age <= 1) {
    console.log(`a ${color} new ${newCode}`);
  }
}

vehicles("blue", 4, 1);
vehicles("green", 3, 2);
vehicles("yellow", 1, 5);
vehicles("purple", 5, 4);

// 3.10 Use the list of vehicles to write an advertisement. So that it prints something like: "Amazing Joe's Garage, we service cars, motorbikes, caravans and bikes."

function writeAdd(list) {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push(list[i] + "s");
  }
  newList.splice(newList.length - 1, 0, "and");
  let listToString = newList.toString();
  let add = listToString.split(",").join(", ");
  let finalAdd = add.replace("and,", "and");
  console.log(finalAdd);
  console.log(`Amazing Joe's Garage, we service ${finalAdd}.`);
}
writeAdd(listOfVehicles);

// 3.11 What if you add one more vehicle to the list, can you have that added to the advertisement without changing the code for question 10?

console.log(
  `Yes, I can add more items and the code would stay the same. It won't change`
);

// 3.12 Create an empty object.

let jobs = {};
console.log(jobs);

// 3.13 Create an object that contains the teachers that you have had so far for the different modules.

let teachers = {
  teacher1: "Tommy",
  teacher2: "Seif",
  teacher3: "Sahin",
};
console.log(teachers);

// 3.14 Add a property to the object you just created that contains the languages that they have taught you.

teachers.firstModul = "HTML and CSS";
teachers.secondModul = "Javascript";
console.log(teachers);

// 3.15 Write some code to test two arrays for equality using == and ===. Test the following:
// let x = [1, 2, 3];
// let y = [1, 2, 3];
// let z = y;
// What do you think will happen with x == y, x === y and z == y and z == x? Prove it!

let x = [1, 2, 3];
let y = [1, 2, 3];
let z = y;

function chechLooseEquality(arr1, arr2) {
  if (arr1 == arr2) {
    return true;
  } else {
    return false;
  }
}

console.log(chechLooseEquality(x, y));
console.log(chechLooseEquality(y, z));
console.log(chechLooseEquality(x, z));

function chechStrictEquality(arr1, arr2) {
  if (arr1 === arr2) {
    return true;
  } else {
    return false;
  }
}

console.log(chechStrictEquality(x, y));
console.log(chechStrictEquality(y, z));
console.log(chechStrictEquality(x, z));
