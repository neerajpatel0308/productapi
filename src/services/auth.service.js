const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const emailFormate = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: emailFormate });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name: name.trim(),
    email: emailFormate,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

const loginUser = async ({ email, password }) => {
  const emailFormate = email.toLowerCase().trim();

  const user = await User.findOne({
    email: emailFormate,
  }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};
