$(document).ready(function() {
		
	_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };
	
	App = {};
	App.routers = {};
	App.views = {};
	App.models = {};
		
	App.routers.mainRouter = new MainRouter();
	Backbone.history.start({pushState : true});

	
	App.models = {};
	App.models.head = new HeadModel();
	
	console.log($("div.login-page-container"));
	
	
	App.views.head = new HeadView({
		model : App.models.head,
		el : "title"
	});
	
	App.views.nav = new NavView({
		el : "nav"
	});
	
	App.routers.mainRouter.navigate('index.html?first', {
		trigger : true
	});		
});
