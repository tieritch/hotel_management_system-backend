const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//require("dotenv").config();
dotenv.config();
const port = process.env.PORT || 8000;
const { userRouter } = require("./routes");
app.use("/api/users", userRouter);
app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
