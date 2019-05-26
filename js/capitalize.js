String.prototype.trim = function () {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

String.prototype.capitalizeParagraph = function() {
	var res = "";
	var paragraphs = this.split(".");
	for(var i = 0; i < paragraphs.length ; i++) {
		var temp = paragraphs[i].trim();
		res += "." + temp.charAt(0).toUpperCase() + temp.slice(1).toLowerCase();
	}
	return res.slice(1);
};	