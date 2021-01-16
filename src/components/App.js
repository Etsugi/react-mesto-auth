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

  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    checkAuthorize();
  }, []);

  const [registrationState, setRegistrationState] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState('');
  React.useEffect(() => {
    const initialCurrentUser = api.getUserInfo();
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
  }, [])

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    const initialCard = api.getCards();
    initialCard.then((data => {
      const card = data;
      setCards(card);
      })
    )
    .catch((err) => {
      alert(err);
    });
  }, [])

  const [profile, setProfile] = React.useState('content content-disabled');
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [confirmElement, setConfirmElement] = React.useState('');

  function checkAuthorize() {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((data) => {
        if(data === 401) {
          console.log("Токен не передан или передан не в том формате!");
        }
        else {
          setLoggedIn(true);
          setUserEmail(data.data.email);
          history.push("/");
        }
      })
    }
  }
  function clickRegistration(data) {
    setRegistrationState(false);
    auth.register(data)
    .then((data) => {
      if(data === 400) {
        setInfoTooltipPopupOpen(true);
        console.log('Некорректно заполнено одно из полей из полей!');
      }
      else {
        setRegistrationState(true);
        clickInfoTooltipPopupOpen();
        history.push("/sign-in");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function clickAutorization(data) {
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
    api.updateUserInfo(userData).then((userData) => {
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
    api.updateUserAvatar(userData).then((userData) => {
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
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
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
    api.deleteCard(card).then(() => {
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
    api.addCard(card).then((card) => {
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
        registrationState={registrationState}
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
