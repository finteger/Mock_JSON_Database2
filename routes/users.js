const express = require('express');
const router = express.Router();


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


module.exports = router;
