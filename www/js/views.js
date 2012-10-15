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


/*
App.proto.views.test = App.proto.views._dynamic.extend({
	name : 'TestView',
	
	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render');	
	},
	
	render : function() {			
		App.utils.flow_ext(this.name + '.render');
		if (!this._bIsVisible) return;
		
		this.$el.html(this.templateCompiled({
							test : 'test'
		}));
	}	
});
*/

/*
App.proto.views.gameList = App.proto.views._dynamic.extend({
	name : 'GameListView',
	_gameIconTemplate : null,
	_gameListUL : null, 
	
	events : {
		'click a.page.prev' : 'PrevPage',
		'click a.page.next' : 'NextPage'
	},
	
	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render', 'PrevPage', 'NextPage', 'DrawIcons', 'OnParamsChanged');	
				
		this._gameListUL = $('ul#games_list', this.$el);
		this._gameIconTemplate = _.template(this._gameListUL.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>'));			
		this._gameListUL.html('');
				
		var t = this.$el.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>');
		this.templateCompiled = _.template(t);
				
		var that = this;

		App.on('changed_params_games', this.OnParamsChanged);
		
		this.model.CalculatePages();
	},
	
	render : function() {
		
		App.utils.log(this.name + '.render');
		if (!this._bIsVisible) return;

		this.DrawIcons();		

		var aParams = App.router.GetAllParams('games');
		var nPage = aParams['page'] ? parseInt(aParams['page'] : 1; 
		var sSort = this.model.GetCurrentSort(); 

		this.$el.find('.page.prev').attr('href', App.router.BuildLink(null, null, {page : nPage - 1, sort : this.model.GetCurrentSort()}));
		this.$el.find('.page.next').attr('href', App.router.BuildLink(null, null, {page : nPage + 1, sort : this.model.GetCurrentSort()}));

		this.$el.find('.views span').html(this.model.GetViewsCaption());
	},
	
	OnParamsChanged : function() {
		var nPage = App.router.GetParams('games', 'page');
		if (nPage) {
			that.model.SetPage(nPage);
		}

		var sSort = App.router.GetParams('games', 'sort');
		if (sSort)
			that.model.SetSort(sSort);

		this.render();
	},

	DrawIcons : function() {	
		App.utils.flow_ext(this.name + '.DrawIcons');

		var that = this;
		
		this._gameListUL.html('');
		
		var searchString = App.router.GetParams('games', 'search');		
		var aData = this.model.GetCurrentGames();

		console.log(aData);

		_.each(aData, function (e) {
			if (!e) {
				return;
			}

			var sGameName = e.GetName();
			if (searchString && (sGameName.indexOf(searchString) == -1)) {
				return;
			}

			
			var gameIconSrc = that._gameIconTemplate({
				game_id : e.GetGameID(), 
				game_name: e.GetName(), 
				game_rating : e.GetRating(), 
				game_views: e.GetPlays()
			});	

			var icon = $(gameIconSrc);
			$('.logo', icon).attr('src', e.GetImgSrc());
			$('.rating', icon).jRating({
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
			
			that._gameListUL.append(icon);
		});	

		this.model.IsPrevExists() ? $('.page.prev', this.$el).show() : $('.page.prev', this.$el).hide();
		this.model.IsNextExists() ? $('.page.next', this.$el).show() : $('.page.next', this.$el).hide();
	},

	PrevPage : function(e) {
		App.utils.flow_ext(this.name + '.PrevPage');
		e.preventDefault();
		App.router.NavigateTo(e.currentTarget.getAttribute('href'));
	},
	
	NextPage : function(e) {
		App.utils.flow_ext(this.name + '.NextPage');
		e.preventDefault();
		App.router.NavigateTo(e.currentTarget.getAttribute('href'));
	}	
});
*/



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
		App.utils.log(this.name + '.ChangePage');
		e.preventDefault();
		App.router.NavigateTo(e.currentTarget.getAttribute('href'));
	}
});

































