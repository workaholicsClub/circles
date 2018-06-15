let connections = {};
let connectionCount = 0;

let socketApp = function (request) {
    let server = this;
    let connection = request.accept('video-signalling', request.origin);

    console.log('Connection created at: ', new Date());

    connection.id = ++connectionCount;
    connections[connection.id] = connection;

    console.log("["+ connection.id + "] connection accepted");

    let canStartCall = connectionCount >= 2;
    if (canStartCall) {
        let callerConnection = connection;
        console.log("["+ callerConnection.id + "] sending start invite");
        callerConnection.sendUTF('start');
    }

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            server.broadcast(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            server.broadcastBytes(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
};

module.exports = socketApp;