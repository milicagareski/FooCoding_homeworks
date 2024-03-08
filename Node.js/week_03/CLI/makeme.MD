# FooCoding CLI Homework

The objective of this homework assignment is to practice consuming a RESTful API from the command line interface (CLI) using Node.js. You will be creating a CLI tool that interacts with the Todos API you built earlier, allowing users to perform CRUD (Create, Read, Update, Delete) operations on Todos directly from the command line.

## Requirements:

- Create a command line interface (CLI) application using Node.js that interacts with the Todos REST API.

- Implement the following commands in your CLI application:

  - list: Lists all Todos from the API.

  - add <todo>: Adds a new Todo to the API.

  - update <id> <todo>: Updates the Todo with the specified <id> with the new <todo> text.

  - delete <id>: Deletes the Todo with the specified <id>.

  - end or Ctrl+C: Exits the CLI application.

- Ensure proper error handling for cases such as invalid input, failed API requests, etc.

- Make sure the CLI application runs continuously until the user explicitly exits by typing the end command or by pressing Ctrl+C.

- Provide clear instructions within the CLI on how to use each command.

- Handle asynchronous operations gracefully using async/await or Promises.

- Implement basic input validation to prevent malformed input from being sent to the API.

## Optional Enhancements:

- Implement interactive prompts for better user experience using libraries like inquirer or asking me to share code for this, because is something that we can implement by ourselves.

- Add color-coded output or formatting to enhance readability of the CLI output.

- Implement authentication for accessing the API if authentication is required.

- Implement batch processing for handling multiple Todos at once.

- Add support for additional features of the Todos API, such as pagination, sorting, and filtering.
