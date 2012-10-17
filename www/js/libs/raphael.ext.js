Raphael.fn.pieChart = function (cx, cy, r, aData, totalVal, attr) {
	aData = aData || [];
	attr = attr || {};

	var paper = this,
		rad = Math.PI / 180,
		chart = []; 

	function sector(cx, cy, r, startAngle, endAngle, params) {
		var x1 = cx + r * Math.cos(-startAngle * rad),
			x2 = cx + r * Math.cos(-endAngle * rad),
			y1 = cy + r * Math.sin(-startAngle * rad),
			y2 = cy + r * Math.sin(-endAngle * rad);
		return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
	}

	var angle = 0,
		total = 0,
		start = 0,
		delta = 30,
	
		process = function (data) {
			var nPerc = data.val / total;
			var angleplus = 360 * nPerc;
			var popangle = angle + (angleplus / 2);
				
			var p = sector(cx, cy, r, angle, angle + angleplus, {
				fill: data.color, 
				stroke : '#fff', 
				'stroke-width': 2
			});
			angle += angleplus;
			if (data.id) {
				p.custom_id = data.id;
			}
			return p;
	}

	total = totalVal || 1;

	for (i in aData) {
		chart.push(process(aData[i] || {val : 0, color: '#fff'}));
	}

	return chart;
};