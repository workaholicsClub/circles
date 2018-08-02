import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

// import womanPic from './woman-with-dress.svg';
// import manPic from './man.svg';

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
      : 'width: 100%')};
`;

const RadioInput = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;

class RadioImgInput extends React.Component {
  constructor(props) {
    super(props);
    this.parentChangeHandler = props.onChange;
    this.state = { active: '' };
  }

  changeButtonHandler = (event) => {
    const { target } = event;

    this.setState({ active: target.value });
    if (this.parentChangeHandler) {
      this.parentChangeHandler(event);
    }
  }

  renderTitle = (title) => {
    if (title) {
      return (
        <div className="row">
          <label className="col">{title}</label>
        </div>
      );
    }
    return null;
  }

  renderInputField = (item, name) => {
    const lebelCn = cn('btn btn-lg btn-outline-primary ', {
      active: this.state.active === item.value,
    });

    return (
      <Label
        key={`label for ${item.value}`}
        className={lebelCn}
        image={item.image}
        onChange={e => this.changeButtonHandler(e)}
      >
        {!item.image && item.value}
        <RadioInput name={name} value={item.value} />
      </Label>
    );
  }

  render() {
    const { items, title, name } = this.props;

    return (
      <InputsWrapper
        className="btn-group"
        image={title}
        htmlDataToggle="buttons"
      >
        {title && this.renderTitle(title)}
        {items.map(item => this.renderInputField(item, name))}
      </InputsWrapper>
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
