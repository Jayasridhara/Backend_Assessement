const express = require("express");
const cors = require("cors");

const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", roomRoutes);
app.use("/api", bookingRoutes);

module.exports = app;
