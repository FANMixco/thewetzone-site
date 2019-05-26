$(function () {
	$.getScript( getLanguage() , function () {
		
		for (var i=0; i<44; i++)
		{
			var slideR=i+1;
			$("#slide"+slideR).attr("data-caption",data['slide'+slideR]);
		}
		
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://fotorama.s3.amazonaws.com/4.4.9/fotorama.js";
		$("head").append(s);
	});
});
