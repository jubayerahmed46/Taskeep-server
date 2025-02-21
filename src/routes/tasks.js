const express = require("express");
const { tasksCollection } = require("../collections/collections");
const { ObjectId } = require("mongodb");

const router = express.Router();

const taskRoutes = (io) => {
  router.post("/", async (req, res) => {
    const taskColl = tasksCollection();
    const doc = req.body;
    doc.timestamp = Date.now();

    const result = await taskColl.insertOne(doc);

    if (result.acknowledged) {
      doc._id = result.insertedId;
      io.emit("taskCreated", doc);

      return res.status(201).send({ message: "Task created", task: doc });
    }
  });

  router.get("/:email", async (req, res) => {
    const taskColl = tasksCollection();
    const email = req.params.email;

    const result = await taskColl.find({ email }).toArray();

    res.send(result);
  });

  router.patch("/:id", async (req, res) => {
    const taskColl = tasksCollection();

    const { status } = req.body;
    const { id } = req.params;

    await taskColl.updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    const updatedTask = { id, status };
    io.emit("taskUpdated", updatedTask);
    res.send({ message: "Task status updated", updatedTask });
  });

  router.delete("/:id", async (req, res) => {
    const taskColl = tasksCollection();
    const { id } = req.params;

    await taskColl.deleteOne({ _id: new ObjectId(id) });

    io.emit("taskDeleted", { id });
    res.send({ message: "Task status updated", id });
  });

  return router;
};

module.exports = taskRoutes;
