import React from "react";
import {BrowserRouter, Route, Switch, withRouter, useHistory } from "react-router-dom";
import * as auth from '../auth';

import Header from './Header.js'
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ErrorPopup from "./ErrorPopup";
import CardDeletePopup from "./CardDeletePopup";
import Loader from "./Loader";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState('');
    const [pageLoader, setPageLoader] = React.useState(true);
    const [isSaving, setIsSaving] = React.useState(false);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
    const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
    const [currentCard, setCurrentCard] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isLoginPageActive, setIsLoginPageActive] = React.useState(true);
    const [userEmail, setUserEmail] = React.useState('');

    const history = useHistory();

    React.useEffect(() => {
       Promise.all([api.getUserInfo(), api.getInitialCards()])
           .then(([userInfo, cards]) => {
               setCurrentUser(userInfo);
               setCards(cards);
           })
           .catch((res) =>  {
               setIsErrorPopupOpen(true);
           })
           .finally(() => {
               setPageLoader(false)
           });
    }, [])

    React.useEffect(() => {
        function checkToken() {
            if(localStorage.getItem('token')) {
                const token = localStorage.getItem('token');

                if(token) {
                    auth.getUserData(token)
                        .then((res) => {
                            if(res.data) {
                                setUserEmail(res.data.email);
                                setLoggedIn(true);
                                history.push('/main');
                            }
                        })
                }
            }
        }
        checkToken();

    }, [history, loggedIn])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

   function handleCardClick(card) {
        setSelectedCard({
            link: card.link,
            name: card.name
        });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((res) =>  {
                console.log(`Ошибка ${res.status}, попробуйте еще раз`);
            });
    }

    function handleCardDelete(card) {
       setIsDeleting(true);

           api.deleteCard(card._id).then(() => {
               const newCards = cards.filter((item) => {return item._id !== card._id})
               setCards(newCards);
           })
               .catch((res) =>  {
                   console.log(`Ошибка ${res.status}, попробуйте еще раз`);
               })
               .finally(() => {
                   setIsCardDeletePopupOpen(false);
                   setIsDeleting(false);
               });
       }

    function handleDeleteCardPopup(card) {
       setIsCardDeletePopupOpen(true);
       setCurrentCard(card);
    }

    function handleDeleteCardConfirm() {
       handleCardDelete(currentCard);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
        setIsErrorPopupOpen(false);
        setIsCardDeletePopupOpen(false);
        setIsInfoTooltipOpen(false);
    }

   function handleUpdateUser(object) {
       setIsSaving(true);

       api.changeUserInfo(object).then((user) => {
           setCurrentUser(user);
       })
           .catch((res) =>  {
               console.log(`Ошибка ${res.status}, попробуйте еще раз`);
           })
           .finally(() => {
               setIsEditProfilePopupOpen(false);
               setIsSaving(false);
           });
    }

    function handleUpdateAvatar(object) {
       setIsSaving(true);

       api.getNewUserPic(object).then((avatar) => {
           setCurrentUser(avatar);
       })
           .catch((res) =>  {
               console.log(`Ошибка ${res.status}, попробуйте еще раз`);
           })
           .finally(() => {
               setIsEditAvatarPopupOpen(false);
               setIsSaving(false);
           });
    }

    function handleAddPlace(object) {
        setIsSaving(true);

        api.addNewCard(object).then((newCard) => {
            setCards([newCard, ...cards]);

        })
            .catch((res) =>  {
                console.log(`Ошибка ${res.status}, попробуйте еще раз`);
            })
            .finally(() => {
                setIsAddPlacePopupOpen(false);
                setIsSaving(false);
            });
    }

    function handleLogin(status) {
        if(status) {
            setLoggedIn(true);
        } else {
            setIsInfoTooltipOpen(true);
        }

    }

    function handleSignOut() {
       setLoggedIn(false);
       setUserEmail('');
    }

    function handleLoginActive() {
        setIsLoginPageActive(true)
    }

    function handleLoginInactive() {
        setIsLoginPageActive(false);
    }

    function handleRegister(status) {
        if(status) {
            setIsRegisterSuccess(true);
            setIsInfoTooltipOpen(true);
            setIsLoginPageActive(true);
        } else {
            setIsRegisterSuccess(false);
            setIsInfoTooltipOpen(true);
        }
    }

  return (
      <BrowserRouter>
          <Switch>
      <CurrentUserContext.Provider value={currentUser}>

          <div className="page">
              <Header loggedIn={loggedIn} isLoginActive={isLoginPageActive} onSignOut={handleSignOut}
                      userEmail={userEmail} handleLoginActive={handleLoginActive}
                      handleLoginInactive={handleLoginInactive}/>
              <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick}
                              onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
                              onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike}
                              onCardDelete={handleCardDelete} onDelete={handleDeleteCardPopup}/>
              <Route exact path="/sign-in">
                  <Login onLogin={handleLogin}/>
              </Route>
              <Route exact path="/sign-up">
                  <Register handleLoginActive={handleLoginActive} onRegister={handleRegister}/>
              </Route>
              <Footer />
              <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} success={isRegisterSuccess} />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSaving={isSaving}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSaving={isSaving}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} isSaving={isSaving}/>
              <CardDeletePopup isOpen={isCardDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleDeleteCardConfirm} isDeleting={isDeleting}/>
              <ImagePopup name={`image`} card={selectedCard} onClose={closeAllPopups} />
              <ErrorPopup isOpen={isErrorPopupOpen} onClose={closeAllPopups} />
              <Loader isLoading={pageLoader}/>
          </div>

      </CurrentUserContext.Provider>
          </Switch>
      </BrowserRouter>
      );
}

export default withRouter(App);
