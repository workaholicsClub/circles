const STATUS_ACCEPTED = true;
const STATUS_DENIED = false;
const STATUS_MAYBE = null;

function QueueManager() {
    this.queue = [];

    this.offers = {};

    this.addClient = function (client) {
        this.queue.push(client);
    };

    this.getQueue = function () {
        return this.queue;
    };

    this.findClientIndex = function (clientToFind) {
        let foundIndex = false;

        this.getQueue().forEach(function (iteratedClient, index) {
            if (iteratedClient === clientToFind) {
                foundIndex = index;
            }
        });

        return foundIndex;
    };

    this.findClientByUser = function (userDataToFind) {
        let foundClient = false;

        this.getQueue().forEach(function (iteratedClient) {
            let iteratedUser = iteratedClient.getUser();
            let uuidMatched = iteratedUser.uuid && userDataToFind.uuid && iteratedUser.uuid === userDataToFind.uuid;

            if (uuidMatched) {
                foundClient = iteratedClient;
            }
        });

        return foundClient;
    };

    this.removeClient = function (clientToRemove) {
        let removeIndex = this.findClientIndex(clientToRemove);

        if (removeIndex !== false) {
            this.getQueue().splice(removeIndex, 1);
        }
    };

    this.getPairsFor = function (userDataToPair) {
        let pairs = [];
        let clientToPair = this.findClientByUser(userDataToPair);
        if (!clientToPair) {
            return false;
        }

        this.getQueue().forEach(function (queueClient) {
            if (clientToPair !== queueClient) {
                let queueClientMatch = queueClient.getMatchPercent(clientToPair.getUser());
                let clientToPairMatch = clientToPair.getMatchPercent(queueClient.getUser());

                if (queueClientMatch !== false && clientToPairMatch !== false) {
                    let pairWeight = queueClientMatch * clientToPairMatch / 100;

                    pairs.push({
                        self: clientToPair,
                        offered: queueClient,
                        weight: pairWeight
                    });
                }
            }
        }, this);

        return pairs;
    };

    this.hasAnySideDenied = function (self, offered) {
        let selfDenied = this.offers[self.uuid]
            ? this.offers[self.uuid][offered.uuid] === STATUS_DENIED
            : false;
        let offeredDenied = this.offers[offered.uuid]
            ? this.offers[offered.uuid][self.uuid] === STATUS_DENIED
            : false;

        return selfDenied || offeredDenied;
    };

    this.hasBothSidesAccepted = function (self, offered) {
        let selfAccepted = this.offers[self.uuid]
            ? this.offers[self.uuid][offered.uuid] === STATUS_ACCEPTED
            : false;
        let offeredAccepted = this.offers[offered.uuid]
            ? this.offers[offered.uuid][self.uuid] === STATUS_ACCEPTED
            : false;

        return selfAccepted && offeredAccepted;
    };

    this.setOfferStatus = function (self, offered, status) {
        if (typeof this.offers[self.uuid] === 'undefined') {
            this.offers[self.uuid] = {}
        }

        this.offers[self.uuid][offered.uuid] = status;
    };

    this.getNextOffer = function (userToBeOffered) {
        let unsortedPairs = this.getPairsFor(userToBeOffered);
        if (!unsortedPairs) {
            return false;
        }

        let reverseSortedPairs = unsortedPairs;
        reverseSortedPairs.sort(function (firstPair, secondPair) {
            const IS_GREATER = 1;
            const IS_LESS = -1;
            const IS_EQUAL = 0;

            if (firstPair.weight < secondPair.weight) {
                return IS_GREATER;
            }

            if (firstPair.weight > secondPair.weight) {
                return IS_LESS;
            }

            return IS_EQUAL;
        });

        let offer = false;
        reverseSortedPairs.forEach(function (pair) {
            if (offer === false && !this.hasAnySideDenied(pair.self.getUser(), pair.offered.getUser())) {
                offer = pair;
            }
        }, this);

        return offer;
    };

    this.sendOffer = function (client) {
        let offer = this.getNextOffer(client.getUser());
        console.log((new Date()) + ' Отправка предложения пользователю ' + client.getUser().uuid);

        if (offer) {
            let offeredUser = offer.offered.getUser();
            client.sendOffer(offeredUser);
        }
    };

    this.sendOffers = function () {
        console.log((new Date()) + ' Отправка предложений. Всего пользователей: ' + this.getQueue().length);
        this.getQueue().forEach(function (client) {
            this.sendOffer(client);
        }, this);
    }
}


module.exports = QueueManager;