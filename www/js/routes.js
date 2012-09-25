var App = App || {};
App.proto = App.proto || {};
App.proto.routers = App.proto.routers || {};

App.proto.routers.main = Backbone.Router.extend({

	current_part : 'main',

	routes : {
		"" : 						"first",
		"index.html" : 				"first",
		"index.html?first" : 		"first",
		"index.html?second" : 		"second",
		"index.html?third" : 		"third", 
		
		"*path" : 'notFound'
	},

	first : function(e) {
		console.log('MainRouter.first');
		this.current_part = 'first';
	},

	second : function() {
		console.log('MainRouter.second');
		this.current_part = 'second';
	},

	third : function() {
		console.log('MainRouter.third');
		this.current_part = 'third';
	},
	
	notFound : function() {		
		console.log('MainRouter.notFound');
		this.current_part = 'notfound';
	},
	
	initialize : function() {
		console.log('MainRouter.initialize');		
	}
});