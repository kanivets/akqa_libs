$(document).ready(function(){	
	_.templateSettings = {
		interpolate : /\{\[(.+?)\]\}/g,
		evaluate : /\{\{(.+?)\}\}/g 
	};
		
	App.router = {};
	App.views = {};
	App.models = {};
		
	App.langs = Languator;
	_.extend(App.langs, Backbone.Events);
	
	App.utils = {};
	
	App.utils.flow = function(x) {return;console.log(x);};
	App.utils.log = function(x) {console.log(x);};
	App.utils.debug = function(x) {console.info(x);};
	
	QUnit.config.altertitle = false;
	
	
	
	module('App.proto.models.title check');
	
	module('Model \'App.proto.models.title\' check');	
	test('Model \'App.proto.models.title\' init check', function() {
		expect(5);		
		
		notDeepEqual(App.proto.models.title, {}, 'Checking \'App.proto.models.title\' is exists');		//1
		var modelTitle = new App.proto.models.title(); 
		notDeepEqual(modelTitle, {}, 'Checking \'modelTitle\' as instance of App.proto.models.title is properly created'); //2	
		notStrictEqual(modelTitle.get('lang_prefix'), undefined, 'Checking \'modelTitle.get(\'lang_prefix\')\' is defined'); //3	
		
		var customPrefix = 'unittest_model_title___customfield';
		var customPart = 'test';
		var modelTitle = new App.proto.models.title({lang_prefix: customPrefix});
		notStrictEqual(modelTitle.get('lang_prefix'), undefined, 'Checking \'modelTitle.get(\'lang_prefix\')\' was set with another default value'); //4
		equal(modelTitle.get('lang_prefix'), customPrefix, 'Checking \'modelTitle.get(\'lang_prefix\')\' is equal to init options'); //5
		
	});
	
		
	test('Model \'App.proto.models.title.GetPageTitle()\' functionality check', function() {
		expect(4);		
		var customPrefix = 'unittest_model_title___customfield';
		var customPart1 = 'part1';
		var customPart2 = 'part2';
		var modelTitle = new App.proto.models.title({lang_prefix: customPrefix});
		
		var key1 = customPrefix + '_' + customPart1;
		App.langs.aLangs[key1] = {'lang1' : customPart1 + ' lang1', 'lang2' : customPart1 + ' lang2'};
		var key2 = customPrefix + '_' + customPart2;
		App.langs.aLangs[key2] = {'lang1' : customPart2 + ' lang1', 'lang2' : customPart2 + ' lang2'};
		
		App.router.current_part = customPart1;
		
		App.langs.sCurrentLanguage = 'lang1';
		equal(modelTitle.GetPageTitle(), App.langs.aLangs[key1][App.langs.sCurrentLanguage], 'Checking GetPageTitle with ' + App.router.current_part + ' with ' + App.langs.sCurrentLanguage);
		
		App.langs.sCurrentLanguage = 'lang2';
		equal(modelTitle.GetPageTitle(), App.langs.aLangs[key1][App.langs.sCurrentLanguage], 'Checking GetPageTitle with ' + App.router.current_part + ' with ' + App.langs.sCurrentLanguage);
				
		App.router.current_part = customPart2;
		
		App.langs.sCurrentLanguage = 'lang1';
		equal(modelTitle.GetPageTitle(), App.langs.aLangs[key2][App.langs.sCurrentLanguage], 'Checking GetPageTitle with ' + App.router.current_part + ' with ' + App.langs.sCurrentLanguage);
		
		App.langs.sCurrentLanguage = 'lang2';
		equal(modelTitle.GetPageTitle(), App.langs.aLangs[key2][App.langs.sCurrentLanguage], 'Checking GetPageTitle with ' + App.router.current_part + ' with ' + App.langs.sCurrentLanguage);
				
		App.langs.aLangs[key1] = null;
		App.langs.aLangs[key2] = null;	
	});	
});