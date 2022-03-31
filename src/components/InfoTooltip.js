import React from "react";

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ?
      `popup popup_open`
      : `popup`}>
      <div
        className="popup__overlay"
        onClick={props.isClose}
      />
      <div className="popup__content">
        <button
          type="button"
          aria-label="Кнопка закрытия редактора формы"
          className="popup__close"
          onClick={props.isClose}
        />
        <img className='popup__image-status' src={props.image} alt='картинка'/>
        <h2 className='popup__status'>{props.text}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;