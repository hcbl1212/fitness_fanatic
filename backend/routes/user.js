(function(){
	var express = require('express');
	var router = express.Router();
	var underscore = require('underscore');
	var bodyParser = require('body-parser');
	//database dependencies
	var mysql = require('mysql');
	var query_object = require('../public/query_methods');


	//root path relative to where this route is mounted
	router.route('/')
		.get(function(req,res){//get /users - index
			var all_the_users = function(query_rows){
				res.send(query_rows);	
			};
			query_object.make_sql_query("select * from User",[],all_the_users);
		})
		.put(function(req,res){//put /users/ - update
			var User = req.body;
			var attributes_to_update = {};
			if('id' in User){
				attributes_to_update = 	underscore.omit(User,'id');
			}else{
				 res.send({"code": 404,"message": "Cannot update User without an id"});
				 return;
			}
			var update_message = function(query_rows){
				if(query_rows.changedRows > 0){
					res.send({message:"User update successfully"});	
				}else{
					res.send({error: query_rows.message});
				}
			};
			query_object.make_sql_query("update User set ? where id = ? ",[attributes_to_update,User.id],update_message);
		})
		.post(function(req,res){//post /users - create
			var User = req.body;
			var create_message = function(query_rows){
				if(query_rows.affectedRows > 0){
					res.send({message:"User Created"});	
				}else{
					res.send({error: query_rows.message});
				}
			};
			query_object.make_sql_query("insert into User set ? ",User,create_message);
		});

	router.route('/:id')
		.get(function(req,res){//get /users/:id - show
			var User = req.params;
			var show_user = function(query_rows){
				res.send(query_rows);	
			};
			query_object.make_sql_query("select * from User where id = ?",[User.id],show_user);
		})
		.delete(function(req,res){//delete /users/:id -delete
			var User = req.params;
			var remove_message = function(query_rows){
				if(query_rows.affectedRows > 0){
					res.send({message:"User Deleted"});	
				}else{
					res.send({error: query_rows.message});
				}
			};
			query_object.make_sql_query("delete from User where id =? ",[User.id],remove_message);
		});
	module.exports = router;
})();

//TODO:
//get /users - index [x][x]
//get /users/:id - show [x][x]
//post /users - create [x][x]
//put /users/ - update [x][x]
//delete users/:id -delete [x][x]  
//add server side validation
//add authentication
