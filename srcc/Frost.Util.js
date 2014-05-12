Frost.namespace("Frost.Util");
var Util = {};

Util.getNameDomain = function(series) {
	var list = [];
	for(var i = 0; i != series.length; i++) {
		var data = series[i].data;
		for(var j = 0; j != data.length; j++) {
			if(list.indexOf(data[j].name) < 0) {
				list.push(data[j].name);
			}
		}
	}
	return list;
};

Util.getMaxValue = function(series) {
	var max = d3.max(series[0].data, function(d) { return Number(d.value); })
	for(var i = 0; i != series.length; i++) {
		var tempMax = d3.max(series[i].data, function(d) { return Number(d.value); });
		if(tempMax >= max) {
			max = tempMax;
		}
	}
	return max;
};
Util.getSeriesName = function(series) {
	var list = [];
	for(var i = 0; i != series.length; i++) {
		list.push(series[i].name);
	}
	return list;
};

Util.getColorList = function(series) {
	if(series[0].color) {
		var list = [];
		for(var i = 0; i != series.length; i++) {
			list.push(series[i].color);
		}
		return list;
	} else {
		return Frost.ColorConst(series.length);
	}
};

Util.formatDataForGroupBar = function(series) {
	var getValue = function(name, data) {
		var result = 0;
		for(var k = 0; k != data.length; k++) {
			if(data[k].name == name) {
				result = data[k].value;
				return result;
			}
		}
		return result;
	};
	var objList = [];
	var seriesName = this.getNameDomain(series);
	for(var i = 0; i != seriesName.length; i++) {
		var obj = {};
		obj["name"] = seriesName[i];
		obj["data"] = [];
		for(var j = 0; j != series.length; j++) {
			var tempObj = {};
			tempObj["name"] = series[j].name;
			tempObj["value"] = getValue(obj["name"], series[j].data)
			obj["data"].push(tempObj);
		}
		objList.push(obj);
	}
	return objList
};

Frost.Util = Util;