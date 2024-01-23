'use strict';

const x = 9;
function f1(val) {
  val = val + 1;
  return val;
}

console.log(f1(x));

console.log(x);

const y = { x: 9 };
function f2(val) {
  val.x = val.x + 1;
  return val;
}

console.log(f2(y));

console.log(y);

// Add your explanation as a comment here
// Function f1 takes x as a parametar. In this case, x is a number and that in JS is a primitive data type. Because it is primitive data type changes we make to the value in the function do not reflect in the original variable. That is because primitives are copied by their value. So in this case we just made a copy from the value and increment that copy by one, but we did not change the value od the global variable x.

// Function f2 gets y as a paramethar and increment the value of the property x by one. In this case, y is object and changing the value of the property of that object in the functions, changes the original object. That is because objects are copied by their reference, not by their value like the primitive types. So in the function we copy the refference of the object, we increment the value by one, and that means that we change the object himself.
