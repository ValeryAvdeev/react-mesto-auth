import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='register'>
      <h2 className='register__title'>Регистрация</h2>
      <form
        className='register__form'
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="title"
          minLength="2"
          maxLength="30"
          placeholder="Почта"
          // className="register__form__input form__input_name"
          id="username"
          required
          onChange={handleEmail}
          value={email}
        />
        <span className="error" id="place-name-error"></span>
        <input
          type="password"
          name="password"
          placeholder="Электронная почта"
          // className="form__input form__input_popup_image"
          id="password"
          required
          onChange={handlePassword}
          value={password}
        />
        <button type="submit" className="form-sing__submit">
          Зарегистрироваться
        </button>
      </form>
        <div className='register__singnin'>
          <p>Уже зарегистрированы?</p>
          <Link to='login' className='register__login-link'>Войти</Link>
        </div>
      </div>
    // <div className='register'>
    //   <form className='form-sing' name='register'>
    //     <h2 className='register__title'>Регистрация</h2>

    //     <span className="error" id="place-image-error"></span>
    //     <button type="submit" className="form__submit">
    //       {props.submit}
    //     </button>
    //   </form>
    // </div>
  )
}

export default Register;