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
	
	BuildLink : function(lang, part, customParams) {
		App.utils.flow_core('MainRouter.BuildLink(' + lang + ', ' + part + ')');
		
		if (!lang || typeof(lang) != 'string') lang = App.langs.GetCurrentLanguage();
		if (!part || typeof(part) != 'string') part = this.current_part;
		if (part == '/') part = '';

		var sLink = '/' + lang + '/' + part;
		var aParams = this.GetAllParams(part);
		if (aParams)
			for (var i in aParams)
				if (!customParams || !customParams[i])
					sLink += '/' + i + '/' + aParams[i];

		for (var i in customParams)
			sLink += '/' + i + '/' + customParams[i];


		return sLink;
	},
	
	_aParams : {},

	ClearParams : function(sPart) {
		this._aParams[sPart] = {};
	},
 
	SetParams : function(sPart, sIndex, sData) {
		App.utils.flow_core('MainRouter.SetParams(' + sPart + ', ' + sIndex + ', ' + sData + ')');
		this._aParams[sPart] = this._aParams[sPart] || {};
		return this._aParams[sPart][sIndex] = sData;
	},

	GetAllParams : function(sPart) {
		App.utils.flow_core('MainRouter.GetParams(' + sPart + ')');
		return this._aParams[sPart];
	},

	GetParams : function(sPart, sIndex) {
		App.utils.flow_core('MainRouter.GetParams(' + sPart + ', ' + sIndex + ')');
		if (!this._aParams[sPart]) return null;
		if (!this._aParams[sPart][sIndex]) return null;
		return this._aParams[sPart][sIndex];
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
	},

	Init : function () {
		App.utils.flow_core('MainRouter.Init');
		_.bindAll(this, 'GetCurrentPart', 'BuildLink', 'NavigateTo', 'NavigateToPart', 'ClearParams', 'SetParams', 'GetParams')
	}
});