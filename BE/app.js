var express = require('express');
var logger = require('morgan');
var path = require('path');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
dotenv.config();
var authRouter = require('./routes/auth');
var factoryRouter = require('./routes/factory');
var coporationRouter = require('./routes/coporation');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};//  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.get('/', (req, res) => {
  res.json({"hello": 'hello'});
})
app.use('/auth', authRouter);
app.use('/factory', factoryRouter);
app.use('/coporation', coporationRouter);

module.exports = app;