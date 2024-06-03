const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "milica",
  password: "1234567",
  database: "new_world",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

const checkLanguageCount = (countryCode, callback) => {
  const query =
    "SELECT COUNT(*) AS langCount FROM countrylanguage WHERE CountryCode = ?";
  connection.query(query, [countryCode], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].langCount);
  });
};

const insertLanguage = (
  countryCode,
  language,
  isOfficial,
  percentage,
  callback
) => {
  const insertQuery =
    "INSERT INTO countrylanguage (CountryCode, Language, IsOfficial, Percentage) VALUES (?, ?, ?, ?)";
  connection.query(
    insertQuery,
    [countryCode, language, isOfficial, percentage],
    (err, results) => {
      if (err) return callback(err);

      checkLanguageCount(countryCode, (err, langCount) => {
        if (err) return callback(err);
        if (langCount >= 10) {
          callback(null, `COUNTRY ${countryCode} HAS MORE THAT 10 LANGUAGES!`);
        } else {
          callback(
            null,
            `Country ${countryCode} now has ${langCount} languages.`
          );
        }
      });
    }
  );
};

insertLanguage("AFG", "Language14", "F", 10.0, (err, message) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log(message);
  }

  connection.end();
});
