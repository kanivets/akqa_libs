var App = App || {};
App.proto = App.proto || {};
App.proto.views = App.proto.views || {};

App.proto.views.title = App.proto.views._static.extend({
	name : 'TitleView',
			
	render : function() {
		App.utils.flow_ext(this.name + '.render');
		var part = App.router.GetCurrentPart();
		document.title = App.langs.Get('app_name') + ' :: ' + App.langs.Get('title_' + (part == '' ? 'main' : part));
		return this;
	},	
	
	initialize : function(args) {
      	App.proto.views._static.prototype.initialize.call(this, args);      
		App.utils.flow_ext(this.name + '.initialize');
      	_.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here	
  	}
});


App.proto.views.header = App.proto.views._static.extend({
	name : 'HeaderView',
	templateCompiled : null,
			
	events : {
		'click a.link' : 'ChangePart',
		'click a.langs' : 'ChangeLanguage'
	},	
			
	render : function() {
		App.utils.flow_ext(this.name + '.render');
		var t = this.templateCompiled({

			games_link : App.router.BuildLink(null, 'games', App.router.GetAllParams()),
			friends_link : App.router.BuildLink(null, 'friends', {}),
			statistics_link : App.router.BuildLink(null, 'statistics', {}),

			games_caption : App.langs.Get('header_caption_games'),
			friends_caption : App.langs.Get('header_caption_friends'),
			statistics_caption : App.langs.Get('header_caption_statistics'),

			cur_part : App.router.GetCurrentPart(),

			home_link : App.router.BuildLink(null, 'games', {})
		});
			
		this.$el.html(t);				
		return this;
	},	
	
	initialize : function(args) {
      	App.proto.views._static.prototype.initialize.call(this, args);
		App.utils.flow_ext(this.name + '.initialize');
      	_.bindAll(this, 'render', 'ChangePart', 'ChangeLanguage'); // every function that uses 'this' as the current object should be in here
				
		var t = this.$el.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>');
		this.templateCompiled = _.template(t); 	
	},
	
	ChangeLanguage : function(e) {
		App.utils.flow_ext(this.name + '.ChangeLanguage');	
		e.preventDefault();
		App.router.NavigateTo(e.currentTarget.getAttribute('href'));	
	},
	
	ChangePart : function(e) {
		App.utils.flow_ext(this.name + '.ChangePart');	
		e.preventDefault();
		App.router.NavigateTo(e.currentTarget.getAttribute('href'));	
	}
});


App.proto.views.games = App.proto.views._dynamic.extend({
	name : 'GamesView',
	_sorting : null, 
	_searching : null, 
	_list : null, 
	_pagination : null, 

	initialize : function (args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');

		this._sorting = new App.proto.views.games.sorting({el : this.$('#' + args.subviews.containerIDs.sorting)});
		this._searching = new App.proto.views.games.searching({el : this.$('#' + args.subviews.containerIDs.searching)});
		this._list = new App.proto.views.games.list({el : this.$('#' + args.subviews.containerIDs.list), model : this.model});
		this._pagination = new App.proto.views.games.pagination({el : this.$('#' + args.subviews.containerIDs.pagination), model : this.model});

		_.bindAll(this, 'render');
	},

	render : function() {		
		if (!this._bIsVisible) return;
		App.utils.flow_ext(this.name + '.render');
	},

	OnChangedParams : function(params) {		
		if (!this._bIsVisible) {
			return;
		}
		App.utils.flow_ext(this.name + '.OnChangedParams');		
		params = params || {};

		this._sorting.render();
		this._sorting.SetSort(params.sort);

		this._searching.render();

		this._list.render();
		this._pagination.render();
	}
});

