var App = App || {};

App.proto.router = App.proto.routers._common.extend({	

	process : function(lang, part) {
		App.utils.flow_core('MainRouter.process('+ lang + ', ' + part + ')');
		
		App.langs.SetCurrentLanguage(lang);		
		if (part && typeof(part) == 'string') this.current_part = part
		else this.current_part = this.default_part;
		
		App.utils.debug('Changed part to: ' + this.current_part);
	},

	initialize : function () {
		App.utils.flow_core('MainRouter.Init');

		this.route('', 										'homePath', 				function () 						{ this.process(null, null);});
		this.route(':lang', 								'changeLang', 				function (lang) 					{ this.process(lang, null);});
		this.route(':lang/:part', 							'changePart', 				function (lang, part) 				{ this.process(lang, part);});
		this.route(':lang/:part', 							'changeLangPart', 			function (lang, part) 				{ this.process(lang, part);});
		this.route(':lang/:part/*params', 					'changeLangPartParams', 	function (lang, part, params) 		{ 
			var aParams = params.split('/');
			for (var i = 0; i < aParams.length-1; i+=2)
				this.SetParams(part, aParams[i], aParams[i+1]);

			App.trigger('changed_params_' + part);

			this.process(lang, part);
		});
		
		_.bindAll(this, 'process' );
	}

});