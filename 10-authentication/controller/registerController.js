const userDB = {
  user: require("../model/users.json"),
  setUser: (newUser) => {
    this.user = newUser;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleUsers = async (req, res) => {
  if (!req.body.user || !req.body.pwd)
    return res
      .status(400)
      .json({ statusmessage: "username and password is required " });
  const duplicateUser = userDB.user.find(
    (person) => person.username === req.body.user
  );
  if (duplicateUser)
    return res
      .status(409)
      .json({ statusmessage: "the user is already register" });
  try {
    const hasedPwd = await bcrypt.hash(req.body.pwd, 10);
    const newUserData = { username: req.body.user, password: hasedPwd };
    userDB.setUser([...userDB.user, newUserData]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.user)
    );
    console.log("new user was created =>", userDB.user);
    res
      .status(201)
      .json({ statusmessage: "New user " + req.body.user + " was created" });
  } catch (error) {
    res.status(500).json({ statusmessage: error.message });
  }
};
module.exports = { handleUsers };
