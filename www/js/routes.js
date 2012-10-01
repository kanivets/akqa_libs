var App = App || {};
App.proto = App.proto || {};
App.proto.routers = App.proto.routers || {};

App.proto.routers.main = Backbone.Router.extend({
	default_part : '',
	current_part : '',
	sDefaultNotFoundPartName : 'notfound',
	
	routes : {
		"" : 						"process",
		":lang" : 					"process",
		":lang/" : 					"process",
		":lang/:part" : 			"process",
		":lang/:part/" : 			"process"
	},

	process : function(lang, part) {
		App.utils.flow_core('MainRouter.process('+ lang + ', ' + part + ')');
		
		App.langs.SetCurrentLanguage(lang);		
		if (part && typeof(part) == 'string') this.current_part = part
		else this.current_part = this.default_part;
		
		App.utils.debug('Changed part to: ' + this.current_part);
	},

	notFound : function() {		
		App.utils.flow_core('MainRouter.notFound');
		this.current_part = this.sDefaultNotFoundPartName;
	},
	
	GetCurrentPart : function() {
		App.utils.flow_core('MainRouter.GetCurrentPart');	
		return this.current_part;
	},
	
	initialize : function() {
		App.utils.flow_core('MainRouter.initialize');		
		_.bindAll(this, 'GetCurrentPart', 'NavigateTo');
	},
	
	BuildLink : function(lang, part) {
		App.utils.flow_core('MainRouter.BuildLink(' + lang + ', ' + part + ')');
		
		if (!lang || typeof(lang) != 'string') lang = App.langs.GetCurrentLanguage();
		if (!part || typeof(part) != 'string') part = this.current_part;
		
		return '/#' + lang + '/' + part;
	},
	
	NavigateTo : function (link) {
		if ((link === undefined) || (typeof(link) != 'string')) return false;
		App.utils.flow_core('MainRouter.NavigateTo(\'' + link + '\')');
		
		this.navigate(link, {trigger: true});
		return true;
	}
});