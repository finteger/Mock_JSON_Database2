const express = require('express');
const router = express.Router();
const { readData } = require('../utils/file.js');
const userController  = require('../controllers/userController');

//route handler for home page
router.get("/home", (req, res) => {
  res.render("home");
});

//api endpoint for exposing the resource
router.get("/api/v1/users", async (req, res) => {
  try {
    const data = await readData();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

router.post("/users", userController.createUser);


module.exports = router;
