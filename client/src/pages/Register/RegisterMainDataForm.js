import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import manPic from './images/man.svg';
import womanPic from './images/woman-with-dress.svg';

import { RadioImgInput, BasicInput, SubmitButton } from '../../ui/Form';

const RegisterMainDataForm = (props) => {
  const { dirty, isSubmitting, handleSubmit } = props;

  return (
    <form className="" onSubmit={handleSubmit}>
      <RadioImgInput
        name="sex"
        items={[{ image: womanPic, value: 'woman' }, { image: manPic, value: 'male' }]}
      />

      <BasicInput name="email" title="Электронная почта" />
      <BasicInput name="username" title="Имя" placeholder="Введите полные имя и фамилию" />
      <BasicInput type="date" name="birthday" title="Дата рождения" />

      <SubmitButton disabled={!dirty || isSubmitting} text="Зарегистрироваться" />
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
  displayName: 'RegisterMainDataForm',
});

export default formikEnhancer(RegisterMainDataForm);
