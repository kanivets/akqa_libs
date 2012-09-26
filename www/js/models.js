var App = App || {};
App.proto = App.proto || {};
App.proto.models = App.proto.models || {};

App.proto.models.title = Backbone.Model.extend({
	name : 'TitleModel',

	GetPageTitle : function() {
		App.utils.flow(this.name + '.GetPageTitle');
		var part = App.router.current_part;
		return App.langs.Get('title_' + (part == '' ? 'main' : part));
	},
	
	initialize : function() {		
		App.utils.flow(this.name + '.initialize');	
		_.bindAll(this, 'GetPageTitle');				
	}	
}); 

App.proto.models.nav = Backbone.Model.extend({
	name : 'NavModel',

	GetNavElements : function() {
		App.utils.flow(this.name + '.GetNavElements');
		return [
			{ type: 'first', link: App.router.BuildLink(null, 'first'), caption: App.langs.Get('nav_caption_first') },
			{ type: 'second', link: App.router.BuildLink(null, 'second'), caption: App.langs.Get('nav_caption_second') },
			{ type: 'third', link: App.router.BuildLink(null, 'third'), caption: App.langs.Get('nav_caption_third') }
		];
	},
	
	GetLanguages : function() {
		App.utils.flow(this.name + '.GetLanguages');
		var aRet = [];
		var aLangs = App.langs.GetAvailableLanguages();
		for (var i in aLangs)
			aRet.push({type: aLangs[i], link: App.router.BuildLink(aLangs[i], null), caption: App.langs.Get('nav_langs_' + aLangs[i])})
		
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
		
	initialize : function() {		
		App.utils.flow('HeadModel.initialize');
		_.bindAll(this, 'GetNavElements', 'GetLanguages', 'GetCurrentPart', 'GetCurrentLanguage');			
	}	
}); 

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