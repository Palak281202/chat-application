// here we will be creating a middleware for the authentication
// this middleware would be used at a place which we want to autorize i.e which requires authorization.

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const token = header.split(" ")[1];
    console.log(token);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};
