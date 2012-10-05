var App = App || {};
App.proto = App.proto || {};
App.proto.views = App.proto.views || {};


App.proto.views._static = Backbone.View.extend({
	name : 'StaticView',	
	render : function() {
		App.utils.flow_core(this.name + '(StaticView).render');
	},
	
	OnLanguageChanged : function() {
		App.utils.flow_core(this.name + '(StaticView).OnLanguageChanged');	
		this.render();
	},
	
	OnPartChanged : function() {
		App.utils.flow_core(this.name + '(StaticView).OnPartChanged');	
		this.render();
	},
	
	OnPageLoaded : function () {
		App.utils.flow_core(this.name + '(StaticView).OnPageLoaded');	
		this.render();	
	},
		
	initialize : function() {
		App.utils.flow_core(this.name + '(StaticView).initialize');	
		_.bindAll(this, 'OnLanguageChanged', 'OnPartChanged', 'OnPageLoaded', 'render');
		
		App.langs.on('language_changed', this.OnLanguageChanged);		
		App.router.on('all', this.OnPartChanged);			
		App.on('page_loaded', this.OnPageLoaded);
	}
});

App.proto.views._dynamic = Backbone.View.extend({
	name : 'PartView',
	
	_templateCompiled : null,
	_bIsVisible : false,
	
	containerID: '',
	visible_at_parts: {},
	
	_Show : function() {	//internal use only - contains jquery level of element hiding  
		App.utils.flow_core(this.name + '(PartView)._Show');	
		this._bIsVisible = true;			
		this.$el.show();		
	},
	
	_Hide : function() {	//internal use only - contains jquery level of element hiding	
		App.utils.flow_core(this.name + '(PartView)._Hide');	  
		this._bIsVisible = false;		
		this.$el.hide();		
	},
		
	Show : function() {		//common use - wrapper of element visibility control
		App.utils.flow_core(this.name + '(PartView).Show');	
		this.SetVisibility(true);
	},

	Hide : function() {		//common use - wrapper of element visibility control
		App.utils.flow_core(this.name + '(PartView).Hide');	
		this.SetVisibility(false);
	},
  
  	SetVisibility : function(visible) {		//common use - uses internal _Show/_Hide methods to control visibility of element. also set internal bool flags of visibility to prevent repeating of re-show/re-hide
  		if (visible && !this._bIsVisible)
  		{
			App.utils.flow_core(this.name + '(PartView).SetVisibility(true)');			
			this._Show();
			return;
  		}		
  		
  		if (!visible && this._bIsVisible)
  		{  			
			App.utils.flow_core(this.name + '(PartView).SetVisibility(false)');	
			this._Hide();
			return;
  		}
  	},
  
	render : function() {},
	
	OnLanguageChanged : function() {
		App.utils.flow_core(this.name + '(PartView).OnLanguageChanged');	
		this.render();
	},
	
	OnChangedPart : function() {
		App.utils.flow_core(this.name + '(PartView).OnChangedPart');			
		this.SetVisibility(this.visible_at_parts[App.router.GetCurrentPart()] == true);	
	},
	
	OnPageLoaded : function() {
		App.utils.flow_core(this.name + '(PartView).OnPageLoaded');	
		this.OnChangedPart();	
			
		this.render();
	},
	
	initialize : function(args) {
		App.utils.flow_core(this.name + '(PartView).initialize');		
		_.bindAll(this, '_Show', '_Hide', 'Show', 'Hide', 'SetVisibility', 'OnPageLoaded', 'OnChangedPart', 'OnLanguageChanged', 'render');
		
		
		this.setElement($('#' + args.containerID));
		this.visible_at_parts = args.parts;		
		
		var t = this.$el.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>');
		this.templateCompiled = _.template(t);
		
		App.router.on('all', this.OnChangedPart);
		App.langs.on('language_changed', this.OnLanguageChanged);
		App.on('page_loaded', this.OnPageLoaded);						
	} 
});