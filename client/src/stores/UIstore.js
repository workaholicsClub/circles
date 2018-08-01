import { observable, action } from 'mobx';

class UIstore {

  @observable registerNextStep = false;

  @action toggleNextStep () {
    this.registerNextStep = !this.registerNextStep
  }
}

export default new UIstore()
