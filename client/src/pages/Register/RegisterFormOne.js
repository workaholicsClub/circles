import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import manPic from './images/man.svg';
import womanPic from './images/woman-with-dress.svg';

import { RadioImgInput, BasicInput } from '../../ui/Form';

const RegisterFormOne = (props) => {
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
      <RadioImgInput
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.sex}
        name="sex"
        items={[{ image: womanPic, value: 'woman' }, { image: manPic, value: 'male' }]}
      />
      {errors.sex && touched.sex && <div style={{ color: 'red' }}>{errors.sex}</div>}
      <div className="form-group">
        <BasicInput
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          type="text"
          name="email"
          title="Электронная почта"
        />
        {errors.email && touched.email && <div style={{ color: 'red' }}> {errors.email}</div>}
      </div>

      <div className="form-group">
        <BasicInput
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          type="text"
          name="username"
          title="Имя"
          placeholder="Введите полные имя и фамилию"
        />
        {errors.username &&
          touched.username && <div style={{ color: 'red' }}> {errors.username}</div>}
      </div>
      <div className="form-group">
        <BasicInput
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.birthday}
          type="date"
          name="birthday"
          title="Дата рождения"
        />
        {errors.birthday &&
          touched.birthday && <div style={{ color: 'red' }}> {errors.birthday}</div>}
      </div>
      <button
        disabled={!dirty || isSubmitting}
        className="btn btn-primary btn-block btn-lg"
        type="submit"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    username: '',
    birthday: '',
    email: '',
    sex: '',
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Введите имя'),
    email: Yup.string()
      .email('Введите верный e-mail')
      .required('Введите e-mail'),
    sex: Yup.string().required('Выберете пол'),
    birthday: Yup.date().required('Укажите дату рождения'),
  }),
  handleSubmit: async (values, { setTouched, setSubmitting, props: { nextStep } }) => {
    setSubmitting(false);
    setTouched(true);
    nextStep(values);
  },
  displayName: 'RegisterForm',
});

export default formikEnhancer(RegisterFormOne);
