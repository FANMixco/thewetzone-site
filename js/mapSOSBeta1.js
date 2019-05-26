$(function () {

    $( ".textbox" ).datepicker({ dateFormat: 'yy-mm-dd' });

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

    //Create Container
    var noteContainer = new NoteContainer({
        id: "infoBubbleStandardMarkerUi",
        parent: document.getElementById("uiContainer"),
        title: "IMPORTANTE",
        content:
                '<p>Este servicio permite conocer nuevos lugares de peligro registrados.</p>' +
                '<p>Se debe ingresar la fecha de Inicio y Fin del periodo a evaluar.</p>' +
                '<p>Se conoceran datos b&aacute;sicos como ID del Usuario, Fecha de Registro y Lugar.</p>'
    });

    $("#btnSend").click(function (e) {
        createMarkers($("#date1").val(), $("#date2").val());
    });
    //Section Map

    var locations;
    function createMarkers(date1, date2) {
        $.ajax({
            url: "http://thewetzone.pixub.com/web_services/getSOSLocation.php?date1=" + date1 + "&date2=" + date2,
            type: "GET",
            dataType: "json",
            success: function (source) {
                locations = source;
                showInfo();
            },
            error: function (dato) {
                alert("ERROR");
            }
        });
    }

    function showInfo() {
        map.objects.clear();

        var red = { color: "#FF0000" };

        var lat,
            lng,
            markerCoords;

        container = new nokia.maps.map.Container();

        var markers = [];

        for (var idx = 0; idx < locations.length; idx++) {
            var standardMarker;

            loc = locations[idx];

            lat = loc.latitude;
            lng = loc.longitude;

            markerCoords = new nokia.maps.geo.Coordinate(
                                      parseFloat(lat, 10),
                                      parseFloat(lng, 10)
                                  );

            var messageTime = '$.Zebra_Dialog("Fue registrado por el ID: '+loc.personalid+'<br />En la fecha y hora: <br />' + loc.registrationDate + '");';

            standardMarker = new nokia.maps.map.StandardMarker(markerCoords, { $click: messageTime });
            standardMarker.set("brush", red);

            markers.push(standardMarker);

        }


        var markerCluster = new MarkerClusterer();

        markerCluster.objects.addAll(markers);

        map.addComponent(markerCluster);
    }

});