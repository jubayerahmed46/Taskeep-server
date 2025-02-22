const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/db/db");
const rootHtml = require("./rootHtml");
require("dotenv").config();

// import routes and pass
const tasksRoute = require("./src/routes/tasks");
const usersRoute = require("./src/routes/users");

// setUp port and application
const port = process.env.PORT || 55555;
const app = express();

// call the the function before calling 'app' object. otherwise, there might error.
connectDB();

// middlewares
app.use(
  cors({ origin: ["http://localhost:5173", "https://taskeep-task.web.app"] })
);
app.use(express.json());

// routes
app.use("/api/tasks", tasksRoute);
app.use("/api/users", usersRoute);

app.get("/", (_, res) => {
  res.send(rootHtml);
});

app.listen(port, () => {
  console.log(`the server running port on: ${port}`);
});
