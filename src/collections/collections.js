const { getDB } = require("../db/db");

const tasksCollection = () => getDB().collection("tasks");
const usersCollection = () => getDB().collection("users");

module.exports = { tasksCollection, usersCollection };
