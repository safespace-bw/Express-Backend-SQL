if (process.env.DB_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../Auth/authRouter");
const messagesRouter = require("../Messages/messagesRouter");
const profilesRouter = require("../Profiles/profileRouter");
const twilioRouter = require("../sms/sms");
const restricted = require("../middleware/restricted");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/messages", restricted, messagesRouter);
server.use("/api/profiles", restricted, profilesRouter);
server.use("/api/twilio", twilioRouter);

//sanity check
server.get("/", (req, res) => {
  res.status(200).json({ message: "Hey dont worry you are in a safe space" });
});

module.exports = server;
