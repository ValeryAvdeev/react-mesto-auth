import React from "react";

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ?
      `popup popup_element_${props.name} popup_open`
      : `popup popup_element_${props.name}`}
    >
      <div
        className="popup__overlay"
        onClick={props.onClose}
      ></div>
      <div className="popup__content">
        <button
          type="button"
          aria-label="Кнопка закрытия редактора формы"
          className="popup__close"
          onClick={props.onClose}
        />
        <form name="popup"
              className={`form form_element_${props.name}`}
              onSubmit={props.onSubmit}
        >
          <h3 className="form__title">
            {props.title}
          </h3>
          {props.children}
          <button type="submit" className="form__submit">
            {props.submit}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;