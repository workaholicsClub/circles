const QueueClient = require('./models/QueueClient');

let connections = {};
let connectionCount = 0;

function videoProxy(connection, server) {
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
}

function serveQueue(connection, server, queueManager) {
    console.log((new Date()) + ' Узел ' + connection.remoteAddress + ' встал в очередь');
    let client = new QueueClient(connection);

    queueManager.addClient(client);

    connection.on('message', function (message) {
        let jsonMessage = JSON.parse(message.utf8Data);
        if (jsonMessage.type === 'userData') {
            console.log((new Date()) + ' Узел ' + client.getAddress() + ' передал данные пользователя');

            client.addUser(jsonMessage.user);
            queueManager.sendOffers();
        }

        if (jsonMessage.type === 'offerReply') {
            console.log((new Date()) + ' Узел ' + client.getAddress() + ' передал ответ на предложение');

            let currentUser = client.getUser();
            let offeredUser = jsonMessage.user;
            let offeredClient = queueManager.findClientByUser(offeredUser);
            let status = jsonMessage.status;

            queueManager.setOfferStatus(currentUser, offeredUser, status);
            if (queueManager.hasBothSidesAccepted(currentUser, offeredUser) && offeredClient) {
                console.log((new Date()) + ' Узел ' + client.getAddress() + ' оба пользователя приняли приглашения, высылаю команду начала чата');

                client.sendAcceptedOffer(offeredUser);
                offeredClient.sendAcceptedOffer(currentUser);
            }
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Узел ' + client.getAddress() + ' вышел из очереди');
        queueManager.removeClient(client);
    });
}

let socketApp = function (request, queueManager) {
    let server = this;
    let connection = request.accept(null, request.origin);
    console.log(request.resource);
    console.log(request.resourceURL);

    if (request.resource === '/video') {
        videoProxy(connection, server);
    }

    if (request.resource === '/queue') {
        serveQueue(connection, server, queueManager);
    }
};

module.exports = socketApp;