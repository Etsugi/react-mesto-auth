import React from 'react';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAuthorization({
      email,
      password
    });
  }

  return (
    <form className="sign__form" onSubmit={handleSubmit} noValidate>
      <h2 className="sign__title">Вход</h2>
      <input onChange={handleEmailChange} defaultValue={''} type="text" name="email" placeholder="Email" maxLength="50" 
        className="sign__input" required />
      <input onChange={handlePasswordChange} defaultValue={''} type="password" autoComplete="on" name="password" placeholder="Пароль" 
        className="sign__input" required />
      <button className="sign__button" type="submit">Войти</button>
    </form>
  );
}

export default Login;