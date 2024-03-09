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

// Display instructions on how to use each command.
function commands() {
  console.log("Commands:");
  console.log("get - Get all tasks");
  console.log("getTask <id> - Get task by ID");
  console.log("post <todo> <priority> <dueDate> - Post new task");
  console.log("update <id> <todo> <priority> <dueDate> - Update a task");
  console.log("delete <id> - Delete a task");
  console.log("end - Quit the application");
}

commands();

// Display a prompt to the user

line.setPrompt("Your command: ");
line.prompt();

// Listen for user input

line.on("line", async (input) => {
  const [command, ...args] = input.trim().split(" ");
  // implementing try and catch block
  try {
    switch (command) {
      case "get":
        const tasks = await getTasks();
        console.log(tasks);
        break;
      case "getTask":
        if (args.length !== 1) {
          throw new Error("Invalid number of arguments");
        }
        const taskId = args[0];
        const task = await getTaskById(taskId);
        console.log(task);
        break;
      case "post":
        if (args.length < 3) {
          throw new Error("Invalid number of arguments");
        }
        const todo = args.slice(0, -2).join(" ");
        const priority = args[args.length - 2];
        const dueDate = args[args.length - 1];

        const newTask = await postTask(todo, priority, dueDate);
        console.log(newTask);
        console.log("\x1b[32m", "NEW TASK CREATED", "\x1b[0m");
        break;
      case "update":
        if (args.length < 4) {
          throw new Error("Invalid number of arguments");
        }
        const updatedID = args[0];
        const updatedTodo = args.slice(1, -2).join(" ");
        const updatedPriority = args[args.length - 2];
        const updatedDueDate = args[args.length - 1];

        const changeTask = await updateTask(
          updatedID,
          updatedTodo,
          updatedPriority,
          updatedDueDate
        );
        console.log(changeTask);
        console.log("\x1b[32m", "TASK SUCCESSFULLY UPDATED", "\x1b[0m");
        break;
      case "delete":
        const taskIdToDelete = args[0];
        const deleted = await deleteTask(taskIdToDelete);
        console.log(deleted);
        console.log("\x1b[32m", "TASK SUCCESSFULLY DELETED", "\x1b[0m");
        break;
      case "end":
        process.exit(0);
      default:
        console.log("Invalid command. Please try again.");
        break;
    }
  } catch (error) {
    console.error("error", error.message);
  }
  // calling the line promt again after one command is over
  line.prompt();
});
