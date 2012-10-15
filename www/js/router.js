var App = App || {};

App.proto.router = App.proto.routers._common.extend({	

	routes : {
		'' 						: 	'Process',
		':lang' 				: 	'Process',
		':lang/:part' 			: 	'Process',
		':lang/:part/*params' 	: 	'Process'
	},

	Process : function(lang, part, params) {
		App.utils.flow_core('MainRouter.Process('+ lang + ', ' + part + ')');
		

		/*process lang*/
		if (lang) {
			App.langs.SetCurrentLanguage(lang);
		}


		/*process part*/
		var sNewPart = this.default_part;		
		if (part && typeof(part) == 'string') {
			sNewPart = part;
		}

		if (this.current_part != sNewPart) {
			this.current_part = sNewPart;
			this.trigger('part_changed', sNewPart);
			
			App.utils.info('Changed part to: ' + this.current_part);
		}


		/*process params*/
		var aCurParams = this.GetAllParams();
		var aParams = params ? params.split('/') : null;
		var bIsParamsChanged = false;

		this.ClearParams();

		if (aParams != null) {
			for (var i = 0; i < aParams.length-1; i+=2) {
				if (!aCurParams || !aCurParams[i] || (aCurParams[i] != aParams[i+1])) {
					bIsParamsChanged = true;
				}
				this.SetParams(_.escape(aParams[i]), _.escape(aParams[i+1]));
			}			
		} else {
			bIsParamsChanged = !!aCurParams;
		}  

		if (bIsParamsChanged) {
			this.trigger('params_changed', this.GetAllParams());
			App.utils.info('Changed params');
		}

	},

	initialize : function () {
		App.utils.flow_core('MainRouter.Init');
		_.bindAll(this, 'Process');
	}

});