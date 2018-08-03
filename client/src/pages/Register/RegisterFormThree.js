import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { RadioImgInput } from '../../ui/Form';

import manPic from './images/man.svg';
import womanPic from './images/woman-with-dress.svg';

const RegisterFormTwo = (props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
  } = props;

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <RadioImgInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.needSex}
              name="needSex"
              items={[{ image: womanPic, value: 'woman' }, { image: manPic, value: 'male' }]}
            />
            {errors.needSex &&
              touched.needSex && <div style={{ color: 'red' }}>{errors.needSex}</div>}
            <RadioImgInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.needStatus}
              title="Предпочитаемый статус партнера"
              name="needStatus"
              items={[
                { value: 'search', text: 'В поиске' },
                { value: 'married', text: 'В браке' },
                { value: 'complicated', text: 'Все сложно' },
              ]}
            />
            {errors.needStatus &&
              touched.needStatus && <div style={{ color: 'red' }}>{errors.needStatus}</div>}
          </div>
          <div className="form-group">
            <RadioImgInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.needAim}
              title="Предпочитаемая цель партнера"
              name="needAim"
              items={[
                { value: 'couple', text: 'Найти пару' },
                { value: 'chat', text: 'Поболтать' },
              ]}
            />
            {errors.needAim &&
              touched.needAim && <div style={{ color: 'red' }}> {errors.needAim}</div>}
          </div>
          <div className="form-group">
            <RadioImgInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.needEducation}
              title="Предпочитаемый уровень образования партнера"
              name="needEducation"
              items={[
                { value: 'base', text: 'Начальное' },
                { value: 'middle', text: 'Среднее' },
                { value: 'high', text: 'Высщее' },
              ]}
            />
            {errors.needEducation &&
              touched.needEducation && <div style={{ color: 'red' }}> {errors.needEducation}</div>}
          </div>
          <button
            disabled={!dirty || isSubmitting}
            className="btn btn-primary btn-block btn-lg"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    needStatus: '',
    needSex: '',
    needAim: '',
    needEducation: '',
  }),
  validationSchema: Yup.object().shape({
    needSex: Yup.string().required('Укажите предпочитаемый пол'),
    needStatus: Yup.string().required('Укажите предпочитаемый статус'),
    needEducation: Yup.string().required('Укажите предпочитаемое образование'),
    needAim: Yup.string().required('Укажите цель'),
  }),
  handleSubmit: async (values, { setTouched, setSubmitting, props: { nextStep } }) => {
    setSubmitting(false);
    setTouched(true);
    nextStep(values);
  },
  displayName: 'RegisterForm',
});

export default formikEnhancer(RegisterFormTwo);