App.proto.views.games.sorting = App.proto.views._subview.extend({
	name : 'GamesSortingView',
	sPrevSort : '',

	events : {
		'click a' : 'ChangeSort'
	},

	initialize : function(args) {
		App.proto.views._subview.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');

		_.bindAll(this, 'SetSort', 'ChangeSort', 'render');
		this.render();
		this.SetSort(App.router.GetParam('sort'));
	},

	render : function() {
		App.utils.flow_ext(this.name + '.render');

		var sSearch =  App.router.GetParam('search');

		this.$el.html(this._templateCompiled({
			sorting_featured_link : App.router.BuildLink(null, null, {sort : 'featured', search : sSearch}),
			sorting_newest_link : App.router.BuildLink(null, null, {sort : 'newest', search : sSearch}),
			sorting_rating_link : App.router.BuildLink(null, null, {sort : 'rating', search : sSearch}),
			sorting_views_link : App.router.BuildLink(null, null, {sort : 'views', search : sSearch}),
			sorting_votes_link : App.router.BuildLink(null, null, {sort : 'votes', search : sSearch}),

			sorting_featured_caption : App.langs.Get('games_sorting_caption_featured'),
			sorting_newest_caption : App.langs.Get('games_sorting_caption_newest'),
			sorting_rating_caption : App.langs.Get('games_sorting_caption_rating'),
			sorting_views_caption : App.langs.Get('games_sorting_caption_views'),
			sorting_votes_caption : App.langs.Get('games_sorting_caption_votes')
		}));

	},

	SetSort : function (sSort) {
		App.utils.flow_ext(this.name + '.SetCurrentSort');
		switch (sSort) {
			case 'featured' :
			case 'newest' :
			case 'rating' :
			case 'views' :
			case 'votes' :
				break;
			default : sSort = 'featured';
				break;
		}

		if (this.sPrevSort == sSort) {
			return false;
		}

		this.$('a').removeClass('active');
		this.$('#container_games_sorting_' + sSort).addClass('active');

		return true;
	},

	ChangeSort : function (e) {
		App.utils.flow_ext(this.name + '.ChangeSort');
		e.preventDefault();

		var aParams = App.router.GetAllParams();
		App.router.NavigateTo(e.currentTarget.getAttribute('href'));
	}
});

App.proto.views.games.searching = App.proto.views._subview.extend({
	name : 'GamesSearchingView',

	events : {
		'keyup' : 'ChangeSearch'
	},

	initialize : function(args) {
		App.proto.views._subview.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');

		_.bindAll(this, 'ChangeSearch', 'render');
		this.render();
	},

	render : function() {
		App.utils.flow_ext(this.name + '.render');
		var sSearch = App.router.GetParam('search');
		if (!sSearch) {
			sSearch = '';
		}
		this.$el.val(sSearch);
	},

	ChangeSearch : function (e) {
		App.utils.flow_ext(this.name + '.ChangeSearch');
		var sSearch = _.escape(e.currentTarget.value);

		var sSort = App.router.GetParam('sort');
		App.router.NavigateTo(App.router.BuildLink(null, null, {sort : sSort ? sSort : null, search : sSearch ? sSearch : null}));
	}
});

App.proto.views.games.list = App.proto.views._subview.extend({
	name : 'GamesListView',
	initialize : function(args) {
		App.proto.views._subview.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this, 'render');

		this.render();
	},

	render : function() {
		App.utils.flow_ext(this.name + '.render');

		var aGames = this._model.GetGames();

		this.$el.html(this._templateCompiled({
			game_list : aGames,
			game_caption_views : App.langs.Get('game_caption_views')
		}));

		this.$el.find('img').each(function(el) {
			$(this).attr('src', $(this).attr('data-src'));
		});

		this.$el.find('.rating').jRating({
				showRateInfo : true, 
				bigStarsPath : '/img/jRating_star_big.png',
				smallStarsPath : '/img/jRating_star_small.png',
				phpPath : '',
				type : 'small',
				length : 5,
				decimalLength : 1,
				rateMax : 5,
				isDisabled : true,
				onSuccess : function(){}
			});
	}
});

App.proto.views.games.pagination = App.proto.views._subview.extend({
	name : 'GamesPagionationView',

	events : {
		'click a' : 'ChangePage' 
	},

	initialize : function(args) {
		App.proto.views._subview.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');
		_.bindAll(this, 'render');

		this.render();
	},

	render : function() {
		App.utils.flow_ext(this.name + '.render');


		var aParams = App.router.GetAllParams();
		var nPage = aParams && aParams.page ? aParams.page : null;
		
		aParams.page = (nPage ? parseInt(nPage) : 1) - 1;//prev
		if (aParams.page == 1) {
			aParams.page = null;
		}		
		var sLinkPrev = App.router.BuildLink(null, null, aParams);	
		
		aParams.page = (nPage ? parseInt(nPage) : 1) + 1;//prev
		var sLinkNext = App.router.BuildLink(null, null, aParams);
		
		aParams.page = nPage;//prev

		this.$el.html(this._templateCompiled({
			game_prev_page_link : sLinkPrev,
			game_next_page_link : sLinkNext
		}));

		if (this._model.IsPrevPageExists()) {
			this.$el.find('.page.prev').show();
		} else {
			this.$el.find('.page.prev').hide();
		}

		if (this._model.IsNextPageExists()) {
			this.$el.find('.page.next').show();
		} else {
			this.$el.find('.page.next').hide();
		}
	},

	ChangePage : function(e) {
		App.utils.flow_ext(this.name + '.ChangePage');
		e.preventDefault();
		App.router.NavigateTo(e.currentTarget.getAttribute('href'));
	}
});






App.proto.views.stats = App.proto.views.stats || {};

