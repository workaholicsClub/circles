import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { RadioImgInput, BasicInput, Textarea } from '../../ui/Form';

const ProfilePersonalDataForm = (props) => {
  const { dirty, isSubmitting, handleSubmit } = props;

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-body">
          <RadioImgInput
            title="Статус"
            name="status"
            items={[
              { value: 'search', text: 'В поиске' },
              { value: 'married', text: 'В браке' },
              { value: 'complicated', text: 'Все сложно' },
            ]}
          />
          <RadioImgInput
            title="Цель"
            name="aim"
            items={[{ value: 'couple', text: 'Найти пару' }, { value: 'chat', text: 'Поболтать' }]}
          />
          <RadioImgInput
            title="Образование"
            name="education"
            items={[
              { value: 'base', text: 'Начальное' },
              { value: 'middle', text: 'Среднее' },
              { value: 'high', text: 'Высщее' },
            ]}
          />
          <BasicInput
            type="text"
            name="phone"
            title="Телефон для связи"
            note="Мы покажем этот телефон понравившимся людям с вашего согласия"
          />
          <Textarea
            name="about"
            title="О себе"
            note="Расскажите о себе в свободной форме. Что вам нравится? Как вы проводите свободное время?"
          />
          <button
            disabled={!dirty || isSubmitting}
            className="btn btn-primary btn-block btn-lg"
            type="submit"
          >
            Продолжить
          </button>
        </div>
      </div>
    </form>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    status: '',
    aim: '',
    education: '',
    phone: '',
    about: '',
  }),
  validationSchema: Yup.object().shape({
    status: Yup.string().required('Укажите статус'),
    aim: Yup.string().required('Укажите цель'),
    education: Yup.string().required('Укажите образование'),
    phone: Yup.string().required('Укажите телефон'),
    about: Yup.string()
      .min(10, 'Введите больше информации')
      .required('Расскажите о себе'),
  }),
  handleSubmit: async (values, { setTouched, setSubmitting, props: { nextStep } }) => {
    setSubmitting(false);
    setTouched(true);
    nextStep(values);
  },
  displayName: 'ProfilePersonalDataForm',
});

export default formikEnhancer(ProfilePersonalDataForm);
