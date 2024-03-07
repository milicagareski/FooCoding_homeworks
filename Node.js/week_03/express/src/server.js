const express = require("express");
const todosRoutes = require("./routes");

const server = express();
const PORT = 5000;

// Middleware to parse JSON request bodies
server.use(express.json());

// Include routes defined in the todosRoutes module
server.use("/todos", todosRoutes);

// Start the server the defined port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
