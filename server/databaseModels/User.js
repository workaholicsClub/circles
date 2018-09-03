const makeUserModel = function (database, types) {
    return database().define('user', {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            uuid: {
                type: types.STRING(36),
                allowNull: true,
                defaultValue: null
            },
            dateRegistered: {
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: types.literal('CURRENT_TIMESTAMP')
            },
            name: {
                type: types.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            email: {
                type: types.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            birthday: {
                type: 'TIMESTAMP',
                allowNull: true,
                defaultValue: null
            },
            sex: {
                type: types.STRING(6),
                allowNull: true,
                defaultValue: null
            },
            status: {
                type: types.STRING(11),
                allowNull: true,
                defaultValue: null
            },
            aim: {
                type: types.STRING(6),
                allowNull: true,
                defaultValue: null
            },
            education: {
                type: types.STRING(6),
                allowNull: true,
                defaultValue: null
            },
            phone: {
                type: types.INTEGER(10),
                allowNull: true,
                defaultValue: null
            },
            about: {
                type: types.TEXT,
                allowNull: true,
                defaultValue: null
            },
            needSex: {
                type: types.STRING(6),
                allowNull: true,
                defaultValue: null
            },
            needStatus: {
                type: types.STRING(11),
                allowNull: true,
                defaultValue: null
            },
            needAim: {
                type: types.STRING(6),
                allowNull: true,
                defaultValue: null
            },
            needEducation: {
                type: types.STRING(6),
                allowNull: true,
                defaultValue: null
            }
        },
        {
            timestamps: true,
            createdAt: 'dateRegistered',
            updatedAt: false,
            deletedAt: false
        });
};

module.exports = makeUserModel;