const { v4: uuidv4 } = require("uuid");
let todoModel = require("../utils/model");
const joi = require("joi");

const taskSchema = joi.object({
  todo: joi.string().required(),
  priority: joi.string().valid("HIGH", "Medium", "Low").required(),
  dueDate: joi.string().required(),
});

let todos = [];

exports.getAllTasks = (req, res) => {
  todoModel.readTasksFromFile((todos) => {
    const filteredTodos = todos.filter((todo) => !todo.isDeleted);
    if (filteredTodos) {
      res.status(200).json(filteredTodos);
    } else {
      res.status(400).json("Tasks are not found");
    }
  });
};

exports.getTaskById = (req, res) => {
  const taskId = req.params.id;

  todoModel.readTasksFromFile((todos) => {
    const foundTask = todos.find(
      (todo) => todo.id === taskId && !todo.isDeleted
    );
    if (foundTask) {
      res.status(200).json(foundTask);
    } else {
      res.status(400).json("Task is not found");
    }
  });
};

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
        res.status(200).json(newTask);
      });
    }, next);
  }
};

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

exports.deleteTask = (req, res) => {
  const taskId = req.params.id;

  todoModel.readTasksFromFile((todos) => {
    const foundTask = todos.find(
      (todo) => todo.id === taskId && !todo.isDeleted
    );
    if (foundTask) {
      foundTask.isDeleted = true;
      res.status(200).json("Task deleted");
    } else {
      res.status(400).json("Task is not found");
    }
  });
};
