import React from "react";

function ImagePopup(props) {
  return (
    <div className={props.card ?
      `popup popup_element_image popup_open`
      : `popup popup_element_image`}
    >
    >
      <div
        className="popup__overlay popup__overlay_select_image"
        onClick={props.onClose}
      ></div>
      <div className="popup__content popup__content_type_image">
        <button
          type="button"
          aria-label="Кнопка закрытия редактора формы"
          className="popup__close popup__close_place_img"
          onClick={props.onClose}
        ></button>
        <figure className="figure">
          <img
            src={props.card?.link}
            alt={props.card?.name}
            className="figure__image"
          />
          <figcaption className="figure__title">{props.card?.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;