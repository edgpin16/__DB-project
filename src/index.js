const express = require('express');
const morgan = require('morgan');

//initializations

const app = express();

//setting

app.set('port', process.env.PORT || 5000);

//middlewares

app.use(morgan('dev'));

//global variables

//routes

//public 

//starting the server

app.listen(app.get('port'), () => {
    console.log("Mi primer server ", app.get('port'));
});