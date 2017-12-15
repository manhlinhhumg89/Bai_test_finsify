var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise

//connect to mongodb server
mongoose.connect('mongodb://localhost:27017/employees')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.log(err))
var port = 4000;
//Khai bao router

var index = require('./routes/index');
var users = require('./routes/users');
var employees = require('./routes/employees')
var app = express();

//view engine setup

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//----------------
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

//Declare router
app.use('/',index)
app.use('/users',users)
app.use('/employees', employees);
//Catch 404 ang forward to error handler

app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err)
});

app.listen(port, ()=>{
    console.log('server is running '+ port)
})
