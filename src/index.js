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
//const { userRouter } = require("./routes/user.router");
//const {permissionRouter}=require()
app.use("/api/users", require("./routes/user.router"));
//app.use("/api/permissions", require("./routes/permission.router"));
app.use("/api/roles", require("./routes/role.router"));

//app.use("/api/user_roles", require("./routes/user-role.router"));

app.use("/api/positions", require("./routes/position.router"));

app.use("/api/employees", require("./routes/employee.router"));

app.use("/api/actions", require("./routes/action.router"));

app.use("/api/resources", require("./routes/resource.router"));
app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
