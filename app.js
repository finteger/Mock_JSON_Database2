const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const ejs = require('ejs');


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//route handler for home page
app.get('/home', (req, res) => {
    res.render('home');
});


mongoose.connect(uri).then(
    async() =>{

        console.log('Connected to MongoDB.')

        app.listen(PORT, ()=>{
            console.log(`Connected to port ${PORT}`);
        });
    }
).catch((err) =>{ console.log(`Error: ${error}`)});