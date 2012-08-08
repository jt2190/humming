//mashery, apigee, 

var http = require('http')
  , util = require('util')
  , bikeStationsXml = 'http://www.thehubway.com/data/stations/bikeStations.xml'
  , routeConfigMbta86 = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=mbta&r=86'
  , events = require('events')
  , fs = require('fs');

function handleError(e) {
  console.error(e.message);
}

function ResponseDataListener(res) {

  if (!(this instanceof ResponseDataListener)) {
    return new ResponseDataListener(res);
  } else {
    events.EventEmitter.call(this); // call the super constructor first  
    this.data;
    var self = this;
    res.on('data', function(chunk) {
      self.addChunk(chunk);
    })  
    res.on('end', function() {
      self.emit('end', self.toString());
    })
    return this;  
  }
}
util.inherits(ResponseDataListener, events.EventEmitter);

ResponseDataListener.prototype.addChunk = function(chunk) {
  this.data += chunk;
}
ResponseDataListener.prototype.toString = function() {
  return this.data;
}

http.get(bikeStationsXml, function(res) {
  ResponseDataListener(res).on('end', function(s) {
    console.log("*** markComplete ***"); 
  });
  res.on('data', function(data) {
    fs.appendFile('data/bikeStations.xml', data, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });    
  })
  res.on('error', handleError);
}).on('error', handleError);

http.get(routeConfigMbta86, function(res) {
  ResponseDataListener(res).on('end', function(s) {
    console.log("*** markComplete ***"); 
  });
  res.on('data', function(data) {
    fs.appendFile('data/routeConfig-mbta-86.xml', data, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });    
  })
  res.on('error', handleError);
}).on('error', handleError);