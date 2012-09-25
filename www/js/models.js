var App = App || {};
App.proto = App.proto || {};
App.proto.models = App.proto.models || {};

App.proto.models.title = Backbone.Model.extend({
	name : 'TitleModel',

	GetPageTitle : function() {
		console.log('HeadModel.GetPageTitle');	
		return App.langs.Get('title_' + App.router.current_part);
	},
	
	initialize : function() {		
		console.log('HeadModel.initialize');			
	},	
}); 

App.proto.models.nav = Backbone.Model.extend({
	name : 'NavModel',

	GetNavElements : function() {
		console.log(this.name + '.GetNavElements');
		return [
			{ type: 'first', link: 'index.html?first', caption: App.langs.Get('nav_caption_first') },
			{ type: 'second', link: 'index.html?second', caption: App.langs.Get('nav_caption_second') },
			{ type: 'third', link: 'index.html?third', caption: App.langs.Get('nav_caption_third') }
		];
	},
	
	GetLanguages : function() {
		console.log(this.name + '.GetLanguages');
		return [
			{ type: 'en', caption: App.langs.Get('nav_langs_en') },
			{ type: 'ru', caption: App.langs.Get('nav_langs_ru') }
		];
	},
	
	GetCurrentPart : function() {
		console.log(this.name + '.GetCurrentPart');
		return App.router.current_part;
	},
	
	GetCurrentLanguage : function() {
		console.log(this.name + '.GetCurrentLanguage');
		return App.langs.GetCurrentLanguage();
	},
		
	initialize : function() {		
		console.log('HeadModel.initialize');
		_.bindAll(this, 'GetNavElements', 'GetLanguages', 'GetCurrentPart', 'GetCurrentLanguage')			
	},	
}); 