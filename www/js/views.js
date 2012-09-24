var MainNavView = Backbone.View.extend({

	tagName : "nav",

	events : {
		"click a" : "changePage"
	},

	changePage : function() {
		
		console.log(this);
		
		/*
		
		var that = this;
		$('div.part').hide();
		$('div#part').hide();
	
		e.preventDefault();	
		app.router.navigate($(this).data('link'), {trigger: true});
		*/
	},
	
	render : function() {
		
	}
});