import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    })

  }


  useEffect(() => {
    if(currentUser){
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

    return (
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        submit='Сохранить'
        isOpen={props.isOpen}
        onClose={props.isClose}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          className="form__input form__input_popup_name"
          id="user-name"
          onChange={handleName}
          value={name || ''}
          required
        />
        <span className="error" id="user-name-error"></span>
        <input
          type="text"
          name="info"
          minLength="2"
          maxLength="200"
          placeholder="Род деятельности"
          className="form__input form__input_popup_job"
          id="user-job"
          onChange={handleDescription}
          value={description || ''}
          required
        />
        <span className="error" id="user-job-error"></span>
      </PopupWithForm>
    )
}

export default EditProfilePopup;