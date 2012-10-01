var Languator = {
	aAvailableLangs : {en : 'en', ru: 'ru'},
	
	aLangs : {
		
		app_name : { en : 'Be Brainy', ru : 'Be Brainy' },
		
		title_main : { en : 'Games', ru : 'Игры' },
		title_games : { en : 'Games', ru : 'Игры' },
		title_friends : { en : 'Friends', ru : 'Друзья'},
		title_register : { en : 'Register', ru : 'Регистрация'},
		title_statistics : { en : 'Statistics', ru : 'Статистика'},
		title_notfound : { en : 'Page is not found!', ru : 'Страница не найдена'},

		
		
		header_caption_games : {en : 'GAMES', ru : 'ИГРЫ'},
		header_caption_friends : {en : 'FRIENDS', ru : 'ДРУЗЬЯ'},
		header_caption_statistics : {en : 'STATISTICS', ru : 'СТАТИСТИКА'},
		header_caption_register : {en : 'Register', ru : 'Регистрация'},

		
		header_langs_en : {en : 'EN', ru : 'EN'},
		header_langs_ru : {en : 'RU', ru : 'RU'},

		
		unknown : '...'
	},
	
	sCurrentLanguage : 'en',
	
	GetAvailableLanguages : function () {
		App.utils.flow_core('Languator.GetAvailableLanguages');
		return this.aAvailableLangs;	
	},
	
	GetCurrentLanguage : function () {
		App.utils.flow_core('Languator.GetCurrentLanguage');
		return this.sCurrentLanguage;	
	},
	
	SetCurrentLanguage : function (to) {
		if (!to || !this.aAvailableLangs[to] || typeof(to) != 'string') return false;
		if (this.sCurrentLanguage == to) return true;
		
		App.utils.flow_core('Languator.SetCurrentLanguage('+ to +')');
		
		this.sCurrentLanguage = to;
		
		this.trigger('language_changed', to);	
		return true;
	},
	 
	Get : function(key) {
		App.utils.flow_core('Languator.Get(' + key + ')');
		
		if (this.aLangs[key] === undefined) return this.aLangs.unknown;		
		if (this.aLangs[key][this.sCurrentLanguage] === undefined) return this.aLangs.unknown;
		
		return this.aLangs[key][this.sCurrentLanguage];
	}
};
