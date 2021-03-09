import React from 'react';
import success from '../images/success.svg';
import errorImage from "../images/error.jpg";

export default function InfoTooltip(props) {
    return (
        <section className={props.isOpen? `popup popup_type_info popup_opened` : `popup popup_type_info`}>
            <div className="popup__container popup__container_type_info">
                <button onClick={props.onClose} className="popup__close-button popup__close-button_type_info"></button>
                <img src={success} className="popup__info-image"/>
                <h2 className="popup__title popup__title_type_info">Вы успешно зарегистрировались!</h2>
            </div>
        </section>
        )


}