$(document).ready(function(){	
	_.templateSettings = {
		interpolate : /\{\[(.+?)\]\}/g,
		evaluate : /\{\{(.+?)\}\}/g 
	};
		
	App.router = {};
	App.views = {};
	App.models = {};
		
	document.title = 'Be Brainy: Core testing';
	QUnit.config.altertitle = true;		






	function GetDateStringNow(nDaysOffset) {
		var cur = new Date();		

		var newDate = new Date();
		newDate.setDate(cur.getDate() + nDaysOffset);

		return newDate.toUTCString().split('+')[0];
	}

	function GetDateStringFromCookieParams(sString) {
		var aData = sString.split(';');
		for (var i in aData) {
			if (aData[i].indexOf('expires') != -1) {
				return aData[i].split('=')[1];
			}
		}
	}





	module('Utils check');	
	test('utils funcs existion', function() {	
		expect(7); 
		ok(App.utils, 'Checking languator is not empty');	
		ok(App.utils.flow_core, 'Checking existance of App.utils.flow_core');	
		ok(App.utils.flow_ext, 'Checking existance of App.utils.flow_ext');		
		ok(App.utils.log, 'Checking existance of App.utils.log');		
		ok(App.utils.info, 'Checking existance of App.utils.info');		
		ok(App.utils.debug, 'Checking existance of App.utils.debug');		
		ok(App.utils.error, 'Checking existance of App.utils.error');	
	});
	





	module('Languator(proto) check');
	test('Languator(proto) existion', function() {	
		expect(1); 
		notDeepEqual(App.proto.langs, {}, 'Checking languator(proto) is not empty');	
	});
			
	test('Languator(proto) get current language', function() {	
		expect(2); 
		
		var defaultLanguage = App.proto.langs.sCurrentLanguage;
		equal(App.proto.langs.GetCurrentLanguage(), defaultLanguage, 'GetCurrentLanguage checking with \'' + defaultLanguage + '\'');
		
		App.proto.langs.sCurrentLanguage = 'ru';
		equal(App.proto.langs.GetCurrentLanguage(), 'ru', 'GetCurrentLanguage checking with \'ru\'');	
	});	
	
	test('Languator set current language', function() {	
		expect(13); 
		

		App.proto.langs.aAvailableLangs = {'unittest_lang___test' : 'unittest_lang___test'};

		var test_lang1_exists = 'unittest_lang___test';
		var test_lang2_failed = 'unittest_lang___not_existed';
		var test_lang3_failed = null;
				
		var that = this;			
		
		App.langs.sCurrentLanguage = 'unittest_lang___some_test_lang';
		
		ok(App.proto.langs.SetCurrentLanguage(test_lang1_exists), 'Testing set to existed language');	//1
		equal(App.proto.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\''); //2	
		
		ok(!App.proto.langs.SetCurrentLanguage(test_lang2_failed), 'Testing set to not existed language'); //3
		equal(App.proto.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//4	
		
		ok(!App.proto.langs.SetCurrentLanguage(test_lang3_failed), 'Testing set to null language');//5
		equal(App.proto.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//6	
		
		ok(!App.proto.langs.SetCurrentLanguage(), 'Testing set language without params');//7
		equal(App.proto.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//8	
				
		App.proto.langs.sCurrentLanguage = test_lang1_exists;
		ok(!App.proto.langs.SetCurrentLanguage(function() {}), 'Testing set language with bad params (function)');//9
		equal(App.proto.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//10	
		
		App.proto.langs.sCurrentLanguage = test_lang1_exists;
		ok(!App.proto.langs.SetCurrentLanguage({x: 'some'}), 'Testing set language with bad params (object)');//11
		equal(App.proto.langs.GetCurrentLanguage(), test_lang1_exists, 'GetCurrentLanguage checking to be \'' + test_lang1_exists + '\'');//12	
		
		
		var bIsCallbackCalled = false;
		this.OnTestLanguageChanged = function(to) { bIsCallbackCalled = true; start();};
		App.langs.on('language_changed', this.OnTestLanguageChanged);	
		
		stop();
		App.langs.sCurrentLanguage = test_lang2_failed;
		App.langs.SetCurrentLanguage(test_lang1_exists);
		ok(bIsCallbackCalled, 'Callback is called'); //13	
			
		App.langs.off('language_changed', this.OnTestLanguageChanged);		
	});
	
	test('Languator get localized string', function() {	
		expect(11); 

		App.proto.langs.aAvailableLangs = {
			lang1 : 'lang1',
			lang2 : 'lang2',
			lang3 : 'lang3',
		};

		var aCurrentLangsDefs = {
			caption_1 : {lang1 : 'caption 1 (lang1)', lang2 : 'caption 1 (lang2)'},
			caption_2 : {lang1 : 'caption 2 (lang1)', lang2 : 'caption 2 (lang2)'},
			unknown : '...'
		};

		App.proto.langs.aLangs = aCurrentLangsDefs;

		var test_lang1_existed = 'lang1';
		var test_lang2_existed = 'lang2';
		var test_lang3_failed = 'lang3';
		var test_lang4_failed = 'lang_not_existed';

		App.proto.langs.SetCurrentLanguage(test_lang1_existed);
		equal(aCurrentLangsDefs.caption_1.lang1, App.proto.langs.Get('caption_1'), 'Testing get text with lang: \'' + test_lang1_existed + '\', index: \'caption_1\'');//1
		equal(aCurrentLangsDefs.caption_2.lang1, App.proto.langs.Get('caption_2'), 'Testing get text with lang: \'' + test_lang1_existed + '\', index: \'caption_2\'');//2
		equal(aCurrentLangsDefs.unknown, App.proto.langs.Get('caption_3'), 'Testing get text with lang: \'' + test_lang1_existed + '\', index: \'caption_3\' (not defined index) - will return \'...\'');//3

		App.proto.langs.SetCurrentLanguage(test_lang2_existed);
		equal(aCurrentLangsDefs.caption_1.lang2, App.proto.langs.Get('caption_1'), 'Testing get text with lang: \'' + test_lang2_existed + '\', index: \'caption_1\'');//4

		App.proto.langs.SetCurrentLanguage(test_lang3_failed);
		equal(aCurrentLangsDefs.unknown, App.proto.langs.Get('caption_1'), 'Testing get text with lang: \'' + test_lang3_failed + '\', index: \'caption_1\' (not defined localization) - will return \'...\'');//5
		equal(aCurrentLangsDefs.unknown, App.proto.langs.Get('caption_3'), 'Testing get text with lang: \'' + test_lang3_failed + '\', index: \'caption_3\' (not defined localization and not defined index) - will return \'...\'');//6

		App.proto.langs.sCurrentLanguage = test_lang4_failed;
		equal(aCurrentLangsDefs.unknown, App.proto.langs.Get('caption_1'), 'Testing get text with lang: \'' + test_lang4_failed + '\', index: \'caption_1\' (not defined localization) - will return \'...\'');//7
		equal(aCurrentLangsDefs.unknown, App.proto.langs.Get('caption_3'), 'Testing get text with lang: \'' + test_lang4_failed + '\', index: \'caption_3\' (not defined localization and not defined index) - will return \'...\'');//8

		App.proto.langs.SetCurrentLanguage(test_lang1_existed);
		equal(aCurrentLangsDefs.unknown, App.proto.langs.Get(null), 'Testing get text with lang: \'' + test_lang1_existed + '\', index: null - will return \'...\'');//9
		equal(aCurrentLangsDefs.unknown, App.proto.langs.Get({some: 'val'}), 'Testing get text with lang: \'' + test_lang1_existed + '\', index: object - will return \'...\'');//10
		equal(aCurrentLangsDefs.unknown, App.proto.langs.Get(function() {return 1;}), 'Testing get text with lang: \'' + test_lang1_existed + '\', index: function - will return \'...\'');//11
	});
	




	module('Storage check');
	test('Storage.cookies(proto) existion', function() {	
		expect(1); 
		ok(App.proto.storage.cookiesStorage, 'Storage.cookies(proto) exists');	
	});

	test('Storage.cookies(proto) set testing', function() {	
		expect(17); 

		var res = false;
		ok(res = App.proto.storage.cookiesStorage.Set('test_set_1', 'test1', -1), 'Setting \'test_set_1\',\'test1\', -1'); //1
		equal(GetDateStringNow(-1), GetDateStringFromCookieParams(res), 'Checking real expire date'); //2

		ok(res = App.proto.storage.cookiesStorage.Set('test_set_2', 'test'), 'Setting \'test_set_2\',\'test\''); //3
		equal(GetDateStringNow(365*10), GetDateStringFromCookieParams(res), 'Checking real expire date'); //4

		ok(!App.proto.storage.cookiesStorage.Set('test_set_3'), 'Setting \'test_set_3\''); //5

		ok(App.proto.storage.cookiesStorage.Set('test_set_1', 'test'), 'Overwrite key test'); //6
		ok(!App.proto.storage.cookiesStorage.Set('test_set_1'), 'Overwrite key witout value test'); //7

		ok(!App.proto.storage.cookiesStorage.Set(), 'Setting without params'); //8
		ok(!App.proto.storage.cookiesStorage.Set(1), 'Setting with numeric key'); //9
		ok(!App.proto.storage.cookiesStorage.Set({}), 'Setting with key as object'); //10
		ok(!App.proto.storage.cookiesStorage.Set(function() {return;}), 'Setting with key as function'); //11
		ok(App.proto.storage.cookiesStorage.Set('test_set_4', {}), 'Setting with value as object'); //12
		ok(App.proto.storage.cookiesStorage.Set('test_set_5', function() {return;}), 'Setting with value as function'); //13
		ok(App.proto.storage.cookiesStorage.Set('test_set_6', 'test', '1'), 'Setting with expireDays as num string'); //14
		ok(App.proto.storage.cookiesStorage.Set('test_set_7', 'test', 'test'), 'Setting with expireDays as non-num string'); //15
		ok(App.proto.storage.cookiesStorage.Set('test_set_8', 'test', {}), 'Setting with expireDays as object'); //16
		ok(App.proto.storage.cookiesStorage.Set('test_set_9', 'test', function() {return;}), 'Setting expireDays value as function'); //17

		App.proto.storage.cookiesStorage.Set('test_set_1', null, -1);
		App.proto.storage.cookiesStorage.Set('test_set_2', null, -1);
		App.proto.storage.cookiesStorage.Set('test_set_3', null, -1);
		App.proto.storage.cookiesStorage.Set('test_set_4', null, -1);
		App.proto.storage.cookiesStorage.Set('test_set_5', null, -1);
		App.proto.storage.cookiesStorage.Set('test_set_6', null, -1);
		App.proto.storage.cookiesStorage.Set('test_set_7', null, -1);
		App.proto.storage.cookiesStorage.Set('test_set_8', null, -1);
		App.proto.storage.cookiesStorage.Set('test_set_9', null, -1);

	});
	
	test('Storage.cookies(proto) get testing', function() {	
		expect(8); 

		App.proto.storage.cookiesStorage.Set('test_get_1', 'test');
		App.proto.storage.cookiesStorage.Set('test_get_2', 123);
		App.proto.storage.cookiesStorage.Set('test_get_3', {some: 1});

		equal(App.proto.storage.cookiesStorage.Get('test_get_1'), 'test', "Get 'test_get_1'"); //1
		equal(App.proto.storage.cookiesStorage.Get('test_get_2'), 123, "Get 'test_get_2'"); //2
		notDeepEqual(App.proto.storage.cookiesStorage.Get('test_get_3'), {some: 1}, "Get 'test_get_3' (some object)"); //3
		ok (!App.proto.storage.cookiesStorage.Get('test_get_not_existed'), "Get 'test_get_not_existed' (not existed)"); //4
		ok (!App.proto.storage.cookiesStorage.Get(), "Get without key"); //5
		ok (!App.proto.storage.cookiesStorage.Get(1), "Get with key as int"); //6
		ok (!App.proto.storage.cookiesStorage.Get({}), "Get with key as object"); //7
		ok (!App.proto.storage.cookiesStorage.Get(function() {return;}), "Get with key as function"); //8

	});

	test('Storage.cookies(proto) delete testing', function() {	
		expect(10); 

		App.proto.storage.cookiesStorage.Set('test_delete_1', 'test', 0);
		App.proto.storage.cookiesStorage.Set('test_delete_2', 'test', 1);
		App.proto.storage.cookiesStorage.Set('test_delete_3', 'test');
		App.proto.storage.cookiesStorage.Set('test_delete_4', 1);
		App.proto.storage.cookiesStorage.Set('test_delete_5', null);

		ok (App.proto.storage.cookiesStorage.Delete('test_delete_1'), "Deleting 'test1' (was set with 'test_delete_1', 'test', 0)"); //1
		ok (App.proto.storage.cookiesStorage.Delete('test_delete_2'), "Deleting 'test2' (was set with 'test_delete_2', 'test', 1)"); //2
		ok (App.proto.storage.cookiesStorage.Delete('test_delete_3'), "Deleting 'test3' (was set with 'test_delete_3', 'test')"); //3
		ok (App.proto.storage.cookiesStorage.Delete('test_delete_4'), "Deleting 'test4' (was set with 'test_delete_4', 1)"); //4
		ok (!App.proto.storage.cookiesStorage.Delete('test_delete_5'), "Deleting 'test5' (was set with 'test_delete_5', null)"); //5
		ok (!App.proto.storage.cookiesStorage.Delete('test_delete_not_existed'), "Deleting 'test_delete_not_existed'"); //6
		ok (!App.proto.storage.cookiesStorage.Delete(), "Deleting without key"); //7
		ok (!App.proto.storage.cookiesStorage.Delete(1), "Deleting  with key as int"); //8
		ok (!App.proto.storage.cookiesStorage.Delete({}), "Deleting with key as object"); //9
		ok (!App.proto.storage.cookiesStorage.Delete(function() {return;}), "Deleting with key as function"); //10
	});



test('Storage.localStorage(proto) existion', function() {	
		expect(1); 
		ok(App.proto.storage.localStorage, 'Storage.localStorage(proto) exists');	
	});

	test('Storage.localStorage(proto) set testing', function() {	
		expect(15); 

		var res = false;
		ok(App.proto.storage.localStorage.Set('test_set_1', 'test1'), "Setting with 2 params: - 'test_set_1','test1'"); //1
		ok(App.proto.storage.localStorage.Set('test_set_2', 'test2', 1), "Setting with 3 params (cookies storage compatibility): 'test_set_1','test1', 1"); //2
		ok(!App.proto.storage.localStorage.Set('test_set_3'), "Setting 'test_set_3' without value"); //3
		ok(App.proto.storage.localStorage.Set('test_set_1', 'test'), "Overwrite key 'test_set_1' test"); //4
		ok(!App.proto.storage.localStorage.Set('test_set_1'), "Overwrite key 'test_set_1' without value test"); //5

		ok(!App.proto.storage.localStorage.Set(), 'Setting without params'); //6
		ok(!App.proto.storage.localStorage.Set(1), 'Setting with numeric key'); //7
		ok(!App.proto.storage.localStorage.Set({}), 'Setting with key as object'); //8
		ok(!App.proto.storage.localStorage.Set(function() {return;}), 'Setting with key as function'); //9
		ok(App.proto.storage.localStorage.Set('test_set_4', {}), 'Setting with value as object'); //10
		ok(App.proto.storage.localStorage.Set('test_set_5', function() {return;}), 'Setting with value as function'); //11
		ok(App.proto.storage.localStorage.Set('test_set_6', 'test', '1'), 'Setting with third param as num string'); //12
		ok(App.proto.storage.localStorage.Set('test_set_7', 'test', 'test'), 'Setting with third param as non-num string'); //13
		ok(App.proto.storage.localStorage.Set('test_set_8', 'test', {}), 'Setting with third param as object'); //14
		ok(App.proto.storage.localStorage.Set('test_set_9', 'test', function() {return;}), 'Setting third param value as function'); //15

		App.proto.storage.localStorage.Delete('test_set_1');
		App.proto.storage.localStorage.Delete('test_set_2');
		App.proto.storage.localStorage.Delete('test_set_3');
		App.proto.storage.localStorage.Delete('test_set_4');
		App.proto.storage.localStorage.Delete('test_set_6');
		App.proto.storage.localStorage.Delete('test_set_7');
		App.proto.storage.localStorage.Delete('test_set_8');
		App.proto.storage.localStorage.Delete('test_set_9');
	});
	/*
	test('Storage.cookies(proto) get testing', function() {	
		expect(9); 

		equal(App.proto.storage.localStorage.Get('test1'), 'test', "Get 'test1'"); //1
		equal(App.proto.storage.cookiesStorage.Get('test2'), 'test', "Get 'test1'"); //2
		ok (!App.proto.storage.cookiesStorage.Get('test3'), "Get 'test3' (was empty)"); //3
		ok (!App.proto.storage.cookiesStorage.Get('test10'), "Get 'test10' (not existed)"); //4
		ok (App.proto.storage.cookiesStorage.Get('test4'), "Get 'test4' (some object)"); //5
		ok (!App.proto.storage.cookiesStorage.Get(), "Get without key"); //6
		ok (!App.proto.storage.cookiesStorage.Get(1), "Get with key as int"); //7
		ok (!App.proto.storage.cookiesStorage.Get({}), "Get with key as object"); //8
		ok (!App.proto.storage.cookiesStorage.Get(function() {return;}), "Get with key as function"); //9

		App.proto.storage.cookiesStorage.Delete('test_delete_1')

	});

	test('Storage.cookies(proto) delete testing', function() {	
		expect(10); 

		App.proto.storage.cookiesStorage.Set('test_delete_1', 'test', 0);
		App.proto.storage.cookiesStorage.Set('test_delete_2', 'test', 1);
		App.proto.storage.cookiesStorage.Set('test_delete_3', 'test');
		App.proto.storage.cookiesStorage.Set('test_delete_4', 1);
		App.proto.storage.cookiesStorage.Set('test_delete_5', null);

		ok (App.proto.storage.cookiesStorage.Delete('test_delete_1'), "Deleting 'test1' (was set with 'test_delete_1', 'test', 0)"); //1
		ok (App.proto.storage.cookiesStorage.Delete('test_delete_2'), "Deleting 'test2' (was set with 'test_delete_2', 'test', 1)"); //2
		ok (App.proto.storage.cookiesStorage.Delete('test_delete_3'), "Deleting 'test3' (was set with 'test_delete_3', 'test')"); //3
		ok (App.proto.storage.cookiesStorage.Delete('test_delete_4'), "Deleting 'test4' (was set with 'test_delete_4', 1)"); //4
		ok (!App.proto.storage.cookiesStorage.Delete('test_delete_5'), "Deleting 'test5' (was set with 'test_delete_5', null)"); //5
		ok (!App.proto.storage.cookiesStorage.Delete('test_delete_not_existed'), "Deleting 'test_delete_not_existed'"); //6
		ok (!App.proto.storage.cookiesStorage.Delete(), "Deleting without key"); //7
		ok (!App.proto.storage.cookiesStorage.Delete(1), "Deleting  with key as int"); //8
		ok (!App.proto.storage.cookiesStorage.Delete({}), "Deleting with key as object"); //9
		ok (!App.proto.storage.cookiesStorage.Delete(function() {return;}), "Deleting with key as function"); //10
	});
*/
return;









	
	return;
	
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