App.proto.views.stats.mostPlayed = App.proto.views._static.extend({
	name : 'MostPlayedView',
	
	graphics : null,
	_bIsNeedLinking : false,

	initialize : function(args) {
		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render', 'DrawGraphics');	

		this._bIsNeedLinking = args && args.drawLinks;
	},

	DrawGraphics : function (bIsNeedLinkingInNames) {
		App.utils.flow_ext(this.name + '(' + this.model.get('type') + ').DrawGraphics');	

		var containerW = 150;
		var containerH = 100;

		var axisX = 0;
		var axisY = containerH - 15;

		this.graphics = new App.graphics.wrappers.raphael();
		this.graphics.PreparePaper('raphael_canvas_mostPlayed_' + this.model.get('type'), containerW + 50, containerH);
		this.graphics.DrawSingleLine(
			axisX, 0, axisX, axisY + 3, {
        		'autoScale'       : false,
				"stroke" 		: "#BBBBBB",
				"stroke-width" 	: 2,
				"opacity" 		: 1
			}
		);
		this.graphics.DrawSingleLine(
			axisX, axisY + 3, containerW, axisY + 3, {
        		'autoScale'       : false,
				"stroke" 		: "#BBBBBB",
				"stroke-width" 	: 1,
				"opacity" 		: 1
			}
		);

		var nMaxPercents = this.model.GetMaxPercents();	
		var nLabels = Math.floor(nMaxPercents / 10) + 1;
		var nInterval = Math.round(containerW / nLabels);

		for (var i = 1; i < nLabels; i++)
		{
			this.graphics.DrawSingleLine(axisX + nInterval * i, axisY, axisX + nInterval * i, axisY+3, {
				"stroke-width" 	: 0.5,
				"stroke" 		: "#666666",
				"opacity" 		: 1}
			);
			this.graphics.DrawText(nInterval * i, axisY + 12, (i*10).toString() + '%', {'fill': '#888888', 'font-size': '8px'}, 'perc' + i);
		}

		var aData = this.model.GetData();

		var nRectH = 20;
		var nOffset = 5;		
		var nMaxW = containerW - nInterval;

		var nBarsInterval = (axisY - nOffset * 2) - (nRectH * 3 ) + nOffset / 2;

		var aColors = ['#F0BA2A', '#F1E5D3', '#CFAC94'];
		for (var i = 0; i < 3; i++)
		{
			var posY = (nBarsInterval + nRectH/2) * i;
			var barW = aData[i].percents / nMaxPercents * nMaxW;

			var sColor = aColors[1];
			if (aData[i].percents == this.model.GetMaxPercents()) {
				sColor = aColors[0];
			} else if (aData[i].percents == this.model.GetMinPercents()) {				
				sColor = aColors[2];
			}


			this.graphics.DrawRect(axisX + 1, posY, barW, nRectH, {
				'fill' : sColor, 
				'stroke-width' : 0
			});


			var aTextParams = {
				'fill' : '#000', 
				'font-size' : '10px', 
				'text-anchor': 'start',
				'cursor' : 'ponter',
				'font-family' : 'Tahoma, Arial, sans-serif'
			}

			if (bIsNeedLinkingInNames) {
				aTextParams['fill'] = '#ea7c39', 
				aTextParams['font-weight'] = 'bold',  
				aTextParams['text-decoration'] = 'underline';
				aTextParams['href'] = App.router.BuildLink(null, 'playgame', {id: aData[i].id});	
			}


			this.graphics.DrawText(axisX + barW - 15, posY + nRectH / 2  , parseInt(aData[i].percents).toString() + '%');
			this.graphics.DrawText(axisX + barW + 5, posY + nRectH / 2, aData[i].name, aTextParams);
		}
	},

	render : function() {	
		App.utils.log(this.name + '(' + this.model.get('type') + ').render');	

		if (!this.graphics) {
			this.DrawGraphics(this._bIsNeedLinking);
		}

		this.$el.find('.caption-type').html(this.model.GetCaption('type'));
		this.$el.find('.caption-text').html(this.model.GetCaption('text'));		
	}	
});

App.proto.views.stats.horizontalStats = App.proto.views._dynamic.extend({
	name : 'HorizontalStatsView', 
	
	mostPlayedGirls : null, 
	mostPlayedBoys : null, 
	mostPlayedAge : null, 

	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');			

		this.mostPlayedGirls = new App.proto.views.stats.mostPlayed({el : $("#container_mostPlayedGirls"), model: new App.proto.models.stats.mostPlayed({type : 'girls'}), drawLinks : true});		
		this.mostPlayedBoys = new App.proto.views.stats.mostPlayed({el : $("#container_mostPlayedBoys"), model: new App.proto.models.stats.mostPlayed({type : 'boys'}), drawLinks : true})
		this.mostPlayedAge = new App.proto.views.stats.mostPlayed({el : $("#container_mostPlayedAge"), model: new App.proto.models.stats.mostPlayed({type : 'age'}), drawLinks : false});
		

		_.bindAll(this, 'render');	
	},

	render : function() {			
		App.utils.flow_ext(this.name + '.render');
		if (!this._bIsVisible) return;
		

		this.mostPlayedGirls.render();
		this.mostPlayedBoys.render();
		this.mostPlayedAge.render();
	}	
});

