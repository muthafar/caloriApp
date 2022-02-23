const express = require("express");
const Food = require("../models/food");
const date = require("date-and-time");

const router = express.Router();

router.get("/", async (req, res) => {
  const meals = await Food.find({ author: req.user.userId }).sort({
    createdAt: -1,
  });

  if (!meals) {
    res.status(500).send("No meals Found");
  }

  res.send(meals);
});

router.post("/", async (req, res) => {
  const { foodName, calorie, price } = req.body;
  const food = new Food({
    foodName,
    calorie,
    price,
    author: req.user.userId,
  });

  const savedmeal = await food.save();
  res.send(savedmeal);
});
router.post("/search", async (req, res) => {
  const { from, to } = req.body;

  const result = await Food.find({
    author: req.user.userId,
    createdAt: {
      // $gte: new Date(new Date(from).setHours(00, 00, 00)),
      // $lte: new Date(new Date(to).setHours(23, 59, 59)),
      $gte: new Date(from).setHours(00, 00, 00),
      $lte: new Date(to).setHours(23, 59, 59),
    },
  });

  res.send(result);
});

router.get("/", async (req, res) => {});

router.get("/sumcal", async (req, res) => {
  const meals = await Food.find({ author: req.user.userId });
  let sumCal = 0;
  for (let meal of meals) {
    if (
      date.format(meal.createdAt, "ddd, MMM DD YYYY") ===
      date.format(new Date(), "ddd, MMM DD YYYY")
    ) {
      sumCal += meal.calorie;
    }
  }
  res.send({ sumCal });
});

module.exports = router;
