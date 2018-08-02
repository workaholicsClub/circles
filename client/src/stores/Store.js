import { observable, action } from 'mobx';

class Store {
  @observable user;

  @action
  addUserFields(values) {
    this.user = values;
  }
}

export default new Store();
