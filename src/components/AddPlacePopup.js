import PopupWithForm from '../components/PopupWithForm.js'
import { useContext, useEffect, useRef, useState} from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleAddCard({
      name: name,
      link: url
    })
    setName('');
    setUrl('');
  }

  return (
    <PopupWithForm
    name='popup-add-card'
    title='Новое место'
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}>
      <input
        id="add-name"
        className="popup__input popup__input_place_up"
        type="text"
        minLength="2"
        maxLength="30"
        name="cardName"
        placeholder="Название"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span id="add-name-error" className="error"></span>
      <input
        id="add-url"
        className="popup__input popup__input_place_down"
        type="url"
        name="cardLink"
        placeholder="Ссылка на картинку"
        required value={url}
        onChange={handleChangeUrl}
      />
      <span id="add-url-error" className="error"></span>
      <button className="popup__btn-save popup__btn-save_state_valid" type="submit">Создать</button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;