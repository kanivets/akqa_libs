$(document).ready(function(){	
	_.templateSettings = {
		interpolate : /\{\[(.+?)\]\}/g,
		evaluate : /\{\{(.+?)\}\}/g 
	};
		
	App.router = {};
	App.views = {};
	App.models = {};
		
	App.langs = Languator;
	
	App.utils = {};
	
	App.utils.flow_core = function(x) {return;console.log(x);};
	App.utils.flow_ext = function(x) {return;console.log(x);};
	App.utils.log = function(x) {console.log(x);};
	App.utils.debug = function(x) {console.info(x);};
	
	App.utils.flow_ext('MainController: begin');

	_.extend(App, Backbone.Events);
	_.extend(App.langs, Backbone.Events);	
		
	App.router = new App.proto.routers.main();
	App.router.default_part = 'games';
	Backbone.history.start({pushState : true});
			
	App.views.title = new App.proto.views.title({el : "title", model: new App.proto.models.title()});	
	App.views.header = new App.proto.views.header({el : "header", model: new App.proto.models.header()});
	
	App.views.register = new App.proto.views.register({model : new App.proto.models.register({part_name: 'register'})});
	
	//$('#part_register').fadeIn(2000);
	
	
	
	/*
	App.views.parts = {};
	
	App.views.parts.first = new App.proto.views.part({model : new App.proto.models.part({part_name: 'first'})});
	App.views.parts.first = new App.proto.views.part({model : new App.proto.models.part({part_name: 'second'})});
	App.views.parts.first = new App.proto.views.part({model : new App.proto.models.part({part_name: 'third'})});
	
	countries = [
		{'code' : 'AF', 'name' : 'AFGHANISTAN', 'sum' : '83', 'percent' : '0.71'}, {'code' : 'DZ', 'name' : 'ALGERIA', 'sum' : '49', 'percent' : '0.42'}, {'code' : 'AS', 'name' : 'AMERICAN SAMOA', 'sum' : '41', 'percent' : '0.35'}, {'code' : 'AD', 'name' : 'ANDORRA', 'sum' : '65', 'percent' : '0.55'}, {'code' : 'AO', 'name' : 'ANGOLA', 'sum' : '93', 'percent' : '0.79'}, {'code' : 'AI', 'name' : 'ANGUILLA', 'sum' : '60', 'percent' : '0.51'}, {'code' : 'AQ', 'name' : 'ANTARCTICA', 'sum' : '64', 'percent' : '0.54'}, {'code' : 'AR', 'name' : 'ARGENTINA', 'sum' : '59', 'percent' : '0.5'}, {'code' : 'AW', 'name' : 'ARUBA', 'sum' : '64', 'percent' : '0.54'}, {'code' : 'AU', 'name' : 'AUSTRALIA', 'sum' : '62', 'percent' : '0.53'}, {'code' : 'AT', 'name' : 'AUSTRIA', 'sum' : '25', 'percent' : '0.21'}, {'code' : 'AZ', 'name' : 'AZERBAIJAN', 'sum' : '28', 'percent' : '0.24'}, {'code' : 'BS', 'name' : 'BAHAMAS', 'sum' : '25', 'percent' : '0.21'}, {'code' : 'BD', 'name' : 'BANGLADESH', 'sum' : '52', 'percent' : '0.44'}, {'code' : 'BB', 'name' : 'BARBADOS', 'sum' : '80', 'percent' : '0.68'}, {'code' : 'BY', 'name' : 'BELARUS', 'sum' : '82', 'percent' : '0.7'}, {'code' : 'BE', 'name' : 'BELGIUM', 'sum' : '34', 'percent' : '0.29'}, {'code' : 'BZ', 'name' : 'BELIZE', 'sum' : '48', 'percent' : '0.41'}, {'code' : 'BJ', 'name' : 'BENIN', 'sum' : '89', 'percent' : '0.76'}, {'code' : 'BT', 'name' : 'BHUTAN', 'sum' : '97', 'percent' : '0.82'}, {'code' : 'BO', 'name' : 'BOLIVIA', 'sum' : '73', 'percent' : '0.62'}, {'code' : 'BA', 'name' : 'BOSNIA AND HERZEGOVINA', 'sum' : '28', 'percent' : '0.24'}, {'code' : 'BW', 'name' : 'BOTSWANA', 'sum' : '72', 'percent' : '0.61'}, {'code' : 'BV', 'name' : 'BOUVET ISLAND', 'sum' : '55', 'percent' : '0.47'}, {'code' : 'BR', 'name' : 'BRAZIL', 'sum' : '36', 'percent' : '0.31'}, {'code' : 'BF', 'name' : 'BURKINA FASO', 'sum' : '97', 'percent' : '0.82'}, {'code' : 'BI', 'name' : 'BURUNDI', 'sum' : '32', 'percent' : '0.27'}, {'code' : 'CM', 'name' : 'CAMEROON', 'sum' : '100', 'percent' : '0.85'}, {'code' : 'CA', 'name' : 'CANADA', 'sum' : '64', 'percent' : '0.54'}, {'code' : 'CV', 'name' : 'CAPE VERDE', 'sum' : '91', 'percent' : '0.77'}, {'code' : 'CF', 'name' : 'CENTRAL AFRICAN REPUBLIC', 'sum' : '30', 'percent' : '0.25'}, {'code' : 'TD', 'name' : 'CHAD', 'sum' : '98', 'percent' : '0.83'}, {'code' : 'CL', 'name' : 'CHILE', 'sum' : '66', 'percent' : '0.56'}, {'code' : 'CN', 'name' : 'CHINA', 'sum' : '64', 'percent' : '0.54'}, {'code' : 'CX', 'name' : 'CHRISTMAS ISLAND', 'sum' : '44', 'percent' : '0.37'}, {'code' : 'CO', 'name' : 'COLOMBIA', 'sum' : '81', 'percent' : '0.69'}, {'code' : 'KM', 'name' : 'COMOROS', 'sum' : '55', 'percent' : '0.47'}, {'code' : 'CG', 'name' : 'CONGO', 'sum' : '39', 'percent' : '0.33'}, {'code' : 'CD', 'name' : 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', 'sum' : '50', 'percent' : '0.42'}, {'code' : 'CI', 'name' : 'COTE D IVOIRE', 'sum' : '63', 'percent' : '0.54'}, {'code' : 'HR', 'name' : 'CROATIA', 'sum' : '38', 'percent' : '0.32'}, {'code' : 'CU', 'name' : 'CUBA', 'sum' : '64', 'percent' : '0.54'}, {'code' : 'CY', 'name' : 'CYPRUS', 'sum' : '34', 'percent' : '0.29'}, {'code' : 'DK', 'name' : 'DENMARK', 'sum' : '30', 'percent' : '0.25'}, {'code' : 'DJ', 'name' : 'DJIBOUTI', 'sum' : '26', 'percent' : '0.22'}, {'code' : 'DM', 'name' : 'DOMINICA', 'sum' : '40', 'percent' : '0.34'}, {'code' : 'DO', 'name' : 'DOMINICAN REPUBLIC', 'sum' : '30', 'percent' : '0.25'}, {'code' : 'TP', 'name' : 'EAST TIMOR', 'sum' : '35', 'percent' : '0.3'}, {'code' : 'FK', 'name' : 'FALKLAND ISLANDS (MALVINAS)', 'sum' : '73', 'percent' : '0.62'}, {'code' : 'FJ', 'name' : 'FIJI', 'sum' : '93', 'percent' : '0.79'}, {'code' : 'FI', 'name' : 'FINLAND', 'sum' : '38', 'percent' : '0.32'}, {'code' : 'FR', 'name' : 'FRANCE', 'sum' : '73', 'percent' : '0.62'}, {'code' : 'GA', 'name' : 'GABON', 'sum' : '24', 'percent' : '0.2'}, {'code' : 'DE', 'name' : 'GERMANY', 'sum' : '45', 'percent' : '0.38'}, {'code' : 'GH', 'name' : 'GHANA', 'sum' : '86', 'percent' : '0.73'}, {'code' : 'GR', 'name' : 'GREECE', 'sum' : '89', 'percent' : '0.76'}, {'code' : 'GL', 'name' : 'GREENLAND', 'sum' : '79', 'percent' : '0.67'}, {'code' : 'GD', 'name' : 'GRENADA', 'sum' : '66', 'percent' : '0.56'}, {'code' : 'GP', 'name' : 'GUADELOUPE', 'sum' : '26', 'percent' : '0.22'}, {'code' : 'GU', 'name' : 'GUAM', 'sum' : '86', 'percent' : '0.73'}, {'code' : 'GN', 'name' : 'GUINEA', 'sum' : '25', 'percent' : '0.21'}, {'code' : 'GY', 'name' : 'GUYANA', 'sum' : '47', 'percent' : '0.4'}, {'code' : 'HT', 'name' : 'HAITI', 'sum' : '94', 'percent' : '0.8'}, {'code' : 'HM', 'name' : 'HEARD ISLAND AND MCDONALD ISLANDS', 'sum' : '73', 'percent' : '0.62'}, {'code' : 'VA', 'name' : 'HOLY SEE (VATICAN CITY STATE)', 'sum' : '100', 'percent' : '0.85'}, {'code' : 'HN', 'name' : 'HONDURAS', 'sum' : '58', 'percent' : '0.49'}, {'code' : 'HU', 'name' : 'HUNGARY', 'sum' : '68', 'percent' : '0.58'}, {'code' : 'IS', 'name' : 'ICELAND', 'sum' : '60', 'percent' : '0.51'}, {'code' : 'IN', 'name' : 'INDIA', 'sum' : '52', 'percent' : '0.44'}, {'code' : 'ID', 'name' : 'INDONESIA', 'sum' : '32', 'percent' : '0.27'}, {'code' : 'IL', 'name' : 'ISRAEL', 'sum' : '34', 'percent' : '0.29'}, {'code' : 'IT', 'name' : 'ITALY', 'sum' : '87', 'percent' : '0.74'}, {'code' : 'JM', 'name' : 'JAMAICA', 'sum' : '38', 'percent' : '0.32'}, {'code' : 'JP', 'name' : 'JAPAN', 'sum' : '77', 'percent' : '0.65'}, {'code' : 'JO', 'name' : 'JORDAN', 'sum' : '71', 'percent' : '0.6'}, {'code' : 'KZ', 'name' : 'KAZAKSTAN', 'sum' : '80', 'percent' : '0.68'}, {'code' : 'KE', 'name' : 'KENYA', 'sum' : '49', 'percent' : '0.42'}, {'code' : 'KI', 'name' : 'KIRIBATI', 'sum' : '27', 'percent' : '0.23'}, {'code' : 'KP', 'name' : 'KOREA DEMOCRATIC PEOPLES REPUBLIC OF', 'sum' : '38', 'percent' : '0.32'}, {'code' : 'KR', 'name' : 'KOREA REPUBLIC OF', 'sum' : '59', 'percent' : '0.5'}, {'code' : 'KG', 'name' : 'KYRGYZSTAN', 'sum' : '99', 'percent' : '0.84'}, {'code' : 'LA', 'name' : 'LAO PEOPLES DEMOCRATIC REPUBLIC', 'sum' : '83', 'percent' : '0.71'}, {'code' : 'LV', 'name' : 'LATVIA', 'sum' : '31', 'percent' : '0.26'}, {'code' : 'LB', 'name' : 'LEBANON', 'sum' : '77', 'percent' : '0.65'}, {'code' : 'LS', 'name' : 'LESOTHO', 'sum' : '75', 'percent' : '0.64'}, {'code' : 'LY', 'name' : 'LIBYAN ARAB JAMAHIRIYA', 'sum' : '58', 'percent' : '0.49'}, {'code' : 'LI', 'name' : 'LIECHTENSTEIN', 'sum' : '86', 'percent' : '0.73'}, {'code' : 'LT', 'name' : 'LITHUANIA', 'sum' : '92', 'percent' : '0.78'}, {'code' : 'LU', 'name' : 'LUXEMBOURG', 'sum' : '44', 'percent' : '0.37'}, {'code' : 'MO', 'name' : 'MACAU', 'sum' : '47', 'percent' : '0.4'}, {'code' : 'MK', 'name' : 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', 'sum' : '71', 'percent' : '0.6'}, {'code' : 'MG', 'name' : 'MADAGASCAR', 'sum' : '31', 'percent' : '0.26'}, {'code' : 'MY', 'name' : 'MALAYSIA', 'sum' : '59', 'percent' : '0.5'}, {'code' : 'ML', 'name' : 'MALI', 'sum' : '30', 'percent' : '0.25'}, {'code' : 'MT', 'name' : 'MALTA', 'sum' : '30', 'percent' : '0.25'}, {'code' : 'MR', 'name' : 'MAURITANIA', 'sum' : '71', 'percent' : '0.6'}, {'code' : 'YT', 'name' : 'MAYOTTE', 'sum' : '38', 'percent' : '0.32'}, {'code' : 'MX', 'name' : 'MEXICO', 'sum' : '55', 'percent' : '0.47'}, {'code' : 'FM', 'name' : 'MICRONESIA, FEDERATED STATES OF', 'sum' : '90', 'percent' : '0.76'}, {'code' : 'MC', 'name' : 'MONACO', 'sum' : '74', 'percent' : '0.63'}, {'code' : 'MN', 'name' : 'MONGOLIA', 'sum' : '65', 'percent' : '0.55'}, {'code' : 'MS', 'name' : 'MONTSERRAT', 'sum' : '70', 'percent' : '0.59'}, {'code' : 'MZ', 'name' : 'MOZAMBIQUE', 'sum' : '69', 'percent' : '0.59'}, {'code' : 'NA', 'name' : 'NAMIBIA', 'sum' : '46', 'percent' : '0.39'}, {'code' : 'NR', 'name' : 'NAURU', 'sum' : '74', 'percent' : '0.63'}, {'code' : 'NP', 'name' : 'NEPAL', 'sum' : '34', 'percent' : '0.29'}, {'code' : 'NC', 'name' : 'NEW CALEDONIA', 'sum' : '80', 'percent' : '0.68'}, {'code' : 'NZ', 'name' : 'NEW ZEALAND', 'sum' : '27', 'percent' : '0.23'}, {'code' : 'NI', 'name' : 'NICARAGUA', 'sum' : '46', 'percent' : '0.39'}, {'code' : 'NE', 'name' : 'NIGER', 'sum' : '73', 'percent' : '0.62'}, {'code' : 'NG', 'name' : 'NIGERIA', 'sum' : '83', 'percent' : '0.71'}, {'code' : 'NU', 'name' : 'NIUE', 'sum' : '59', 'percent' : '0.5'}, {'code' : 'NF', 'name' : 'NORFOLK ISLAND', 'sum' : '30', 'percent' : '0.25'}, {'code' : 'MP', 'name' : 'NORTHERN MARIANA ISLANDS', 'sum' : '43', 'percent' : '0.37'}, {'code' : 'NO', 'name' : 'NORWAY', 'sum' : '79', 'percent' : '0.67'}, {'code' : 'OM', 'name' : 'OMAN', 'sum' : '89', 'percent' : '0.76'}, {'code' : 'PK', 'name' : 'PAKISTAN', 'sum' : '38', 'percent' : '0.32'}, {'code' : 'PW', 'name' : 'PALAU', 'sum' : '46', 'percent' : '0.39'}, {'code' : 'PA', 'name' : 'PANAMA', 'sum' : '24', 'percent' : '0.2'}, {'code' : 'PG', 'name' : 'PAPUA NEW GUINEA', 'sum' : '91', 'percent' : '0.77'}, {'code' : 'PY', 'name' : 'PARAGUAY', 'sum' : '67', 'percent' : '0.57'}, {'code' : 'PE', 'name' : 'PERU', 'sum' : '89', 'percent' : '0.76'}, {'code' : 'PH', 'name' : 'PHILIPPINES', 'sum' : '26', 'percent' : '0.22'}, {'code' : 'PN', 'name' : 'PITCAIRN', 'sum' : '60', 'percent' : '0.51'}, {'code' : 'PL', 'name' : 'POLAND', 'sum' : '40', 'percent' : '0.34'}, {'code' : 'PT', 'name' : 'PORTUGAL', 'sum' : '47', 'percent' : '0.4'}, {'code' : 'QA', 'name' : 'QATAR', 'sum' : '68', 'percent' : '0.58'}, {'code' : 'RE', 'name' : 'REUNION', 'sum' : '50', 'percent' : '0.42'}, {'code' : 'RO', 'name' : 'ROMANIA', 'sum' : '86', 'percent' : '0.73'}, {'code' : 'RU', 'name' : 'RUSSIA', 'sum' : '87', 'percent' : '0.74'}, {'code' : 'RW', 'name' : 'RWANDA', 'sum' : '87', 'percent' : '0.74'}, {'code' : 'SH', 'name' : 'SAINT HELENA', 'sum' : '30', 'percent' : '0.25'}, {'code' : 'KN', 'name' : 'SAINT KITTS AND NEVIS', 'sum' : '53', 'percent' : '0.45'}, {'code' : 'LC', 'name' : 'SAINT LUCIA', 'sum' : '74', 'percent' : '0.63'}, {'code' : 'PM', 'name' : 'SAINT PIERRE AND MIQUELON', 'sum' : '38', 'percent' : '0.32'}, {'code' : 'VC', 'name' : 'SAINT VINCENT AND THE GRENADINES', 'sum' : '66', 'percent' : '0.56'}, {'code' : 'WS', 'name' : 'SAMOA', 'sum' : '45', 'percent' : '0.38'}, {'code' : 'SM', 'name' : 'SAN MARINO', 'sum' : '35', 'percent' : '0.3'}, {'code' : 'ST', 'name' : 'SAO TOME AND PRINCIPE', 'sum' : '95', 'percent' : '0.81'}, {'code' : 'SA', 'name' : 'SAUDI ARABIA', 'sum' : '92', 'percent' : '0.78'}, {'code' : 'SL', 'name' : 'SIERRA LEONE', 'sum' : '78', 'percent' : '0.66'}, {'code' : 'SG', 'name' : 'SINGAPORE', 'sum' : '92', 'percent' : '0.78'}, {'code' : 'SK', 'name' : 'SLOVAKIA', 'sum' : '40', 'percent' : '0.34'}, {'code' : 'SI', 'name' : 'SLOVENIA', 'sum' : '55', 'percent' : '0.47'}, {'code' : 'SB', 'name' : 'SOLOMON ISLANDS', 'sum' : '58', 'percent' : '0.49'}, {'code' : 'SO', 'name' : 'SOMALIA', 'sum' : '100', 'percent' : '0.85'}, {'code' : 'ZA', 'name' : 'SOUTH AFRICA', 'sum' : '88', 'percent' : '0.75'}, {'code' : 'GS', 'name' : 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', 'sum' : '83', 'percent' : '0.71'}, {'code' : 'ES', 'name' : 'SPAIN', 'sum' : '59', 'percent' : '0.5'}, {'code' : 'LK', 'name' : 'SRI LANKA', 'sum' : '100', 'percent' : '0.85'}, {'code' : 'SD', 'name' : 'SUDAN', 'sum' : '47', 'percent' : '0.4'}, {'code' : 'SR', 'name' : 'SURINAME', 'sum' : '53', 'percent' : '0.45'}, {'code' : 'SJ', 'name' : 'SVALBARD AND JAN MAYEN', 'sum' : '52', 'percent' : '0.44'}, {'code' : 'SZ', 'name' : 'SWAZILAND', 'sum' : '28', 'percent' : '0.24'}, {'code' : 'SE', 'name' : 'SWEDEN', 'sum' : '67', 'percent' : '0.57'}, {'code' : 'CH', 'name' : 'SWITZERLAND', 'sum' : '73', 'percent' : '0.62'}, {'code' : 'SY', 'name' : 'SYRIAN ARAB REPUBLIC', 'sum' : '59', 'percent' : '0.5'}, {'code' : 'TW', 'name' : 'TAIWAN, PROVINCE OF CHINA', 'sum' : '67', 'percent' : '0.57'}, {'code' : 'TJ', 'name' : 'TAJIKISTAN', 'sum' : '41', 'percent' : '0.35'}, {'code' : 'TH', 'name' : 'THAILAND', 'sum' : '51', 'percent' : '0.43'}, {'code' : 'TG', 'name' : 'TOGO', 'sum' : '53', 'percent' : '0.45'}, {'code' : 'TO', 'name' : 'TONGA', 'sum' : '52', 'percent' : '0.44'}, {'code' : 'TT', 'name' : 'TRINIDAD AND TOBAGO', 'sum' : '51', 'percent' : '0.43'}, {'code' : 'TN', 'name' : 'TUNISIA', 'sum' : '68', 'percent' : '0.58'}, {'code' : 'TR', 'name' : 'TURKEY', 'sum' : '98', 'percent' : '0.83'}, {'code' : 'TM', 'name' : 'TURKMENISTAN', 'sum' : '80', 'percent' : '0.68'}, {'code' : 'TC', 'name' : 'TURKS AND CAICOS ISLANDS', 'sum' : '30', 'percent' : '0.25'}, {'code' : 'TV', 'name' : 'TUVALU', 'sum' : '48', 'percent' : '0.41'}, {'code' : 'UA', 'name' : 'UKRAINE', 'sum' : '96', 'percent' : '0.82'}, {'code' : 'GB', 'name' : 'UNITED KINGDOM', 'sum' : '78', 'percent' : '0.66'}, {'code' : 'US', 'name' : 'UNITED STATES', 'sum' : '90', 'percent' : '0.76'}, {'code' : 'UM', 'name' : 'UNITED STATES MINOR OUTLYING ISLANDS', 'sum' : '59', 'percent' : '0.5'}, {'code' : 'UY', 'name' : 'URUGUAY', 'sum' : '66', 'percent' : '0.56'}, {'code' : 'UZ', 'name' : 'UZBEKISTAN', 'sum' : '91', 'percent' : '0.77'}, {'code' : 'VU', 'name' : 'VANUATU', 'sum' : '48', 'percent' : '0.41'}, {'code' : 'VE', 'name' : 'VENEZUELA', 'sum' : '80', 'percent' : '0.68'}, {'code' : 'VG', 'name' : 'VIRGIN ISLANDS, BRITISH', 'sum' : '71', 'percent' : '0.6'}, {'code' : 'VI', 'name' : 'VIRGIN ISLANDS, U.S.', 'sum' : '94', 'percent' : '0.8'}, {'code' : 'EH', 'name' : 'WESTERN SAHARA', 'sum' : '31', 'percent' : '0.26'}, {'code' : 'YE', 'name' : 'YEMEN', 'sum' : '53', 'percent' : '0.45'}, {'code' : 'YU', 'name' : 'YUGOSLAVIA', 'sum' : '74', 'percent' : '0.63'}, {'code' : 'ZM', 'name' : 'ZAMBIA', 'sum' : '79', 'percent' : '0.67'}, {'code' : 'ZW', 'name' : 'ZIMBABWE', 'sum' : '36', 'percent' : '0.31'}
	];
	
	aCountriesColored = {};
	nMaxPercent = _.max(countries, function(c) {return c.percent;})['percent'];
	
	for (var i in countries) {
		var p = 0xFF - parseInt((parseFloat(countries[i].percent) / nMaxPercent) * 0xA0);
		aCountriesColored[countries[i].code.toLowerCase()] = '#00' + p.toString(16) + '00';
	}
	
	
	
	var x = WorldMap({
		id: "worldmap",
		bgcolor: "#FFFFFF",
		fgcolor: "#FFFFFF",
		bordercolor: "#AAAAAA",
		borderwidth: 0.5,
		padding: 10,
		zoom: "",
		detail: aCountriesColored
	 });
	 
	/*
	App.views.parts.add(new App.proto.models.part({el: $('div#first_part'), part_type: 'first'}), {silent: true});
	App.views.parts.add(new App.proto.models.part({el: $('div#second_part'), part_type: 'second'}), {silent: true});
	App.views.parts.add(new App.proto.models.part({el: $('div#third_part'), part_type: 'third'}), {silent: true});
*/
	//App.router.on('all', function() {console.log('App -> router:all'); App.trigger('page_changed');});

/*
	App.views.parts = new Backbone.Collection; 
		
	App.views.parts.add(new PartView({el : $('#first_part'), cid: 'first_part'}), {silent: true} );
	App.views.parts.add(new PartView({el : $('#second_part'), cid: 'second_part'}), {silent: true} );
	App.views.parts.add(new PartView({el : $('#third_part'), cid: 'third_part'}), {silent: true} );
			
	App.langs.SetCurrentLanguage('ru');
*/

	App.trigger('page_loaded');
	App.utils.flow_ext('MainController: end');
});
