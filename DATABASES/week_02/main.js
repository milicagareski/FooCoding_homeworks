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

// QUERY 1
rl.question("What's your favourite country? ", (answer_1) => {
  console.log(`Loading...`);

  connection.execute(
    "SELECT city.name FROM country INNER JOIN city ON country.capital = city.id WHERE country.name = ?",
    [answer_1],
    function (err, results) {
      if (err) {
        console.error(err);
        rl.close();
        connection.end();
        return;
      }

      if (results.length > 0) {
        console.log(`The capital of ${answer_1} is ${results[0].name}`);
      } else {
        console.log(`No capital found for ${answer_1}`);
      }

      // QUERY 2
      rl.question("What region are you interested in? ", (answer_2) => {
        console.log(`Loading...`);

        connection.execute(
          "SELECT cl.language FROM countrylanguage as cl INNER JOIN country ON cl.countrycode = country.code WHERE country.region = ? GROUP BY cl.language",
          [answer_2],
          function (err, results) {
            if (err) {
              console.error(err);
            } else if (results.length > 0) {
              const languages = results.map((lang) => lang.language).join(", ");
              console.log(`Languages spoken in ${answer_2} are: ${languages}`);
            } else {
              console.log(`No languages found for region ${answer_2}`);
            }

            // QUERY 3
            rl.question(
              "What's the language that you are interested in? ",
              (answer_3) => {
                console.log(`Loading...`);

                connection.execute(
                  "SELECT COUNT(city.name) as cityCount FROM city INNER JOIN countrylanguage as cl ON city.countrycode = cl.countrycode WHERE cl.language = ?",
                  [answer_3],
                  function (err, results) {
                    if (err) {
                      console.error(err);
                    } else if (results.length > 0) {
                      console.log(
                        `The number of cities where ${answer_3} is spoken: ${results[0].cityCount}`
                      );
                    } else {
                      console.log(`No cities found for language ${answer_3}`);
                    }
                    // QUERY 4
                    rl.question(
                      "What's the country you are interested in? ",
                      (answer_4) => {
                        console.log(`Loading...`);

                        connection.execute(
                          "SELECT country.Name FROM country INNER JOIN countrylanguage ON countrylanguage.CountryCode = country.Code WHERE countrylanguage.Language IN (SELECT cl.Language FROM countrylanguage cl INNER JOIN country c ON cl.CountryCode = c.Code WHERE c.Name = ? AND cl.IsOfficial = 'T') AND countrylanguage.IsOfficial = 'T' AND country.Name != ?",
                          [answer_4, answer_4],
                          function (err, results) {
                            if (err) {
                              console.error(err);
                            } else if (results.length > 0) {
                              const countries = results
                                .map((country) => country.Name)
                                .join(", ");
                              console.log(
                                `This language is official in ${countries}`
                              );
                            } else {
                              console.log(
                                `No countries found with the same official language`
                              );
                            }
                            connection.execute(
                              "SELECT c.Name FROM country AS c WHERE c.Continent IN (SELECT country.Continent FROM country WHERE country.Name = ?) AND c.Name != ?",
                              [answer_4, answer_4],
                              function (err, results) {
                                if (err) {
                                  console.error(err);
                                } else if (results.length > 0) {
                                  const continentCountries = results
                                    .map((country) => country.Name)
                                    .join(", ");
                                  console.log(
                                    `Countries in the same continent as ${answer_4}: ${continentCountries}`
                                  );
                                } else {
                                  console.log(
                                    `No countries found in the same continent as ${answer_4}`
                                  );
                                }
                                connection.end();
                                rl.close();
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    }
  );
});

rl.on("close", () => {
  console.log("connection closed");
});
