const QueueManager = require('./QueueManager.js');
const QueueClient = require('./QueueClient.js');

const STATUS_ACCEPTED = true;
const STATUS_DENIED = false;

function getConnectionMock() {
    let remoteAddress = '192.168.0.68';

    return {
        remoteAddress: remoteAddress,
        send: jest.fn()
    };
}

test('Добавление и поиск клиента', function () {
    let userData1 = {uuid: 'dcd74112-56d6-4422-a4f5-4ec909f9a900'};
    let userData2 = {uuid: '7d8be735-134c-40fc-b118-1006ee28717f'};
    let userData3 = {uuid: 'e77c953d-2a8b-432e-a705-a73baa0f48a7'};

    let queue = new QueueManager();

    let client1 = new QueueClient();
    let client2 = new QueueClient();

    client1.addUser(userData1);
    client2.addUser(userData2);

    expect(queue.queue).toHaveLength(0);

    queue.addClient(client1);
    queue.addClient(client2);

    expect(queue.queue).toHaveLength(2);

    expect(queue.findClientIndex(client1)).toEqual(0);
    expect(queue.findClientIndex(client2)).toEqual(1);

    expect(queue.findClientByUser(userData1)).toEqual(client1);
    expect(queue.findClientByUser(userData2)).toEqual(client2);
    expect(queue.findClientByUser(userData3)).toBeFalsy();
});

test('Удаление клиента', function () {
    let queue = new QueueManager();

    let client1 = new QueueClient();
    let client2 = new QueueClient();
    let client3 = new QueueClient();

    queue.addClient(client1);
    queue.addClient(client2);
    queue.addClient(client3);

    expect(queue.queue).toHaveLength(3);
    expect(queue.findClientIndex(client2)).toEqual(1);
    expect(queue.findClientIndex(client3)).toEqual(2);

    queue.removeClient(client1);

    expect(queue.queue).toHaveLength(2);
    expect(queue.findClientIndex(client1)).toEqual(false);
    expect(queue.findClientIndex(client2)).toEqual(0);
    expect(queue.findClientIndex(client3)).toEqual(1);
});

test('Составление пар', function () {
    let user1 = {
        uuid: 1,
        sex: 'male',
        status: 'search',
        aim: 'couple',
        education: 'high',
        needSex: 'female',
        needStatus: 'search',
        needAim: 'couple',
        needEducation: 'high'
    };

    let user2 = {
        uuid: 2,
        sex: 'female',
        status: 'search',
        aim: 'couple',
        education: 'high',
        needSex: 'male',
        needStatus: 'search',
        needAim: 'couple',
        needEducation: 'high'
    };

    let user3 = {
        uuid: 3,
        sex: 'male',
        status: 'complicated',
        aim: 'chat',
        education: 'high',
        needSex: 'female',
        needStatus: 'search',
        needAim: 'chat',
        needEducation: 'high'
    };

    let user4 = {
        uuid: 4,
        sex: 'female',
        status: 'married',
        aim: 'chat',
        education: 'middle',
        needSex: 'male',
        needStatus: 'search',
        needAim: 'chat'
    };

    let queue = new QueueManager();

    let client1 = new QueueClient();
    let client2 = new QueueClient();
    let client3 = new QueueClient();
    let client4 = new QueueClient();
    let clientWithoutUser = new QueueClient();

    client1.addUser(user1);
    client2.addUser(user2);
    client3.addUser(user3);
    client4.addUser(user4);

    queue.addClient(client1);
    queue.addClient(client2);
    queue.addClient(client3);
    queue.addClient(client4);
    queue.addClient(clientWithoutUser);

    let client1Pairs = queue.getPairsFor(user1);

    expect(client1Pairs).toHaveLength(2);

    expect(client1Pairs[0].self).toEqual(client1);
    expect(client1Pairs[0].offered).toEqual(client2);
    expect(client1Pairs[0].weight).toEqual(100);

    expect(client1Pairs[1].self).toEqual(client1);
    expect(client1Pairs[1].offered).toEqual(client4);
    expect(client1Pairs[1].weight).toEqual(0);
});

test('Пустные пары', function () {

});

