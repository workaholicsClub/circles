import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { CenteredLayout } from '../../layouts/CenteredLayout';

import RegisterMainDataForm from './RegisterMainDataForm';
import PartnerFilterForm from './PartnerFilterForm';
import ProfilePersonalDataForm from './ProfilePersonalDataForm';

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

  renderRegisterMainDataForm = () => (
    <CenteredLayout logo title="Регистрация">
      <div className="card">
        <div style={{ padding: '2rem 6rem' }}>
          <img className="card-img-top" src={profilePic} alt="" />
        </div>
        <div className="card-body">
          <RegisterMainDataForm nextStep={this.nextStep} />
        </div>
      </div>
    </CenteredLayout>
  );

  renderPartnerFilterForm = () => (
    <CenteredLayout title="Дополнительные данные">
      <PartnerFilterForm nextStep={this.nextStep} />
    </CenteredLayout>
  );

  renderProfilePersonalDataForm = () => (
    <CenteredLayout title="Ваши предпочтения">
      <ProfilePersonalDataForm nextStep={this.nextStep} />
    </CenteredLayout>
  );

  render() {
    const { registerStep } = this.UIstore;

    switch (registerStep) {
      case 1:
        return this.renderRegisterMainDataForm();
      case 2:
        return this.renderProfilePersonalDataForm();
      case 3:
        return this.renderPartnerFilterForm();
      default:
        return <div> Редирект на следующую страницу </div>;
    }
  }
}

export default withRouter(Register);
