(function(){

	var express = require('express');
	var bodyParser = require('body-parser');
	var Query_Methods = require('../public/query_methods').Query_Methods();
	var router = express.Router();

	//root path relative to where this route is mounted
	//index/new/  
	router.route('/')
		.get(function(req,res){
			Query_Methods.send_results_as_json(req,res,"select * from User");
		})
		.post(function(req,res){
			var User = req.body;
			Query_Methods.return_results_as_json(req,res,"select * from User where id =" + User.id);
			console.log
		});
   //show/update/delete
	router.route('/:id')
		.post(function(req,res){
			var User = req.params;
			Query_Methods.send_results_as_json(req,res,"select * from User where id =" + User.id);
		});

	module.exports = router;
})();
