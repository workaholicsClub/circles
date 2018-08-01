import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { CenteredLayout } from '../../layouts/CenteredLayout';
import RegisterForm from './RegisterForm';

import profilePic from './blank-profile.svg';

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
    console.log('values are...', values);
    // полсылаем данные и переходим к следующему этапу
    this.UIstore.toggleNextStep();
  };

  renderFirstStep = () => (
    <div className="card">
      <div style={{ padding: '2rem 6rem' }}>
        <img className="card-img-top" src={profilePic} alt="" />
      </div>
      <div className="card-body">
        <RegisterForm nextStep={this.nextStep} />
      </div>
    </div>
  );

  render() {
    const { registerNextStep } = this.UIstore;

    return (
      <CenteredLayout logo title="Регистрация">
        {registerNextStep ? <div> ... </div> : this.renderFirstStep()}
      </CenteredLayout>
    );
  }
}

export default withRouter(Register);
