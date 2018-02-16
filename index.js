var spiDev = "/dev/spidev0.0";
var cePin = 22;
var irqPin = 25;

var configPin = 7;



var nrf = require('nrf');
var radio = nrf.connect(spiDev, cePin, irqPin); // Connect to the radio
// radio.channel(0x4c).dataRate('1Mbps').crcBytes(2).autoRetransmit({count:15, delay:4000});

// Start the radio
radio.begin(function() {

	// var rx = radio.openPipe('rx', 0xF0F0F0F0E1);
	var tx = radio.openPipe('tx', 0xE8E8F0F0E1); // Send to address
  var degrees = 0;

  // Fires when our transmission pipe is ready
	tx.on('ready', function() {

		wpi.setup('wpi');
		var started = false;
		var clock = null;

		wpi.pinMode(configPin, wpi.INPUT);
		wpi.pullUpDnControl(configPin, wpi.PUD_UP);
		wpi.wiringPiISR(configPin, wpi.INT_EDGE_BOTH, function() {
		  var button = wpi.digitalRead(configPin);
			if(button) {
				tx.write('hello world');
			}
		});
	});

	// Handler for errors
	tx.on('error', function(e) {
		console.log("Error:", e);
	});
});
