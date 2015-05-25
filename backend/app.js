(function(){
	var express = require('express');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var jwt = require('jsonwebtoken');
	var app = express();
	var port = process.env.Port || 3000;
	var users = require('./routes/user');
	//creates one connection pool for entire app
	require('./public/query_methods').create_mysql_pool_connection();

	//used to log request to console
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(morgan("dev"));
	app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
		next();
	});

	app.use('/user',users);

	app.listen(port,function(){
		console.log("on port " + port);
	});
})();