test('Статусы предложений', function () {
    let userData1 = {uuid: 'dcd74112-56d6-4422-a4f5-4ec909f9a900'};
    let userData2 = {uuid: '7d8be735-134c-40fc-b118-1006ee28717f'};
    let userData3 = {uuid: 'e77c953d-2a8b-432e-a705-a73baa0f48a7'};

    let queue = new QueueManager();

    queue.setOfferStatus(userData1, userData2, STATUS_DENIED);
    expect(queue.hasAnySideDenied(userData1, userData2)).toBeTruthy();
    expect(queue.hasAnySideDenied(userData2, userData1)).toBeTruthy();
    expect(queue.hasAnySideDenied(userData1, userData3)).toBeFalsy();
    expect(queue.hasAnySideDenied(userData3, userData1)).toBeFalsy();

    queue.setOfferStatus(userData1, userData3, STATUS_ACCEPTED);
    expect(queue.hasAnySideDenied(userData1, userData2)).toBeTruthy();
    expect(queue.hasAnySideDenied(userData2, userData1)).toBeTruthy();
    expect(queue.hasAnySideDenied(userData1, userData3)).toBeFalsy();
    expect(queue.hasAnySideDenied(userData3, userData1)).toBeFalsy();
    expect(queue.hasAnySideDenied(userData2, userData3)).toBeFalsy();
    expect(queue.hasAnySideDenied(userData3, userData2)).toBeFalsy();

    expect(queue.hasBothSidesAccepted(userData1, userData2)).toBeFalsy();
    expect(queue.hasBothSidesAccepted(userData2, userData1)).toBeFalsy();
    expect(queue.hasBothSidesAccepted(userData1, userData3)).toBeFalsy();
    expect(queue.hasBothSidesAccepted(userData3, userData1)).toBeFalsy();
    expect(queue.hasBothSidesAccepted(userData3, userData2)).toBeFalsy();
    expect(queue.hasBothSidesAccepted(userData2, userData2)).toBeFalsy();

    queue.setOfferStatus(userData3, userData1, STATUS_ACCEPTED);
    expect(queue.hasBothSidesAccepted(userData1, userData2)).toBeFalsy();
    expect(queue.hasBothSidesAccepted(userData2, userData1)).toBeFalsy();
    expect(queue.hasBothSidesAccepted(userData1, userData3)).toBeTruthy();
    expect(queue.hasBothSidesAccepted(userData3, userData1)).toBeTruthy();
    expect(queue.hasBothSidesAccepted(userData3, userData2)).toBeFalsy();
    expect(queue.hasBothSidesAccepted(userData2, userData2)).toBeFalsy();
});

test('Следующее предложение', function () {
    let user1 = {
        uuid: '9ed5cf1b-b42b-4f54-94d5-bfeed593bc38',
        sex: 'male',
        status: 'search',
        aim: 'couple',
        education: 'high',
        needSex: 'female',
        needStatus: 'search',
        needAim: 'couple',
        needEducation: 'high'
    };

    let user2 = {
        uuid: '0563aa6f-a025-497a-90ca-d498816562af',
        sex: 'female',
        status: 'search',
        aim: 'couple',
        education: 'high',
        needSex: 'male',
        needStatus: 'search',
        needAim: 'couple',
        needEducation: 'high'
    };

    let user3 = {
        uuid: '561b6e4b-660a-4869-b630-d0b11cd6a8b8',
        sex: 'female',
        status: 'complicated',
        aim: 'chat',
        education: 'high',
        needSex: 'male',
        needStatus: 'search',
        needAim: 'chat',
        needEducation: 'high'
    };

    let user4 = {
        uuid: 'ecc3b9da-ac6e-4209-b976-b376b2f2e189',
        sex: 'female',
        status: 'married',
        aim: 'chat',
        education: 'middle',
        needSex: 'male',
        needStatus: 'search',
        needAim: 'chat'
    };

    let expectedMessage = JSON.stringify({
        type: 'userOffer',
        user: user2
    });

    let queue = new QueueManager();

    let connection = getConnectionMock();
    let client1 = new QueueClient(connection);
    let client2 = new QueueClient(connection);
    let client3 = new QueueClient(connection);
    let client4 = new QueueClient(connection);

    client1.addUser(user1);
    client2.addUser(user2);
    client3.addUser(user3);
    client4.addUser(user4);

    queue.addClient(client1);
    queue.addClient(client2);
    queue.addClient(client3);
    queue.addClient(client4);

    let firstOffer = queue.getNextOffer(user1);

    expect(firstOffer.self).toEqual(client1);
    expect(firstOffer.offered).toEqual(client2);

    queue.sendOffer(client1);
    expect(connection.send.mock.calls[0][0]).toEqual(expectedMessage);

    queue.setOfferStatus(client1.getUser(), client2.getUser(), STATUS_DENIED);

    let secondOffer = queue.getNextOffer(user1);

    expect(secondOffer.self).toEqual(client1);
    expect(secondOffer.offered).toEqual(client3);

    let thirdOffer = queue.getNextOffer(user2);
    expect(thirdOffer).toBeFalsy();
});