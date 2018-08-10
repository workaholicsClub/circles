import { observable, action } from 'mobx';

class UIstore {
  @observable registerStep = 1;

  @action
  toggleNextStep() {
    this.registerStep += 1;

    console.log('next step', this.registerStep);
  }
}

export default new UIstore();
