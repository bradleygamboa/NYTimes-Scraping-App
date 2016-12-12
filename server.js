var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

/*Mongoose Connect*/
var dbURI = 'mongodb://heroku_xp4bh4sv:7tpu9f40ero5gbd5ear8mtnhj5@ds127998.mlab.com:27998/heroku_xp4bh4sv';

// mongoose.connect(db, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('mongoose connection is sucessful');
//   }
// });

app.use(express.static(__dirname + '/public'));
// var port = process.env.PORT || 3000;

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(dbURI);
}

var db = mongoose.connection;

db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});

db.once('open', function() {
	console.log('Mongoose connection succesful.');
});

var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

var routes = require('./config/routes.js');

app.use('/', routes);
app.use('/test', routes);
app.use('/fetch', routes);
app.use('/gather', routes);
app.use('/check', routes);
app.use('/save', routes);
app.use('/delete', routes);


// app.listen(port, function() {
//     console.log("lisenting on port:" + port);
// });
