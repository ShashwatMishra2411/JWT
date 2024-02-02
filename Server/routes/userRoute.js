const express = require("express");
const router = express.Router();
const User = require("../schema/user");
const Token = require("../schema/refresh_token");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username: req.body.username });
    console.log("use = ", user);
    if (user) {
      res.status(409).send({ message: "User already exists" });
    } else {
      const uc = await User.create({ username, password });
      res.status(200).send(uc);
    }
    console.log(await User.find());
  } catch (e) {
    res.send({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          { username: username, flag: true },
          process.env.PRIVATE_KEY,
          {
            algorithm: "HS256",
          }
        );
        const refresh_token = jwt.sign(
          { username: username, flag: false },
          process.env.REFRESH_KEY,
          {
            algorithm: "HS256",
          }
        );
        await Token.create({ token: refresh_token });
        res.send({ message: [token, refresh_token] });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  } catch (e) {
    res.send({ message: e.message });
  }
});

router.get("/login", async (req, res) => {
  try {
    // req.user = username;
    const token = req.headers.authorization;
    console.log(await Token.find(), token);

    jwt.verify(
      token,
      process.env.PRIVATE_KEY,
      {
        algorithms: ["HS256"],
      },
      async (err, decoded) => {
        if (err) {
          res.send({ message: err.message });
          console.log(err.message);
        } else {
          if (decoded.flag) {
            req.user = decoded.username;
            const users = await User.find();
            const user = users.filter((user) => {
              return user.username === req.user;
            });
            res.send(user);
          } else {
            res.send("Generate a new access token at URL_ORIGIN/token");
          }
        }
      }
    );
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

router.post("/token", async (req, res) => {
  try {
    const refresh_token = req.body.token;
    const status = await Token.deleteOne({ token: refresh_token });
    console.log(await Token.find(), refresh_token);
    if (status.deletedCount === 0) {
      res.send({ message: "Invalid refresh token" });
    } else {
      jwt.verify(
        refresh_token,
        process.env.REFRESH_KEY,
        { algorithm: "HS256" },
        (err, decoded) => {
          if (err) {
            res.send({ message: err.message });
          } else {
            const token = jwt.sign(
              { username: decoded.username, flag: true },
              process.env.PRIVATE_KEY,
              { algorithm: "HS256" }
            );
            res.send({ message: token });
          }
        }
      );
    }
  } catch (e) {
    res.send({ message: e.message });
  }
});
module.exports = router;
