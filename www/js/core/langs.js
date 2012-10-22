var App = App || {};
App.proto = App.proto || {};

App.proto.langs = _.extend(Backbone.Events, {

	aAvailableLangs : 'en',
	aLangs : {},

	GetAvailableLanguages : function () {
		App.utils.flow_core('Languator.GetAvailableLanguages');
		return this.aAvailableLangs;	
	},
	
	GetCurrentLanguage : function () {
		App.utils.flow_core('Languator.GetCurrentLanguage');
		return this.sCurrentLanguage;	
	},
	
	SetCurrentLanguage : function (to) {
		if (!to || !this.aAvailableLangs[to] || typeof(to) != 'string') return false;
		if (this.sCurrentLanguage == to) return true;
		
		App.utils.flow_core('Languator.SetCurrentLanguage('+ to +')');
		
		this.sCurrentLanguage = to;
		
		this.trigger('language_changed', to);	
		return true;
	},
	 
	Get : function(key) {
		App.utils.flow_core('Languator.Get(' + key + ')');
		
		if (this.aLangs[key] === undefined) return this.aLangs.unknown;		
		if (this.aLangs[key][this.sCurrentLanguage] === undefined) return this.aLangs.unknown;
		return this.aLangs[key][this.sCurrentLanguage];
	}
});