App.proto.views.stats = App.proto.views.stats || {};

App.proto.views.stats.mostPlayed = App.proto.views._static.extend({
	name : 'MostPlayedView',
	
	graphics : null,

	initialize : function(args) {
		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render', 'DrawGraphics');	

		this.DrawGraphics();
	},

	DrawGraphics : function () {
		App.utils.flow_ext(this.name + '(' + this.model.get('type') + ').DrawGraphics');	

		var containerW = 200;
		var containerH = 100;

		var axisX = 0;
		var axisY = containerH - 15;

		this.graphics = new App.graphics.wrappers.raphael();
		this.graphics.PreparePaper('raphael_canvas_mostPlayed_' + this.model.get('type'), containerW + 100, containerH);
		this.graphics.DrawSingleLine(
			axisX, 0, axisX, axisY, {
				"stroke" 		: "#BBBBBB",
				"stroke-width" 	: 1.4,
				"opacity" 		: 1
			}
		);
		this.graphics.DrawSingleLine(
			axisX, axisY, containerW, axisY, {
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
			this.graphics.DrawSingleLine(axisX + nInterval * i, axisY - 3, axisX + nInterval * i, axisY, {
				"stroke-width" 	: 0.5,
				"stroke" 		: "#666666",
				"opacity" 		: 1}
			);
			this.graphics.DrawText(nInterval * i, axisY + 10, (i*10).toString() + '%', {fill: '#888888'}, 'perc' + i);
		}

		var aData = this.model.GetData();

		var nRectH = 20;
		var nOffset = 5;		
		var nMaxW = containerW - nInterval;

		var nBarsInterval = (axisY - nOffset * 2) - (nRectH * 3 ) + nOffset / 2;

		var aColors = ['#F0BA2A', '#F1E5D3', '#CFAC94'];
		for (var i = 0; i < 3; i++)
		{
			var posY = (nBarsInterval + nRectH/2) * i + nOffset;
			var barW = aData[i].percents / nMaxPercents * nMaxW;

			var sColor = aColors[1];
			if (aData[i].percents == this.model.GetMaxPercents()) {
				sColor = aColors[0];
			} else if (aData[i].percents == this.model.GetMinPercents()) {				
				sColor = aColors[2];
			}


			this.graphics.DrawRect(axisX + 1, posY, barW, nRectH, {fill : sColor, 'stroke-width' : 0});
			this.graphics.DrawText(axisX + barW - 15, posY + nRectH / 2 + 3 , parseInt(aData[i].percents).toString() + '%');
			this.graphics.DrawText(axisX + barW + 5, posY + nRectH / 2 + 3, aData[i].name, {fill: '#ea7c39', 'font-size' : 12, 'text-anchor': 'start'});
		}
	},

	render : function() {	
		App.utils.flow_ext(this.name + '(' + this.model.get('type') + ').render');	

		this.$el.find('.caption_type').html(this.model.GetCaption('type'));
		this.$el.find('.caption_text').html(this.model.GetCaption('text'));		
	}	
});

App.proto.views.stats.horizontalStats = App.proto.views._dynamic.extend({
	name : 'HorizontalStatsView', 
	
	mostPlayedGirls : null, 
	mostPlayedBoys : null, 
	mostPlayedAge : null, 

	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	

		this.mostPlayedGirls = new App.proto.views.stats.mostPlayed({el : $("#container_mostPlayedGirls"), model: new App.proto.models.stats.mostPlayed({type : 'girls'})});		
		this.mostPlayedBoys = new App.proto.views.stats.mostPlayed({el : $("#container_mostPlayedBoys"), model: new App.proto.models.stats.mostPlayed({type : 'boys'})})
		this.mostPlayedAge = new App.proto.views.stats.mostPlayed({el : $("#container_mostPlayedAge"), model: new App.proto.models.stats.mostPlayed({type : 'age'})});
		
		App.utils.flow_ext(this.name + '.initialize');			
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

		this.map = new App.graphics.wrappers.raphael();
		this.map.PreparePaper('worldMap', 400, 250);
		this.map.DrawMap('#267114', '#F8FFED', App.data.map, App.data.countries, "#888");

		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render');	
	}	
});


