const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tboql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const uri = "mongodb://localhost:27017";
// making this structure for modular style.
// call/run the connectDB function from server.js file, then call the all the db
let db;
async function connectDB() {
  try {
    // setting up mongodb client
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    // connect with MongoDB
    // await client.connect();
    db = client.db(process.env.DB_NAME);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// when call this, the taskDB will run, is the data base is not connect yet then error occur
const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB };
