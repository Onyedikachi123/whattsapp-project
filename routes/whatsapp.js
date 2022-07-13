const { default: axios } = require("axios");
const express = require("express");

const router = express.Router();

router.post("/webhook", async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  const [message] = req.body.messages;
  const [contact] = req.body.contacts;
  const text = message.text.body;
  const phone = contact.wa_id;

  const payload = {
    recipient_type: "individual",
    to: phone,
    type: "text",
    text: {
      body: "Hello, dear customer!",
    },
  };
  const _res = await axios.post(
    "https://waba-sandbox.360dialog.io/v1/messages",
    payload,
    {
      header: {
        "D360-API-KEY": "emr1IC_sandbox",
      },
    }
  );
  console.log(_res)
  res.status(200).send("Success");
});

module.exports = router;
