var mygallery = new simpleGallery({
	wrapperid: "simplegallery1", //ID of main gallery container,
	dimensions: [173, 286], //width/height of gallery in pixels. Should reflect dimensions of the images exactly
	imagearray: [
		["img/thumbs/home.jpg", "", "", ""],
		["img/thumbs/im-here.jpg", "", "", ""],
		["img/thumbs/map.jpg", "", "", ""],
		["img/thumbs/profile.jpg", "", "", ""],
		["img/thumbs/sos.jpg", "", "", ""],
		["img/thumbs/compass.jpg", "", "", ""],
		["img/thumbs/tips.jpg", "", "", ""],
		["img/thumbs/help.jpg", "", "", ""]
	],
	autoplay: [true, 2500, 50], //[auto_play_boolean, delay_btw_slide_millisec, cycles_before_stopping_int]
	persist: false,
	preloadfirst: true, //v1.4 option on whether slideshow should only start after all images have preloaded
	fadeduration: 500, //transition duration (milliseconds)
	oninit: function () { //event that fires when gallery has initialized/ ready to run
		//Keyword "this": references current gallery instance (ie: try this.navigate("play/pause")
	},
	onslide: function (curslide, i) { //event that fires after each slide is shown
		//Keyword "this": references current gallery instance
		//curslide: returns DOM reference to current slide's DIV (ie: try alert(curslide.innerHTML)
		//i: integer reflecting current image within collection being shown (0=1st image, 1=2nd etc)
	}
})

$(function () {
	$.getScript( getLanguage() , function () {

		$("#lblFullMap").append(data.lblFullMap+' <i class="fa fa-external-link"></i>');
		
		$("#menuHome").append('<i class="fa fa-home"></i> '+data.menuHome+'</i>');
		$("#menuDescription").append('<i class="fa fa-info-circle"></i> '+data.menuDescription+'<i>');
		$("#menuPath").append('<i class="fa fa-location-arrow"></i> '+data.menuPath+'</i>');
		$("#menuDownload").append('<i class="fa fa-download"></i> '+data.menuDownload+'</i>');
		$("#menuTutorial").append('<i class="fa fa-book"></i> '+data.menuTutorial+'</i>');
		$("#menuLogin").append('<i class="fa fa-sign-in"></i> '+data.menuLogin+'</i>');
		
		$("#titleDescription").append('<i class="fa fa-info-circle"></i> '+data.menuDescription.capitalizeParagraph()+'</i>');
		
		$("#titleMainDescription").append(data.titleMainDescription);
		$("#lblAnswer").append(data.lblAnswer);
		$("#lblData1").append(data.lblData1);
		$("#lblData2").append(data.lblData2);
		
		$("#titlePath").append('<i class="fa fa-location-arrow"></i> '+data.menuPath.capitalizeParagraph()+'</i>');
		$("#titleDownload").append('<i class="fa fa-download"></i> '+data.menuDownload.capitalizeParagraph()+'</i>');
		
		$("#lblFollow").append(data.lblFollow);

		$("#lblMore").append(data.lblMore);

	});
});
