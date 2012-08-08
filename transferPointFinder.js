var http = require('http')
  , bikeStationsXml = 'http://www.thehubway.com/data/stations/bikeStations.xml'
  , BikeStationsXmlParser = require('transfer-finder').BikeStationsXmlParser;  

function handleError(e) {
  console.error(e.message);
}

/* Read from the internet */
http.get(bikeStationsXml, function(res) {
  var bikeStationsXmlParser = new BikeStationsXmlParser().parse(res).on('station', function(station) { 
    // connect to MongoDB here.
    
    console.log(station);
    
  });
  res.on('error', handleError);
}).on('error', handleError);