var App = App || {};
App.proto = App.proto || {};
App.proto.models = App.proto.models || {};

App.proto.models.title = Backbone.Model.extend({
	name : 'TitleModel',

	defaults : {		
		lang_prefix : 'title'		
	},

	GetPageTitle : function() {
		App.utils.flow_ext(this.name + '.GetPageTitle');
		var part = App.router.current_part;
				
		return App.langs.Get('app_name') + ' :: ' + App.langs.Get(this.get('lang_prefix') + '_' + (part == '' ? 'main' : part));
	},
	
	initialize : function() {		
		App.utils.flow_ext(this.name + '.initialize');	
		_.bindAll(this, 'GetPageTitle');				
	}	
}); 

App.proto.models.header = Backbone.Model.extend({
	name : 'HeaderModel',

	defaults : {		
		lang_prefix : 'header'		
	},
	
	_bIsLogged : false,
	_sLogin : '',
	_sName : '',
	
	GetLink : function(sPart) {
		return App.router.BuildLink(null, sPart);
	},

	GetCaption : function(sPart) {
		return App.langs.Get(this.get('lang_prefix') + '_caption_' + sPart);
	},

	GetLanguages : function() {
		App.utils.flow_ext(this.name + '.GetLanguages');
		var aRet = [];
		var aLangs = App.langs.GetAvailableLanguages();
		for (var i in aLangs)
			aRet.push({type: aLangs[i], link: App.router.BuildLink(aLangs[i], null), caption: App.langs.Get(this.get('lang_prefix') + '_' + 'langs_' + aLangs[i])})
		
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
	
	GetRegisterLink : function() { return App.router.BuildLink(null, 'register'); },
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
	
	GetGameID : function() { return this.get('gameData').id; },
	GetRating : function() { return this.get('gameData').rating; },
	GetFeaturedIndex : function() { return this.get('gameData').featured_index; },
	GetPlays : function() { return this.get('gameData').plays; },
	GetName : function() { return this.get('gameData').name; },
	GetImgSrc : function() { return '/img/game_icons/' + this.get('gameData').id + '.' + this.get('gameData').pic_ext; },
	
	initialize : function(options) {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this, 'GetRating', 'GetGameID', 'GetPlays', 'GetName', 'GetImgSrc');	
	}
});

App.proto.models.gameList = Backbone.Collection.extend({
	name : 'GameListCollection',

	itemsPerPage : 9,
	_nCurrentPage : 1,
	_nTotalPages : 1,
	
	_sCurrentSort : 'featured',

	_aPagedData : {},

	GetByGameID : function(gameID) { return this.get(gameID); },
	GetMaxPages : function () {return this._nMaxPages;},
	GetCurrentPage : function () {return this._nCurrentPage;},
	IsPrevExists : function () {return this._nCurrentPage > 1},
	IsNextExists : function () {return this._nCurrentPage < this._nTotalPages},
	
	CalculatePages : function() {
		App.utils.flow_ext(this.name + '.CalculatePages');
		this._nTotalPages = Math.ceil(this.models.length / this.itemsPerPage);
	},
		
	SetPage : function(nPage) {
		App.utils.flow_ext(this.name + '.SetPage(' + nPage +')');
		if (nPage < 1) return false;
		if (nPage > this._nTotalPages) return false;
		
		this._nCurrentPage = nPage;
		App.router.SetParams('games', 'page', nPage);
		return true; 
	},
	
	SetNextPage : function () {return this.SetPage(this._nCurrentPage + 1);},
	SetPrevPage : function () {return this.SetPage(this._nCurrentPage - 1);}, 
	
	GetCurrentGames : function() {
		App.utils.flow_ext(this.name + '.GetGamesPerPage(' + this._sCurrentSort + ', ' + this._nCurrentPage +')');

		if (this._aPagedData[this._sCurrentSort] && this._aPagedData[this._sCurrentSort][this._nCurrentPage]) 
			return this._aPagedData[this._sCurrentSort][this._nCurrentPage]; 
		
		var that = this;
		var aSorted = _.sortBy(this.models, function(el) {
			switch (that._sCurrentSort) {
				case 'featured' : return -el.GetFeaturedIndex();
				case 'newest' : return -el.GetGameID();
				case 'rating' : return -el.GetRating();
				case 'views' : return -el.GetPlays();
				case 'votes' : return -el.GetPlays() / el.GetRating();
				default : return 0;
			}
		});

		var aRet = [];
		var nStart = (this._nCurrentPage - 1) * this.itemsPerPage;
		var nEnd = this._nCurrentPage * this.itemsPerPage;
		
		if (this.models.length < nStart) return [null];
		if (this.models.length < nEnd) nEnd = this.models.length;					
		for (var i = nStart; i < nEnd; i++)
			aRet.push(aSorted[i]);
			
		if (!this._aPagedData[this._sCurrentSort]) this._aPagedData[this._sCurrentSort] = {}	
		this._aPagedData[this._sCurrentSort][this._nCurrentPage] = aRet;
		return aRet;
	},
	
	GetCurrentSort : function () {
		App.utils.flow_ext(this.name + '.GetCurrentSort()');
		return this._sCurrentSort;
	},

	SetSort : function (sSort) {
		App.utils.flow_ext(this.name + '.SetCurrentSort(' + sSort +')');

		if (this._sCurrentSort == sSort) return;

		switch (sSort) {
			case 'featured' :
			case 'newest' : 
			case 'rating' : 
			case 'views' : 
			case 'votes' : 
				this._sCurrentSort = sSort;
				break;
			default :
				this._sCurrentSort = 'featured';
				break;
		}

		App.router.SetParams('games', 'sort', this._sCurrentSort);
		this.SetPage(1);
	},

	initialize : function(options) {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this, 'GetByGameID', 'GetMaxPages', 'GetCurrentPage', 'IsPrevExists', 'IsNextExists', 'SetPage', 'SetNextPage', 'SetPrevPage', 'GetCurrentGames', 'GetCurrentSort', 'SetSort');
		
		if (options) {
			if (options.itemsPerPage) this.itemsPerPage = options.itemsPerPage;
		}

		this._nCurrentPage = App.router.GetParams('games', 'page') || 1;
		console.info(this._nCurrentPage);		
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
		type : '',
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
