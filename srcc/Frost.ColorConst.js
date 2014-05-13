Frost.namespace("Frost.ColorConst");

Frost.ColorConst = function(n) {
	var constColor = [
		'#ecb796',
		'#dc8f70',
		'#b2a470',
		'#92875a',
		'#716c49',
		'#d2ed82',
		'#bbe468',
		'#a1d05d',
		'#e7cbe6',
		'#d8aad6',
		'#a888c2',
		'#9dc2d3',
		'#649eb9',
		'#387aa3'
	];
	var returnColor = [];
	for(var i = 0; i != n; i++) {
		returnColor.push(constColor[i%n]);
	}
	return returnColor;
	// if(n >= constColor.length) {
	// 	return constColor;
	// } else {
	// 	var returnColor = [];
	// 	for(var i = 0; i != n; i++) {
	// 		var index = Math.floor(Math.random() * constColor.length);
	// 		returnColor.push(constColor.splice(index, 1)[0]);
	// 	}
	// 	return returnColor;
	// }
};