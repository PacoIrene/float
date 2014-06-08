float
=====

A JavaScript toolkit for creating interactive time series graphs depends on d3.js


Offical website:http://frost.beclever.cn

simple usage:

var frost = new Frost.Graph({
	element: "#node",
	width: 300,
	height: 200,
	type: "bar",
	series: [
	{
		color: "steelblue",
		data: [
			{value: 10,name: "一月"},
			{value: 13,name: "二月"}, 
			{value: 10,name: "三月"},
			{value: 40,name: "四月"},
			{value: 13,name: "五月"},
		],
		name: "Country"
	}],
	hasDetail: true,
	hasContent: true
});
frost.render();
