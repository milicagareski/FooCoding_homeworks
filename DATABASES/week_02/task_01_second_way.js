const mysql = require("mysql2");
const readline = require("readline");

const pool = mysql.createPool({
  host: "localhost",
  user: "",
  password: "",
  database: "new_world",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const queryDatabase = (query, params, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }

    connection.prepare(query, (err, statement) => {
      if (err) {
        console.error(err);
        connection.release();
        callback(err);
        return;
      }

      statement.execute(params, (err, results) => {
        statement.close();
        connection.release();

        if (err) {
          console.error(err);
          callback(err);
          return;
        }

        callback(null, results);
      });
    });
  });
};

// QUERY 1
rl.question("What's your favourite country? ", (answer_1) => {
  console.log(`Loading...`);

  queryDatabase(
    `SELECT city.name FROM country INNER JOIN city ON country.capital = city.id WHERE country.name = ?`,
    [answer_1],
    (err, results) => {
      if (err) {
        rl.close();
        pool.end();
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

        queryDatabase(
          `SELECT cl.language FROM countrylanguage as cl INNER JOIN country ON cl.countrycode = country.code WHERE country.region = ? GROUP BY cl.language`,
          [answer_2],
          (err, results) => {
            if (err) {
              rl.close();
              pool.end();
              return;
            }

            if (results.length > 0) {
              const languages = results.map((lang) => lang.language).join(", ");
              console.log(`Languages spoken in ${answer_2} are: ${languages}`);
            } else {
              console.log(`No languages found for region ${answer_2}`);
            }

            // QUERY 3
            rl.question(
              `What's the language that you are interested in?`,
              (answer_3) => {
                console.log(`Loading...`);

                queryDatabase(
                  `SELECT COUNT(DISTINCT city.name) as cityCount FROM city INNER JOIN countrylanguage as cl ON city.countrycode = cl.countrycode WHERE cl.language = ?`,
                  [answer_3],
                  (err, results) => {
                    if (err) {
                      rl.close();
                      pool.end();
                      return;
                    }

                    if (results.length > 0) {
                      console.log(
                        `The number of cities where ${answer_3} is spoken: ${results[0].cityCount}`
                      );
                    } else {
                      console.log(`No cities found for language ${answer_3}`);
                    }

                    // QUERY 4
                    rl.question(
                      `What's the country you are interested in?`,
                      (answer_4) => {
                        console.log(`Loading...`);

                        queryDatabase(
                          `SELECT c.Name FROM country c INNER JOIN countrylanguage cl ON c.Code = cl.CountryCode WHERE cl.Language IN (SELECT cl2.Language FROM countrylanguage cl2 INNER JOIN country c2 ON cl2.CountryCode = c2.Code WHERE c2.Name = ? AND cl2.IsOfficial = 'T') AND cl.IsOfficial = 'T' AND c.Continent IN (SELECT c3.Continent FROM country c3 WHERE c3.Name = ?) AND c.Name != ?`,
                          [answer_4, answer_4, answer_4],
                          (err, results) => {
                            if (err) {
                              rl.close();
                              pool.end();
                              return;
                            }

                            if (results.length > 0) {
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

                            rl.close();
                            pool.end();
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
