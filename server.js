const express = require("express");
const cors = require("cors");
const rootHtml = require("./rootHtml");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 55555;
const app = express();

// middlewares
app.use(
  cors({ origin: ["http://localhost:5173", "https://taskeep-task.web.app"] })
);
app.use(express.json());

const uri = process.env.MONGOD_CONNECT_URI;
// const uri = process.env.LOCAL_URI;
console.log(process.env.MONGOD_CONNECT_URI);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async function () {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const tasksCollection = db.collection("tasks");
    const usersCollection = db.collection("users");

    // create a new user and store it in the db
    app.post("/api/users", async (req, res) => {
      const { email, displayName, userId } = req.body;

      const isExistUser = await usersCollection.findOne({ email });
      if (isExistUser) {
        return res.send("User Exist!");
      }

      const result = await usersCollection.insertOne({
        userId,
        email,
        displayName,
      });

      res.send(result);
    });

    app.post("/api/tasks", async (req, res) => {
      const doc = req.body;
      doc.timestamp = Date.now();

      const result = await tasksCollection.insertOne(doc);

      if (result.acknowledged) {
        return res
          .status(201)
          .send({ message: "Task created", _id: result.insertedId });
      }
    });

    app.get("/api/tasks/:email", async (req, res) => {
      const email = req.params.email;

      const result = await tasksCollection.find({ email }).toArray();

      res.send(result);
    });

    app.patch("/api/tasks/:id", async (req, res) => {
      const { status } = req.body;
      const { id } = req.params;

      await tasksCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      const updatedTask = { id, status };
      res.send({ message: "Task status updated", updatedTask });
    });

    app.delete("/api/tasks/:id", async (req, res) => {
      const { id } = req.params;

      await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      res.send({ message: "Task status updated", id });
    });

    // catch server error here
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();

// root page with plain html
app.get("/", (_, res) => {
  res.send(rootHtml);
});

app.listen(port, () => {
  console.log(`the server running port on: ${port}`);
});
