const express = require("express");

// Database
const db = require("./config/db");
const app = express();

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;

app.use("/whatsapp", require("./routes/whatsapp"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
