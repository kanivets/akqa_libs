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
	
	
	module('Model \'App.proto.models.header\' check');
	test('Model \'App.proto.models.header\' init check', function() {
		expect(5);		
		
		notDeepEqual(App.proto.models.header, {}, 'Checking \'App.proto.models.header\' is exists');		//1
		var modelHeader = new App.proto.models.header(); 
		notDeepEqual(modelHeader, {}, 'Checking \'modelTitle\' as instance of App.proto.models.header is properly created'); //2	
		notStrictEqual(modelHeader.get('lang_prefix'), undefined, 'Checking \'modelHeader.get(\'lang_prefix\')\' is defined'); //3
	});
	
});