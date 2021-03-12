import logo from '../images/logo.svg'

function Header (props) {
  return (
    <header className="header">
      <img className="header__logo-image" src={logo} alt="Mesto Логотип"></img>
      <div className="header__wrapper">
        {props.children}
      </div>
    </header>
  )
}

export default Header;