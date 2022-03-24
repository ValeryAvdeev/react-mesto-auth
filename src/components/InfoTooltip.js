import React from "react";

function InfoTooltip(props) {
  return(
    <div className='register'>
      <form className={`form-sing form-sing_${props.name}`} name='sing'>
        <h2 className='register__title'>{props.title}</h2>
        <button type="submit" className="form-sing__submit">
          {props.submit}
        </button>
      </form>
    </div>
  )
}

export default InfoTooltip;