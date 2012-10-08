var App = App || {};

App.proto.router = App.proto.routers._common.extend({	

	routes : {
/*
		'' 									: 	'defaultPart',
		'lang/:lang'						: 	'process',  
		'part/:part'						: 	'process',  

		"" : 						"process",
		":lang" : 					"process",
		":lang/" : 					"process",
		":lang/:part" : 			"process",
		":lang/:part/" : 			"process",
		"sort/:sort" : 				"sorting",
		"sort/:sort/" : 			"sorting",
		":lang/sort/:sort" : 		"sorting",
		":lang/sort/:sort/" : 		"sorting",
		":lang/:part/sort/:sort" : 	"sorting",
		":lang/:part/sort/:sort/" :	"sorting"

		"" : 'process1',
		":lang" : 'process2',
		":lang/" : 'process3',
		":lang/:part" : 'process4',
		":lang/:part/" : 'process5',
		":lang/:part/" : 'process5',
		":lang/:part/sort/:sort" : 'process6',
		":lang/:part/sort/:sort/" : 'process6',
		":lang/:part/sort/:sort/page/:page" : 'process7',
		":lang/:part/sort/:sort/page/:page/" : 'process7',
		":lang/games/search/:search" : 'process8',
		":lang/games/search/:search/" : 'process8',
		":lang/search/:search/sort/:sort" : 'process9',
		":lang/search/:search/sort/:sort/" : 'process9',
		":lang/search/:search/sort/:sort/page/:page" : 'process10',
		":lang/search/:search/sort/:sort/page/:page/" : 'process10'
		*/
	},

	process : function(lang, part) {
		App.utils.flow_core('MainRouter.process('+ lang + ', ' + part + ')');
		
		App.langs.SetCurrentLanguage(lang);		
		if (part && typeof(part) == 'string') this.current_part = part
		else this.current_part = this.default_part;
		
		App.utils.debug('Changed part to: ' + this.current_part);
	},

	sorting : function (lang, part, sort) {
		App.utils.flow_core('MainRouter.sorting('+ lang + ', ' + part + ', ' + sort + ')');
		this._aParams.sorting = sort ? sort : 'featured';
		this.process(lang, part);
	},

	notFound : function() {		
		App.utils.flow_core('MainRouter.notFound');
		this.current_part = this.sDefaultNotFoundPartName;
	},

	initialize : function () {
		App.utils.flow_core('MainRouter.Init');
		//App.proto.routers._common.prototype.Init.call(this);	
 
 		//this.route(/^(.*?)\/$/, function (t){console.log('t')});
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
		

		//_.bindAll(this, 'process', 'sorting', 'notFound', 'GetParams', 'Init');
	}

});