const express = require("express"); // import express for running server
const app = express(); //calling express function
const env = require("dotenv"); //import dotenv for setting environment variables
const mongoose = require("mongoose");
const authRoutes = require("../src/routes/auth"); //routes
const adminRoutes = require("../src/routes/admin/auth");

env.config(); //environment variable
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0yelpcamp.4wt3g.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("databse connected");
  });

app.use(express.urlencoded({ extended: true }));
// parse application/x-www-form-urlencoded
app.use(express.json()); // express built-in parsers Used to parse JSON bodies
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
