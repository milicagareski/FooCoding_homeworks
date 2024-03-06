// This file is controller for handling CRUD operations.

const { v4: uuidv4 } = require("uuid");
let todoModel = require("../utils/model");
const joi = require("joi");

// define Joi schemas for data validation and ID
const taskSchema = joi.object({
  todo: joi.string().required(),
  priority: joi.string().valid("HIGH", "MEDIUM", "LOW").required(),
  dueDate: joi.date().iso().required(),
});

const validateIdSchema = joi.object({
  id: joi.string().required(),
});

let todos = [];

// Function to retrieve all tasks
exports.getAllTasks = (req, res) => {
  todoModel.readTasksFromFile((todos) => {
    const filteredTodos = todos.filter((todo) => !todo.isDeleted);
    if (filteredTodos) {
      res.status(200).json(filteredTodos);
    } else {
      res.status(404).json("Tasks not found");
    }
  });
};

// Function to retrieve a task by its ID
exports.getTaskById = (req, res) => {
  const { error, value } = validateIdSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  todoModel.readTasksFromFile((todos) => {
    taskId = value.id;
    const foundTask = todos.find(
      (todo) => todo.id === taskId && !todo.isDeleted
    );
    if (foundTask) {
      res.status(200).json(foundTask);
    } else {
      res.status(404).json("Task not found");
    }
  });
};

// Function to create a task
exports.createTask = (req, res, next) => {
  const { error, value } = taskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
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
    }, next);
  } else {
    res.status(400).json({ error: "Missing required fields" });
  }
};

// Function to update a task
exports.updateTask = (req, res, next) => {
  const taskId = req.params.id;

  const { error, value } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  todoModel.readTasksFromFile((todos) => {
    const foundTask = todos.find(
      (todo) => todo.id === taskId && !todo.isDeleted
    );
    if (foundTask) {
      foundTask.todo = req.body.todo || foundTask.todo;
      foundTask.priority = req.body.priority || foundTask.priority;
      foundTask.dueDate = req.body.dueDate || foundTask.dueDate;

      todoModel.writeTasksToFile(todos, () => {
        res.status(200).json(foundTask);
      });
    }
  }, next);
};

// Function to delete a task
exports.deleteTask = (req, res) => {
  const { error, value } = validateIdSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  todoModel.readTasksFromFile((todos) => {
    const foundTask = todos.find(
      (todo) => todo.id === value.id && !todo.isDeleted
    );
    if (foundTask) {
      foundTask.isDeleted = true;
      res.status(200).json("Task deleted");
    } else {
      res.status(404).json("Task not found");
    }
  });
};
