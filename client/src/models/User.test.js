import User from './User';

test('Конструктор', () => {
    let name = 'Константин Константинопольский';
    let sex = 'male';
    let birthday = '1978-11-17';
    let uuid = '578924b-86f4-4103-a0d4-9838ffdcd9eb';

    let user = new User(name, sex, birthday, uuid);

    expect(user.getProps()).toEqual({
        name: name,
        sex: sex,
        birthday: birthday,
        uuid: uuid
    });
});

test('Геттеры, сеттеры', () => {
    let userProps = {
        name: 'Антонина Антонинопольская',
        sex: 'female',
        birthday: '1990-12-28',
        uuid: 'f448d483-8211-4fc9-a0f6-6f49310ac34f'
    };

    let user = new User();
    user.setProps(userProps);

    expect(user.getProps()).toEqual(userProps);
    expect(user.getProps()).not.toBe(userProps);

    let user2 = new User();
    user2.set('name', userProps.name);

    expect(user2.get('name')).toEqual(userProps.name);
    expect(user2.get('sex')).toBeUndefined();
});