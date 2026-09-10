const express = require("express");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product API is running",
  });
});

module.exports = app;

// const express = require("express");
// const app = express();
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send(200).json({
//     success: "true",
//     message: "Api is running",
//   });
// });

// module.exports = app;
