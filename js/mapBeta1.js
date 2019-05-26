$(function () {
    //Section Map
    nokia.Settings.set("app_id", "xfWoSkntk0Ao3r8C6wZ6");
    nokia.Settings.set("app_code", "snDmPQuP-71myYTab77aIA");

    // Use staging environment (remove the line for production environment)
    nokia.Settings.set("serviceMode", "cit");

    // Get the DOM node to which we will append the map
    var mapContainer = document.getElementById("mapContainer");
    // Create a map inside the map container DOM node

    var map = new nokia.maps.map.Display(mapContainer, {
        // Initial center and zoom level of the map
        center: [25.841154, -104.176286],
        zoomLevel: 5.25,
        // We add the behavior component to allow panning / zooming of the map
        components: [new nokia.maps.map.component.Behavior(), new nokia.maps.map.component.ZoomBar(), new nokia.maps.map.component.TypeSelector(), new nokia.maps.map.component.ScaleBar()]
    });

    map.addListener("click", function (evt) {
        if ((evt.target.$href === undefined) == false) {
            window.location = evt.target.$href;
        } else if ((evt.target.$click === undefined) == false) {
            var onClickDo = new Function(evt.target.$click);
            onClickDo();
        }
    });

    //Section Map


    //Detect event enter
    $('#uID').keypress(function (e) {
        var code = null;

        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13)
            createMarkers($('#uID').val());

    });

    $.getScript(getLanguage(), function () {

        $("#uID").attr("PlaceHolder", data.txtUserId);
        //Create Container
        var noteContainer = new NoteContainer({
            id: "infoBubbleStandardMarkerUi",
            parent: document.getElementById("uiContainer"),
            title: data.titleImportant,
            content: data.lblContent
        });
    });

    var locations;
    function createMarkers(value) {
        $.ajax({
            url: "http://thewetzone.pixub.com/web_services/getLocation.php?uid=" + value,
            type: "GET",
            //dataType: "json",
            success: function (source) {
                var res = source.split("]"); ;
                locations = $.parseJSON(res[0] + "]");
                showInfo();
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    alert('Not connect.\n Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found. [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error.\n' + jqXHR.responseText);
                }
            }
        });
    }

    function showInfo() {
        $.getScript(getLanguage(), function () {
            map.objects.clear();

            var red = { color: "#FF0000" };

            var lat,
				lng,
				markerCoords;

            container = new nokia.maps.map.Container();

            for (var idx = 0; idx < locations.length; idx++) {
                var standardMarker;

                loc = locations[idx];

                lat = loc.latitude;
                lng = loc.longitude;


                markerCoords = new nokia.maps.geo.Coordinate(
										  parseFloat(lat, 10),
										  parseFloat(lng, 10)
									  );

                var messageTime = '$.Zebra_Dialog("' + data.lblDateTime + ' <br />' + loc.registrationDate + '");';

                if (idx == locations.length - 1) {
                    standardMarker = new nokia.maps.map.StandardMarker(markerCoords, { $click: messageTime });
                    standardMarker.set("brush", red);
                }
                else
                    standardMarker = new nokia.maps.map.StandardMarker(markerCoords, { $click: messageTime });

                container.objects.add(standardMarker);

            }
            map.objects.add(container);
        });
    }

});