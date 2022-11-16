const jwt = require("jsonwebtoken");
const { Console } = require("winston/lib/winston/transports");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log("authheader=>", authHeader);
  const token = authHeader.split(" ")[1];
  console.log("TOKEN", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.user = decode.username;
    next();
  });
};

module.exports = verifyJWT;
