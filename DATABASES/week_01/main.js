import mysql from "mysql";
import fs from "fs";

const hrDump = fs.readFileSync("HR_dump.sql", "utf8");
const newWorldDump = fs.readFileSync("new_world.sql", "utf8");

const connection = mysql.createConnection({
  host: "localhost",
  user: "milica",
  password: "1234567",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Server started");

  const setupHRDatabase = `
    CREATE DATABASE IF NOT EXISTS HR;
    USE HR;
    ${hrDump}
  `;

  connection.query(setupHRDatabase, (err, results) => {
    if (err) throw err;
    console.log("HR database created and data imported");

    connection.query(newWorldDump, (err, results) => {
      if (err) {
        console.error("error", err);
        return;
      }

      console.log("New World database imported successfully.");

      homeworkQueries();
    });
  });
});

function homeworkQueries() {
  // Question 1
  connection.query(
    "SELECT Name, Population FROM country WHERE Population > 8000000",
    (err, results) => {
      if (err) {
        console.error("Error in Question 1:", err);
        return;
      }

      console.log(
        "Countries with population bigger than 8000000 people:",
        results
      );

      // Question 2
      connection.query(
        "SELECT Name FROM country WHERE Name LIKE '%land%'",
        (err, results) => {
          if (err) {
            console.error("Error in Question 2:", err);
            return;
          }

          console.log("Countries that contain 'land' in their names:", results);

          // Question 3
          connection.query(
            "SELECT Name, Population FROM city WHERE Population BETWEEN 500000 and 1000000",
            (err, results) => {
              if (err) {
                console.error("Error in Question 3:", err);
                return;
              }

              console.log(
                "Cities with population between 500,000 and 1,000,000:",
                results
              );

              // Question 4
              connection.query(
                "SELECT city.Name FROM country JOIN city ON country.Capital = city.ID WHERE country.continent = 'Europe' ORDER BY city.Name ASC",
                (err, results) => {
                  if (err) {
                    console.error("Error in Question 4:", err);
                    return;
                  }

                  console.log(
                    "Capital cities of countries that are in Europe:",
                    results
                  );

                  // Question 5
                  connection.query(
                    "SELECT country.Name, country.Population FROM country JOIN city ON country.Code = city.CountryCode GROUP BY city.CountryCode HAVING COUNT(city.ID) > 10 AND SUM(city.Population) > 50000000",
                    (err, results) => {
                      if (err) {
                        console.error("Error in Question 5:", err);
                        return;
                      }

                      console.log(
                        "Countries with city population more than 50,000,000:",
                        results
                      );

                      // Question 6
                      connection.query(
                        "SELECT city.Name, city.Population FROM city WHERE city.Population > 5000000 AND city.CountryCode IN (SELECT country.Code FROM country JOIN city ON country.Code = city.CountryCode GROUP BY country.Code HAVING COUNT(city.ID) > 10 AND SUM(city.Population) > 50000000)",
                        (err, results) => {
                          if (err) {
                            console.error("Error in Question 6:", err);
                            return;
                          }

                          console.log(
                            "Cities with population more than 5,000,000:",
                            results
                          );

                          // Question 7
                          connection.query(
                            "SELECT country.Name AS CountryName, country.Continent, city.Name AS CapitalName FROM country JOIN city ON country.Capital = city.ID WHERE country.Population / country.SurfaceArea > 1000",
                            (err, results) => {
                              if (err) {
                                console.error("Error in Question 7:", err);
                                return;
                              }

                              console.log(
                                "Countries with a population density > 1,000 people/km2:",
                                results
                              );

                              // Question 8
                              connection.query(
                                "SELECT Continent, Name AS Country, SurfaceArea FROM country WHERE Continent != 'Antarctica' AND SurfaceArea = (SELECT MAX(SurfaceArea) FROM country AS c WHERE c.Continent = country.Continent)",
                                (err, results) => {
                                  if (err) {
                                    console.error("Error in Question 8:", err);
                                    return;
                                  }

                                  console.log(
                                    "Largest country (by size) on each continent, except Antarctica:",
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
}
