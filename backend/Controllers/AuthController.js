const User = require("../Models/UsersModel");  // or UserModel if renamed
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if fields are provided
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    // Validate password
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    // Create token and set cookie
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.checkUser = (req, res) => {
  const token = req.cookies.token || req.headers["authorization"];
  if (!token) {
    return res.json({ loggedIn: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY || "SECRET_KEY", (err, decodedToken) => {
    if (err) {
      return res.json({ loggedIn: false });
    } else {
      return res.json({ loggedIn: true, userId: decodedToken.id });
    }
  });
};

module.exports.protect = (req, res, next) => {
  try {
    const token = req.cookies.token; // token stored in cookies

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    jwt.verify(token, process.env.TOKEN_KEY || "SECRET_KEY", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

// Logout Controller
module.exports.Logout = (req, res) => {
  // Clear the token cookie by setting it empty with very short expiry
  res.cookie("token", "", {
    withCredentials: true,
    httpOnly: false,
    maxAge: 1,
  });
  res.json({ success: true, message: "Logged out successfully" });
};

