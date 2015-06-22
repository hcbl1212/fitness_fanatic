(function(){
	var express = require('express');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var app = express();
	var port = process.env.Port || 3000;
	//grabbing all the routes
	var users = require('./routes/user');
	var login = require('./routes/login');
	var initiate_connection_pool = require('./public/query_methods');
	//used to log request to console
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(morgan("dev"));
	app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST','PUT','DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
		next();
	});
	//this is middleware that just makes sure there is an authorization header for any request
	//except for the login url because no user will be authenticated yet
    app.use(function ensureAuthorized(req, res, next) {
		if(req.originalUrl.substr(0,6) !== '/login'){
			var bearerToken;
			var bearerHeader = req.headers["authorization"];
			if (typeof bearerHeader !== 'undefined') {
				var bearer = bearerHeader.split(" ");
				bearerToken = bearer[1];
				req.token = bearerToken;
				next();
			} else {
				res.send(403);
			}
		}else{
			next();
		}
	});
	//adding the routers as middleware   
	app.use('/users',users);
	app.use('/login',login);
	//initializing the connection pool for the whole app
	initiate_connection_pool.instantiate_application_connection_pool();
	app.listen(port,function(){
		console.log("on port " + port);
	});
})();
