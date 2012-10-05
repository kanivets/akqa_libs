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
		
	module('Languator check');
	
	test('Languator existion', function() {	
		expect(1); 
		notDeepEqual(App.langs, {}, 'Checking languator is not empty');	
	});
	
	test('Languator default language', function() {			
		expect(2); 
		notStrictEqual(App.langs.sCurrentLanguage, undefined, 'App.langs.sCurrentLanguage must be defined');
		notEqual(App.langs.sCurrentLanguage, '', 'App.langs.sCurrentLanguage must be not empty');
	});
		
	test('Languator get current language', function() {	
		expect(2); 
		
		var defaultLanguage = App.langs.sCurrentLanguage;
		equal(App.langs.GetCurrentLanguage(), defaultLanguage, 'GetCurrentLanguage checking with \'' + defaultLanguage + '\'');
		
		App.langs.sCurrentLanguage = 'ru';
		equal(App.langs.GetCurrentLanguage(), 'ru', 'GetCurrentLanguage checking with \'ru\'');	
	});
	
	test('Languator check default languages count', function() {		
		expect(1); 	
		ok(_.size(App.langs.GetAvailableLanguages()) > 0, 'Must be at least 1 available language');
	});		
	
	test('Languator set current language', function() {	
		expect(13); 
		
		var test_lang1_exists = '';
		for(test_lang1_exists in App.langs.aAvailableLangs) break;

		var test_lang2_failed = test_lang1_exists + 'unittest_lang___test3';
		var test_lang3_failed = null;
		
		
		var that = this;			
		
		App.langs.sCurrentLanguage = 'unittest_lang___some_test_lang';
		
		ok(App.langs.SetCurrentLanguage(test_lang1_exists), 'Testing set to existed language');	//1
		equal(App.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\''); //2	
		
		ok(!App.langs.SetCurrentLanguage(test_lang2_failed), 'Testing set to not existed language'); //3
		equal(App.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//4	
		
		ok(!App.langs.SetCurrentLanguage(test_lang3_failed), 'Testing set to null language');//5
		equal(App.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//6	
		
		ok(!App.langs.SetCurrentLanguage(), 'Testing set language without params');//7
		equal(App.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//8	
				
		App.langs.sCurrentLanguage = test_lang1_exists;
		ok(!App.langs.SetCurrentLanguage(function() {}), 'Testing set language with bad params (function)');//9
		equal(App.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//10	
		
		App.langs.sCurrentLanguage = test_lang1_exists;
		ok(!App.langs.SetCurrentLanguage({x: 'some'}), 'Testing set language with bad params (object)');//11
		equal(App.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//12	
		
		
		var bIsCallbackCalled = false;
		this.OnTestLanguageChanged = function(to) { bIsCallbackCalled = true; start();};
		App.langs.on('language_changed', this.OnTestLanguageChanged);	
		
		stop();
		App.langs.sCurrentLanguage = test_lang2_failed;
		App.langs.SetCurrentLanguage(test_lang1_exists);
		ok(bIsCallbackCalled, 'Callback is called'); //13	
			
		App.langs.off('language_changed', this.OnTestLanguageChanged);		
	});
	
	
	
	
	
	
	module('Router check');
	test('Router creation', function() {	
		expect(1); 
		try {
			App.router = new App.proto.routers.main();
		} catch(e) {}
			
		notDeepEqual(App.router, {}, 'Checking router is not empty');	
	});
	
	App.router = new App.proto.routers.main();
	
	test('Router checking default \'part not found\' part name', function() {			
		expect(2); 	
		notStrictEqual(App.router.sDefaultNotFoundPartName, undefined, 'App.router.sDefaultNotFoundPartName must be defined');
		notEqual(App.router.sDefaultNotFoundPartName, '', 'App.router.sDefaultNotFoundPartName must be not empty');			
	});
	
	test('Router route callbacks existance', function() {
		if (!App.router.routes) {expect(0); return;}
		expect(App.router.routes.length);
		
		for(var i in App.router.routes)
			notStrictEqual(App.router[App.router.routes[i]], undefined, 'Checking route callback router.' + App.router.routes[i] + ' for route "' + i + '"exists');
	});
	
	test('Router \'process\' functionality check', function() {
		expect(9 );
	
		App.router.current_part = 'test';
		App.router.default_part = 'default';
		
		App.router.process();
		equal(App.router.current_part, App.router.default_part, 'Passing without arguments will change current_part to default');
		
		App.router.process(null);
		equal(App.router.current_part, App.router.default_part, 'Passing only with 1 argument will change current_part to default');
		
		App.router.process('ru');
		equal(App.router.current_part, App.router.default_part, 'Passing null and undefined as arguments will change current_part to default');
		
		App.router.process(null, undefined);
		equal(App.router.current_part, App.router.default_part, 'Passing null and undefined as arguments will change current_part to default');
		
		App.router.process('ru', null);
		equal(App.router.current_part, App.router.default_part, 'Passing null as second arguments will change current_part to default');
		
		App.router.process(null, 'test2');
		equal(App.router.current_part, 'test2', 'Passing \'test2\' as second argument will change current_part to it');
		
		App.router.current_part = 'test';
		App.router.process('ru', 'test2');
		equal(App.router.current_part, 'test2', 'Passing both not-null arguments and \'test2\' as second argument will change current_part to it');
				
		App.router.current_part = 'test';
		App.router.process('ru', function() {});
		equal(App.router.current_part, App.router.default_part, 'Passing good first and bad second (function) arguments will change current_part to default');
		
		App.router.current_part = 'test';
		App.router.process('ru', {x: 'some'});
		equal(App.router.current_part, App.router.default_part, 'Passing good first and bad second (object) arguments will change current_part to default');
	});
	
	test('Router \'notfound\' functionality check', function() {
		expect(1);
		
		App.router.current_part = 'test';
		App.router.notFound();
		equal(App.router.current_part, App.router.sDefaultNotFoundPartName, 'notFound method must set current_part to \'' + App.router.sDefaultNotFoundPartName + '\'');
	});
	
	test('Router \'GetCurrentPart\' functionality check', function() {
		expect(1);
		
		var testPart = 'unittest_router___testpart';
		App.router.current_part = testPart;
		equal(App.router.GetCurrentPart(), testPart, 'GetCurrentPart method must return current_part');
	});
		
	test('Router \'BuildLink\' functionality check', function() {
		expect(8);
		
		var defaultPart = 'unittest_router___defaultpart';
		var defaultLang = App.langs.GetCurrentLanguage();
		var testPart = 'unittest_router___testpart';
		var testLang = 'unittest_router___testlang';
		App.router.current_part = defaultPart;
		
		equal(App.router.BuildLink(), '/#' + defaultLang + '/' + defaultPart, 'Must generate link to current page if called without params');
		equal(App.router.BuildLink(null), '/#' + defaultLang + '/' + defaultPart, 'Must generate link to current page with current language if called with only one \'null\' param');
		equal(App.router.BuildLink(testLang), '/#' + testLang + '/' + defaultPart, 'Must generate link to current page with another language if called without second param');
		equal(App.router.BuildLink(null, null), '/#' + defaultLang + '/' + defaultPart, 'Must generate link to current page if called with both \'null\' params');
		equal(App.router.BuildLink(testLang, null), '/#' + testLang + '/' + defaultPart, 'Must generate link to another language if called with good first and \'null\' as second params');
		equal(App.router.BuildLink(null, testPart), '/#' + defaultLang + '/' + testPart, 'Must generate link to another part in same page lang if called with \'null\' as first param and good second params');
		equal(App.router.BuildLink(testLang, testPart), '/#' + testLang + '/' + testPart, 'Must generate link to another page in another lang if called with both good params');
		equal(App.router.BuildLink(function() {}, function() {}), '/#' + defaultLang + '/' + defaultPart, 'Must generate link to current page if called with bad params');
	});
		
	test('Router \'NavigateTo\' functionality check', function() {
		expect(6);
		
		var defaultPart = 'unittest_router___defaultpart';
		var testPart = 'unittest_router___testpart';
		App.router.current_part = defaultPart;
		
		ok(App.router.NavigateTo() == false, 'Must return false when try to been called without param');//1
		ok(App.router.NavigateTo(null) == false, 'Must return false when try to been called with \'null\' param');//2
		ok(App.router.NavigateTo(defaultPart) == true, 'Must return true when valid link is provided even if it is current');//3
		ok(App.router.NavigateTo(testPart) == true, 'Must return true when valid link is provided');//4
		ok(App.router.NavigateTo(function() {}) == false, 'Must return false when try to been called with bad param (function)');//5
		ok(App.router.NavigateTo({x: 'some'}) == false, 'Must return false when try to been called with bad param (object)');//6		
	});
	
});



