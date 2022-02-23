const express = require("express");

const Food = require("../models/food");
const User = require("../models/user");
const date = require("date-and-time");
const router = express.Router();

router.get("/food", async (req, res) => {
  const meals = await Food.find({})
    .sort({
      createdAt: -1,
    })
    .populate("author", "email");
  if (!meals) {
    res.status(500).send("No meals Found");
  }
  res.send(meals);
});

router.post("/food", async (req, res) => {
  const { user, foodName, calorie, price } = req.body;
  const foundUser = await User.findOne({ email: user });

  const food = new Food({
    foodName,
    calorie,
    price,
    author: foundUser._id,
  });
  const newMeal = await food.save();
  res.send(newMeal);
});

router.put("/:mealId", async (req, res) => {
  try {
    const { mealId } = req.params;
    const { foodName, calorie, price } = req.body;
    const meal = await Food.findByIdAndUpdate(
      mealId,
      {
        foodName,
        calorie,
        price,
      },
      { new: true }
    );

    res.send(meal);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:mealId", async (req, res) => {
  try {
    const { mealId } = req.params;
    const deletedmeal = await Food.findByIdAndRemove(mealId, { new: true });
    res.send(deletedmeal);
  } catch (error) {
    res.send(error);
  }
});
router.get("/getmealsweek", async (req, res) => {
  try {
    const number = await Food.find({
      createdAt: {
        $lte: new Date().setHours(23, 59, 59),
        $gte: new Date().setDate(new Date().getDate() - 7),
      },
    }).countDocuments();

    res.send(number + "");
  } catch (error) {
    console.log(error);
  }
});
router.get("/getmealsweekbefore", async (req, res) => {
  const todayMeals = await Food.find({
    createdAt: {
      $gte: new Date().setHours(00, 00, 00),
      $lte: new Date().setHours(23, 59, 59),
    },
  }).countDocuments();

  const weekBeforeMeals = await Food.find({
    createdAt: {
      $lte: new Date().setDate(new Date().getDate() - 7),
      $gte: new Date().setDate(new Date().getDate() - 14),
    },
  }).countDocuments();
  let sum = todayMeals + weekBeforeMeals;

  res.send(sum + "");
});
router.get("/avgCal", async (req, res) => {
  const data = await Food.find({
    createdAt: {
      $lte: new Date().setHours(23, 59, 59),
      $gte: new Date().setDate(new Date().getDate() - 7),
    },
  })
    .populate("author", "email")
    .select("calorie createdAt");

  const users = [...new Set(data.map((user) => user.author.email))];

  let sum = 0;
  let count = 0;
  let avg;
  const result = [];
  for (let user of users) {
    for (let meal of data) {
      if (user === meal.author.email) {
        sum += meal.calorie;
        count += 1;
      }
    }
    avg = sum / count;
    result.push({ name: user, avg });
    count = 0;
    sum = 0;
    avg = 0;
  }

  res.json({ calAvg: result });
});

module.exports = router;
