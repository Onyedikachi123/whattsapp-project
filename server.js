const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 7000;

app.use("/whatsapp", require("./routes/whatsapp"));

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});
