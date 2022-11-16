const userDB = {
  user: require("../model/users.json"),
  setUser: (user) => {
    this.user = user;
  },
};
const bcrypt = require("bcrypt");

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
    console.log("matchuser", matchPassword);
    if (matchPassword) {
      res
        .status(200)
        .json({ statusmessage: `user ${foundUser.username} is logged in!` });
    } else {
      res.status(401).json({ statusmessage: "incorrect password" });
    }
  } else {
    res.status(401).json({ statusmessage: "user is not authenticated" });
  }
};
module.exports = { handleLogin };
