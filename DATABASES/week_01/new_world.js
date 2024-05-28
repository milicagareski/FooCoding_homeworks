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
      "SELECT Name, Population FROM country WHERE Population > 8000000",
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
              "SELECT Name, Population FROM city WHERE Population BETWEEN 500000 and 1000000",
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

                    // QUESTION NUMBER 5

                    connection.query(
                      "SELECT country.Name, country.Population FROM country JOIN city ON country.Code = city.CountryCode GROUP BY city.CountryCode HAVING COUNT(city.ID) > 10 AND SUM(city.Population) > 50000000;",
                      (err, results) => {
                        if (err) {
                          console.error("error", err);
                          return;
                        }

                        console.log(
                          "Countries with city population more than 50000000:",
                          results
                        );

                        // QUESTION NUMBER 6

                        connection.query(
                          "SELECT city.Name, city.Population FROM city WHERE city.Population > 5000000 AND city.CountryCode IN (SELECT country.Code FROM country  JOIN city ON country.Code = city.CountryCode GROUP BY country.Code HAVING COUNT(city.ID) > 10 AND SUM(city.Population) > 50000000);",
                          (err, results) => {
                            if (err) {
                              console.error("error", err);
                              return;
                            }

                            console.log(
                              "Countries with city population more than 5000000:",
                              results
                            );

                            // QUESTION NUMBER 7

                            connection.query(
                              "SELECT country.Name AS CountryName, country.Continent, city.Name AS CapitalName FROM country JOIN city ON country.Capital = city.ID WHERE  country.Population / country.SurfaceArea > 1000;",
                              (err, results) => {
                                if (err) {
                                  console.error("error", err);
                                  return;
                                }

                                console.log(
                                  "Countries with a population density > 1 000 people / km2:",
                                  results
                                );

                                // QUESTION NUMBER 8

                                connection.query(
                                  "SELECT Continent, Name AS Country, SurfaceArea FROM country WHERE Continent != 'Antarctica' AND SurfaceArea = (SELECT MAX(SurfaceArea) FROM country AS c WHERE c.Continent = country.Continent);",
                                  (err, results) => {
                                    if (err) {
                                      console.error("error", err);
                                      return;
                                    }

                                    console.log(
                                      "Largest country (by size) on each continent, except Antarctica",
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
