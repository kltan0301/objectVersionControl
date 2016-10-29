var express = require('express');
var fileUpload = require('express-fileupload');
var morgan = require('morgan');
var layout = require('express-ejs-layouts')
var  dotenv = require('dotenv');
var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var app = express();
var port = 3000;

dotenv.load({ path: '.env.' + process.env.NODE_ENV })

mongoose.connect(process.env.MONGO_URI)

app.use(morgan('dev'));
app.set('view engine', 'ejs')
app.use(layout)

app.listen(port);
console.log('Server is runing at port: ' + port);
