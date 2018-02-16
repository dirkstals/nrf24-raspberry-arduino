var spiDev = "/dev/spidev0.0";
var cePin = 24;
var irqPin = 25;

var nrf = require('nrf');
var radio = nrf.connect(spiDev, cePin, irqPin); // Connect to the radio
// radio.channel(0x4c).dataRate('1Mbps').crcBytes(2).autoRetransmit({count:15, delay:4000});

// Start the radio
radio.begin(function() {

	var rx = radio.openPipe('rx', 0xE8E8F0F0E1);
	// var tx = radio.openPipe('tx', 0xE8E8F0F0E1); // Send to address
  var degrees = 0;

  // Fires when our transmission pipe is ready
	// tx.on('ready', function() {
	// 		var bool = true;
  //
	// 		setInterval(function(){
	// 			bool = !bool;
	// 			tx.write(bool.toString());
  //
	// 			console.log(bool.toString());
	// 		}, 1000);
  //
	// });

	rx.on('ready', function(e) {
		console.log("RX Ready");
	});


	rx.on('data', function (d) {
      console.log("Got data, will respond", d.readUInt32BE(0));
  });

	// Handler for errors
	// tx.on('error', function(e) {
	// 	console.log("Error:", e);
	// });
  //
	rx.on('error', function(e) {
		console.log("Error:", e);
	});
});
