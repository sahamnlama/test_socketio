var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Log = require('log'),
    log = new Log("debug")
var port = process.env.PORT || 5550;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.rediret('index.html');
});

io.on('connection', function(socket){
  socket.on('stream', function(image){
      socket.broadcast.emit('stream', image);
  });


  socket.on('stream_start', function(data){
      console.log('stream_start_pi');
      socket.broadcast.emit('stream_start_pi', {data:'asas', type:'openbrowser'});
  });

});

http.listen(port, function(){
  log.info("Server listening through port %s", port);
});
