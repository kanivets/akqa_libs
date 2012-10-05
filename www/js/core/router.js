var App = App || {};
App.proto = App.proto || {};
App.proto.routers = App.proto.routers || {};

App.proto.routers._common = Backbone.Router.extend({
	default_part : '',
	current_part : '',
	sDefaultNotFoundPartName : 'notfound',
	
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
		if (part == '/') part = '';
		return '/' + lang + '/' + part;
	},
	
	NavigateTo : function (link, silent) {
		if ((link === undefined) || (typeof(link) != 'string')) return false;
		App.utils.flow_core('MainRouter.NavigateTo(\'' + link + '\')');
		
		this.navigate(link, {trigger: !silent});
		return true;
	},
	
	NavigateToPart : function (part) {
		App.utils.flow_core('MainRouter.NavigateToPart(\'' + part + '\')');
		
		this.navigate(this.BuildLink(null, part), {trigger: true});
		return true;
	}
});