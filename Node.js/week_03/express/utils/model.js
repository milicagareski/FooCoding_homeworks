const fs = require("fs");

exports.readTasksFromFile = (callback) => {
  fs.readFile(__dirname + "/../data/todos.json", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    callback(todos);
  });
};

exports.writeTasksToFile = (todos, callback) => {
  fs.writeFile(
    __dirname + "/../data/todos.json",
    JSON.stringify(todos, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Tasks written to file");
      callback();
    }
  );
};
