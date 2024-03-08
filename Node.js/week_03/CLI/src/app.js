const readline = require("node:readline");

const {
  postTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("./todosFunctions");
const process = require("node:process");

const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const command = process.argv[2];

switch (command) {
  case "get":
    getTasks();
    break;
  case "getById":
    const taskId = process.argv[3];
    getTaskById(taskId);
    break;
  case "post":
    const todo = process.argv[3];
    const priority = process.argv[4];
    const dueDate = process.argv[5];
    postTask(todo, priority, dueDate);
    break;
  case "change":
    const updatedID = process.argv[3];
    const updatedTodo = process.argv[4];
    const updatedPriority = process.argv[5];
    const updatedDueDate = process.argv[6];
    updateTask(updatedID, updatedTodo, updatedPriority, updatedDueDate);
    break;
  case "delete":
    const taskIdToDelete = process.argv[3];
    deleteTask(taskIdToDelete);
    break;
  default:
    console.log("Invalid command.Try again");
}

line.question(">", (answer) => {
  if (answer === "quit") {
    process.exit(0);
  } else {
    console.log("Unknown command.");
    // line.close();
  }
});
