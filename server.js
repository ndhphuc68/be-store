const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./middleware/auth");
const roles = require("./middleware/checkRoles");
const app = express();
const bodyParser = require("body-parser");
const Role = require("./utils/role");

var corOptions = {
  origin: "http://localhost:8081",
};

app.use(cors());

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const routesAuthen = require("./routes/authenRoutes");
app.use("/api/v1", routesAuthen);

const routesCustomer = require("./routes/customerRoutes");

app.use("/api/v1/customer", routesCustomer);


// routes test
app.use("/api/v1/test", auth, roles(Role.CUSTOMER), (req, res) => {
  res.json({ message: "hello world" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
