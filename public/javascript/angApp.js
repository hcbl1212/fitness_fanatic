(function(){
angular.module('fitnessFanatic',[]).directive('appMenu',function(){
		return{
			restrict: "E",
			templateUrl:"/templates/app-menu.html",
			scope:true,
			controller: function(){
				this.smallMenuToggleValue = false;
				this.toggleSmallMenu = function(){
					this.smallMenuToggleValue = this.smallMenuToggleValue === false ? true : false;
				}
			},
			controllerAs: 'MenuToggle'
		};
	});



})();