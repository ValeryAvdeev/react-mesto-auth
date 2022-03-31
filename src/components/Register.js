import React, {useState} from "react";
import {Link} from "react-router-dom";


function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
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
          minLength="10"
          maxLength="30"
          placeholder="Почта"
          className="register__input"
          id="username"
          required
          onChange={handleEmail}
          value={email || ''}
        />
        <input
          type="password"
          name="password"
          placeholder="Электронная почта"
          className="register__input"
          id="password"
          minLength="4"
          maxLength="40"
          required
          onChange={handlePassword}
          value={password || ''}
        />
        <button type="submit" className="register__link">
          Зарегистрироваться
        </button>
      </form>
      <div className='register__singnin'>
        <p className='register__subtitle'>
          Уже зарегистрированы? <Link
          to='/sing-in'
          className='register__login-link'
        >Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;