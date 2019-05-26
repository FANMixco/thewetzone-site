$(function () {
	$.getScript( getLanguage() , function () {
		
		$("#menuHome").append('<i class="fa fa-home"></i> '+data.menuHome+'</i>');
		$("#menuDescription").append('<i class="fa fa-info-circle"></i> '+data.menuDescription+'<i>');
		$("#menuPath").append('<i class="fa fa-location-arrow"></i> '+data.menuPath+'</i>');
		$("#menuDownload").append('<i class="fa fa-download"></i> '+data.menuDownload+'</i>');
		$("#menuTutorial").append('<i class="fa fa-book"></i> '+data.menuTutorial+'</i>');
		$("#menuLogin").append('<i class="fa fa-sign-in"></i> '+data.menuLogin+'</i>');
						
		$("#lblFollow").append(data.lblFollow);

		$("#lblMore").append(data.lblMore);

	});
});
