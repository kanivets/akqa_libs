var Languator = {
	aAvailableLangs : {en : 'en', ru: 'ru'},
	
	aLangs : {
		title_main : { en : 'First', ru : 'Первая' },
		title_first : { en : 'First', ru : 'Первая' },
		title_second : { en : 'Second', ru : 'Вторая'},
		title_third : { en : 'Third', ru : 'Третья'},
		title_notfound : { en : 'Page is not found!', ru : 'Страница не найдена'},
		
		nav_caption_first : {en : 'First', ru : 'Первая'},
		nav_caption_second : {en : 'Second', ru : 'Вторая'},
		nav_caption_third : {en : 'Third', ru : 'Третья'},
		
		nav_langs_en : {en : 'EN', ru : 'EN'},
		nav_langs_ru : {en : 'RU', ru : 'RU'},
		//nav_langs_es : {en : 'ES', ru : 'ES'},
		
		part_text_first : {en : 'NOW SHOWING FIRST', ru : 'СЕЙЧАС ОТОБРАЖАЕТСЯ ПЕРВАЯ' },
		part_text_second : {en : 'NOW SHOWING SECOND', ru : 'СЕЙЧАС ОТОБРАЖАЕТСЯ ВТОРАЯ' },
		part_text_third : {en : 'NOW SHOWING THIRD', ru : 'СЕЙЧАС ОТОБРАЖАЕТСЯ ТРЕТЬЯ' }
	},
	
	sCurrentLanguage : 'en',
	
	GetAvailableLanguages : function () {
		return this.aAvailableLangs;	
	},
	
	GetCurrentLanguage : function () {
		App.utils.flow('Languator.GetCurrentLanguage');
		return this.sCurrentLanguage;	
	},
	
	SetCurrentLanguage : function (to) {
		if (!to || (this.sCurrentLanguage == to) || !this.aAvailableLangs[to]) return;
		App.utils.flow('Languator.SetCurrentLanguage('+ to +')');
		
		this.sCurrentLanguage = to;
		
		App.trigger('language_changed', to);	
	},
	 
	Get : function(key) {
		App.utils.flow('Languator.Get(' + key + ')');
		return this.aLangs[key][this.sCurrentLanguage];
	}
};
