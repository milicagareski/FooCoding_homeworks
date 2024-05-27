import mysql from "mysql";

const createDatabase = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "milica",
    password: "1234567",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Server connected");

    const dropDatabaseHR = "DROP DATABASE IF EXISTS HR";

    connection.query(dropDatabaseHR, (err) => {
      if (err) throw err;
      console.log("Database HR dropped");

      const createDatabaseHR = "CREATE DATABASE HR";

      connection.query(createDatabaseHR, (err) => {
        if (err) throw err;
        console.log("Database HR created");

        connection.end((err) => {
          if (err) throw err;
          console.log("Connection closed");

          createTablesAndInsertData();
        });
      });
    });
  });
};

const createTablesAndInsertData = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "milica",
    password: "1234567",
    database: "HR",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to HR database");

    const locationTable = `
        CREATE TABLE IF NOT EXISTS LOCATIONS (
          LOCATION_ID INT AUTO_INCREMENT PRIMARY KEY,
          STATE VARCHAR(100),
          CITY VARCHAR(100),
          ADDRESS VARCHAR(255),
          POSTAL_CODE VARCHAR(30)
        );`;

    const employeeTable = `
        CREATE TABLE IF NOT EXISTS EMPLOYEE (
          FIRST_NAME VARCHAR(100),
          LAST_NAME VARCHAR(100),
          EMAIL VARCHAR(80),
          PHONE_NUMBER VARCHAR(50),
          JOB_TITLE VARCHAR(100),
          SALARY DECIMAL(20,2),
          IS_MANAGER TINYINT(1) DEFAULT 0,
          LOCATION_ID INT,
          FOREIGN KEY (LOCATION_ID) REFERENCES LOCATIONS (LOCATION_ID)
        );`;

    const insertLocations = `
        INSERT INTO LOCATIONS (STATE, CITY, ADDRESS, POSTAL_CODE) VALUES 
        ('SWEDEN', 'MALMO', 'TORNGATAN 123', '211 10'), 
        ('MACEDONIA', 'BITOLA', 'DARVINOVA 77', '7000'), 
        ('ITALY', 'VENICE', 'SUNSET 123','66 223'), 
        ('SPAIN', 'MADRID', 'BUENA VIDA 22', '554 55'), 
        ('FRANCE', 'PARIS', 'MAIN STREET 332', '887 66'), 
        ('CROATIA', 'DUBROVNIK', 'PARTIZANSKI ODREDI 99', '22 878'), 
        ('SWEDEN', 'STOCKHOLM', 'GUSTAVPLATSEN 32', '103 16'), 
        ('MACEDONIA', 'OHRID', 'GOLEMA ULICA 44', '23422'),
        ('SWEDEN', 'MALMO', 'LEOPLATSEN 44', '211 10'), 
        ('SWEDEN', 'MALMO', 'ATLANTA 75', '211 11'), 
        ('SWEDEN', 'LUND', 'SODERGATEN 67', '211 11'), 
        ('PORTUGAL', 'LISBON', 'BONITA 44', '2232'), 
        ('ITALY', 'ROME', 'VISCOLO 33', '234'), 
        ('MACEDONIA', 'BITOLA', 'SIROK SOKAK 22', '7000'), 
        ('DENMARK', 'COPENHAGEN', 'STORGET 55', '654 33'), 
        ('DENMARK', 'COPENHAGEN', 'STORGET 123', '654 33'), 
        ('MACEDONIA', 'BITOLA', 'BULEVAR 32', '7000'), 
        ('SWEDEN', 'MALMO', 'GOTGATAN 33', '133 22'), 
        ('GREECE', 'SOLUN', 'FIRST STREET 33', '234');`;

    const insertEmployee = `
      INSERT INTO EMPLOYEE (FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, JOB_TITLE, SALARY, IS_MANAGER, LOCATION_ID) VALUES 
      ('JOHN', 'SMITH', 'JOHN@GMAIL.COM', '12345678', 'DEVELOPER', 2000.00, 0, 2),
      ('SARAH', 'WHITE', 'SARAH@GMAIL.COM', '4443334', 'MANAGER', 2300.00, 1, 4),
      ('ANNA', 'JOHNSON', 'ANNA@GMAIL.COM', '075553765', 'HR', 2500.00, 0, 19),
      ('JANE', 'WATSON', 'JANE@GMAIL.COM', '0755565', 'CUST SUPP', 2500.00, 0, 15),
      ('PETER', 'BROWN', 'PETER@GMAIL.COM', '08754468', 'MANAGER', 3300.00, 1, 15),
      ('EMMA', 'JONES', 'EMMA@GMAIL.COM', '09865489', 'DESIGNER', 4000.00, 0, 13),
      ('MIKE', 'MILLER', 'MIKE@GMAIL.COM', '076435897', 'DEVELOPER', 5500.00, 0, 3),
      ('MONICA', 'MILLER', 'MONICA@GMAIL.COM', '079234', 'DESIGNER', 3330.00, 0, 3),
      ('EMILY', 'DOE', 'EMILY@GMAIL.COM', '076443678', 'MANAGER', 4450.00, 1, 5),
      ('MICHAEL', 'WILSON', 'MIKK@GMAIL.COM', '07568764', 'CONSUL', 5000.00, 0, 17),
      ('JOI', 'PARK', 'JOI@GMAIL.COM', '075432568', 'DEVELOPER', 5500.00, 0, 11),
      ('BRAD', 'WILSON', 'BRAD@GMAIL.COM', '074575', 'CUST SUPPORT', 3000.00, 0, 5),
      ('JANE', 'WILSON', 'JANEW@GMAIL.COM', '0843678983', 'ANALYST', 3044.00, 0, 7),
      ('MIA', 'COLMER', 'MIA@GMAIL.COM', '086435787', 'MANAGER', 5530.00, 1, 8),
      ('ANNA', 'BLACK', 'ANNAB@GMAIL.COM', '075358976', 'ANALYST', 4430.00, 0, 5),
      ('MARIA', 'ROSELA', 'MARIA@GMAIL.COM', '075333876', 'ANALYST', 4000.00, 0, 9),
      ('HELEN', 'WILSON', 'HELEN@GMAIL.COM', '07533588763', 'HR', 4200.00, 0, 1),
      ('JASMIN', 'NELSON', 'JASMIN@GMAIL.COM', '0873567', 'MANAGER', 5000.00, 1, 1),
      ('ELLEN', 'BELLA', 'ELLEN@GMAIL.COM', '0865434578', 'DEVELOPER', 5000.00, 0, 1),
      ('DAVID', 'JOHNSON', 'DAVID@GMAIL.COM', '987578', 'DESIGNER', 3000.00, 0, 4);`;

    connection.query(locationTable, (err) => {
      if (err) throw err;
      console.log("Locations table created");

      connection.query(employeeTable, (err) => {
        if (err) throw err;
        console.log("Employee table created");

        connection.query(insertLocations, (err) => {
          if (err) throw err;
          console.log("Data inserted into locations table");

          connection.query(insertEmployee, (err) => {
            if (err) throw err;
            console.log("Data inserted into employee table");

            connection.end((err) => {
              if (err) throw err;
              console.log("Connection closed");
            });
          });
        });
      });
    });
  });
};

createDatabase();
