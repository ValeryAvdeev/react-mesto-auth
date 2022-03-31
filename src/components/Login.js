import React, {useState} from "react";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) =>{
    e.preventDefault();
    props.onLogin(email, password);
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
          minLength="10"
          maxLength="30"
          placeholder="Почта"
          className="login__input"
          id="username"
          required
          onChange={handleEmail}
          value={email || ''}
        />
        <input
          type="password"
          name="password"
          placeholder="Электронная почта"
          className="login__input"
          id="password"
          minLength="4"
          maxLength="40"
          required
          onChange={handlePassword}
          value={password || ''}
        />
        <button type="submit" className="login__link">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;