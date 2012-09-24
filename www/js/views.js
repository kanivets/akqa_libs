var HeadView = Backbone.View.extend({
	render : function(that) {
		console.log(that);//, this.model, this.model.getTitle(), this.template(this.model.getTitle()));
		
		var t = that.templateCompiled({title: that.model.getTitle()});
		console.log( t);
		that.$el.html(t);	
	},	
	
	templateCompiled : null,
	
	initialize : function() {	
		var that = this;
		
		this.templateCompiled = _.template(this.$el.html());
		console.log(this.templateCompiled);
		
		this.model.on('change:title', function(){that.render(that)});	
	}
});

var NavView = Backbone.View.extend({

	events : {
		"click a" : "onClickedNavElement"
	},

  
	onClickedNavElement : function(e) {		
		e.preventDefault();	
		App.routers.mainRouter.navigate(e.target.getAttribute('data-link'), {trigger: true});		
	},
	
	render : function() {		
	},
	
	initialize : function() {
	}
});