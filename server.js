const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/db/db");
const rootHtml = require("./rootHtml");
require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");

// setUp port and application
const port = process.env.PORT || 55555;
const app = express();
const wss = createServer(app);
const io = new Server(wss, {
  cors: {
    origin: ["http://localhost:5173"], // Update with your frontend URL
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"], // Add polling as a fallback
});

// call the the function before calling 'app' object. otherwise, there might error.
connectDB();

// middlewares
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("client connection:", socket.id);

  // Handle Task Update Event
  socket.on("taskUpdated", (updatedTask) => {
    io.emit("updateTasks", updatedTask);
  });

  // Handle Disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// import routes and pass '\io
const tasksRoute = require("./src/routes/tasks")(io);
const usersRoute = require("./src/routes/users");

// routes
app.use("/api/tasks", tasksRoute);
app.use("/api/users", usersRoute);

app.get("/", (_, res) => {
  res.send(rootHtml);
});

wss.listen(port, () => {
  console.log(`the server running port on: ${port}`);
});
