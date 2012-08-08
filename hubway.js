var http = require('http');

http.get("http://www.thehubway.com/data/stations/bikeStations.xml", function(res) {
  var chunks = '';
  res.on('data', function(chunk) {
    chunks += chunk.toString();
  }).on('end', function() {
    console.log(chunks);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
