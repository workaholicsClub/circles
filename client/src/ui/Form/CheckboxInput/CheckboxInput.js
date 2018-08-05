import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';

import TitleWrapper from '../TitleWrapper';
import NoteWrapper from '../NoteWrapper';
import InputFieldWrapper from '../InputFieldWrapper';
import ErrorFiled from '../ErrorField';

class CheckboxInput extends React.Component {
  constructor(props) {
    super(props);
    this.props.values[this.props.name] = [];
  }

  renderCheckboxes = (item, name, arrayHelpers) => (
    <div className="form-check" key={item.value}>
      <label className="form-check-label">
        <input
          className="form-check-input"
          name="categoryIds"
          type="checkbox"
          value={item.value}
          checked={this.props.values[name].includes(item.value)}
          onChange={(e) => {
            if (e.target.checked) arrayHelpers.push(item.value);
            else {
              const idx = this.props.values[name].indexOf(item.value);
              arrayHelpers.remove(idx);
            }
          }}
        />
        {item.text}
      </label>
    </div>
  );

  render() {
    const {
      items, title, name, note,
    } = this.props;

    return (
      <InputFieldWrapper>
        <TitleWrapper title={title} />
        <FieldArray
          name={name}
          render={arrayHelpers =>
            items.map(item => this.renderCheckboxes(item, name, arrayHelpers))
          }
        />
        <NoteWrapper note={note} />
        <ErrorFiled name={name} />
      </InputFieldWrapper>
    );
  }
}

CheckboxInput.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
};

CheckboxInput.defaultProps = {
  title: '',
};

export default CheckboxInput;
