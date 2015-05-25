// Utility object to hold various methods that didn't make sense to add to any other objects prototype
(function(){
	var Utility = {};

	Utility.check_optional_parameters  = function(parameter_passed){
		if (typeof parameter_passed === 'undefined') return false;
		return parameter_passed;
	};
	module.exports = Utility;
})();
