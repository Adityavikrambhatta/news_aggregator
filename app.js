const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
require('dotenv').config();

const {signUp, login} = require(path.join(__dirname,"src", "routers", "authRouter.js"))
const newsActions = require(path.join(__dirname,"src", "routers", "newsActionsRouters.js"))
const verifyToken = require(path.join(__dirname,"src","routers","middleware.js"));

const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try{
    mongoose.connect("mongodb://localhost:27017/userDb",{
            useUnifiedTopology: true,
            useNewUrlParser: true
    });
    console.log("Connected to the DB")

}catch(err){
    console.log("Connection to the DB failed")
}

app.get('/', (req, res)=>{
    return res.status(200).send("<HTML><h1>Server  Initialised . <br/> Welcome to 'News Aggregator'  </h1></HTML>")
});

app.post('/users/signup', signUp );

app.post('/users/login', login ) ;

app.use('/users', verifyToken, newsActions);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;