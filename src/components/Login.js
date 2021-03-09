import React from 'react';

export default function Login() {

    return (
        <section className="data data_type_login">
            <div className="data__container data__container_type_login">
                <h2 className="data__title data__header_type_login">Вход</h2>
                <form name="login-form" className="data__form data__form-type_login">
                    <input type="text" className="data__input data__input_type_login" name="login" placeholder="Email" id="email-input"/>
                    <input type="text" className="data__input data__input_type_login" name="password" placeholder="Пароль" id="password-input"/>
                    <button type="submit" className="data__button data__button_type_login">Войти</button>
                </form>
            </div>
        </section>
    )
}
