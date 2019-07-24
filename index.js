// Config
var port = 3002



boi = []
cloudvar = []
var express = require('express');
var app = express();
var http = require('http').Server(app);
var serv = require('http')
var io = require('socket.io')(http);
app.use(express.static('./Snap-5'));
app.get('/httpget', function(request, response) {
  try {
  response.send(serv.get(request.query["value"]));
  } catch(error) {
  response.send('oof')
  }
  //response.send('9')
});
app.get('/setvar', function(request, response) {
  cloudvar[request.query["var"]] = [request.query["val"]]
  response.send('ok')
});
app.get('/getvar', function(request, response) {
  response.send(cloudvar[request.query["var"]])
});
app.get('/varlist', function(request, response) {
  response.send(cloudvar)
});
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';
var serverport = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || port;
if (process.env.OPENSHIFT_NODEJS_IP !== undefined) {
    http.listen( serverport, ipaddress, function() {
        console.log('[CLient] Listening on *:' + serverport);
    });
} else {
    http.listen( serverport, function() {
        console.log('[Client] Listening on *:' + port);
    });
}
