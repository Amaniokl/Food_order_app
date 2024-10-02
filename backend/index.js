const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const corsOptions = {
  origin: "https://localhost:3000",
  "Content-Type": "Authorization",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://amanoutlook2003:aman@cluster1.mqmno.mongodb.net/zomato?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", restaurantRoutes);