App.proto.views.stats.worldMapStats = App.proto.views._dynamic.extend({
	name : 'WorldMapStatsView', 
	
	map : null,

	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render');	
	},

	render : function() {
		if (!this._bIsVisible) return;
		App.utils.log(this.name + '.render');

		if (!this.map) {			
			var canvas = $('#raphael_canvas_worldMapStats');
			this.map = new App.graphics.wrappers.raphael();
			this.map.PreparePaper('raphael_canvas_worldMapStats', canvas.width(), canvas.height());
			this.map.DrawMap('#267114', '#F8FFED', App.data.map, App.data.countries, "#888");
			this.map.SetViewBox(1000, 250, true);
		}
	}	
});


App.proto.views.stats.gamesPlayedChartStats = App.proto.views._dynamic.extend({
	name : 'GamesPlayedChartView', 
	
	chart : null, 

	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');	

		_.bindAll(this, 'render', 'Draw');	
	},

	render : function() {
		App.utils.flow_ext(this.name + '.render');	
		if (!this.chart) {
			this.Draw();
		}
	},

	Draw : function() {
		App.utils.flow_ext(this.name + '.Draw');	
		var aColors = ['#ff6d6d', '#ff77c8', '#e170ff', '#896cff', '#6ba6ff', '#6efeff', '#6effa8', '#89ff6c', '#e2ff6e', '#ffc66f'];

		var aTopPlayedGames = _.sortBy(App.data.games, function(el) {return -el.plays});

		var nTotalPlays = 0;
		var aData = [];
		for (var i = 0; i < 10; i++) {
			nTotalPlays += aTopPlayedGames[i].plays;

			aData.push({
				val : aTopPlayedGames[i].plays,
				id: aTopPlayedGames[i].id,
				name : aTopPlayedGames[i].name,
				plays : aTopPlayedGames[i].plays + ' ' + App.langs.Get('stats_charts_topPlayed_players'),
				color : aColors[i]
			});
		}


		var cx = 110;
		var cy = 80;
		var radius = 70;
		var animateTimeMS = 500;

		var canvas = $('#raphael_canvas_gamesPlayedChartStats');
		this.chart = new App.graphics.wrappers.raphael();
		
		this.chart.PreparePaper('raphael_canvas_gamesPlayedChartStats', canvas.width(), canvas.height());
		this.chart.DrawChart(cx, cy, radius, aData, nTotalPlays, {}, 'topPlayedGamesChart');

		var aSectors = this.chart.GetElement('topPlayedGamesChart');
		if (!aSectors) {
			return;
		}

		for (i in aData) {
			this.chart.DrawText(10, 160, aData[i].name, {				
				'href' : App.router.BuildLink(null, 'playgame', {id : aData[i].id}),
				'fill' : '#ea7c39',
				'text-anchor': 'start', 
				'font-size' : 11,
				'font-weight' : 'bold',
				'opacity' : 0
			}, 'topPlayedGamesChart_name_' + aData[i].id);

			this.chart.DrawText(10, 170, aData[i].plays, {				
				'fill' : '#666',		
				'text-anchor': 'start', 
				'font-size' : 10,
				'opacity' : 0
			}, 'topPlayedGamesChart_plays_' + aData[i].id);
		}

		var that = this;
		for (i in aSectors)	{
			aSectors[i].mouseover(function(e) {	
				this.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, animateTimeMS, "elastic");
				that.chart.GetElement('topPlayedGamesChart_name_' + this.custom_id).stop().animate({opacity: 1}, animateTimeMS);				
				that.chart.GetElement('topPlayedGamesChart_plays_' + this.custom_id).stop().animate({opacity: 1}, animateTimeMS);
				
			}).mouseout(function(e) {
				this.stop().animate({transform: ""}, animateTimeMS / 2, "elastic");
				that.chart.GetElement('topPlayedGamesChart_name_' + this.custom_id).stop().animate({opacity: 0}, animateTimeMS / 2);
				that.chart.GetElement('topPlayedGamesChart_plays_' + this.custom_id).stop().animate({opacity: 0}, animateTimeMS / 2);
			});
		}	
	} 
});