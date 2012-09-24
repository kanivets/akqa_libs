var MainRouter = Backbone.Router.extend({

	current_part : 'main',

	routes : {
		"" : 						"first", // #help
		"index.html?first" : 		"first", // #help
		"index.html?second" : 		"second", // #search/kiwis
		"index.html?third" : 		"third" // #search/kiwis/p7
	},

	first : function() {
		this.current_part = '-first-';
		
		$('div.part').hide();
		$('div#part_first').show();
	},

	second : function() {
		this.current_part = '-second-';
		
		$('div.part').hide();
		$('div#part_second').show();
	},

	third : function() {
		this.current_part = '-third-';
		
		$('div.part').hide();
		$('div#part_third').show();
	}
});