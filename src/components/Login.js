import React from 'react';
import { Formik, Field, Form } from "formik";
import SignFormSchema from "./FormValidator/SignForm.js";

function Login(props) {

  function handleSubmit(values) {
    props.onAuthorization({
      email: values.email,
      password: values.password
    });
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={SignFormSchema}
      onSubmit={values => {
        handleSubmit(values);
      }}
      render={({ errors }) => (
        <Form className="sign__form" noValidate>
          <h2 className="sign__title">Вход</h2>
          <Field type="email" name="email" placeholder="Email" className="sign__input" />
            {errors.email && <span className='sign__input_error'>{errors.email}</span>}
          <Field type="password" autoComplete="on" name="password" placeholder="Пароль" className="sign__input" />
            {errors.password && <span className='sign__input_error'>{errors.password}</span>}
          <button className={(errors.password || errors.email) ? 'sign__button sign__button_disabled' : 
            'sign__button'} type="submit">Войти</button>
        </Form>
      )}
    />
  );
}

export default Login;