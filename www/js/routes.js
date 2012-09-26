var App = App || {};
App.proto = App.proto || {};
App.proto.routers = App.proto.routers || {};

App.proto.routers.main = Backbone.Router.extend({

	current_part : '',

	routes : {
		"" : 						"process",
		":lang" : 					"process",
		":lang/" : 					"process",
		":lang/:part" : 			"process",
		":lang/:part/" : 			"process"
	},

	process : function(lang, part) {
		App.utils.flow('MainRouter.process('+ lang + ', ' + part + ')');
		
		App.langs.SetCurrentLanguage(lang);		
		if (part) this.current_part = part;
	},

	notFound : function() {		
		App.utils.log('MainRouter.notFound');
		this.current_part = 'notfound';
	},
	
	GetCurrentPart : function() {
		App.utils.flow('MainRouter.GetCurrentPart');	
		return this.current_part;
	},
	
	initialize : function() {
		App.utils.flow('MainRouter.initialize');		
		_.bindAll(this, 'GetCurrentPart', 'NavigateTo');
	},
	
	BuildLink : function(lang, part) {
		App.utils.flow('MainRouter.BuildLink(' + lang + ', ' + part + ')');
		
		if (!lang) lang = App.langs.GetCurrentLanguage();
		if (!part) part = this.current_part;
		
		return '/' + lang + '/' + part;
	},
	
	NavigateTo : function (link) {
		App.utils.log('MainRouter.NavigateTo(\'' + link + '\')');
		//link = link.replace('#', '');
		//App.utils.debug(link);
		this.navigate(link, {trigger: true});
	}
});