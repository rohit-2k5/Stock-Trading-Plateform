const jwt = require("jsonwebtoken");

module.exports.protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY || "SECRET_KEY");
    req.user = decoded; // attach user info for later use
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
