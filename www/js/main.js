$(document).ready(function(){
	console.log('MainController: begin');		
	_.templateSettings = {
		interpolate : /\{\[(.+?)\]\}/g,
		evaluate : /\{\{(.+?)\}\}/g 
	};
		
	App.router = {};
	App.views = {};
	App.models = {};
		
	App.langs = Languator;
	
	_.extend(App, Backbone.Events);
	_.extend(App.langs, Backbone.Events);	
		
	App.router = new App.proto.routers.main();
	Backbone.history.start({pushState : true});
			
	App.views.title = new App.proto.views.title({el : "title", model: new App.proto.models.title()});	
	App.views.nav = new App.proto.views.nav({el : "nav", model: new App.proto.models.nav()});

	App.router.on('all', function() {console.log('App -> router:all'); App.trigger('page_changed');});

/*
	App.views.parts = new Backbone.Collection; 
		
	App.views.parts.add(new PartView({el : $('#first_part'), cid: 'first_part'}), {silent: true} );
	App.views.parts.add(new PartView({el : $('#second_part'), cid: 'second_part'}), {silent: true} );
	App.views.parts.add(new PartView({el : $('#third_part'), cid: 'third_part'}), {silent: true} );
			
	App.langs.SetCurrentLanguage('ru');
*/

	App.trigger('page_loaded');
	console.log('MainController: end');
});
