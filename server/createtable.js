var server = require('./server');
var ds = server.dataSources.userdb;
var lbTables = ['userdetail','userauth','storedb'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});