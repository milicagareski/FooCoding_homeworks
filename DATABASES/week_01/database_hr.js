import mysql from "mysql";
import fs from "fs";

const sqlDump = fs.readFileSync("HR_dump.sql", "utf8");

const connection = mysql.createConnection({
  host: "localhost",
  user: "milica",
  password: "1234567",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Server started");

  const createDatabaseAndUse = `
    CREATE DATABASE IF NOT EXISTS HR;
    USE HR;
    ${sqlDump}
  `;

  connection.query(createDatabaseAndUse, (err, results) => {
    if (err) throw err;
    console.log("Database created and data imported");
    connection.end();
  });
});
