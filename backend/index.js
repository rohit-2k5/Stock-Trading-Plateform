// to get data from .env file
require("dotenv").config();

const express = require("express");  
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Models
const { HoldingsModel } = require("./Models/HoldingsModel");
const { PositionsModel } = require("./Models/PositionsModel");
const { OrdersModel } = require("./Models/OrdersModel");

// middlewares
const { protect } = require("./Middlewares/authMiddleware");


// Auth Route
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const app = express();

// Middlewares
app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:3000"],   // so frontend can call APIs
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Authentication Routes
app.use("/", authRoute);

// Existing Routes
app.get("/allHoldings", protect, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", protect, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/allOrders", protect, async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post("/newOrder", protect, async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
  res.send("Order saved");
});

// Database connection and server start
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  mongoose.connect(url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
});
