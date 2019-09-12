require("dotenv").config();
const express = require("express");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;

const client = require("twilio")(accountSid, authToken);
const router = express.Router();

router.post(`/msg`, async (req, res) => {
  res.header("Content-Type", "application/json");
  try {
    client.messages.create({
      body: req.body.body,
      to: req.body.to,
      from: "+19495414981"
    });
    console.log("req", req.body).then(() => {
      res.status(200);
    });
  } catch (err) {
    res.status(500).json({
      error: `Could not send message.`
    });
  }
});

module.exports = router;
