import React from "react";

function InfoTooltip(props) {
  return(
    <div className={props.isOpen ?
      `popup popup_open`
      : `popup`}>
      <button
        type="button"
        aria-label="Кнопка закрытия редактора формы"
        className="popup__close"
        onClick={props.onClose}
      />
      <img className='popup__image-status' src={props.image} />
        <h2 className='register__title'>{props.text}</h2>

    </div>
  )
}

export default InfoTooltip;