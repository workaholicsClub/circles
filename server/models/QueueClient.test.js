const QueueClient = require('./QueueClient.js');

function getConnectionMock() {
    let remoteAddress = '192.168.0.68';

    return {
        remoteAddress: remoteAddress,
        send: jest.fn()
    };
}

test('Добавление данных пользователя', function () {
    let userData = {
        name: 'Константин Константинопольский',
        sex: 'male',
        birthday: '1976-11-27',
    };

    let client = new QueueClient();
    client.addUser(userData);
    expect(client.user).toEqual(userData);
    expect(client.getUser()).not.toBe(userData);
    expect(client.getUser()).toEqual(userData);
});

test('Получение адреса узла', function () {
    let expectedAddress = '192.168.0.68';
    let client = new QueueClient(getConnectionMock());
    expect(client.getAddress()).toEqual(expectedAddress);
});

test('Отправка приглашения в браузер', function () {
    let offeredUser = {
        name: 'Константин Константинопольский',
        sex: 'male',
        birthday: '1976-11-27',
    };

    let expectedMessage = JSON.stringify({
        type: 'userOffer',
        user: offeredUser
    });

    let connection = getConnectionMock();
    let client = new QueueClient(connection);

    client.sendOffer(offeredUser);
    expect(connection.send).toHaveBeenCalledTimes(1);
    expect(connection.send.mock.calls[0][0]).toEqual(expectedMessage);
});

test('Отправка принятого приглашения в браузер', function () {
    let acceptedUser = {
        name: 'Константин Константинопольский',
        sex: 'male',
        birthday: '1976-11-27',
    };

    let expectedMessage = JSON.stringify({
        type: 'acceptedOffer',
        user: acceptedUser
    });

    let connection = getConnectionMock();
    let client = new QueueClient(connection);

    client.sendAcceptedOffer(acceptedUser);
    expect(connection.send).toHaveBeenCalledTimes(1);
    expect(connection.send.mock.calls[0][0]).toEqual(expectedMessage);
});

test('Проценты полного соответствия', function () {
    let currentUser = {
        sex: 'male',
        status: 'search',
        aim: 'couple',
        education: 'high',
        needSex: 'female',
        needStatus: 'search',
        needAim: 'couple',
        needEducation: 'high'
    };

    let client = new QueueClient();
    client.addUser(currentUser);

    expect(client.getMatchPercent({
        sex: 'male'
    })).toEqual(false);

    expect(client.getMatchPercent({
        sex: 'female',
        status: 'search',
        aim: 'couple',
        education: 'high'
    })).toEqual(100);

    expect(client.getMatchPercent({
        sex: 'female',
        status: 'search',
        aim: 'couple',
        education: 'base'
    })).toEqual(67);

    expect(client.getMatchPercent({
        sex: 'female',
        status: 'search',
        aim: 'chat',
        education: 'base'
    })).toEqual(33);

    expect(client.getMatchPercent({
        sex: 'female',
        status: 'married',
        aim: 'chat',
        education: 'base'
    })).toEqual(0);
});

test('Проценты частичного соответствия', function () {
    let currentUser = {
        sex: 'male',
        status: 'search',
        aim: 'couple',
        education: 'high',
        needSex: 'female',
        needStatus: 'search',
        needAim: 'couple',
        needEducation: 'high'
    };

    let noEducationUser = {
        sex: 'male',
        status: 'search',
        aim: 'couple',
        education: 'high',
        needSex: 'female',
        needStatus: 'search',
        needAim: 'couple'
    };

    let client = new QueueClient();
    client.addUser(currentUser);

    let noEducationClient = new QueueClient();
    noEducationClient.addUser(noEducationUser);

    expect(client.getMatchPercent({
        sex: 'female',
        status: 'search',
        aim: 'couple'
    })).toEqual(83);

    expect(client.getMatchPercent({
        sex: 'female',
        status: 'search'
    })).toEqual(67);

    expect(client.getMatchPercent({
        sex: 'female'
    })).toEqual(50);


    expect(noEducationClient.getMatchPercent({
        sex: 'female',
        status: 'search',
        aim: 'couple',
        education: 'high'
    })).toEqual(83);

    expect(noEducationClient.getMatchPercent({
        sex: 'female',
        status: 'search',
        aim: 'couple'
    })).toEqual(83);

    expect(noEducationClient.getMatchPercent({
        sex: 'female',
        status: 'search',
        education: 'high'
    })).toEqual(67);

    expect(noEducationClient.getMatchPercent({
        sex: 'female',
        status: 'search'
    })).toEqual(67);

    expect(noEducationClient.getMatchPercent({
        sex: 'female'
    })).toEqual(50);
});