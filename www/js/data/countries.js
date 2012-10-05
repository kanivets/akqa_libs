var App = App || {};
App.data = App.data || {};

App.data.countries = {
	'AF' : {'name' : 'AFGHANISTAN', 'sum' : '65', 'percent' : '0.54'},
'AL' : {'name' : 'ALBANIA', 'sum' : '86', 'percent' : '0.71'},
'DZ' : {'name' : 'ALGERIA', 'sum' : '96', 'percent' : '0.4'},
'AS' : {'name' : 'AMERICAN SAMOA', 'sum' : '97', 'percent' : '0.8'},
'AD' : {'name' : 'ANDORRA', 'sum' : '90', 'percent' : '0.75'},
'AO' : {'name' : 'ANGOLA', 'sum' : '26', 'percent' : '0.22'},
'AI' : {'name' : 'ANGUILLA', 'sum' : '99', 'percent' : '0.82'},
'AQ' : {'name' : 'ANTARCTICA', 'sum' : '50', 'percent' : '0.41'},
'AG' : {'name' : 'ANTIGUA AND BARBUDA', 'sum' : '95', 'percent' : '0.79'},
'AR' : {'name' : 'ARGENTINA', 'sum' : '31', 'percent' : '0.26'},
'AM' : {'name' : 'ARMENIA', 'sum' : '48', 'percent' : '0.4'},
'AW' : {'name' : 'ARUBA', 'sum' : '91', 'percent' : '0.75'},
'AU' : {'name' : 'AUSTRALIA', 'sum' : '86', 'percent' : '0.71'},
'AT' : {'name' : 'AUSTRIA', 'sum' : '86', 'percent' : '0.71'},
'AZ' : {'name' : 'AZERBAIJAN', 'sum' : '41', 'percent' : '0.34'},
'BS' : {'name' : 'BAHAMAS', 'sum' : '80', 'percent' : '0.66'},
'BH' : {'name' : 'BAHRAIN', 'sum' : '80', 'percent' : '0.66'},
'BB' : {'name' : 'BARBADOS', 'sum' : '24', 'percent' : '0.2'},
'BY' : {'name' : 'BELARUS', 'sum' : '25', 'percent' : '0.21'},
'BE' : {'name' : 'BELGIUM', 'sum' : '54', 'percent' : '0.45'},
'BZ' : {'name' : 'BELIZE', 'sum' : '28', 'percent' : '0.23'},
'BJ' : {'name' : 'BENIN', 'sum' : '96', 'percent' : '0.8'},
'BM' : {'name' : 'BERMUDA', 'sum' : '87', 'percent' : '0.72'},
'BT' : {'name' : 'BHUTAN', 'sum' : '96', 'percent' : '0.8'},
'BO' : {'name' : 'BOLIVIA', 'sum' : '36', 'percent' : '0.3'},
'BA' : {'name' : 'BOSNIA AND HERZEGOVINA', 'sum' : '100', 'percent' : '0.83'},
'BW' : {'name' : 'BOTSWANA', 'sum' : '74', 'percent' : '0.61'},
'BV' : {'name' : 'BOUVET ISLAND', 'sum' : '25', 'percent' : '0.21'},
'BR' : {'name' : 'BRAZIL', 'sum' : '30', 'percent' : '0.65'},
'IO' : {'name' : 'BRITISH INDIAN OCEAN TERRITORY', 'sum' : '36', 'percent' : '0.3'},
'BN' : {'name' : 'BRUNEI DARUSSALAM', 'sum' : '46', 'percent' : '0.38'},
'BF' : {'name' : 'BURKINA FASO', 'sum' : '45', 'percent' : '0.37'},
'BI' : {'name' : 'BURUNDI', 'sum' : '50', 'percent' : '0.41'},
'CM' : {'name' : 'CAMEROON', 'sum' : '90', 'percent' : '0.75'},
'CA' : {'name' : 'CANADA', 'sum' : '65', 'percent' : '0.54'},
'CV' : {'name' : 'CAPE VERDE', 'sum' : '38', 'percent' : '0.31'},
'KY' : {'name' : 'CAYMAN ISLANDS', 'sum' : '32', 'percent' : '0.27'},
'TD' : {'name' : 'CHAD', 'sum' : '25', 'percent' : '0.21'},
'CL' : {'name' : 'CHILE', 'sum' : '49', 'percent' : '0.41'},
'CN' : {'name' : 'CHINA', 'sum' : '49', 'percent' : '0.51'},
'CO' : {'name' : 'COLOMBIA', 'sum' : '78', 'percent' : '0.65'},
'CG' : {'name' : 'CONGO', 'sum' : '75', 'percent' : '0.62'},
'CD' : {'name' : 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', 'sum' : '51', 'percent' : '0.42'},
'CK' : {'name' : 'COOK ISLANDS', 'sum' : '72', 'percent' : '0.6'},
'CR' : {'name' : 'COSTA RICA', 'sum' : '59', 'percent' : '0.49'},
'CI' : {'name' : 'COTE D IVOIRE', 'sum' : '98', 'percent' : '0.81'},
'HR' : {'name' : 'CROATIA', 'sum' : '36', 'percent' : '0.3'},
'CU' : {'name' : 'CUBA', 'sum' : '28', 'percent' : '0.23'},
'CY' : {'name' : 'CYPRUS', 'sum' : '88', 'percent' : '0.73'},
'CZ' : {'name' : 'CZECH REPUBLIC', 'sum' : '63', 'percent' : '0.52'},
'DK' : {'name' : 'DENMARK', 'sum' : '99', 'percent' : '0.82'},
'DJ' : {'name' : 'DJIBOUTI', 'sum' : '95', 'percent' : '0.79'},
'DO' : {'name' : 'DOMINICAN REPUBLIC', 'sum' : '91', 'percent' : '0.75'},
'EC' : {'name' : 'ECUADOR', 'sum' : '66', 'percent' : '0.55'},
'SV' : {'name' : 'EL SALVADOR', 'sum' : '55', 'percent' : '0.46'},
'GQ' : {'name' : 'EQUATORIAL GUINEA', 'sum' : '42', 'percent' : '0.35'},
'ER' : {'name' : 'ERITREA', 'sum' : '91', 'percent' : '0.75'},
'EE' : {'name' : 'ESTONIA', 'sum' : '65', 'percent' : '0.54'},
'ET' : {'name' : 'ETHIOPIA', 'sum' : '78', 'percent' : '0.65'},
'FK' : {'name' : 'FALKLAND ISLANDS (MALVINAS)', 'sum' : '42', 'percent' : '0.35'},
'FO' : {'name' : 'FAROE ISLANDS', 'sum' : '66', 'percent' : '0.55'},
'FJ' : {'name' : 'FIJI', 'sum' : '52', 'percent' : '0.43'},
'FI' : {'name' : 'FINLAND', 'sum' : '29', 'percent' : '0.24'},
'FR' : {'name' : 'FRANCE', 'sum' : '57', 'percent' : '0.47'},
'GF' : {'name' : 'FRENCH GUIANA', 'sum' : '37', 'percent' : '0.31'},
'PF' : {'name' : 'FRENCH POLYNESIA', 'sum' : '78', 'percent' : '0.65'},
'TF' : {'name' : 'FRENCH SOUTHERN TERRITORIES', 'sum' : '31', 'percent' : '0.26'},
'GA' : {'name' : 'GABON', 'sum' : '71', 'percent' : '0.59'},
'DE' : {'name' : 'GERMANY', 'sum' : '58', 'percent' : '0.48'},
'GR' : {'name' : 'GREECE', 'sum' : '30', 'percent' : '0.25'},
'GL' : {'name' : 'GREENLAND', 'sum' : '29', 'percent' : '0.24'},
'GD' : {'name' : 'GRENADA', 'sum' : '82', 'percent' : '0.68'},
'GP' : {'name' : 'GUADELOUPE', 'sum' : '50', 'percent' : '0.41'},
'GU' : {'name' : 'GUAM', 'sum' : '26', 'percent' : '0.22'},
'GN' : {'name' : 'GUINEA', 'sum' : '100', 'percent' : '0.83'},
'GW' : {'name' : 'GUINEA-BISSAU', 'sum' : '77', 'percent' : '0.64'},
'GY' : {'name' : 'GUYANA', 'sum' : '98', 'percent' : '0.81'},
'HT' : {'name' : 'HAITI', 'sum' : '44', 'percent' : '0.36'},
'HM' : {'name' : 'HEARD ISLAND AND MCDONALD ISLANDS', 'sum' : '53', 'percent' : '0.44'},
'VA' : {'name' : 'HOLY SEE (VATICAN CITY STATE)', 'sum' : '84', 'percent' : '0.7'},
'HK' : {'name' : 'HONG KONG', 'sum' : '82', 'percent' : '0.68'},
'HU' : {'name' : 'HUNGARY', 'sum' : '77', 'percent' : '0.64'},
'IN' : {'name' : 'INDIA', 'sum' : '55', 'percent' : '0.46'},
'ID' : {'name' : 'INDONESIA', 'sum' : '52', 'percent' : '0.43'},
'IR' : {'name' : 'IRAN, ISLAMIC REPUBLIC OF', 'sum' : '57', 'percent' : '0.47'},
'IQ' : {'name' : 'IRAQ', 'sum' : '81', 'percent' : '0.67'},
'IL' : {'name' : 'ISRAEL', 'sum' : '27', 'percent' : '0.22'},
'IT' : {'name' : 'ITALY', 'sum' : '26', 'percent' : '0.22'},
'JP' : {'name' : 'JAPAN', 'sum' : '77', 'percent' : '0.64'},
'JO' : {'name' : 'JORDAN', 'sum' : '28', 'percent' : '0.23'},
'KZ' : {'name' : 'KAZAKSTAN', 'sum' : '69', 'percent' : '0.57'},
'KP' : {'name' : 'KOREA DEMOCRATIC PEOPLES REPUBLIC OF', 'sum' : '28', 'percent' : '0.03'},
'KR' : {'name' : 'KOREA REPUBLIC OF', 'sum' : '28', 'percent' : '0.63'},
'KW' : {'name' : 'KUWAIT', 'sum' : '29', 'percent' : '0.24'},
'KG' : {'name' : 'KYRGYZSTAN', 'sum' : '39', 'percent' : '0.32'},
'LA' : {'name' : 'LAO PEOPLES DEMOCRATIC REPUBLIC', 'sum' : '48', 'percent' : '0.4'},
'LV' : {'name' : 'LATVIA', 'sum' : '65', 'percent' : '0.54'},
'LB' : {'name' : 'LEBANON', 'sum' : '58', 'percent' : '0.48'},
'LR' : {'name' : 'LIBERIA', 'sum' : '59', 'percent' : '0.49'},
'LY' : {'name' : 'LIBYAN ARAB JAMAHIRIYA', 'sum' : '37', 'percent' : '0.31'},
'LI' : {'name' : 'LIECHTENSTEIN', 'sum' : '46', 'percent' : '0.38'},
'LU' : {'name' : 'LUXEMBOURG', 'sum' : '85', 'percent' : '0.7'},
'MK' : {'name' : 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', 'sum' : '90', 'percent' : '0.75'},
'MG' : {'name' : 'MADAGASCAR', 'sum' : '39', 'percent' : '0.32'},
'MW' : {'name' : 'MALAWI', 'sum' : '96', 'percent' : '0.8'},
'MY' : {'name' : 'MALAYSIA', 'sum' : '49', 'percent' : '0.41'},
'MV' : {'name' : 'MALDIVES', 'sum' : '36', 'percent' : '0.3'},
'ML' : {'name' : 'MALI', 'sum' : '83', 'percent' : '0.69'},
'MQ' : {'name' : 'MARTINIQUE', 'sum' : '83', 'percent' : '0.69'},
'YT' : {'name' : 'MAYOTTE', 'sum' : '32', 'percent' : '0.27'},
'MX' : {'name' : 'MEXICO', 'sum' : '76', 'percent' : '0.63'},
'MS' : {'name' : 'MONTSERRAT', 'sum' : '71', 'percent' : '0.59'},
'MA' : {'name' : 'MOROCCO', 'sum' : '86', 'percent' : '0.71'},
'MZ' : {'name' : 'MOZAMBIQUE', 'sum' : '62', 'percent' : '0.51'},
'MM' : {'name' : 'MYANMAR', 'sum' : '40', 'percent' : '0.33'},
'NA' : {'name' : 'NAMIBIA', 'sum' : '86', 'percent' : '0.71'},
'NR' : {'name' : 'NAURU', 'sum' : '54', 'percent' : '0.45'},
'NP' : {'name' : 'NEPAL', 'sum' : '86', 'percent' : '0.71'},
'NL' : {'name' : 'NETHERLANDS', 'sum' : '54', 'percent' : '0.45'},
'NC' : {'name' : 'NEW CALEDONIA', 'sum' : '89', 'percent' : '0.74'},
'NE' : {'name' : 'NIGER', 'sum' : '72', 'percent' : '0.6'},
'NU' : {'name' : 'NIUE', 'sum' : '25', 'percent' : '0.21'},
'NF' : {'name' : 'NORFOLK ISLAND', 'sum' : '83', 'percent' : '0.69'},
'NO' : {'name' : 'NORWAY', 'sum' : '98', 'percent' : '0.81'},
'OM' : {'name' : 'OMAN', 'sum' : '59', 'percent' : '0.49'},
'PK' : {'name' : 'PAKISTAN', 'sum' : '40', 'percent' : '0.33'},
'PW' : {'name' : 'PALAU', 'sum' : '48', 'percent' : '0.4'},
'PS' : {'name' : 'PALESTINIAN TERRITORY, OCCUPIED', 'sum' : '65', 'percent' : '0.54'},
'PA' : {'name' : 'PANAMA', 'sum' : '98', 'percent' : '0.81'},
'PG' : {'name' : 'PAPUA NEW GUINEA', 'sum' : '73', 'percent' : '0.61'},
'PY' : {'name' : 'PARAGUAY', 'sum' : '36', 'percent' : '0.3'},
'PE' : {'name' : 'PERU', 'sum' : '87', 'percent' : '0.72'},
'PH' : {'name' : 'PHILIPPINES', 'sum' : '77', 'percent' : '0.64'},
'PN' : {'name' : 'PITCAIRN', 'sum' : '26', 'percent' : '0.22'},
'PL' : {'name' : 'POLAND', 'sum' : '89', 'percent' : '0.74'},
'PT' : {'name' : 'PORTUGAL', 'sum' : '85', 'percent' : '0.7'},
'PR' : {'name' : 'PUERTO RICO', 'sum' : '79', 'percent' : '0.65'},
'QA' : {'name' : 'QATAR', 'sum' : '100', 'percent' : '0.83'},
'RE' : {'name' : 'REUNION', 'sum' : '63', 'percent' : '0.52'},
'RO' : {'name' : 'ROMANIA', 'sum' : '31', 'percent' : '0.26'},
'RU' : {'name' : 'RUSSIAN FEDERATION', 'sum' : '40', 'percent' : '0.63'},
'RW' : {'name' : 'RWANDA', 'sum' : '37', 'percent' : '0.31'},
'SH' : {'name' : 'SAINT HELENA', 'sum' : '69', 'percent' : '0.57'},
'KN' : {'name' : 'SAINT KITTS AND NEVIS', 'sum' : '47', 'percent' : '0.39'},
'LC' : {'name' : 'SAINT LUCIA', 'sum' : '44', 'percent' : '0.36'},
'PM' : {'name' : 'SAINT PIERRE AND MIQUELON', 'sum' : '37', 'percent' : '0.31'},
'VC' : {'name' : 'SAINT VINCENT AND THE GRENADINES', 'sum' : '67', 'percent' : '0.56'},
'SM' : {'name' : 'SAN MARINO', 'sum' : '25', 'percent' : '0.21'},
'ST' : {'name' : 'SAO TOME AND PRINCIPE', 'sum' : '47', 'percent' : '0.39'},
'SA' : {'name' : 'SAUDI ARABIA', 'sum' : '65', 'percent' : '0.54'},
'SN' : {'name' : 'SENEGAL', 'sum' : '28', 'percent' : '0.23'},
'SC' : {'name' : 'SEYCHELLES', 'sum' : '68', 'percent' : '0.56'},
'SL' : {'name' : 'SIERRA LEONE', 'sum' : '63', 'percent' : '0.52'},
'SK' : {'name' : 'SLOVAKIA', 'sum' : '87', 'percent' : '0.72'},
'SB' : {'name' : 'SOLOMON ISLANDS', 'sum' : '31', 'percent' : '0.26'},
'SO' : {'name' : 'SOMALIA', 'sum' : '50', 'percent' : '0.41'},
'GS' : {'name' : 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', 'sum' : '24', 'percent' : '0.2'},
'ES' : {'name' : 'SPAIN', 'sum' : '50', 'percent' : '0.41'},
'SD' : {'name' : 'SUDAN', 'sum' : '47', 'percent' : '0.39'},
'SR' : {'name' : 'SURINAME', 'sum' : '58', 'percent' : '0.48'},
'SJ' : {'name' : 'SVALBARD AND JAN MAYEN', 'sum' : '65', 'percent' : '0.54'},
'SE' : {'name' : 'SWEDEN', 'sum' : '44', 'percent' : '0.36'},
'CH' : {'name' : 'SWITZERLAND', 'sum' : '91', 'percent' : '0.75'},
'SY' : {'name' : 'SYRIAN ARAB REPUBLIC', 'sum' : '73', 'percent' : '0.61'},
'TW' : {'name' : 'TAIWAN, PROVINCE OF CHINA', 'sum' : '93', 'percent' : '0.77'},
'TJ' : {'name' : 'TAJIKISTAN', 'sum' : '64', 'percent' : '0.53'},
'TZ' : {'name' : 'TANZANIA, UNITED REPUBLIC OF', 'sum' : '56', 'percent' : '0.46'},
'TG' : {'name' : 'TOGO', 'sum' : '91', 'percent' : '0.75'},
'TK' : {'name' : 'TOKELAU', 'sum' : '28', 'percent' : '0.23'},
'TO' : {'name' : 'TONGA', 'sum' : '39', 'percent' : '0.32'},
'TN' : {'name' : 'TUNISIA', 'sum' : '55', 'percent' : '0.46'},
'TM' : {'name' : 'TURKMENISTAN', 'sum' : '75', 'percent' : '0.62'},
'TC' : {'name' : 'TURKS AND CAICOS ISLANDS', 'sum' : '79', 'percent' : '0.65'},
'TV' : {'name' : 'TUVALU', 'sum' : '96', 'percent' : '0.8'},
'UG' : {'name' : 'UGANDA', 'sum' : '31', 'percent' : '0.26'},
'UA' : {'name' : 'UKRAINE', 'sum' : '47', 'percent' : '0.39'},
'AE' : {'name' : 'UNITED ARAB EMIRATES', 'sum' : '30', 'percent' : '0.25'},
'GB' : {'name' : 'UNITED KINGDOM', 'sum' : '71', 'percent' : '0.59'},
'US' : {'name' : 'UNITED STATES', 'sum' : '63', 'percent' : '0.82'},
'UM' : {'name' : 'UNITED STATES MINOR OUTLYING ISLANDS', 'sum' : '91', 'percent' : '0.75'},
'UZ' : {'name' : 'UZBEKISTAN', 'sum' : '91', 'percent' : '0.75'},
'VU' : {'name' : 'VANUATU', 'sum' : '27', 'percent' : '0.22'},
'VE' : {'name' : 'VENEZUELA', 'sum' : '89', 'percent' : '0.74'},
'VI' : {'name' : 'VIRGIN ISLANDS, U.S.', 'sum' : '96', 'percent' : '0.8'},
'WF' : {'name' : 'WALLIS AND FUTUNA', 'sum' : '77', 'percent' : '0.64'},
'EH' : {'name' : 'WESTERN SAHARA', 'sum' : '91', 'percent' : '0.75'},
'YE' : {'name' : 'YEMEN', 'sum' : '50', 'percent' : '0.41'},
'YU' : {'name' : 'YUGOSLAVIA', 'sum' : '91', 'percent' : '0.75'},
'ZM' : {'name' : 'ZAMBIA', 'sum' : '39', 'percent' : '0.32'},
'ZW' : {'name' : 'ZIMBABWE', 'sum' : '35', 'percent' : '0.29'}
};