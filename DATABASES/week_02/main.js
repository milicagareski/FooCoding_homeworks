const mysql = require("mysql2");
const readline = require("readline");

const connection = mysql.createConnection({
  host: "localhost",
  user: "milica",
  password: "1234567",
  database: "new_world",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What's your favourite country? ", (answer) => {
  console.log(`Your favourite country is ${answer}!`);

  connection.execute(
    "SELECT city.name FROM country INNER JOIN city ON country.capital = city.id WHERE country.name = ?",
    [answer],
    function (err, results, fields) {
      if (err) {
        console.error(err);
      } else {
        console.log(`The capital of ${answer} is ${results[0].name}`);
      }
      connection.end();
    }
  );

  rl.close();
});
