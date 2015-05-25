(function(){
	var mysql = require('mysql');
    var Utility = require('./utility');
	var connection_options = {
		host:'54.173.69.251',
		user:'batman',
		password:'harper',
		database:'FITNESS_FANATIC'
	};

	var connection = mysql.createConnection(
		connection_options
	);
	var mysql_pool_connection = null;    

	Query_Methods = {
		base_query_setup: function(req,res,the_query,return_object){
			var what_to_return = Utility.check_optional_parameters(return_object);
			mysql_pool_connection.getConnection(function(err,connection){
				if(err){
					connection.release();
					res.json({"code": 100, "status":"error in connection database"});
					return;
				}
				connection.query(the_query,function(err,rows,fields){
					if(!err){
						connection.release();
						if(what_to_return){
							return rows;	
						}else{
							res.send(rows);
						}

					}
				});
				connection.on("error",function(error){
					res.json({"code": 100, "status":"error in connection database"});
					return;
				});
			});

		},
		send_results_as_json: function(req,res,the_query){
			this.base_query_setup(req,res,the_query);	
		},
		return_results_as_array: function(req,res,the_query){
			this.base_query_setup(req,res,the_query,true);	
		}

	};

	module.exports ={
		create_mysql_pool_connection: function(){
			//adding the connectionLimit to the connection object
			connection_options.connectionLimit =  100;
			mysql_pool_connection = mysql.createPool(
				connection_options
			);
		},
		Query_Methods: function(){
			return Query_Methods;	
		}
	}   
})();
 
