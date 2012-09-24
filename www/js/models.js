var HeadModel = Backbone.Model.extend({
	name : 'HeadModel',
	defaults : {
		title : 'Unknown'
	},
	
	getTitle : function() {
		return this.get('title');	
	},
	
	initialize : function() {
		var that = this;
		App.routers.mainRouter.on('all', function(e) {that.set({title : App.routers.mainRouter.current_part})});	
	}
}); 