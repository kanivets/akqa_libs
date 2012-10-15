var App = App || {};
App.proto = App.proto || {};
App.proto.models = App.proto.models || {};


App.proto.models.header = Backbone.Model.extend({
	name : 'HeaderModel',

	defaults : {		
		lang_prefix : 'header'		
	},
	
	_bIsLogged : false,
	_sLogin : '',
	_sName : '',
	
	GetLink : function(sPart) {		
		return App.router.BuildLink(null, sPart, App.router.GetAllParams(sPart));
	},

	GetCaption : function(sPart) {
		return App.langs.Get(this.get('lang_prefix') + '_caption_' + sPart);
	},

	GetLanguages : function() {
		App.utils.flow_ext(this.name + '.GetLanguages');
		var aRet = [];
		var aLangs = App.langs.GetAvailableLanguages();
		for (var i in aLangs)
			aRet.push({type: aLangs[i], link: App.router.BuildLink(aLangs[i], null, App.router.GetAllParams()), caption: App.langs.Get(this.get('lang_prefix') + '_' + 'langs_' + aLangs[i])})
		
		return aRet;
	},
	
	GetCurrentPart : function() {
		App.utils.flow_ext(this.name + '.GetCurrentPart');
		return App.router.GetCurrentPart();
	},
	
	GetCurrentLanguage : function() {
		App.utils.flow_ext(this.name + '.GetCurrentLanguage');
		return App.langs.GetCurrentLanguage();
	},
	
	GetRegisterLink : function() { return App.router.BuildLink(null, 'register', {}); },
	GetRegisterCaption : function() { return App.langs.Get(this.get('lang_prefix') + '_' + 'caption_register');	},
	
	IsLogged : function() { return this._bIsLogged; },
	GetLogin : function() { return this._sLogin; },
	GetName : function() { return this._sName; },
			
	initialize : function() {		
		App.utils.flow_ext('HeadModel.initialize');
		_.bindAll(this, 'GetLink', 'GetCaption', 'GetLanguages', 'GetCurrentPart', 'GetCurrentLanguage', 'IsLogged', 'GetLogin', 'GetName');		
		
		var loginData = App.storage.Get('login');
		this._bIsLogged = !!loginData;
		
		if (this._bIsLogged) {
			this._sLogin = loginData.login;
			this._sName = loginData.name;
		}
	}	
}); 

/*
App.proto.models.part = Backbone.Model.extend({
	name : 'PartModel',

	defaults : {
		part_name : ''	
	},	

	GetText : function() {
		App.utils.flow_ext(this.name + '.GetText');
		return App.langs.Get('part_text_' + this.get('part_name'));
	},
	
	IsVisible : function() {
		App.utils.flow_ext(this.name + '.IsVisible, ' + this.get('part_name') + '==' + App.router.GetCurrentPart() + '(' + (this.get('part_name') == App.router.GetCurrentPart()) + ')');
		return this.get('part_name') == App.router.GetCurrentPart();			
	},
	
	initialize : function() {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this, 'GetText', 'IsVisible');			
	}	
}); 
*/

App.proto.models.register = Backbone.Model.extend({
	name : 'RegisterModel',
	form : null, 

	defaults : {	
		lang_prefix : 'register',
		
		form_validation_attributes : {
			debug : true,
			rules: {
				register_name : {
					required : true,
					minlength : 3,
					maxlength : 20
				},
				
				register_login : {
					required : true,	
					minlength : 5,
					maxlength : 16
				},
				
				register_password : {
					required : true,	
					minlength : 5,
					maxlength : 16
				},
				
				register_password2 : {
					required : true,
					equalTo : '#register_password'
				},
				
				register_email : {
					required : true,
					email : true	
				},
				
				register_birthdate : {
					required : true	
				},
				
				register_agree : {
					required : true
				}
			},
		
			messages: {
	     		register_name: {
	     			required : "Please specify your name",
	     			minlength: jQuery.format("At least {0} characters required!"),
	     			maxlength: jQuery.format("Max {0} characters!")
	     		},
	     		register_email: {
	       			required: "We need your email address to contact you",
	       			email: "Your email address must be in the format of name@domain.com"
	     		},
	     		register_password2: {
	     			equalTo : "Passwords mismatch"
	     		},
	     		register_agree: {
	       			required: "You must agree with rules to continue registration"
	     		}
	   		}
		} 		
	},
	
	IsVisible : function() {
		App.utils.flow_ext(this.name + '.IsVisible, ' + this.get('part_name') + '==' + App.router.GetCurrentPart() + '(' + (this.get('part_name') == App.router.GetCurrentPart()) + ')');		
		return this.get('part_name') == App.router.GetCurrentPart();			
	},
	
	GetCaption : function() {return App.langs.Get(this.get('lang_prefix') + '_' + 'caption');	},
	GetLogin : function() {return App.langs.Get(this.get('lang_prefix') + '_' + 'login');	},
	GetName : function() {return App.langs.Get(this.get('lang_prefix') + '_' + 'name');	},
	
	initialize : function() {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this,  'IsVisible');	
	}	
});

App.proto.models.gameIcon = Backbone.Model.extend({	
	name : 'GameIconModel',
	defaults : {
		gameData : {}
	},
	
	idAttribute : 'gameID',
	
	GetID : function() { return this.get('gameData').id; },
	GetName : function() { return this.get('gameData').name; },
	GetRating : function() { return this.get('gameData').rating; },
	GetFeaturedIndex : function() { return this.get('gameData').featured_index; },
	GetViews : function() { return this.get('gameData').views; },
	GetImg : function() { return this.get('gameData').id + '.' + this.get('gameData').pic_ext; },
	
	initialize : function(options) {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this, 'GetRating', 'GetID', 'GetViews', 'GetName', 'GetImg', 'GetFeaturedIndex');	
	}
});

