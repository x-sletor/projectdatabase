var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const session = require('express-session');

var app = express();

app.use(cookieParser())
app.use(
    session({
        secret: 'my_super_secret',
        resave: false,
        saveUninitialized: false
    })
)

require('./db')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main
const handler = (req, res) => {
    const mainData = fs.readFileSync(path.join(__dirname, 'mainmenu.html'));
    const deliveryData = fs.readFileSync(path.join(__dirname, 'delivery.html'));

    console.log('req.url', req.url);

    const { url } = req;

    if (url === '/delivery') {
        res.end(deliveryData);
    } else {
        res.end(mainData);
    }
};

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;