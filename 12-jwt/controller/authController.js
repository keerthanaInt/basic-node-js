const userDB = {
  user: require("../model/users.json"),
  setUser: (user) => {
    this.user = user;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  if (!req.body.user || !req.body.pwd) {
    res.status(400).json({ statusmesssage: "user and password is require" });
  }
  const foundUser = userDB.user.find(
    (person) => person.username === req.body.user
  );
  if (foundUser) {
    const matchPassword = await bcrypt.compare(
      req.body.pwd,
      foundUser.password
    );
    if (matchPassword) {
      const accessToken = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        {
          username: foundUser.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const otherUser = userDB.user.filter(
        (person) => person.username !== foundUser.username
      );
      const currentUser = { ...foundUser, refreshToken };
      console.log("==>currentUser", currentUser);
      userDB.setUser([...otherUser, currentUser]);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(userDB.user)
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
      console.log("userDB.user", userDB.user);
    } else {
      res.status(401).json({ statusmessage: "incorrect password" });
    }
  } else {
    res.status(401).json({ statusmessage: "user is not authenticated" });
  }
};
module.exports = { handleLogin };
