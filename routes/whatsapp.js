const express = require("express");
const { sendMessage, getConversation, updateConversation, deleteConversation, initConversation } = require("../services/whatsapp");

const router = express.Router();

router.post("/webhook", async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  try {
    const phone = req.body.contacts[0].wa_id;
    const conversation = await getConversation(phone);
    console.log({ conversation });
    if (!conversation) {
      await initConversation(phone);
      await sendMessage({
        phone, message: `Welcome, how can we help you?\n\n1. Option one\n2. Option two`
      });
    } else {
      const [message] = req.body.messages;
      const text = message.text.body;
      if (conversation.stage === 0) {
        if (text === "1") {
          await sendMessage({
            phone, message: "Option one selected, please enter your name"
          });
          updateConversation({ phone, stage: 1, payload: {} });
        } else if (text === "2") {
          await sendMessage({
            phone, message: "Option two selected"
          });
          updateConversation({ phone, stage: 1, payload: {} });
        } else {
          await sendMessage({
            phone, message: "Invalid option"
          });
        }
      } else if (conversation.stage === 1) {
        if (text) {
          await sendMessage({
            phone, message: `Thank you for chatting with us ${ text }`
          });
          deleteConversation(phone);
        } else {
          await sendMessage({
            phone, message: "Invalid input"
          });
        }
      }
    }
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
