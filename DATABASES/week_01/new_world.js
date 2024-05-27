import mysql from "mysql";
import fs from "fs";

const connection = mysql.createConnection({
  host: "localhost",
  user: "milica",
  password: "1234567",
  multipleStatements: true,
});

fs.readFile("new_world.sql", "utf8", (err, data) => {
  if (err) {
    console.error("error", err);
    return;
  }

  connection.query(data, (err, results) => {
    if (err) {
      console.error("error", err);
      return;
    }

    console.log("Database imported successfully.");

    // QUERYS FOR THE HOMEWORK QUESTIONS

    // QUESTION NUMBER 1

    connection.query(
      "SELECT Name FROM country WHERE Population > 8000000",
      (err, results) => {
        if (err) {
          console.error("error", err);
          return;
        }

        console.log(
          "Countries with population bigger than 8000000 people:",
          results
        );

        // QUESTION NUMBER 2

        connection.query(
          "SELECT Name FROM country WHERE Name LIKE '%land%'",
          (err, results) => {
            if (err) {
              console.error("error", err);
              return;
            }

            console.log(
              "Countries that contain 'land' in their names:",
              results
            );

            // QUESTION NUMBER 3

            connection.query(
              "SELECT Name FROM city WHERE Population BETWEEN 500000 and 1000000",
              (err, results) => {
                if (err) {
                  console.error("error", err);
                  return;
                }

                console.log(
                  "Cities with population between 500.000 and 1.000.000:",
                  results
                );

                // QUESTION NUMBER 4

                connection.query(
                  "SELECT city.Name FROM country JOIN city ON country.Capital = city.ID WHERE country.continent = 'Europe' ORDER BY city.Name ASC",
                  (err, results) => {
                    if (err) {
                      console.error("error", err);
                      return;
                    }

                    console.log(
                      "Capital cities of countries that are in Europe:",
                      results
                    );

                    connection.end();
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});
