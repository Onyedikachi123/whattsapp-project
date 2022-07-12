const express = require("express");

const router = express.Router();

router.post("/webhook", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send("Success");
});

module.exports = router;
