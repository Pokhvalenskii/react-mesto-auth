import logo from '../images/logo.svg'

function Header (props) {
  function logout() {
    props.logout()
  }
  return (
    <>
      <header className="header">
        <img className="header__logo-image" src={logo} alt="Mesto Логотип"></img>
        <div className="header__wrapper">
          <p className="header__email">{props.userEmail}</p>
          <p className="header__sign-up" onClick={logout}>Выход</p>
        </div>

      </header>
    </>
  )
}

export default Header;