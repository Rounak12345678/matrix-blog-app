const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const port = 5000;

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((config) => {
    console.log("DB connection Successfull!!");
  });

app.listen(port, () => {
  console.log(`App is running at ${port}...`);
});
