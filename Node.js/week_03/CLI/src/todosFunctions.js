const axios = require("axios");

async function getTasks() {
  try {
    const response = await axios.get("http://localhost:5000/todos");
    console.log(response.data);
  } catch (error) {
    console.error("Tasks not found:", error.message);
  }
}

async function getTaskById(taskId) {
  try {
    const response = await axios.get(`http://localhost:5000/todos/${taskId}`);
    console.log(response.data);
  } catch (error) {
    console.error("Task not found:", error.message);
  }
}

async function postTask(todo, priority, dueDate) {
  try {
    const response = await axios.post("http://localhost:5000/todos", {
      todo,
      priority,
      dueDate,
    });
    console.log("New task:", response.data);
  } catch (error) {
    console.error("Task can not be posted:", error.message);
  }
}

async function updateTask(id, todo, priority, dueDate) {
  try {
    const response = await axios.patch(`http://localhost:5000/todos/${id}`, {
      todo,
      priority,
      dueDate,
    });
    console.log("Task updated:", response.data);
  } catch (error) {
    console.error("Task can not be updated", error.message);
  }
}

async function deleteTask(taskID) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/todos/${taskID}`
    );
    console.log(response.data);
  } catch (error) {
    console.error("Task can not be deleted", error.message);
  }
}

async function leaveApp(quit) {
  try {
  } catch (error) {
    console.error("command unknown.");
  }
}
module.exports = { getTasks, getTaskById, postTask, updateTask, deleteTask };
