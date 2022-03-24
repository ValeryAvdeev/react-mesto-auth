import InfoTooltip from "./InfoTooltip";
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
    <>
      <InfoTooltip
        name='login'
        title='Вход'
        submit='Войти'
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          // minLength="2"
          // maxLength="30"
          placeholder="Email"
          className="form-sing__input form__input_email"
          id="register-email"
          required
          onChange={handleEmail}
          value={email}
        />
        {/*<span className="error" id="place-name-error"></span>*/}
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="form-sing__input form__input_password"
          id="sing-password"
          required
          onChange={handlePassword}
          value={password}
        />
        {/*<span className="error" id="place-image-error"></span>*/}
      </InfoTooltip>
    </>
  )
}

export default Login;