var App = App || {};
App.proto = App.proto || {};
App.proto.views = App.proto.views || {};

App.proto.views.title = Backbone.View.extend({
	name : 'TitleView',
			
	render : function() {
		App.utils.flow_ext(this.name + '.render');
		document.title = this.model.GetPageTitle();
		return this;
	},	
	
	initialize : function() {
		App.utils.flow_ext(this.name + '.initialize');
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
		App.utils.flow_ext(this.name + '.render');
				
		var t = this.templateCompiled({
			nav_elements: this.model.GetNavElements(), 
			lang_elements: this.model.GetLanguages(), 
			cur_language: this.model.GetCurrentLanguage(), 
			cur_part : this.model.GetCurrentPart(),
			isLogined : this.model.IsLogined(),
			login_name : this.model.GetLoginName(),
			register_link : this.model.GetRegisterLink(),
			register_caption : this.model.GetRegisterCaption()
			});
		this.$el.html(t);
		return this;
	},	
	
	initialize : function() {
		App.utils.flow_ext(this.name + '.initialize');
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
		App.utils.flow_ext(this.name + '.ChangePart');	
		e.preventDefault();
		App.router.NavigateTo(e.target.getAttribute('data-link'));	
	}
});

App.proto.views._part = Backbone.View.extend({
	name : 'PartView',
	templateCompiled : null,
	bIsVisible : false,
	
	
	_Show : function() {	//internal use only - contains jquery level of element hiding  
		App.utils.flow_ext(this.name + '._Show');	
		this._bIsVisible = true;			
		this.$el.fadeIn('slow');		
	},
	
	_Hide : function() {	//internal use only - contains jquery level of element hiding	
		App.utils.flow_ext(this.name + '._Hide');	  
		this._bIsVisible = false;		
		this.$el.hide();		
	},
		
	Show : function() {		//common use - wrapper of element visibility control
		App.utils.flow_ext(this.name + '.Show');	
		this.SetVisibility(true);
	},

	Hide : function() {		//common use - wrapper of element visibility control
		App.utils.flow_ext(this.name + '.Hide');	
		this.SetVisibility(false);
	},
  
  	SetVisibility : function(visible) {		//common use - uses internal _Show/_Hide methods to control visibility of element. also set internal bool flags of visibility to prevent repeating of re-show/re-hide
  		if (visible && !this._bIsVisible)
  		{
			App.utils.flow_ext(this.name + '.SetVisibility(true)');			
			this._Show();
			return;
  		}		
  		
  		if (!visible && this._bIsVisible)
  		{  			
			App.utils.flow_ext(this.name + '.SetVisibility(false)');	
			this._Hide();
			return;
  		}
  	},
  
	render : function() {	
		var bIsCurrentVisibility = this.model.IsVisible();		
		this.SetVisibility(bIsCurrentVisibility);
		
		if (!bIsCurrentVisibility) return;
		
		App.utils.flow_ext(this.name + '.render');
		
		this.$el.html(this.templateCompiled({text: this.model.GetText()}));
	},
	
	OnPageLoaded : function() {
		App.utils.flow_ext(this.name + '.OnPageLoaded');
		
		this.render();
	},
	
	initialize : function() {
		App.utils.flow_ext('App.proto.views._part.initialize');		
		_.bindAll(this, 'Show', 'Hide', 'SetVisibility', 'OnPageLoaded', 'render');
		
		this.setElement('#part_' + this.model.get('part_name'));
		
		App.langs.on('language_changed', this.render);
		App.on('page_loaded', this.OnPageLoaded);
		
		this.templateCompiled = _.template(this.$el.html());
		
		App.router.on('all', this.render);						
	} 
});


App.proto.views.register = App.proto.views._part.extend({
	name : 'RegisterView',
	
	events : {
		'click #register_close' : 'OnClose', 
		'click #register_clear' : 'OnClear', 
		'click #register_submit' : 'OnSubmit', 
	},
	
	_Show : function() {	//internal use only - contains jquery level of element hiding  
		App.utils.flow_ext(this.name + '._Show');
		this._bIsVisible = true;			
		this.$el.fadeIn(2000);		
	},
	
	_Hide : function() {	//internal use only - contains jquery level of element hiding  
		App.utils.flow_ext(this.name + '._Hide');
		this._bIsVisible = false;			
		this.$el.fadeOut(1000);		
	},
	
	OnClose : function(e) {
		App.utils.flow_ext(this.name + '.OnClose');
		e.preventDefault();
		App.router.NavigateTo('/');
	},
	
	OnClear : function(e) {
		App.utils.flow_ext(this.name + '.OnClear');
		e.preventDefault();
		$('input[type="text"]', $('#register')).each(function(index, element) {
			$(element).val('');	
		});
		
		$('#register input#register_subscribe').attr('checked', 'checked');
		$('#register input#register_agree').removeAttr('checked');
	},
	
	OnSubmit : function(e) {
		App.utils.flow_ext(this.name + '.OnSubmit');
		
		$('#register').validate(this.model.get('form_validation_attributes'));
		e.preventDefault();
		
		if (!$('#register').valid()) return;
	},	
	
	initialize : function() {
		App.utils.flow_ext(this.name + '.initialize');
		App.proto.views._part.prototype.initialize.call(this);
				
		_.bindAll(this, 'OnClose', 'OnClear', 'OnSubmit');	
	},
	
	render : function() {	
		var bIsCurrentVisibility = this.model.IsVisible();		
		this.SetVisibility(bIsCurrentVisibility);		
		if (!bIsCurrentVisibility) return;
		
		App.utils.flow_ext(this.name + '.render');
		
		App.router.on('all', this.render);
		this.$el.html(this.templateCompiled());
	}
}, App.proto.views._part);
