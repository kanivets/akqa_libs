var WorkspaceRouter = Backbone.Router.extend({

	routes : {
		"" : 						"first", // #help
		"index.html#first" : 		"first", // #help
		"index.html#second" : 		"second", // #search/kiwis
		"index.html#third" : 		"third" // #search/kiwis/p7
	},

	first : function() {
		console.log('login');
		
		$('div.part').hide();
		$('div#part_first').show();
	},

	second : function() {
		console.log('second');
		$('div.part').hide();
		$('div#part_second').show();
	},

	third : function() {
		console.log('third');
		$('div.part').hide();
		$('div#part_third').show();
	},
		
	
});