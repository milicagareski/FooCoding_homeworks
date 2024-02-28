const totalSalary = require("./totalSalary");

function averageSalary(people) {
  const total = totalSalary(people);
  const average = total / people.length;
  return average;
}

module.exports = averageSalary;
