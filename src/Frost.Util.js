
var Util = {};

Util.getNameDomain = function(data) {
	var list = [];
	for(var i = 0; i != data.length; i++) {
		list.push(data[i].name);
	}
	return list;
};

Util.getMaxValue = function(series) {
	var max = d3.max(series[0].data, function(d) { return Number(d.value); })
	for(var i = 0; i != series.length; i++) {
		list.push(data[i].name);
	}
	return list;
};
