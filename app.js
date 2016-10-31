var express = require('express');
var fileUpload = require('express-fileupload');
var morgan = require('morgan');
var layout = require('express-ejs-layouts');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//set up server
var app = express();
var port = 4000;

//connect to mongoose
dotenv.load({ path: '.env.' + process.env.NODE_ENV });
mongoose.connect(process.env.MONGO_URI);

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(layout);
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
//setup routes
var objectVersionRoutes = require('./routes/objectVersion');
var apiRoutes = require('./routes/objectVersion_api');

app.use('/', objectVersionRoutes);
app.use('/api', apiRoutes);

console.log('Server is runing at port: ' + port);
app.listen(port);
