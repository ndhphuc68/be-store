const express = require("express");
const cors = require("cors");

const app = express();

var corOptions = {
  origin: "http://localhost:8081",
};

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const routesAuthen = require("./routes/authenRoutes");
app.use("/api/v1", routesAuthen);

const routesCustomer = require("./routes/customerRoutes");
app.use("/api/v1/customer", routesCustomer);

// app.use("/api/v1/customer", (req, res) => {
//   res.json({ message: "hello world" });
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
