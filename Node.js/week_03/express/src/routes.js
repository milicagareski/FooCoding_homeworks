const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the todoController module where are defined different routes
const todoController = require("./todoController");

// Define routes and associate them with corresponding controller methods
router.get("/", todoController.getAllTasks);
router.get("/:id", todoController.getTaskById);
router.post("/", todoController.createTask);
router.patch("/:id", todoController.updateTask);
router.delete("/:id", todoController.deleteTask);

module.exports = router;
