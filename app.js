const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const ejs = require("ejs");
const { readData, writeData } = require("./utils/file.js");
const userRoutes = require('./routes/users.js');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');
const rateLimit = require('express-rate-limit');


const fixedRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests, please try again later."
});

//setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(fixedRateLimiter);
app.use(userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



mongoose
  .connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`Connected to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
