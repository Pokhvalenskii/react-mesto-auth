function ImagePopup (props) {
  const state = props.isOpen ? 'popup_active' : ''
  return (
    <section className={`popup popup-img ${state}`}>
      <div className="popup__overlay"></div>
      <div className="popup-img__wrapper">
        <button className="popup__btn-close" onClick={props.onClose}></button>
        <img className="popup-img__image" src={props.cardData.link} alt="картинка"/>
        <p className="popup-img__subtitle">{props.cardData.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup;