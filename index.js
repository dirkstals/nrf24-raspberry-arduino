var spiDev = "/dev/spidev0.0";
var cePin = 22;
var irqPin = 25;

var nrf = require('nrf');
var radio = nrf.connect(spiDev, cePin); // Connect to the radio
radio.channel(0x4c); // Set channel to 76
radio.dataRate('1Mbps') // Set data rate to 1Mbps
radio.crcBytes(2) // Set the CRC to 2
radio.transmitPower('PA_MAX')
radio.autoRetransmit({
	count: 5,
	delay: 4000
}); // Auto retransmit up to 15 times

// Start the radio
radio.begin(function() {

	var rx = radio.openPipe('rx', 0xF0F0F0F0E1);
	var tx = radio.openPipe('tx', 0xF0F0F0F0F2); // Send to address
  var degrees = 0;

  // Fires when our transmission pipe is ready
	tx.on('ready', function() {
		console.log("TX Ready");
		setInterval(function(){
        degrees += 30;
        tx.write(degrees.toString()); // Send a message
        console.log(degrees);
        if(degrees > 180) {
          degrees = 0;
        }
    }, 1000);
	});

	rx.pipe(tx);

	// Handler for errors
	tx.on('error', function(e) {
		console.log("Error:", e);
	});
});
