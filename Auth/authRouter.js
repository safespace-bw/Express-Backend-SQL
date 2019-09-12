const express = require("express");
const db = require("../data/config/dbConfig.js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "How safe is it??";

router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth router is running!" });
});

router.post("/register", async (req, res) => {
  const creds = req.body;
  const { username, password } = creds;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Submit both username and password when registering!" });
  }

  const hash = bcrypt.hashSync(password, 10);
  req.body.password = hash;

  try {
    const [id] = await db("users").insert(creds, "id"); // could use ,'id' if it stops working
    const user = await db("users")
      .where({ id })
      .first();

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: `Error while registering user: ${error}` });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Submit both username and password when logging in!" });
  }
  try {
    const user = await db("users")
      .where({ username })
      .first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        message: "Logged in!",
        token: `${token}`,
        user_id: `${user.id}`
      });
    } else {
      res.status(401).json({
        message: "Either username or password was incorrect: please try again."
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error while logging user in: ${error}` });
  }
});

generateToken = ({ id, username }) => {
  const payload = {
    subject: id,
    username
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;
