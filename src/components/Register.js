import React from 'react';
import {Link, withRouter, useHistory} from 'react-router-dom';
import * as auth from '../auth';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()

        auth.register(password, email)
            .then((res) => {
                if(res.data) {
                    setEmail('');
                    setPassword('');
                    history.push('/sign-in');
                    props.onRegister(true);
                } else {
                    props.onRegister(false);
                }
            })
    }

    return (
        <section className="data data_type_register">
            <div className="data__container data__container_type_register">
                <h2 className="data__title data__header_type_register">Регистрация</h2>
                <form name="login-form" className="data__form data__form-type_register" onSubmit={handleSubmit}>
                    <input className="data__input data__input_type_register" placeholder="Email"
                           name="email" id="email" type="email"
                           value={email} onChange={handleEmailChange}
                           required/>
                    <input className="data__input data__input_type_register" placeholder="Пароль"
                           name="password" id="password" type="password"
                           value={password} onChange={handlePasswordChange}
                           required/>
                    <button type="submit" className="data__button data__button_type_register">Зарегистрироваться</button>
                </form>
                <h3 className="data__subtitle">Уже зарегистрированы?
                    <Link className="data__link" to="/sign-in" onClick={props.handleLoginActive}> Войти</Link></h3>
            </div>
        </section>
    )
}

export default withRouter(Register);
