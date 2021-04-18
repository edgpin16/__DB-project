const express = require('express');
const morgan = require('morgan');
const expressHBS = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');

const {database} = require('./keys');

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
    helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');

//middlewares

app.use(session({
    secret: 'DatabaseProject',
    resave: 'false',
    saveUninitialized: 'false',
    store: new mysqlStore(database),
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//global variables

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});

//routes

app.use(require('./routes'));
app.use('/agregarEmpleado', require('./routes/agregarEmpleado'));
app.use('/agregarFarmacia', require('./routes/agregarFarmacia'));

//public 

app.use(express.static(path.join(__dirname, 'public')));

//starting the server

app.listen(app.get('port'), () => {
    console.log("Mi primer server ", app.get('port'));
});