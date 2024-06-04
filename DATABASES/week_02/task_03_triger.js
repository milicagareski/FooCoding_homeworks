const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "milica",
  password: "1234567",
  database: "new_world",
});

function insertLanguage(
  countryCode,
  language,
  isOfficial,
  percentage,
  callback
) {
  connection.query(
    "INSERT INTO countrylanguage (CountryCode, Language, IsOfficial, Percentage) VALUES ?",
    [[[countryCode, language, isOfficial, percentage]]],
    (err, results) => {
      if (err) {
        callback(`Error inserting data: ${err}`);
        return;
      }

      console.log("Data inserted");

      connection.query(
        `SELECT message FROM notifications WHERE country_code = ?`,
        [countryCode],
        (err, results) => {
          if (err) {
            callback(`Error selecting notifications: ${err}`);
            return;
          }
          if (results.length > 0) {
            callback(null, "THE COUNTRY HAS MORE THAN 10 LANGUAGES");
          } else {
            callback(null, "The country has less than 10 languages");
          }
        }
      );
    }
  );
}

connection.connect(function (err) {
  if (err) {
    console.error(`Error connecting to database, ${err} `);
    return;
  }
  console.log(`Connected to database`);

  insertLanguage("UZB", "SWEDISH", "T", 5.8, (error, message) => {
    if (error) {
      console.error(error);
    } else {
      console.log(message);
    }
    connection.end();
  });
});
