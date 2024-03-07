const express = require("express");
const validator = require("../middlewares/validator");
// Import the todoController module where are defined different routes
const todoController = require("./todoController");

// Create a new router instance
const router = express.Router();

// Define routes and associate them with corresponding controller methods and validator methods
router.get("/", todoController.getAllTasks);
router.get("/:id", validator.validateID, todoController.getTaskById);
router.post("/", validator.validateData, todoController.createTask);
router.patch(
  "/:id",
  validator.validateID,
  validator.validateData,
  todoController.updateTask
);
router.delete("/:id", validator.validateID, todoController.deleteTask);

module.exports = router;
