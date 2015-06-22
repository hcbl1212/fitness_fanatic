(function(){
	//this will be the same object for the entire app see link below
	//https://nodejs.org/api/modules.html#modules_caching
	var mysql = require('mysql');
	var connection_options = {
		host:'54.173.69.251',
		user:'batman',
		password:'harper',
		database:'FITNESS_FANATIC'
	};
	//connection object for a query
	var connection = mysql.createConnection(connection_options);
	//adding the connectionLimit to the connection object
	var	mysql_pool_connection ={};
	
	//exports for module
	exports.connection_options = connection_options;
    //this will make a connection pool for the app
	exports.instantiate_application_connection_pool = function(){
		connection_options.connectionLimit =  100;
		mysql_pool_connection = mysql.createPool(connection_options);
	};
	//main function to query database with
	exports.make_sql_query = function(the_query,the_constraints,the_callback){
			mysql_pool_connection.getConnection(function(err,connection){
				connection.query(the_query,the_constraints,function(err,rows,fields){
					if(!err){
						connection.release();
						the_callback(rows);
					}else{
						console.log(err);
						the_callback(err);
					}
				});
			});
		};	
	//can return a connection from the connection pool
	exports.getConnection = function(call_back){
		mysql_pool_connection.getConnection(function(err,connection){
			if(err){
				return call_back(err);
			}else{
				call_back(err,connection);
			}
			
		});
	};

})();
 
