require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// ROUTES
const pageRouter = require("./routes/pageRouter");

// TEMPLATE ENGINE
app.set("view engine", "ejs");

//DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB Bağlantısı Başarıyla Gerçekleşti.");
});

// MIDDLEWARES
app.use(express.static("public"));

app.get("/", pageRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Sunucu ${process.env.APP_PORT} portunda ayağa kalktı.`);
});
