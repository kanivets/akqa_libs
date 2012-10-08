var App = App || {};
App.proto = App.proto || {};
App.proto.views = App.proto.views || {};

App.proto.views.title = App.proto.views._static.extend({
	name : 'TitleView',
			
	render : function() {
		App.utils.flow_ext(this.name + '.render');
		document.title = this.model.GetPageTitle();
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
		'click a.langs' : 'ChangeLanguage',
		'click button.signin' : 'SignIn'
	},	
			
	render : function() {
		App.utils.flow_ext(this.name + '.render');
		var t = this.templateCompiled({

			games_link : this.model.GetLink('games'),
			friends_link : this.model.GetLink('friends'),
			statistics_link : this.model.GetLink('statistics'),

			games_caption : this.model.GetCaption('games'),
			friends_caption : this.model.GetCaption('friends'),
			statistics_caption : this.model.GetCaption('statistics'),

			//nav_elements: this.model.GetNavElements(), 
			lang_elements: this.model.GetLanguages(), 
			cur_language: this.model.GetCurrentLanguage(), 
			cur_part : this.model.GetCurrentPart(),

			home_link : App.router.BuildLink(null, 'games'),

			isLogined : this.model.IsLogged(),
			login_name : this.model.GetName(),
			register_link : this.model.GetRegisterLink(),
			register_caption : this.model.GetRegisterCaption()
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
	},
	
	SignIn : function(e) {
		App.utils.flow_ext(this.name + '.SignIn');		
		e.preventDefault();
		App.router.NavigateToPart('signin');	
	}
});

App.proto.views.register = App.proto.views._dynamic.extend({
	name : 'RegisterView',
	
	events : {
		'click #register_close' : 'OnClose', 
		'click #register_clear' : 'OnClear', 
		'click #register_submit' : 'OnSubmit'
	},
	
	_Show : function() {	//internal use only - contains jquery level of element hiding  
		App.utils.flow_ext(this.name + '._Show');
		this._bIsVisible = true;			
		this.$el.fadeIn(2000);		
	},
	
	_Hide : function() {	//internal use only - contains jquery level of element hiding  
		App.utils.flow_ext(this.name + '._Show');
		this._bIsVisible = false;			
		this.$el.fadeOut(400);		
	},
	
	OnClose : function(e) {
		App.utils.flow_ext(this.name + '.OnClose');
		e.preventDefault();
		App.router.NavigateTo('/');
	},
	
	OnClear : function(e) {
		App.utils.flow_ext(this.name + '.OnClear');
		e.preventDefault();
		$('input[type="text"], input[type="password"]', $('#register')).each(function(index, element) {
			$(element).val('');	
		});
		
		$('#register input#register_subscribe').attr('checked', 'checked');
		$('#register input#register_agree').removeAttr('checked');
	},
	
	OnSubmit : function(e) {
		App.utils.flow_ext(this.name + '.OnSubmit');
		
		$('#register').validate(this.model.get('form_validation_attributes'));
		e.preventDefault();
		
		if (!$('#register').valid()) return;
	},	
	
	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);
		App.utils.flow_ext(this.name + '.initialize');
				
		_.bindAll(this, 'OnClose', 'OnClear', 'OnSubmit', 'render');	
	},
	
	render : function() {			
		App.utils.flow_ext(this.name + '.render, visible: ' + this._bIsVisible);
		if (!this._bIsVisible) return;
		
		this.$el.html(this.templateCompiled({
							caption : this.model.GetCaption(),
							login : this.model.GetLogin(),
							name : this.model.GetName()
		}));
	}
});



App.proto.views.test = App.proto.views._dynamic.extend({
	name : 'TestView',
	
	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render');	
	},
	
	render : function() {			
		App.utils.flow_ext(this.name + '.render, visible: ' + this._bIsVisible);
		if (!this._bIsVisible) return;
		
		this.$el.html(this.templateCompiled({
							test : 'test'
		}));
	}	
});



App.proto.views.gameList = App.proto.views._dynamic.extend({
	name : 'GameListView',
	_gameIconTemplate : null,
	_gameListUL : null, 
	
	events : {
		'click a.page.prev' : 'PrevPage',
		'click a.page.next' : 'NextPage',
	},
	
	initialize : function(args) {
		App.proto.views._dynamic.prototype.initialize.call(this, args);	
		App.utils.flow_ext(this.name + '.initialize');			
		_.bindAll(this, 'render', 'PrevPage', 'NextPage', 'DrawIcons');	
				
		this._gameListUL = $('ul#games_list', this.$el);
		this._gameIconTemplate = _.template(this._gameListUL.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>'));			
		this._gameListUL.html('');
				
		var t = this.$el.html().replace(/\&lt;\%/g, '<%').replace(/\%\&gt;/g, '%>');
		this.templateCompiled = _.template(t);
				
		var that = this;

		App.on('changed_params_games', function() {
			var nPage = App.router.GetParams('games', 'page');
			if (!nPage) nPage = 1;
			that.model.SetPage(nPage);

			var sSort = App.router.GetParams('games', 'sort');
			if (sSort)
				that.model.SetSort(sSort);

			that.render();
		});
		
		this.model.CalculatePages();
		this.render();
	},
	
	render : function() {	
		App.utils.flow_ext(this.name + '.render, visible: ' + this._bIsVisible);
		if (!this._bIsVisible) return;

		this.DrawIcons();		
		this.$el.find('.page.prev').attr('href', App.router.BuildLink(null, null, {page : parseInt(this.model.GetCurrentPage()) - 1, sort : this.model.GetCurrentSort()}));
		this.$el.find('.page.next').attr('href', App.router.BuildLink(null, null, {page : parseInt(this.model.GetCurrentPage()) + 1, sort : this.model.GetCurrentSort()}));

		this.$el.find('.views span').html(this.model.GetViewsCaption());
	},
	
	DrawIcons : function() {	
		App.utils.flow_ext(this.name + '.DrawIcons');

		var that = this;
		
		this._gameListUL.html('');
		var aData = this.model.GetCurrentGames(); 

		_.each(aData, function (e) {
			if (!e) return;
			
			var gameIconSrc = that._gameIconTemplate({
				game_id : e.GetGameID(), 
				game_name: e.GetName(), 
				game_rating : e.GetRating(), 
				game_views: e.GetPlays(),
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
		App.utils.flow_ext(this.name + '.render, visible: ' + this._bIsVisible);
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
		'click a' : 'ChangeSort',
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
		App.utils.flow_ext(this.name + '.render, visible: ' + this._bIsVisible);
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
		this.render();
	}
});