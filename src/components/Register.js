import React from 'react';

export default function Register() {

    return (
        <section className="data data_type_register">
            <div className="data__container data__container_type_register">
                <h2 className="data__title data__header_type_register">Регистрация</h2>
                <form name="login-form" className="data__form data__form-type_register">
                    <input type="text" className="data__input data__input_type_register" name="login" placeholder="Email" id="email-input"/>
                    <input type="text" className="data__input data__input_type_register" name="password" placeholder="Пароль" id="password-input"/>
                    <button type="submit" className="data__button data__button_type_register">Зарегистрироваться</button>
                </form>
                <h3 className="data__subtitle">Уже зарегистрированы? <a className="data__link" href="">Войти</a></h3>
            </div>
        </section>
    )
}