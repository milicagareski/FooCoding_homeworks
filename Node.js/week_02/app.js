const csv = require("csv-parser");
const fs = require("fs");

const totalSalary = require("./utils/totalSalary");
const averageSalary = require("./utils/averageSalary");
const minSalary = require("./utils/minSalary");
const maxSalary = require("./utils/maxSalary");
const minAge = require("./utils/minAge");
const maxAge = require("./utils/maxAge");

const readData = function () {
  const users = [];

  const readFile = fs.createReadStream(__dirname + "/users-data.csv");

  const writeFile = fs.createWriteStream(__dirname + "/results.txt", {
    flags: "a",
  });

  readFile
    .pipe(csv())
    .on("data", (data) => {
      users.push(data);
    })
    .on("end", () => {
      const getTotalSalary = totalSalary(users).toString();
      const getAverageSalary = averageSalary(users).toString();
      const getMinSalary = minSalary(users);
      const getMaxSalary = maxSalary(users);
      const getMinAge = minAge(users).toString();
      const getMaxAge = maxAge(users).toString();

      const setMinSalary = getMinSalary.map((element) => {
        return `${element.profession} have the Minimun Salary: ${element.salary}`;
      });

      const setMaxSalary = getMaxSalary.map((element) => {
        return `${element.profession} have the Maximum Salary: ${element.salary}`;
      });

      const dataToBeWritten = ` Total Salary: ${getTotalSalary}\n Average Salary: ${getAverageSalary}\n ${setMinSalary} \n ${setMaxSalary}\n Minimun age: ${getMinAge}\n Maximum age: ${getMaxAge} \n`;

      writeFile.write(dataToBeWritten);
    })
    .on("error", (err) => {
      console.log(err);
    });
};

readData();
