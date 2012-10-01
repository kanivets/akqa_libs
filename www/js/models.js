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
	
	_bIsLogined : false,
	_sLoginName : '',

	GetNavElements : function() {
		App.utils.flow_ext(this.name + '.GetNavElements');
		return [
			{ type: 'games', link: App.router.BuildLink(null, 'games'), caption: App.langs.Get(this.get('lang_prefix') + '_' + 'caption_games') },
			{ type: 'friends', link: App.router.BuildLink(null, 'friends'), caption: App.langs.Get(this.get('lang_prefix') + '_' + 'caption_friends') },
			{ type: 'statistics', link: App.router.BuildLink(null, 'statistics'), caption: App.langs.Get(this.get('lang_prefix') + '_' + 'caption_statistics') }
		];
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
		return App.router.current_part;
	},
	
	GetCurrentLanguage : function() {
		App.utils.flow_ext(this.name + '.GetCurrentLanguage');
		return App.langs.GetCurrentLanguage();
	},
	
	GetRegisterLink : function() { return App.router.BuildLink(null, 'register'); },
	GetRegisterCaption : function() { return App.langs.Get(this.get('lang_prefix') + '_' + 'caption_register');	},
	
	IsLogined : function() { return this._bIsLogined; },
	GetLoginName : function() { return this._sLoginName; },
			
	initialize : function() {		
		App.utils.flow_ext('HeadModel.initialize');
		_.bindAll(this, 'GetNavElements', 'GetLanguages', 'GetCurrentPart', 'GetCurrentLanguage', 'IsLogined', 'GetLoginName');			
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
		part_name : 'register',	
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
	     			maxlength: jQuery.format("Max {0} characters!"),
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
	
	initialize : function() {		
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this,  'IsVisible');	
	}	
});