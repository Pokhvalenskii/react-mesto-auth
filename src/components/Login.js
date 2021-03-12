import logo from '../images/logo.svg'
import { Link, useHistory } from "react-router-dom";
import InfoTooltip from './InfoTooltip.js';
import { useState } from 'react';
import Header from './Header.js'


function Login(props) {

  const history = useHistory();
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  function handleChandeUserPassword (e) {
    setUserPassword(e.target.value);
  }
  function handleChandeUserEmail (e) {
    setUserEmail(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.handleAuthorize(userEmail, userPassword)
      .then(() => history.push('/'));
  }

  function handlePushRegister() {
    history.push('/sign-up');
  }

  return(
    <>
      <Header>
        <p className="header__sign-up" onClick={handlePushRegister}>Регистрация</p>
      </Header>
      <form className="log-in" onSubmit={handleSubmit}>
        <h2 className="log-in__title">Вход</h2>
        <input className="log-in__input" type="email" minLength="5" maxLength="40" placeholder="Email" required value={userEmail} onChange={handleChandeUserEmail}/>
        <input className="log-in__input" type="password" minLength="6" maxLength="40" placeholder="Пароль" required value={userPassword} onChange={handleChandeUserPassword}/>
      <button className="log-in__submit" type="submit">Войти</button>
      </form>
      <InfoTooltip />
    </>
  )
}

export default Login;