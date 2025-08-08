const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('require');
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;



mongoose.connect(uri).then(
    async() =>{

        console.log('Connected to MongoDB.')

        app.listen(PORT, ()=>{
            console.log(`Connected to port ${PORT}`);
        });
    }
).catch((err) =>{ console.log(`Error: ${error}`)});