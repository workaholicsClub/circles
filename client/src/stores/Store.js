import { observable, action } from 'mobx';

class Store {
  @observable user = 'user';
  @observable nextStep = false;

  @action toggleNextStep () {
    this.user = 'newUser'
  }
}

export default new Store()
