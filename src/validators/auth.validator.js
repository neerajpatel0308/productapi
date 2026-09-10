const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Name is required");
  }

  if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
    errors.push("A valid email is required");
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
    errors.push("A valid email is required");
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  }

  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