App.proto.models.games = Backbone.Collection.extend({
	name : 'GameListCollection',

	itemsPerPage : 9,
	_nCurrentPage : 1,
	_nTotalPages : 1,
	
	defaults : {
		lang_prefix : 'gameList'
	},

	_sCurrentSort : 'featured',

	_aCachedData : {},

	initialize : function(options) {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this,'GetGames', 'GetTotalPages', 'IsPrevPageExists', 'IsNextPageExists');
		
		if (options) {
			if (options.itemsPerPage) this.itemsPerPage = options.itemsPerPage;
		}	
	},

	IsPrevPageExists : function(aParams) {
		App.utils.flow_ext(this.name + '.IsPrevPageExists');
		if (!aParams) {
			aParams = App.router.GetAllParams();
		}

		var nCurPage = parseInt(aParams.page) || 1;
		return nCurPage > 1; 
	},

	IsNextPageExists : function(aParams) {
		App.utils.flow_ext(this.name + '.IsNextPageExists');
		if (!aParams) {
			aParams = App.router.GetAllParams();
		}

		var nCurPage = parseInt(aParams.page) || 1;
		return nCurPage < this._nTotalPages; 
	},

	GetTotalPages : function(aParams) {	
		App.utils.flow_ext(this.name + '.GetTotalPages');	
		return this._nTotalPages;
	},

	GetGames : function(aParams) {
		App.utils.flow_ext(this.name + '.GetGames');
		if (!aParams) {
			aParams = App.router.GetAllParams();
		}

		var sCacheIndex = '';
		for (var i in aParams) {
			sCacheIndex += '/' + i + '/' + aParams[i];
		}

		if (sCacheIndex && this._aCachedData[sCacheIndex]) {
			App.utils.debug('Got game list from cache \'' + sCacheIndex + "'");
			this._nTotalPages = Math.ceil(this._aCachedData[sCacheIndex].length / this.itemsPerPage);
			return this._aCachedData[sCacheIndex];
		}

		var aFoundGames = null;

		if (aParams.search) {
			var aFoundGames = _.filter(this.models, function(el) {
				return el.GetName().toLowerCase().indexOf(aParams.search.toLowerCase()) == 0;
			});
		} else {
			aFoundGames = this.models;
		}		

		var aSorted = _.sortBy(aFoundGames, function(el) {
			switch (aParams.sort) {
				case 'featured' : return -el.GetFeaturedIndex();
				case 'newest' : return -el.GetID();
				case 'rating' : return -el.GetRating();
				case 'views' : return -el.GetViews();
				case 'votes' : return -el.GetViews() / (el.GetRating() ? el.GetRating() : 1);
				default : return 0;
			}
		});


		var nTotalElements = aSorted.length;

		this._nCurrentPage = parseInt(aParams.page) || 1;
		this._nTotalPages = Math.ceil(nTotalElements / this.itemsPerPage);
		if (this._nCurrentPage < 0 ) {
			this._nCurrentPage = 1;
		}

		if (this._nCurrentPage > this._nTotalPages ) {
			this._nCurrentPage = this._nTotalPages;
		}

		var aRet = [];
		for (var i = (this._nCurrentPage - 1) * this.itemsPerPage; i < this._nCurrentPage * this.itemsPerPage; i++) {
			if (!aSorted[i]) {
				break;
			}

			aRet.push(aSorted[i]);
		}

		this._aCachedData[sCacheIndex] = aRet;
		return aRet;
	}	
});


App.proto.models.sorting = Backbone.Model.extend({
	name : 'SortingModel',

	defaults : {	
		lang_prefix : 'sorting'
	},

	GetCaption : function(sType) {
		App.utils.flow_ext(this.name + '.GetCaption');
		return App.langs.Get(this.get('lang_prefix') + '_caption_' + sType);
	},

	GetLink : function(sType) {
		App.utils.flow_ext(this.name + '.GetLink');
		return App.router.BuildLink(null, null, {sort : sType, page : 1});
	},

	GetCurrentSorting : function() {
		App.utils.flow_ext(this.name + '.GetCurrentSorting');
		var sort = App.router.GetParams('games', 'sort');
		return sort ? sort  : 'featured';
	},
	
	initialize : function() {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this, 'GetCaption', 'GetLink' , 'GetCurrentSorting');		
	}	
});

App.proto.models.stats = App.proto.models.stats || {};

App.proto.models.stats.mostPlayed = Backbone.Model.extend({
	name : 'MostPlayedModel',

	_aData : [],

	defaults : {	
		lang_prefix : 'mostPlayed',
		type : ''
	},

	GetCaption : function(sKind) {
		App.utils.flow_ext(this.name + '.GetCaptionType');
		return App.langs.Get(this.get('lang_prefix') + '_' + this.get('type') + '_' + sKind);
	},


	GetData : function() {
		App.utils.flow_ext(this.name + '.GetEntitiesAndPercents');
		return this._aData;
	},

	GetMaxPercents : function() {
		App.utils.flow_ext(this.name + '.GetEntitiesAndPercents');
		return _.max(this._aData, function(el) {return el.percents;}).percents;
	},

	GetMinPercents : function() {
		App.utils.flow_ext(this.name + '.GetEntitiesAndPercents');
		return _.min(this._aData, function(el) {return el.percents;}).percents;
	},
	
	initialize : function() {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this, 'GetCaption', 'GetData', 'GetMaxPercents', 'GetMinPercents');

		this._aData = App.data.horizontalStats[this.get('type')];			
	}	
});
