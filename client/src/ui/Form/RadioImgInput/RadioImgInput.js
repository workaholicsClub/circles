import React from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import cn from 'classnames';

import TitleWrapper from '../TitleWrapper';

const InputsWrapper = styled.div.attrs({
  className: props =>
    (props.image
      ? 'btn-group btn-group-toggle full-width'
      : 'btn-group btn-group-toggle btn-group-lg pb-2 align-items-center justify-content-center'),
})`
  width: 100%;
`;

const Label = styled.label`
  ${props =>
    (props.image
      ? `width: 128px;
    height: 128px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 96px;
    background-image: url(${props.image}) !important;`
      : `width: 100%
      
      `)};
`;

const RadioInput = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;

@observer
class RadioImgInput extends React.Component {
  constructor(props) {
    super(props);
    this.parentChangeHandler = props.onChange;
  }

  @observable activeInput = ''

  @action changeButtonHandler = (event) => {
    const { target } = event;

    this.activeInput = target.value;
    if (this.parentChangeHandler) {
      this.parentChangeHandler(event);
    }
  }

  renderTitle = (title) => {
    if (title) {
      return (
        <TitleWrapper title={title} />
      );
    }
    return null;
  }

  renderInputField = (item, name) => {    
    const lebelCn = cn('btn btn-outline-primary', {
      active: this.activeInput === item.value,
    });

    return (
      <Label
        key={`label for ${item.value}`}
        className={lebelCn}
        image={item.image}
        onChange={e => this.changeButtonHandler(e)}
      >
        {item.text}
        <RadioInput name={name} value={item.value} />
      </Label>
    );
  }

  render() {
    const { items, title, name } = this.props;

    return (
      <React.Fragment>
        {title && this.renderTitle(title)}
        <InputsWrapper
          className="btn-group"
          image={title}
          htmlDataToggle="buttons"
        >
          {items.map(item => this.renderInputField(item, name))}
        </InputsWrapper>
      </React.Fragment>
    );
  }
}

RadioImgInput.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
};

RadioImgInput.defaultProps = {
  title: '',
};

export default RadioImgInput;
