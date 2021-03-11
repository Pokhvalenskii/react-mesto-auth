import { useState, useContext, useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function EditAvatarPopup(props) {
  const urlRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.updateAvatar(urlRef.current.value);
  }

  return(
    <PopupWithForm
    name='popup-profile-edit'
    title='Обновить аватар'
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}>
      <input id="add-urle" className="popup__input popup__input_place_up" type="url" name="ImageLink" placeholder="Ссылка на картинку" required ref={urlRef}/>
      <span id="add-urle-error" className="error"></span>
      <button className="popup__btn-save popup__btn-save_state_valid" type="submit">Да</button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;