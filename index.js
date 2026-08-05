const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routers/Auth");
const todoRouter = require("./routers/Todo");

const PORT = process.env.PORT || 4000;

//database connection
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", todoRouter);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server Is Up And Running...",
  });
});
app.listen(PORT, () => {
  console.log(`App is listening on Port No. ${PORT}`);
});
