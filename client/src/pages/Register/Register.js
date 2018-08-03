import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { CenteredLayout } from '../../layouts/CenteredLayout';
import RegisterFormOne from './RegisterFormOne';
import RegisterFormTwo from './RegisterFormTwo';
import RegisterFormThree from './RegisterFormThree';

import profilePic from './images/blank-profile.svg';

@inject('store')
@inject('UIstore')
@observer
class Register extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.UIstore = props.UIstore;
  }

  nextStep = (values) => {
    console.log('got values...', values);
    // полсылаем данные и переходим к следующему этапу
    this.store.addUserFields(values);
    this.UIstore.toggleNextStep();
    if (this.UIstore.registerStep > 3) {
      this.submitForm();
    }
  };

  submitForm = () => {
    console.log('sending data to server....');
  };

  renderFormOne = () => (
    <CenteredLayout logo title="Регистрация">
      <div className="card">
        <div style={{ padding: '2rem 6rem' }}>
          <img className="card-img-top" src={profilePic} alt="" />
        </div>
        <div className="card-body">
          <RegisterFormOne nextStep={this.nextStep} />
        </div>
      </div>
    </CenteredLayout>
  );

  renderFormTwo = () => (
    <CenteredLayout title="Дополнительные данные">
      <RegisterFormTwo nextStep={this.nextStep} />
    </CenteredLayout>
  );

  renderFormThree = () => (
    <CenteredLayout title="Ваши предпочтения">
      <RegisterFormThree nextStep={this.nextStep} />
    </CenteredLayout>
  );

  render() {
    const { registerStep } = this.UIstore;
    console.log(registerStep);

    switch (registerStep) {
      case 1:
        return this.renderFormOne();
      case 2:
        return this.renderFormTwo();
      case 3:
        return this.renderFormThree();
      default:
        return <div> Редирект на следующую страницу </div>;
    }
  }
}

export default withRouter(Register);
