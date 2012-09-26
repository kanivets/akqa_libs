
$(document).ready(function(){	
	_.templateSettings = {
		interpolate : /\{\[(.+?)\]\}/g,
		evaluate : /\{\{(.+?)\}\}/g 
	};
		
	App.router = {};
	App.views = {};
	App.models = {};
		
	App.langs = Languator;
	
	App.utils = {};
	
	App.utils.flow = function(x) {return;console.log(x);};
	App.utils.log = function(x) {console.log(x);};
	App.utils.debug = function(x) {console.info(x);};
	
	App.utils.flow('MainController: begin');

	_.extend(App, Backbone.Events);
	_.extend(App.langs, Backbone.Events);	
		
	App.router = new App.proto.routers.main();
	Backbone.history.start({pushState : true});
			
	App.views.title = new App.proto.views.title({el : "title", model: new App.proto.models.title()});	
	App.views.nav = new App.proto.views.nav({el : "nav", model: new App.proto.models.nav()});
	
	App.views.parts = {};
	
	App.views.parts.first = new App.proto.views.part({model : new App.proto.models.part({part_name: 'first'})});
	App.views.parts.first = new App.proto.views.part({model : new App.proto.models.part({part_name: 'second'})});
	App.views.parts.first = new App.proto.views.part({model : new App.proto.models.part({part_name: 'third'})});
	
	
	
	/*
	App.views.parts.add(new App.proto.models.part({el: $('div#first_part'), part_type: 'first'}), {silent: true});
	App.views.parts.add(new App.proto.models.part({el: $('div#second_part'), part_type: 'second'}), {silent: true});
	App.views.parts.add(new App.proto.models.part({el: $('div#third_part'), part_type: 'third'}), {silent: true});
*/
	//App.router.on('all', function() {console.log('App -> router:all'); App.trigger('page_changed');});

/*
	App.views.parts = new Backbone.Collection; 
		
	App.views.parts.add(new PartView({el : $('#first_part'), cid: 'first_part'}), {silent: true} );
	App.views.parts.add(new PartView({el : $('#second_part'), cid: 'second_part'}), {silent: true} );
	App.views.parts.add(new PartView({el : $('#third_part'), cid: 'third_part'}), {silent: true} );
			
	App.langs.SetCurrentLanguage('ru');
*/

	App.trigger('page_loaded');
	App.utils.flow('MainController: end');
});
