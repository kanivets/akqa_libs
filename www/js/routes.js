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
		App.utils.flow('MainRouter.first');
		this.current_part = 'first';
	},

	second : function() {
		App.utils.flow('MainRouter.second');
		this.current_part = 'second';
	},

	third : function() {
		App.utils.flow('MainRouter.third');
		this.current_part = 'third';
	},
	
	notFound : function() {		
		App.utils.flow('MainRouter.notFound');
		this.current_part = 'notfound';
	},
	
	GetCurrentPart : function() {
		App.utils.flow('MainRouter.GetCurrentPart');	
		return this.current_part;
	},
	
	initialize : function() {
		App.utils.flow('MainRouter.initialize');		
		_.bindAll(this, 'GetCurrentPart');
	}
});