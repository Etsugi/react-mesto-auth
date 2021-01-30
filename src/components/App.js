import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from './EditProflePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import api from '../utils/Api.js';
import auth from '../utils/Auth.js';

function App() {
  const history = useHistory();

  const [token, setToken] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    checkAuthorize();
  }, []);

  function checkAuthorize() {
    const token = localStorage.getItem('jwt');
    if (localStorage.getItem('jwt')){
      setToken(token);
      auth.checkToken(token)
      .then((data) => {
        if(data === 401) {
          console.log("Токен не передан или передан не в том формате!");
        }
        else {
          initialCurrentUser(token);
          initialCards(token);
          setLoggedIn(true);
          setUserEmail(data.email);
          history.push("/");
        }
      })
    }
  }

  const [tooltipState, setTooltipState] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);

  function initialCurrentUser(token) {
    const initialCurrentUser = api.getUserInfo(token);
    initialCurrentUser.then((data => {
      const userData = data;
      setCurrentUser(userData);
      })
    )
    .then(() => {
      setProfile('content');
    })
    .catch((err) => {
      alert(err);
    });
  }
  function initialCards(token) {
    const initialCard = api.getCards(token);
    initialCard.then((data => {
      const card = data;
      setCards(card);
      })
    )
    .catch((err) => {
      alert(err);
    });
  }

  const [profile, setProfile] = React.useState('content content-disabled');
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [confirmElement, setConfirmElement] = React.useState('');

  function clickRegistration(data) {
    setTooltipState({
      state: false,
      text: "Что-то пошло не так! Попробуйте ещё раз.",
      alt: "Иконка неудачной регистрации"
    })
    auth.register(data)
    .then((data) => {
      if(data === 400) {
        setInfoTooltipPopupOpen(true);
        console.log('Некорректно заполнено одно из полей из полей!');
      }if(data === 409) {
        setInfoTooltipPopupOpen(true);
        console.log('Некорректно заполнено одно из полей из полей!');
      }
      else {
        setTooltipState({
          state: true,
          text: "Вы успешно зарегистрировались!",
          alt: "Иконка успешной регистрации"
        })
        clickInfoTooltipPopupOpen();
        history.push("/sign-in");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function clickAutorization(data) {
    setTooltipState({
      state: false,
      text: "Что-то пошло не так! Попробуйте ещё раз.",
      alt: "Иконка неудачной авторизации"
    })
    auth.authorize(data)
    .then((data) => {
      if(data === 400) {
        clickInfoTooltipPopupOpen();
        console.log('Не передано одно из полей!');
      }
      else if(data === 401) {
        clickInfoTooltipPopupOpen();
        console.log('Пользователь с таким email не найден!');
      }
      else {
        localStorage.setItem('jwt', data.token);
        checkAuthorize();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function clickSignOut() {
    setToken('');
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }
  function clickInfoTooltipPopupOpen() {
    setInfoTooltipPopupOpen(true);
  }
  function clickEditProfilePopupOpen() {
    setEditProfilePopupOpen(true);    
  }
  function clickEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(true);
  }
  function clickAddPlacePopupOpen() {
    setAddPlacePopupOpen(true);
  }
  function clickImagePopupOpen(card) {
    setSelectedCard(card);
  }
  function clickConfirmPopupOpen(card) {
    setConfirmElement(card);
    setConfirmPopupOpen(true);
  }
  function closeAllPopups() {
    setInfoTooltipPopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard('');
    setConfirmElement('');
  }

  function handleUpdateUser(userData) {
    api.updateUserInfo(userData, token).then((userData) => {
      setCurrentUser(userData);
    })
    .then(() => {
      closeAllPopups();

    })
    .catch((err) => {
      alert(err);
    });
  }

  function handleUpdateAvatar(userData) {
    api.updateUserAvatar(userData, token).then((userData) => {
      setCurrentUser(userData);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      alert(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked, token).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      alert(err);
    });
  } 

  function handleConfirm() {
    handleCardDelete(confirmElement);
  }

  function handleCardDelete(card) {
    api.deleteCard(card, token).then(() => {
      const newCards = cards.filter((item) => !(item._id === card._id));
      setCards(newCards);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      alert(err);
    });
  } 

  function handleAddPlace(card) {
    api.addCard(card, token).then((card) => {
      setCards([card, ...cards]);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      alert(err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <Header 
        loggedIn={loggedIn}
        userEmail={userEmail}
        onSignOut={clickSignOut}
      />
      <Switch>
        <Route path="/sign-up">
          <Register 
            onRegistration={clickRegistration}
          />
        </Route>
        <Route path="/sign-in">
          <Login 
            onAuthorization={clickAutorization}
          />
        </Route>
        <ProtectedRoute
          path="/"
          redirect="/sign-in"
          loggedIn={loggedIn}
          component={Main}
          profile={profile}
          onEditProfile={clickEditProfilePopupOpen}
          onEditAvatar={clickEditAvatarPopupOpen}
          onAddPlace={clickAddPlacePopupOpen}
          onConfirm={clickConfirmPopupOpen}
          cards={cards}
          onCardClick={clickImagePopupOpen}
          onCardLike={handleCardLike}
        />
      </Switch>
      <Footer />
      
      <InfoTooltip
        tooltipState={tooltipState}
        isOpen={isInfoTooltipPopupOpen} 
        onClose={closeAllPopups}
      />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen} 
        onClose={closeAllPopups}
        onConfirm={handleConfirm}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
