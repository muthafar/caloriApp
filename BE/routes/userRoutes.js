const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    const user = new User({
      email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const newUser = await user.save();
    let token = jwt.sign(
      {
        userId: newUser.id,
        userEmail: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    req.user = newUser;
    res.send({ token, userInfo: req.user });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).send({ message: "No user found" });
    }
    if (bcrypt.compareSync(password, foundUser.password)) {
      let token = jwt.sign(
        {
          userId: foundUser.id,
          userEmail: foundUser.email,
          isAdmin: foundUser.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      req.user = foundUser;
      res.json({ token, userInfo: req.user });
    } else {
      return res.status(401).send({ message: "Invalid username/password" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
