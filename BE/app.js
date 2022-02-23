require("dotenv/config");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const jwtAuth = require("./middlewares/jwtAuth");
const app = express();
const cors = require("cors");
const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminAuth = require("./middlewares/adminAuth");

app.use(express.json());
app.use(cors());
dbConnect();

app.use("/api/food", jwtAuth, foodRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", jwtAuth, adminAuth, adminRoutes);

app.get("/", (req, res) => {
  res.send("API");
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "invalid Token" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is up and running on PORT ${PORT}`);
});
