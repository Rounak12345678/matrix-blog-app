const express = require("express");
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const commentRouter = require("./routes/commentRoute");
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']  // Add 'Authorization' to allowed headers
}));

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/comments", commentRouter);

module.exports = app;
