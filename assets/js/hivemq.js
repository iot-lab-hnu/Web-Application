// Create a client instance
var client = new Paho.MQTT.Client("broker.hivemq.com", Number(8000), "f2b48facad3f4837af47e373cebd3614");



// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });


// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	client.subscribe("World");
	var message = new Paho.MQTT.Message("Hello");
	message.destinationName = "World";
	client.send(message);
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