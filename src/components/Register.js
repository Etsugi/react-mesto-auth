import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import SignFormSchema from "./FormValidator/SignForm.js";

function Register(props) {

  function handleSubmit(values) {
    props.onRegistration({
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
          <h2 className="sign__title">Регистрация</h2>
          <Field type="email" name="email" placeholder="Email" className="sign__input" />
            {errors.email && <span className='sign__input_error'>{errors.email}</span>}
          <Field type="password" autoComplete="on" name="password" placeholder="Пароль" className="sign__input" />
            {errors.password && <span className='sign__input_error'>{errors.password}</span>}
          <button className={(errors.password || errors.email) ? 'sign__button sign__button_disabled' : 
            'sign__button'} type="submit">Зарегистрироваться</button>
          <Link to="/sign-in" className="sign__button_dark" type="button">Уже зарегистрированы? Войти</Link>
        </Form>
      )}
    />
  );
}

export default Register;