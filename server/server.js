const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const port = 3000;




app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']  // Add 'Authorization' to allowed headers
}));



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
