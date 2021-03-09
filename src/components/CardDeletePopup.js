export default function CardDeletePopup(props) {

    function handleCardDeleteSubmit(evt) {
        evt.preventDefault();

        props.onCardDelete(evt);
    }

    return (
        <section className={props.isOpen ? `popup popup_type_delete popup_opened` : `popup popup_type_delete`}>
            <div className="popup__container popup__container_type_delete">
                <button onClick={props.onClose}
                    className="popup__close-button popup__close-button_type_delete popup__close-button_position_side"></button>
                <h2 className="popup__title">Вы уверены?</h2>
                <form onSubmit={handleCardDeleteSubmit} name="card" className="popup__form popup__form_type_delete">
                    <button className="popup__button popup__button_type_delete" type="submit">{props.isDeleting ? `Удаление...` : `Удалить`}</button>
                </form>
            </div>
        </section>
    )
}