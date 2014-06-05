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
		'#387aa3',
		'#57306f',
		'#514c76',
		'#646583',
		'#738394',
		'#6b9c7d',
		'#84b665',
		'#a7ca50',
		'#bfe746',
		'#e2f528',
		'#fff726',
		'#ecdd00',
		'#d4b11d',
		'#de8800',
		'#de4800',
		'#c91515',
		'#9a0000',
		'#7b0429',
		'#580839',
		'#31082b'
	];
	var returnColor = [];
	for(var i = 0; i != n; i++) {
		returnColor.push(constColor[i%constColor.length]);
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