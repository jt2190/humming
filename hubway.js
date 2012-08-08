//mashery, apigee, 

var http = require('http')
  , util = require('util')
  , url = "http://www.thehubway.com/data/stations/bikeStations.xml"
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

http.get(url, function(res) {
  ResponseDataListener(res).on('end', function(s) {
    console.log("*** markComplete ***"); 
  });
  res.on('data', function(data) {
    fs.appendFile('bikeStations.xml', data, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });    
  })
  res.on('error', handleError);
}).on('error', handleError);