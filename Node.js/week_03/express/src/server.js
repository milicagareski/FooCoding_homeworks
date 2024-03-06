const express = require("express");
const todosRoutes = require("./routes");

const server = express();
const PORT = 5000;

server.use(express.json());

server.use("/todos", todosRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
