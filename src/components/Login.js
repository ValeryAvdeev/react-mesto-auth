import React, {useState} from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  return(
    <div className='login'>
      <h2 className='login__title'>Вход</h2>
      <form
        className='login__form'
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="title"
          minLength="2"
          maxLength="30"
          placeholder="Почта"
          className="login__input"
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
          className="login__input"
          id="password"
          required
          onChange={handlePassword}
          value={password}
        />
        <button type="submit" className="login__link">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;