async function getTasks() {
  try {
    const response = await fetch("http://localhost:5000/todos");
    if (!response.ok) {
      throw new Error("Error fetching tasks");
    }
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("\x1b[31m", "Error:", error.message, "\x1b[0m");
    throw error;
  }
}

async function getTaskById(taskId) {
  try {
    const response = await fetch(`http://localhost:5000/todos/${taskId}`);
    if (!response.ok) {
      throw new Error("Error fetching task");
    }

    const task = await response.json();

    return task;
  } catch (error) {
    console.error("\x1b[31m", "Error:", error.message, "\x1b[0m");
    throw error;
  }
}

async function postTask(todo, priority, dueDate) {
  try {
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
        priority,
        dueDate,
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating new task");
    }
    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error("\x1b[31m", "Error:", error.message, "\x1b[0m");
    throw error;
  }
}

async function updateTask(id, todo, priority, dueDate) {
  try {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
        priority,
        dueDate,
      }),
    });

    if (!response.ok) {
      throw new Error("Error updating task");
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("\x1b[31m", "Error:", error.message, "\x1b[0m");
    throw error;
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the task");
    }
    return "Task deleted";
  } catch (error) {
    console.error("\x1b[31m", "Error:", error.message, "\x1b[0m");
    throw error;
  }
}

module.exports = { getTasks, getTaskById, postTask, updateTask, deleteTask };
