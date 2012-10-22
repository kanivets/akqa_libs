var App = App || {};
App.proto = App.proto || {};
App.proto.routers = App.proto.routers || {};

App.proto.routers._common = Backbone.Router.extend({
	default_part : '',
	current_part : '',
	sDefaultNotFoundPartName : 'notfound',
		
	_aParams : {},
	
	GetCurrentPart : function() {
		App.utils.flow_core('MainRouter.GetCurrentPart');	
		return this.current_part;
	},
	
	initialize : function() {
		App.utils.flow_core('MainRouter.initialize');		
		_.bindAll(this, 'GetCurrentPart', 'BuildLink', 'NavigateTo', 'ClearParams', 'SetParams', 'GetParam');

		
		this.ClearParams();
	},
	
	BuildLink : function(lang, part, customParams) {
		App.utils.flow_core('MainRouter.BuildLink(' + lang + ', ' + part + ')');
		
		if (!lang || typeof(lang) != 'string') {
			lang = App.langs.GetCurrentLanguage();
		}

		if (!part || typeof(part) != 'string') {
			part = this.current_part;
		}

		if (part == '/') {
			part = '';
		}

		var sLink = lang + '/' + part;
		for (var i in customParams) {
			if (customParams[i] != null) {
				sLink += '/' + i + '/' + customParams[i];
			}
		}

		return sLink;
	},

	ClearParams : function(sPart) {
		this._aParams = {};
	},
 
	SetParams : function(sIndex, sData) {
		App.utils.flow_core('MainRouter.SetParams(' + sIndex + ', ' + sData + ')');

		return this._aParams[sIndex] = sData;
	},

	GetAllParams : function() {
		App.utils.flow_core('MainRouter.GetParams()');
		return this._aParams;
	},

	GetParam : function(sIndex) {
		App.utils.flow_core('MainRouter.GetParams(' + sIndex + ')');
	
		if (!this._aParams[sIndex]) {
			return null;
		}

		return this._aParams[sIndex];
	},

	NavigateTo : function (link, silent) {
		if ((link === undefined) || (typeof(link) != 'string')) return false;
		App.utils.flow_core('MainRouter.NavigateTo(\'' + link + '\')');
		
		this.navigate(link, {trigger: !silent});
		return true;
	}
});