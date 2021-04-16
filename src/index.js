const express = require('express');
const morgan = require('morgan');
const expressHBS = require('express-handlebars');
const path = require('path');

//initializations

const app = express();

//setting

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHBS({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));

//middlewares

app.use(morgan('dev'));

//global variables

//routes

app.use(require('./routes'));

//public 

//starting the server

app.listen(app.get('port'), () => {
    console.log("Mi primer server ", app.get('port'));
});