var App = App || {};
App.graphics = App.graphics || {};
App.graphics.wrappers = App.graphics.wrappers || {};

App.graphics.wrappers.raphael = (function() {
	this._handler = null;
	this._aElements = {};
	this._nInternalID = 0;

	var that = this;
	return {
		PreparePaper : function (sContainerID, w, h) {
			that._handler = Raphael(document.getElementById(sContainerID), w, h); 
			that._handler.clear();
			return that;
		},

		DrawSingleLine : function (x0, y0, x1, y1, attr, name) {
			var el = that._handler.path("M" + x0 + "," + y0 + "L" + x1 + "," + y1);		
			if (attr) for (var i in attr) el.attr(i, attr[i]);
			that._aElements[name ? name : that._nInternalID++] = el;

			return that;
		},

		DrawMultiLine : function (aPoints, attr, name) {
			if (aPoints.length < 2) return that;

			var sPath = "M" + aPoints[0][0] + "," + aPoints[0][1] + "L" + aPoints[1][0] + "," + aPoints[1][1];

			for (var i = 2; i < aPoints.length; i++)
				sPath += "L" + aPoints[i][0] + "," + aPoints[i][1];

			var el = that._handler.path(sPath);		
			if (attr) for (var i in attr) el.attr(i, attr[i]);
			that._aElements[name ? name : that._nInternalID++] = el;

			return that;
		},

		DrawText : function (x, y, sText, attr, name) {			
			var el = that._handler.text(x, y, sText);		
			if (attr) for (var i in attr) el.attr(i, attr[i]);
			that._aElements[name ? name : that._nInternalID++] = el;

			return that;
		},

		DrawRect : function (x, y, w, h, attr, name) {			
			var el = that._handler.rect(x, y, w, h);		
			if (attr) for (var i in attr) el.attr(i, attr[i]);
			that._aElements[name ? name : that._nInternalID++] = el;

			return that;
		},

		DrawMap : function (sMinColor, sMaxColor, aCountries, aData, sStrokeColor) {

console.info('123');

			var minR = parseInt(sMinColor.substr(1, 2), 16);
			var minG = parseInt(sMinColor.substr(3, 2), 16);
			var minB = parseInt(sMinColor.substr(4, 2), 16);
			var maxR = parseInt(sMaxColor.substr(1, 2), 16);
			var maxG = parseInt(sMaxColor.substr(3, 2), 16);
			var maxB = parseInt(sMaxColor.substr(5, 2), 16);

			var dR = maxR - minR;
			var dG = maxG - minG;
			var dB = maxB - minB;

			var nMaxPercent = _.max(App.data.countries, function(el) {return el.percent;}).percent;

			if (!sStrokeColor) sStrokeColor = "#888";

			for (var i in aCountries) {
				var delta = 1 - ((aData[i] ? aData[i].percent : 0) / nMaxPercent);

				var sFill = '#' + 
						parseInt(delta * (dR) + minR).toString(16) +
						parseInt(delta * (dG) + minG).toString(16) +
						parseInt(delta * (dB) + minB).toString(16);


				that._handler.path(App.data.map[i]).attr({					
					stroke: sStrokeColor,
					fill : sFill,
					"stroke-width": .5,
					"stroke-linejoin": "round"
				});		
			}

			that._handler.setViewBox(0, 0, 1000, 250);
		}
	};
});
