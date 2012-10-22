var App = App || {};
App.proto = App.proto || {};
App.proto.storage = App.proto.storage || {};



(function($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	var config = $.cookie = function(key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if ( typeof options.expires === 'number' && options.expires) {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, parts; ( parts = cookies[i] && cookies[i].split('=')); i++) {
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}

		return null;
	};

	config.defaults = {};

	$.removeCookie = function(key, options) {
		if ($.cookie(key) !== null) {
			options.expire = -1;
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

})(jQuery, document);


App.proto.storage.localStorage = {
	Get : function (key) {
		if (typeof key !== 'string') {
			return false;
		}

		App.utils.flow_core('App.proto.storage.localStorage.Get(' + key + ')');
		var data = localStorage.getItem(key);

		return data ? JSON.parse(data) : null;	
	},
	
	Set : function (key, value) {
		if (typeof key !== 'string' || value == undefined) {
			return false;
		}

		App.utils.flow_core('App.proto.storage.localStorage.Set(' + key + ', ' + value + ')');
		try	{
			localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			//if (e == QUOTA_EXCEEDED_ERR) 
			//	App.utils.log('App.proto.storage.localStorage.Set: QUOTA_EXCEEDED_ERR');
			
			App.utils.error('App.proto.storage.localStorage.Set raised error');
			App.utils.error(e);
 	 	 	return false;//to do: throw event	 	 	 	 	
		}
		return true;	
	},
	
	Delete : function (key) {
		if (typeof key !== 'string') {
			return false;
		}

		App.utils.flow_core('App.proto.storage.localStorage.Delete(' + key + ')');
		try {
			localStorage.removeItem(key);
		} catch (e) {			
			App.utils.log(e);
			return false;
		}	
		
		return true;
	}		
};


App.proto.storage.cookiesStorage = {	
	Get : function (key) {
		if (typeof key !== 'string') {
			return false;
		}
		App.utils.flow_core('App.proto.storage.cookiesStorage.Get(' + key + ')');
		return $.cookie(key);	
	},
	
	Set : function (key, value, expireDays) {
		if ((typeof key !== 'string') || value == undefined) {
			return false;
		}

		if ((expireDays == undefined)) {
			expireDays = 365*10;
		} else {
			expireDays = parseInt(expireDays);	
		}

		App.utils.flow_core('App.proto.storage.cookiesStorage.Set(' + key + ', ' + value + ')');
		return $.cookie(key, value, {expires: expireDays, path: '/'});	
	},
	
	Delete : function (key) {
		if (typeof key !== 'string') {
			return false;
		}
		App.utils.flow_core('App.proto.storage.cookiesStorage.Delete(' + key + ')');
		return $.removeCookie(key, {expires: -1});	
	}	
};
