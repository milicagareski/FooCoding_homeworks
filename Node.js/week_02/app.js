const fs = require("fs");

const totalSalary = require("./utils/totalSalary");
const averageSalary = require("./utils/averageSalary");
const minSalary = require("./utils/minSalary");
const maxSalary = require("./utils/maxSalary");
const minAge = require("./utils/minAge");
const maxAge = require("./utils/maxAge");

const readData = function () {
  const users = [];
  let data = "";

  const readFile = fs.createReadStream(__dirname + "/users-data.csv", "utf8");

  const writeFile = fs.createWriteStream(__dirname + "/results.txt", {
    flags: "a",
  });

  readFile
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      const getUsers = data.trim().split("\r\n").splice(1);
      getUsers.forEach((user) => {
        user = user.replace(", ", "| ");
        let defineUser = user.split(",");
        if (defineUser.length === 9) {
          const user = {
            name: defineUser[1],
            age: Number(defineUser[3]),
            profession: defineUser[7],
            salary: Number(defineUser[8]),
          };
          users.push(user);
        } else {
          console.log(defineUser);
        }
      });

      const getTotalSalary = totalSalary(users);
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
