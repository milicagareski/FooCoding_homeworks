// This file is controller for handling CRUD operations.

const { v4: uuidv4 } = require("uuid");
const todoModel = require("../utils/model");

// Function to retrieve all tasks
exports.getAllTasks = async (req, res) => {
  try {
    todoModel.readTasksFromFile((todos) => {
      const filteredTodos = todos.filter((todo) => !todo.isDeleted);
      if (filteredTodos) {
        res.status(200).json(filteredTodos);
      } else {
        res.status(404).json("Tasks not found");
      }
    });
  } catch (err) {
    console.error("Error in validateData", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve a task by its ID
exports.getTaskById = async (req, res) => {
  try {
    todoModel.readTasksFromFile((todos) => {
      taskId = req.params.id;
      const foundTask = todos.find(
        (todo) => todo.id === taskId && !todo.isDeleted
      );

      if (foundTask) {
        res.status(200).json(foundTask);
      } else {
        res.status(404).json("Task not found");
      }
    });
  } catch (err) {
    console.error("Error in validateData", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to create a task
exports.createTask = async (req, res) => {
  try {
    const { todo, priority, dueDate } = req.body;
    if (todo && priority && dueDate) {
      todoModel.readTasksFromFile((todos) => {
        const newTask = {
          id: uuidv4(),
          todo,
          priority,
          dueDate,
          isDeleted: false,
        };
        todos.push(newTask);
        todoModel.writeTasksToFile(todos, () => {
          res.status(201).json(newTask);
        });
      });
    } else {
      res.status(400).json({ error: "Missing required fields" });
    }
  } catch (err) {
    console.error("Error in validateData", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to update a task
exports.updateTask = async (req, res) => {
  try {
    todoModel.readTasksFromFile((todos) => {
      const foundTask = todos.find(
        (todo) => todo.id === req.params.id && !todo.isDeleted
      );
      if (foundTask) {
        foundTask.todo = req.body.todo || foundTask.todo;
        foundTask.priority = req.body.priority || foundTask.priority;
        foundTask.dueDate = req.body.dueDate || foundTask.dueDate;

        todoModel.writeTasksToFile(todos, () => {
          res.status(200).json(foundTask);
        });
      }
    });
  } catch (err) {
    console.error("Error in validateData", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a task
exports.deleteTask = async (req, res) => {
  try {
    todoModel.readTasksFromFile((todos) => {
      const foundTask = todos.find(
        (todo) => todo.id === req.params.id && !todo.isDeleted
      );
      if (foundTask) {
        foundTask.isDeleted = true;
        res.status(200).json("Task deleted");
      } else {
        res.status(404).json("Task not found");
      }
    });
  } catch {
    console.error("Error in validateData", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
