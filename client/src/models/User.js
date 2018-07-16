class User {
    constructor(name, sex, birthday, uuid) {
        this.name = name;
        this.sex = sex;
        this.birthday = birthday;
        this.uuid = uuid;
    }

    set(prop, value) {
        this[prop] = value;
    }

    setProps(props) {
        Object.keys(props).forEach((key) => this.set(key, props[key]));
    }

    get(prop) {
        return this[prop];
    }

    getProps() {
        return {
            name: this.name,
            sex: this.sex,
            birthday: this.birthday,
            uuid: this.uuid,
            needSex: this.needSex
        }
    }
}

export default User;