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

dotenv.config();

app.use(express.json());

app.use(cookieParser());

const port = process.env.PORT || 8000;

app.use("/api/users", require("./routes/user.router"));

app.use("/api/roles", require("./routes/role.router"));

//app.use("/api/user_roles", require("./routes/user-role.router"));

app.use("/api/positions", require("./routes/position.router"));

app.use("/api/employees", require("./routes/employee.router"));

app.use("/api/suppliers", require("./routes/supplier.router"));

app.use("/api/room-types", require("./routes/room-type.router"));

app.use("/api/room-statuses", require("./routes/room-status.router"));

app.use("/api/rooms", require("./routes/room.router"));

app.use("/api/measuring-units", require("./routes/measuring-unit.router"));

app.use("/api/movement-types", require("./routes/movement-type.router"));

app.use("/api/order-statuses", require("./routes/order-status.router"));

app.use("/api/actions", require("./routes/action.router"));

app.use("/api/resources", require("./routes/resource.router"));

app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
