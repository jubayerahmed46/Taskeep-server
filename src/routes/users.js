const express = require("express");
const { usersCollection } = require("../collections/collections");

const router = express.Router();

router.post("/", async (req, res) => {
  const usersColl = usersCollection();

  const { email, displayName, userId } = req.body;

  const isExistUser = await usersColl.findOne({ email });
  if (isExistUser) {
    return res.send("User Exist!");
  }

  const result = await usersColl.insertOne({ userId, email, displayName });

  res.send(result);
});

module.exports = router;
