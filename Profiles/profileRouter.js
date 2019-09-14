const express = require("express");

const router = express();
const Profile = require("./profilesModel");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findByUserId(req.headers.id);
    if (!req.decodedToken) {
      return res.status(403).json({ error: "invalid token" });
    }
    const currentUserId = req.decodedToken.subject;
    if (req.headers.id != currentUserId) {
      res.status(401).json({ error: "Stop trying to snoop!" });
    } else {
      if (profile === undefined) {
        res.status(404).end();
      } else {
        res.status(200).json(profile);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { name, phone, email } = req.body;
  if (!req.decodedToken) {
    return res.status(403).json({ error: "invalid token" });
  }
  const user_id = req.decodedToken.subject;

  if (!name || !email || !phone) {
    return res.status(422).json({ error: "Missing required data" });
  } else {
    try {
      const profile = await Profile.add({ ...req.body, user_id });
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile === undefined) {
      res.status(404).end();
    } else {
      res.status(200).json(profile);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const currentUserId = req.decodedToken.subject;
  if (req.headers.id != currentUserId) {
    res.status(401).json({ error: "Stop trying to snoop!" });
  } else {
    const updatedProfile = await Profile.findById(req.params.id);
    if (!updatedProfile) {
      res.status(404).json({ error: "Profile does not exist!" });
    } else if (updatedProfile.user_id != currentUserId) {
      res
        .status(401)
        .json({ error: "Please do not try to edit others' profiles" });
    } else {
      try {
        const profile = await Profile.update(req.params.id, req.body);
        const updatedProfile = await Profile.findById(req.params.id);
        if (!updatedProfile) {
          res.status(404).json({ error: "Profile does not exist!" });
        } else {
          res.status(200).json(updatedProfile);
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  }
});

module.exports = router;
