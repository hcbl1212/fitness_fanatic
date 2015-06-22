(function(){
	var express = require('express');
	var router = express.Router();
	var query_object = require('../public/query_methods');
	router.route('/')
		.post(function(req,res){
			query_object.make_sql_query("select authToken from User where email = ? and password = ?",[req.query.email,req.query.password],function(query_results){
				var User = query_results[0];
				console.log(User);
				if(User){//we have the user
					res.send(query_results);
				}else if(typeof User === 'undefined'){//we have no user
					res.send({message: "No user found make them register"});
				}else{//we have an error YAY!!
					res.send({error: query_results.message});	
				}
			});
		});
	module.exports = router;
})();

