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
      const getMinSalary = minSalary(users).toString();
      const getMaxSalary = maxSalary(users).toString();
      const getMinAge = minAge(users).toString();
      const getMaxAge = maxAge(users).toString();

      const dataToBeWritten = ` Total Salary: ${getTotalSalary}\n Average Salary: ${getAverageSalary}\n PROFESSION_NAME have the Minimun Salary: ${getMinSalary} \n PROFESSION_NAME have the Maximum Salary: ${getMaxSalary}\n Minimun age: ${getMinAge}\n Maximum age: ${getMinAge} \n`;

      writeFile.write(dataToBeWritten);
    })
    .on("error", (err) => {
      console.log(err);
    });
};

readData();
