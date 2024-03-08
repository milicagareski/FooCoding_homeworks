const readline = require("readline");
const {
  getTasks,
  getTaskById,
  postTask,
  updateTask,
  deleteTask,
} = require("./todosFunctions");

const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display a prompt to the user
line.setPrompt("Your command: ");
line.prompt();

// Listen for user input

line.on("line", async (input) => {
  const [command, ...args] = input.trim().split(" ");

  switch (command) {
    case "get":
      const tasks = await getTasks();
      console.log(tasks);
      break;
    case "getTask":
      const taskId = args[0];
      const task = await getTaskById(taskId);
      console.log(task);
      break;
    case "post":
      const [todo, priority, dueDate] = args;
      const newTask = await postTask(todo, priority, dueDate);
      console.log(newTask);
      break;
    case "update":
      const [updatedID, updatedTodo, updatedPriority, updatedDueDate] = args;
      const changeTask = await updateTask(
        updatedID,
        updatedTodo,
        updatedPriority,
        updatedDueDate
      );
      console.log(changeTask);
      break;
    case "delete":
      const taskIdToDelete = args[0];
      const deleted = await deleteTask(taskIdToDelete);
      console.log(deleted);
      break;
    default:
      console.log("Invalid command. Please try again.");
      break;
    case "end":
      process.exit(0);
  }
  line.prompt();
});
