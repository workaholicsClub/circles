import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { RadioImgInput, CheckboxInput, SubmitButton } from '../../ui/Form';

import manPic from './images/man.svg';
import womanPic from './images/woman-with-dress.svg';

const PartnerFilterForm = (props) => {
  const { dirty, isSubmitting, handleSubmit } = props;

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-body">
          <RadioImgInput
            name="needSex"
            items={[{ image: womanPic, value: 'woman' }, { image: manPic, value: 'male' }]}
          />
          <CheckboxInput
            {...props}
            name="needStatus"
            title="Предпочитаемый статус партнера"
            items={[
              { value: 'search', text: 'В поиске' },
              { value: 'married', text: 'В браке' },
              { value: 'complicated', text: 'Все сложно' },
            ]}
          />
          <CheckboxInput
            {...props}
            name="needAim"
            title="Предпочитаемая цель партнера"
            items={[{ value: 'couple', text: 'Найти пару' }, { value: 'chat', text: 'Поболтать' }]}
          />
          <CheckboxInput
            {...props}
            name="needEducation"
            title="Предпочитаемое образование партнета"
            items={[
              { value: 'base', text: 'Начальное' },
              { value: 'middle', text: 'Среднее' },
              { value: 'high', text: 'Высшее' },
            ]}
          />
          <SubmitButton disabled={!dirty || isSubmitting} text="Зарегистрироваться" />
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
  displayName: 'PartnerFilterForm',
});

export default formikEnhancer(PartnerFilterForm);
