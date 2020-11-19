// Create a client instance
var client = new Paho.MQTT.Client("broker.hivemq.com", Number(8000), "f2b48facad3f4837af47e373cebd3614");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });

var Components = {
	'bme680': {
		'name': "Environment Sensor"
	},
	'ldr': {
		'name': "Brightness Sensor"
	},
	'alert': {
		'name': "Alert Message"
	},
	'hbw': {
		'name': "State Automated high-bay warehouse (HBW)"
	},
	'vgr': {
		'name': "State Multi-processing station with kiln (MPO)"
	},
	'sld': {
		'name': "State Sorting line with colour recognition (SLD)"
	},
	'dsi': {
		'name': "State DSI (VGR)"
	},
	'dso': {
		'name': "State DSO (VGR)"
	},
	'stock': {
		'name': "Stock HBW"
	},
	'order': {
		'name': "State Order (VGR)"
	}
}

// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	client.subscribe("i/bme680");
	client.subscribe("i/ldr");
	client.subscribe("i/alert");
	client.subscribe("f/i/state/hbw");
	client.subscribe("f/i/state/vgr");
	client.subscribe("f/i/state/mpo");
	client.subscribe("f/i/state/sld");
	client.subscribe("f/i/state/dsi");
	client.subscribe("f/i/state/dso");
	client.subscribe("f/i/stock");
	client.subscribe("f/i/order");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:" + responseObject.errorMessage);
	}
}

// called when a message arrives
function onMessageArrived(message) {
	console.log("onMessageArrived:" + message.payloadString);			
}