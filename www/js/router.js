var App = App || {};

App.proto.router = App.proto.routers._common.extend({	
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
	}
});