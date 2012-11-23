var config = require('./config.js');

/* Set up web server */ 

var express = require('express'),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: config.wsPort}),
    app = express();

app.get('/', function (req, res) {
    res.sendfile('./index.html');
})

app.get('/client.js', function (req, res) {
    res.sendfile('./client.js');
})

app.get('/config.js', function (req, res) {
    res.sendfile('./config.js');
})

app.get('/style.css', function (req, res) {
    res.sendfile('./style.css');
})

app.listen(config.httpPort);


/*
 * Set up WebSocket Server
 */

var sockets = [];
var nextSocketId = 0;
var color = generateColor();

wss.on('connection', function(ws) {

    var socketId = nextSocketId++;
    sockets[socketId] = ws;
    ws.send(color);

    ws.on('message', function(message) {
        console.log("---");
        console.log('message recieved: ' + message);
        
        color = generateColor();
        
        Object.keys(sockets).forEach(function (k) {
            var v = sockets[k];
            if (v) {
                console.log("sending " + color + " to client with id " + k);
                v.send(color);
            }
        });
    });

    ws.on('close', function(ws) {
        sockets[socketId] = null;
    });
});

/*
* Generate new color
*/

function generateColor() {
    var c = Math.round(Math.random()*0xffffff).toString(16);
    while (c.length < 6) {
        c = '0' + c;
    }
    c = "#" + c;
    return c;
}


console.log("websocket server listening to port " + config.wsPort);

