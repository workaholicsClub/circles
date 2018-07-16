function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

function QueueClient(connection) {
    this.connection = connection;
    this.user = false;

    this.addUser = function (user) {
        this.user = user;
    };

    this.getUser = function () {
        return clone(this.user);
    };

    this.getAddress = function () {
        return this.connection.remoteAddress;
    };

    this.sendMessage = function (jsonMessage) {
        this.connection.send(JSON.stringify(jsonMessage));
    };

    this.sendOffer = function (offeredUser) {
        this.sendMessage({
            type: 'userOffer',
            user: offeredUser
        });
        console.log((new Date) + ' приглашение отправлено');
    };

    this.sendAcceptedOffer = function (acceptedUser) {
        this.sendMessage({
            type: 'acceptedOffer',
            user: acceptedUser
        });
    };
    
    this.getMatchPercent = function (userToMatch) {
        let mandatoryProps = ['sex'];
        let currentUser = this.user;
        
        let mandatoryPropsMatch = mandatoryProps.reduce(function (previousPropsMatch, currentProp) {
            let neededProp = 'need'+capitalize(currentProp);
            let currentPropMatches = currentUser[neededProp] === userToMatch[currentProp];
            return previousPropsMatch && currentPropMatches;
        }, true);

        if (!mandatoryPropsMatch) {
            return false;
        }

        let propMatchWeights = {
            status: 1,
            aim: 1,
            education: 1
        };

        let totalWeight = Object.keys(propMatchWeights).reduce(function (sum, currentProp) {
            return sum + propMatchWeights[currentProp];
        }, 0);

        let matchPercent = 100 * Object.keys(propMatchWeights).reduce(function (matchPercentAccumulator, currentProp) {
            let neededProp = 'need'+capitalize(currentProp);
            let propWeight = propMatchWeights[currentProp];
            let propsDefined = typeof currentUser[neededProp] === 'string' && typeof userToMatch[currentProp] === 'string';

            if (!propsDefined) {
                return matchPercentAccumulator + 0.5 * propWeight/totalWeight;
            }

            let isPropsMatching = currentUser[neededProp] === userToMatch[currentProp];

            return matchPercentAccumulator + (isPropsMatching ? propWeight/totalWeight : 0);
        }, 0);

        return Math.round(matchPercent);
    }
}

module.exports = QueueClient;