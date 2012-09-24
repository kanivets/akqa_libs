$(document).ready(function() {
	console.log('loaded');
	
	app = {};
	app.router = new WorkspaceRouter();
	Backbone.history.start({
		pushState : true
	});
	
	app.views = {};
	app.views.nav = new MainNavView();
	
	app.router.navigate('index.html#first', {trigger: true});
}); 