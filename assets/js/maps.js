var business_data = null;

/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addMarkerToGroup(group, coordinate, html) {
	var marker = new H.map.Marker(coordinate);
	// add custom data to the marker
	marker.setData(html);
	group.addObject(marker);
}

function addInfoBubble(map) {
	var group = new H.map.Group();

	map.addObject(group);

	// add 'tap' event listener, that opens info bubble, to the group
	group.addEventListener('tap', function (evt) {
		// event target is the marker itself, group is a parent event target
		// for all objects that it contains
		var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
			// read custom data
			content: evt.target.getData()
		});
		// show info bubble
		ui.addBubble(bubble);
	}, false);

	if (business_data != null) {
		for (let value in business_data) {
			addMarkerToGroup(group, { lat: business_data[value]["LAT"], lng: business_data[value]["LNG"] },
				'<div style="width: 280px">' +
				'<img style="display: block; margin-left: auto; margin-right: auto;	width: 50 %;" src="https://www.ceda.co.bw/sites/all/themes/ceda/logo.png" alt="Home"></img>' +
				'<h2><b>' + business_data[value]["BRANCH"] + '</b></h2>' +
				'<div style="line-height: 0.1; font-size: 10px;">' +
				'<p>BUSINESSES FUNDED: <strong>' + business_data[value]["BUSINESSES_FUNDED"] + '</strong></p>' +
				'<p>JOBS CREATED: <strong>' + business_data[value]["JOBS_CREATED"] + '</strong></p>' +
				'<p>JOBS MAINTAINED: <strong>' + business_data[value]["JOBS_MAINTAINED"] + '</strong></p>' +
				'<p>GREEN FIELD: <strong>' + business_data[value]["GREEN_FIELD"] + '</strong></p>' +
				'<p>BROWN FIELD: <strong>' + business_data[value]["BROWN_FIELD"] + '</strong></p>' +
				'<p>VODI: <strong>' + business_data[value]["VODI"] + '</strong></p>' +
				'</div>' +
				'<a href="https://www.ceda.co.bw/" target="_blank">Citizen Entrepreneurial Development Agency</a>' +
				'</div>'
			);
		}
	}
}

//Initialize the Platform object:
var platform = new H.service.Platform({
	'apikey': 'yWRKTw6F-w04DcJgh9QzQoCWR9x6NLl8bLNXuAWE1HY'
});

// Get the default map types from the Platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate the map:

var map = new H.Map(

	document.getElementById('mapContainer'),
	defaultLayers.vector.normal.map,
	{
		center: { lng: 23.7565, lat: -21.8895 },
		zoom: 5,
		pixelRatio: window.devicePixelRatio || 1
	});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

// Now use the map as required...
window.onload = function () {
	addInfoBubble(map);
};

