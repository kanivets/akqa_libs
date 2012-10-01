var App = App || {};
App.proto = App.proto || {};
App.proto.models = App.proto.models || {};

App.proto.models.title = Backbone.Model.extend({
	name : 'TitleModel',

	defaults : {		
		lang_prefix : 'title'		
	},


	GetPageTitle : function() {
		App.utils.flow(this.name + '.GetPageTitle');
		var part = App.router.current_part;
				
		return App.langs.Get(this.get('lang_prefix') + '_' + (part == '' ? 'main' : part));
	},
	
	initialize : function() {		
		App.utils.flow(this.name + '.initialize');	
		_.bindAll(this, 'GetPageTitle');				
	}	
}); 

App.proto.models.header = Backbone.Model.extend({
	name : 'HeaderModel',

	_bIsLogined : false,
	_sLoginName : '',

	GetNavElements : function() {
		App.utils.flow(this.name + '.GetNavElements');
		return [
			{ type: 'games', link: App.router.BuildLink(null, 'games'), caption: App.langs.Get('header_caption_games') },
			{ type: 'friends', link: App.router.BuildLink(null, 'friends'), caption: App.langs.Get('header_caption_friends') },
			{ type: 'statistics', link: App.router.BuildLink(null, 'statistics'), caption: App.langs.Get('header_caption_statistics') }
		];
	},
	
	GetLanguages : function() {
		App.utils.flow(this.name + '.GetLanguages');
		var aRet = [];
		var aLangs = App.langs.GetAvailableLanguages();
		for (var i in aLangs)
			aRet.push({type: aLangs[i], link: App.router.BuildLink(aLangs[i], null), caption: App.langs.Get('header_langs_' + aLangs[i])})
		
		return aRet;
	},
	
	GetCurrentPart : function() {
		App.utils.flow(this.name + '.GetCurrentPart');
		return App.router.current_part;
	},
	
	GetCurrentLanguage : function() {
		App.utils.flow(this.name + '.GetCurrentLanguage');
		return App.langs.GetCurrentLanguage();
	},
	
	IsLogined : function() {
		return this._bIsLogined;
	},

	GetLoginName : function() {
		return this._sLoginName;
	},
			
	initialize : function() {		
		App.utils.flow('HeadModel.initialize');
		_.bindAll(this, 'GetNavElements', 'GetLanguages', 'GetCurrentPart', 'GetCurrentLanguage');			
	}	
}); 
/*
App.proto.models.part = Backbone.Model.extend({
	name : 'PartModel',

	defaults : {
		part_name : ''	
	},	

	GetText : function() {
		App.utils.flow(this.name + '.GetText');
		return App.langs.Get('part_text_' + this.get('part_name'));
	},
	
	IsVisible : function() {
		App.utils.flow(this.name + '.IsVisible, ' + this.get('part_name') + '==' + App.router.GetCurrentPart() + '(' + (this.get('part_name') == App.router.GetCurrentPart()) + ')');
		return this.get('part_name') == App.router.GetCurrentPart();			
	},
	
	initialize : function() {		
		App.utils.flow(this.name + '.initialize');
		_.bindAll(this, 'GetText', 'IsVisible');			
	}	
}); 
*/