App.proto.views.sorting = App.proto.views._dynamic.extend({
	name : 'SortingView', 

	events : {
		'click a' : 'ChangeSort'
	},

	ChangeSort : function(e) {
		App.utils.flow_ext(this.name + '.initialize');			
		e.preventDefault();
		App.router.NavigateTo(e.currentTarget.getAttribute('href'));
	},

	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
				
		var t = this.$el.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>');
		this._templateCompiled = _.template(t);

		App.utils.flow_ext(this.name + '.initialize');	

		var that = this;
		App.on('changed_params_games', function() {that.OnChangedSort()});

		_.bindAll(this, 'render', 'ChangeSort', 'OnChangedSort');	
	},	

	render : function() {			
		App.utils.log(this.name + '.render');
		if (!this._bIsVisible) return;
		
		this.$el.html(this._templateCompiled({
			cur_sorting : this.model.GetCurrentSorting(),
			sorting_featured_caption : this.model.GetCaption('featured'),
			sorting_newest_caption : this.model.GetCaption('newest'),
			sorting_rating_caption : this.model.GetCaption('rating'),
			sorting_views_caption : this.model.GetCaption('views'),
			sorting_votes_caption : this.model.GetCaption('votes'),

			sorting_featured_link : this.model.GetLink('featured'),
			sorting_newest_link : this.model.GetLink('newest'),
			sorting_rating_link : this.model.GetLink('rating'),
			sorting_views_link : this.model.GetLink('views'),
			sorting_votes_link : this.model.GetLink('votes')
		}));
	},

	OnChangedSort : function() {
		//this.render();
	}
});

/*
App.proto.views.searchBar = App.proto.views._dynamic.extend({
	name : 'SearchView', 
	
	events : {
		'keyup' : 'OnKeyUp'
	},

	OnKeyUp : function(e) {
		console.info(this.name + '.OnKeyUp()');
		App.router.ClearParams();
		App.router.NavigateTo(App.router.BuildLink(null, null, {search : e.currentTarget.value}));
	},

	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	

		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render');	
	},

	OnChangedPart : function() {
		App.utils.flow_core(this.name + '.OnChangedPart');	

		var bIsOnCurrentPartVisible = this.visible_at_parts[App.router.GetCurrentPart()] == true;
		if (this._bIsVisible && bIsOnCurrentPartVisible) {
			console.log('SEARCH: i have not been rerender');	
		} else {
			this.SetVisibility(bIsOnCurrentPartVisible);			
			this.render();	
		}
	}	
});


/*	
App.proto.views.testAnimation = App.proto.views._dynamic.extend({
	name : 'TestAnimationView', 
	
	_nCurFrame : 0,
	_nCurMainIter : 200,
	_nMaxFrames : 25,
	_nSpeed : 25,
	map : null,

	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render', 'DrawFrames');	

		var that = this;
		setInterval(function () {that.DrawFrames();}, that._nSpeed);
	},

	render : function() {

	},	

	DrawFrames : function () {
		this._nCurFrame++;

		if (this._nCurFrame >= this._nMaxFrames)
			this._nCurFrame = 0;

		var nTopPos = Math.floor(this._nCurFrame / 5);
		var nLeftPos = this._nCurFrame % 5;

		this._nCurMainIter --;
		if (this._nCurMainIter < 0) {
			this._nCurMainIter = 200;
		}
		console.log('Drawing frame: [' + (-nTopPos * 68) + '][' + (-nLeftPos * 68) + ']')
		this.$('div').offset({top : 87 -nTopPos * 68, left : -nLeftPos * 68});

	}
});
*/