var App = App || {};
App.proto = App.proto || {};
App.proto.views = App.proto.views || {};

App.proto.views.title = Backbone.View.extend({
	name : 'TitleView',
	//templateCompiled : null,
			
	render : function() {
		App.utils.flow(this.name + '.render');
		document.title = this.model.GetPageTitle();
		return this;
	},	
	
	initialize : function() {
		App.utils.flow(this.name + '.initialize');
      	_.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
      	
		App.langs.on('language_changed', this.render);		
		App.router.on('all', this.render);			
		App.on('page_loaded', this.render);
	}
});

App.proto.views.header = Backbone.View.extend({
	name : 'HeaderView',
	templateCompiled : null,
			
	events : {
		'click a.parts' : 'ChangePart',
		'click a.langs' : 'ChangeLanguage'
	},	
			
	render : function() {
		App.utils.flow(this.name + '.render');
				
		var t = this.templateCompiled({
			nav_elements: this.model.GetNavElements(), 
			lang_elements: this.model.GetLanguages(), 
			cur_language: this.model.GetCurrentLanguage(), 
			cur_part : this.model.GetCurrentPart(),
			isLogined : this.model.IsLogined(),
			login_name : this.model.GetLoginName()
			});
		this.$el.html(t);
		return this;
	},	
	
	initialize : function() {
		App.utils.flow(this.name + '.initialize');
      	_.bindAll(this, 'render', 'ChangeLanguage'); // every function that uses 'this' as the current object should be in here
		
		App.langs.on('language_changed', this.render);
		App.on('page_loaded', this.render);
		
		App.router.on('all', this.render);		
		
		this.templateCompiled = _.template(this.$el.html());		
	},
	
	ChangeLanguage : function(e) {
		App.utils.log(this.name + '.ChangeLanguage');	
		e.preventDefault();
		App.router.NavigateTo(e.target.getAttribute('data-link'));	
	},
	
	ChangePart : function(e) {
		App.utils.flow(this.name + '.ChangePart');	
		e.preventDefault();
		App.router.NavigateTo(e.target.getAttribute('data-link'));	
	}
});

/*
App.proto.views.part = Backbone.View.extend({
	name : 'PartView',
	templateCompiled : null,
	bIsVisible : false,
	
	
	_Show : function() {	//internal use only - contains jquery level of element hiding  
		this._bIsVisible = true;			
		this.$el.fadeIn('slow');		
	},
	
	_Hide : function() {	//internal use only - contains jquery level of element hiding	  
		this._bIsVisible = false;		
		this.$el.hide();		
	},
		
	Show : function() {		//common use - wrapper of element visibility control
		this.SetVisibility(true);
	},

	Hide : function() {		//common use - wrapper of element visibility control
		this.SetVisibility(false);
	},
  
  	SetVisibility : function(visible) {		//common use - uses internal _Show/_Hide methods to control visibility of element. also set internal bool flags of visibility to prevent repeating of re-show/re-hide
  		if (visible && !this._bIsVisible)
  		{
			App.utils.flow(this.name + '.SetVisibility(true)');			
			this._Show();
			return;
  		}		
  		
  		if (!visible && this._bIsVisible)
  		{  			
			App.utils.flow(this.name + '.SetVisibility(false)');	
			this._Hide();
			return;
  		}
  	},
  
	render : function() {	
		var bIsCurrentVisibility = this.model.IsVisible();		
		this.SetVisibility(bIsCurrentVisibility);
		
		if (!bIsCurrentVisibility) return;
		
		App.utils.flow(this.name + '.render');
		
		this.$el.html(this.templateCompiled({text: this.model.GetText()}));
	},
	
	OnPageLoaded : function() {
		App.utils.flow(this.name + '.OnPageLoaded');
		
		this.render();
	},
	
	initialize : function() {
		App.utils.flow(this.name + '.initialize');		
		_.bindAll(this, 'Show', 'Hide', 'SetVisibility', 'OnPageLoaded', 'render');
		
		this.setElement('#' + this.model.get('part_name'));
		
		App.langs.on('language_changed', this.render);
		App.on('page_loaded', this.OnPageLoaded);
		
		this.templateCompiled = _.template(this.$el.html());
		
		App.router.on('all', this.render);						
	} 
});
*/