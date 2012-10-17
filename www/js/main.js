$(document).ready(function(){	
	/*
	_.templateSettings = {
		interpolate : /\{\[(.+?)\]\}/g,
		evaluate : /\{\{(.+?)\}\}/g 
	};
	*/	
	App.router = {};
	App.views = {};
	App.models = {};
			
	App.langs = Languator;
	
	App.utils.flow_ext('MainController: begin');

	_.extend(App, Backbone.Events);
	_.extend(App.langs, Backbone.Events);	
		
	App.router = new App.proto.router();
	App.router.default_part = 'games';
	Backbone.history.start({pushState : true});
	
	App.views.title = new App.proto.views.title({el : "title"});	
	App.views.header = new App.proto.views.header({el : "header"});
	
	
	App.models.games = new App.proto.models.games({
								itemsPerPage : 9,
								model : App.proto.models.gameIcon});
	App.models.games.reset();
	for (var i in App.data.games)
		App.models.games.add(new App.proto.models.gameIcon({gameData : App.data.games[i]}), {silent: true});
	
	App.views.games = new App.proto.views.games({
								containerID : 'container_games',
								model : App.models.games,
								subviews : {
									containerIDs : {
										sorting : 		'container_games_sorting',
										searching : 	'container_games_searching',
										list : 			'container_games_list',
										pagination : 	'container_games_pagination'
									}	
								},
								parts : {'games' : true}});

	App.views.horizontalStats = new App.proto.views.stats.horizontalStats({
									containerID : 'container_horizontalStats', 
									parts : {'games' : true}
								});

	App.views.worldMapStats = new App.proto.views.stats.worldMapStats({
									containerID : 'container_worldMapStats', 
									parts : {'games' : true}
								});

	App.views.gamesPlayedChartStats = new App.proto.views.stats.gamesPlayedChartStats({
									containerID : 'container_gamesPlayedChartStats', 
									parts : {'games' : true}
								});


	App.trigger('page_loaded');
	App.utils.flow_ext('MainController: end');
});
