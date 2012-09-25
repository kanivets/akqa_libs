var App = App || {};
App.proto = App.proto || {};
App.proto.views = App.proto.views || {};

App.proto.views.title = Backbone.View.extend({
	name : 'TitleView',
	templateCompiled : null,
			
	render : function() {
		console.log(this.name + '.render');
		var t = this.templateCompiled({title: this.model.GetPageTitle()});
		document.title = t;	//IE BUG: cannot change access to head tags, http://bugs.jquery.com/ticket/5881
		return this;
	},	
	
	initialize : function() {
		console.log(this.name + '.initialize');
      	_.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
		App.on('language_changed', this.render);
		App.on('page_changed', this.render);
		App.on('page_loaded', this.render);
		this.templateCompiled = _.template(this.$el.html());		
	}
});

App.proto.views.nav = Backbone.View.extend({
	name : 'NavView',
	templateCompiled : null,
			
	events : {
		'click a.parts' : 'ChangePart',
		'click a.langs' : 'ChangeLanguage'	
	},	
			
	render : function() {
		console.log(this.name + '.render');
				
		var t = this.templateCompiled({nav_elements: this.model.GetNavElements(), lang_elements: this.model.GetLanguages(), cur_language: this.model.GetCurrentLanguage(), cur_part : this.model.GetCurrentPart()});
		this.$el.html(t);	//IE BUG: cannot change access to head tags, http://bugs.jquery.com/ticket/5881
		return this;
	},	
	
	initialize : function() {
		console.log(this.name + '.initialize');
      	_.bindAll(this, 'render', 'ChangeLanguage'); // every function that uses 'this' as the current object should be in here
		
		App.on('language_changed', this.render);
		App.on('page_changed', this.render);
		App.on('page_loaded', this.render);
		
		this.templateCompiled = _.template(this.$el.html());		
	},
	
	ChangeLanguage : function(e) {
		console.log(this.name + '.ChangeLanguage');	
		e.preventDefault();
		App.langs.SetCurrentLanguage(e.target.getAttribute('data-lang'));	
	},
	
	ChangePart : function(e) {
		console.log(this.name + '.ChangePart');	
		e.preventDefault();
		App.router.navigate(e.target.getAttribute('data-link'), {trigger: true});	
	}
});


/*
var PartView = Backbone.View.extend({
	templateCompiled : null,
	bIsActive : true,
	
	events : {
		'language:changed' : 'render',
		'click' : 'render'
	},
	
	Show : function() {
		if (this.bIsActive) return;
		console.log('PartView.Show');	
		
		this.$el.show();
		this.bIsActive = true;
	},

	Hide : function() {
		if (!this.bIsActive) return;
		console.log('PartView.Hide');		
		
		this.$el.hide();
		this.bIsActive = false;
	},
  
	render : function() {		
		if (!this.bIsActive) return;
		console.log('PartView.render');	
		
		var t = this.templateCompiled({text: App.langs.Get('part_text_' + App.router.current_part)});	
		this.$el.html(t);	
	},
	
	initialize : function(options) {
		console.log('PartView.initialize');
		var that = this;
		
		if (options && options.visible) {
			this.$el.show();
			this.bIsActive = true;		
		} else {
			this.$el.hide();
			this.bIsActive = false;	
		}
		
		this.templateCompiled = _.template(this.$el.html());
	}
});*/