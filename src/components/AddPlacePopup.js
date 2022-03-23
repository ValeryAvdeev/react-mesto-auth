import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleName = (e) => setName(e.target.value);
  const handleLink = (e) => setLink(e.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link
    });

    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name='place'
      title='Новое место'
      submit='Создать'
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        className="form__input form__input_popup_title"
        id="place-name"
        required
        onChange={handleName}
        value={name}
      />
      <span className="error" id="place-name-error"></span>
      <input
        type="url"
        name="image"
        placeholder="Ссылка на картинку"
        className="form__input form__input_popup_image"
        id="place-image"
        required
        onChange={handleLink}
        value={link}
      />
      <span className="error" id="place-image-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;