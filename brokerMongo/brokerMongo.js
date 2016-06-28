var mosca = require('mosca')
 
var pubsubsettings = {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'myCollections',
    mongo: {}
};

var settings = {
  port: 1883,
  backend: pubsubsettings 
};
 
var server = new mosca.Server(settings, function() {
  console.log('Mosca server is up and running')
});
 
server.published = function(packet, client, cb) {
  console.log('client connected', client);
  console.log('packet', packet);
  if (packet.topic.indexOf('echo') === 0) {
    return cb();
  }
 
  var newPacket = {
    topic: 'echo/' + packet.topic,
    payload: packet.payload,
    retain: packet.retain,
    qos: packet.qos
  };
 
  console.log('newPacket', newPacket);
  
  server.publish(newPacket, cb);
}
