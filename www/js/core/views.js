var App = App || {};
App.proto = App.proto || {};
App.proto.views = App.proto.views || {};


App.proto.views._static = Backbone.View.extend({
	name : '_static',	
	render : function() {
		App.utils.flow_core(this.name + '(_static).render');
	},
	
	OnLanguageChanged : function() {
		App.utils.flow_core(this.name + '(_static).OnLanguageChanged');	
		this.render();
	},
	
	OnPartChanged : function() {
		App.utils.flow_core(this.name + '(_static).OnPartChanged');	
		this.render();
	},
	
	OnPageLoaded : function () {
		App.utils.flow_core(this.name + '(_static).OnPageLoaded');	
		this.render();	
	},
		
	initialize : function() {
		App.utils.flow_core(this.name + '(_static).initialize');	
		_.bindAll(this, 'OnLanguageChanged', 'OnPartChanged', 'OnPageLoaded', 'render');
		
		App.langs.on('language_changed', this.OnLanguageChanged);		
		App.router.on('part_changed', this.OnPartChanged);			
		App.on('page_loaded', this.OnPageLoaded);
	}
});

App.proto.views._dynamic = Backbone.View.extend({
	name : '_dynamic',
	
	_templateCompiled : null,
	_bIsVisible : false,
	
	containerID: '',
	visible_at_parts: {},
	
	_Show : function() {	//internal use only - contains jquery level of element hiding  
		App.utils.flow_core(this.name + '(_dynamic)._Show');	
		this._bIsVisible = true;			
		this.$el.show();		
	},
	
	_Hide : function() {	//internal use only - contains jquery level of element hiding	
		App.utils.flow_core(this.name + '(_dynamic)._Hide');	  
		this._bIsVisible = false;		
		this.$el.hide();		
	},
		
	Show : function() {		//common use - wrapper of element visibility control
		App.utils.flow_core(this.name + '(_dynamic).Show');	
		this.SetVisibility(true);
	},

	Hide : function() {		//common use - wrapper of element visibility control
		App.utils.flow_core(this.name + '(_dynamic).Hide');	
		this.SetVisibility(false);
	},
  
  	SetVisibility : function(visible) {		//common use - uses internal _Show/_Hide methods to control visibility of element. also set internal bool flags of visibility to prevent repeating of re-show/re-hide
  		if (visible && !this._bIsVisible)
  		{
			App.utils.flow_core(this.name + '(_dynamic).SetVisibility(true)');			
			this._Show();
			return;
  		}		
  		
  		if (!visible && this._bIsVisible) {  			
			App.utils.flow_core(this.name + '(_dynamic).SetVisibility(false)');	
			this._Hide();
			return;
  		}
  	},
  
	render : function() {},
	
	OnLanguageChanged : function() {
		App.utils.flow_core(this.name + '(_dynamic).OnLanguageChanged');	
		this.render();
	},
	
	OnChangedPart : function() {
		App.utils.flow_core(this.name + '(_dynamic).OnChangedPart');	
		this.SetVisibility(this.visible_at_parts[App.router.GetCurrentPart()] == true);				
		this.render();
	},
	
	OnChangedParams : function() {},

	OnPageLoaded : function() {
		App.utils.flow_core(this.name + '(_dynamic).OnPageLoaded');	
		this.OnChangedPart();	
	},
	
	initialize : function(args) {
		App.utils.flow_core(this.name + '(_dynamic).initialize');		
		_.bindAll(this, '_Show', '_Hide', 'Show', 'Hide', 'SetVisibility', 'OnPageLoaded', 'OnChangedPart', 'OnChangedParams', 'OnLanguageChanged', 'render');


		this.setElement($('#' + args.containerID));
		this.visible_at_parts = args.parts;		

		var t = this.$el.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>');
		this._templateCompiled = _.template(t);		

		App.router.on('params_changed', this.OnChangedParams);
		App.router.on('part_changed', this.OnChangedPart);
		App.langs.on('language_changed', this.OnLanguageChanged);
		App.on('page_loaded', this.OnPageLoaded);						
	} 
});

App.proto.views._subview = Backbone.View.extend({
	_templateCompiled : null,
	_model : null,

	initialize : function(args) {
		App.utils.flow_core(this.name + '(_subview).initialize');		
		_.bindAll(this, 'render', 'OnChangedParams');

		this._model = args.model || null;

		var t = this.$el.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>');
		this._templateCompiled = _.template(t);		
	}, 

	OnChangedParams : function() {}
});