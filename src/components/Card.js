import React from "react";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__delete-button' : 'element__delete-button element__delete-button_hidden'}`
    );

    const cardLikeButtonClassName = `${isLiked ? 'element__like-button element__like-button_clicked' : 'element__like-button'}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onDelete(props.card);
    }

    function handleAuthorShow(e) {
       e.target.previousSibling.classList.add("element__author_shown");
    }

    function handleAuthorHide(e) {
        e.target.previousSibling.classList.remove("element__author_shown");
    }

    return(
        <li className="element" key={props.card._id}>
            <span className="element__author">{props.card.owner.name}</span>
            <img src={props.card.owner.avatar} alt={props.card.owner.name} className="element__card-author"
                 onMouseEnter={handleAuthorShow} onMouseLeave={handleAuthorHide}/>
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick}/>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__description">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}