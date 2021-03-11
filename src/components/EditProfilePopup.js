import { useState, useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function  handleSubmit (e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about : description,
    });
  }

  return (
    <PopupWithForm
    name='popup-profile'
    title='Редактировать профиль'
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    >
      <input id="edit-name" className="popup__input popup__input_place_up" type="text" minLength="2" maxLength="40" name="person_name" placeholder="Имя" required value={name} onChange={handleChangeName}/>
      <span id="edit-name-error" className="error"></span>
      <input id="edit-status" className="popup__input popup__input_place_down" type="text" minLength="2" maxLength="200" name="person_status" placeholder="Статус" required value={description} onChange={handleChangeDescription}/>
      <span id="edit-status-error" className="error"></span>
      <button className="popup__btn-save popup__btn-save_state_valid" type="submit">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;