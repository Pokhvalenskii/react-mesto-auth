import logo from '../images/logo.svg'
import { Link, useHistory } from "react-router-dom";
import InfoTooltip from './InfoTooltip.js';
import { useState } from 'react';
import Header from './Header.js'


function Register(props) {

  const history = useHistory();
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');


  function handlePushLogin() {
    history.push('/sign-in');
  }

  function handleChandeUserPassword (e) {
    setUserPassword(e.target.value);
  }
  function handleChandeUserEmail (e) {
    setUserEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(userEmail, userPassword);
  }
  return(
    <>
      <Header>
        <p className="header__sign-up" onClick={handlePushLogin}>Войти</p>
      </Header>
      <form className="log-in" onSubmit={handleSubmit}>
        <h2 className="log-in__title">Регистрация</h2>
        <input className="log-in__input" type="email" minLength="5" maxLength="40" placeholder="Email" required value={userEmail} onChange={handleChandeUserEmail}/>
        <input className="log-in__input" type="password" minLength="6" maxLength="40" placeholder="Пароль" required value={userPassword} onChange={handleChandeUserPassword}/>
      <button className="log-in__submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="log-in__subtitle">Уже зарегистрированы? <Link to='/sign-in' className="log-in__subtitle">Войти</Link></p>
    </>
  )
}

export default Register;