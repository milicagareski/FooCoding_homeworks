const express = require("express");
const router = express.Router();
const todoController = require("./todoController");

router.get("/", todoController.getAllTasks);
router.get("/:id", todoController.getTaskById);
router.post("/", todoController.createTask);
router.patch("/:id", todoController.updateTask);
router.delete("/:id", todoController.deleteTask);

module.exports = router;
