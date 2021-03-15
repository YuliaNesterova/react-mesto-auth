import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import * as auth from "../auth";

function Login(props) {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    const history = useHistory();

    function handleEmailChange(e) {
        emailRef.current.value = e.target.value;
    }

    function handlePasswordChange(e) {
        passwordRef.current.value = e.target.value;
    }

    function handleSubmit(e){
        e.preventDefault();

        if (!emailRef.current.value || !passwordRef.current.value){
            return;
        }

    auth.authorize(passwordRef.current.value, emailRef.current.value)
        .then((data) => {
            if(data.token) {
                emailRef.current.value = '';
                passwordRef.current.value = '';

                props.onLogin(true);
                history.push('/main');
            }
        })
        .catch((err) => {
            console.log(err);
            props.onLogin(false)
        })
}

    return (
        <section className="data data_type_login">
            <div className="data__container data__container_type_login">
                <h2 className="data__title data__header_type_login">Вход</h2>
                <form name="login-form" className="data__form data__form-type_login" onSubmit={handleSubmit}>
                    <input className="data__input data__input_type_register" placeholder="Email"
                           name="email" id="email" type="email"
                           ref={emailRef} onChange={handleEmailChange}
                           required/>
                    <input className="data__input data__input_type_register" placeholder="Пароль"
                           name="password" id="password" type="password"
                           ref={passwordRef} onChange={handlePasswordChange}
                           required/>
                    <button type="submit" className="data__button data__button_type_login">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default withRouter(Login);
