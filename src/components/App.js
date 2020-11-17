import React from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from '../utils/Api.js';
import { CurrentUserContext, ConfirmButtonContext } from './contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProflePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';

function App() {
  let [buttonContext, setButtonContext] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState('');
  React.useEffect(() => {
    const initialCurrentUser = api.getUserInfo();
    initialCurrentUser.then((data => {
      const userData = data;
      setCurrentUser(userData);
      })
    )
    .then(() => {
      document.querySelector('.content').classList.remove('content-disabled');
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

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [confirmElement, setConfirmElement] = React.useState('');

  function clickEditProfilePopupOpen() {
    setButtonContext('Сохранить');
    setEditProfilePopupOpen(!isEditProfilePopupOpen);    
  };
  function clickEditAvatarPopupOpen() {
    setButtonContext('Сохранить');
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  function clickAddPlacePopupOpen() {
    setButtonContext('Создать');
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  function clickImagePopupOpen(card) {
    setSelectedCard(card);
  }
  function clickConfirmPopupOpen(card) {
    setButtonContext('Да');
    setConfirmElement(card);
    setConfirmPopupOpen(!isConfirmPopupOpen);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard('');
    setConfirmElement('');
    setButtonContext('');
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
      const newCards = cards.concat(card);
      setCards(newCards);
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
      <Header />
      <Main
       onEditProfile={clickEditProfilePopupOpen}
       onEditAvatar={clickEditAvatarPopupOpen}
       onAddPlace={clickAddPlacePopupOpen}
       onConfirm={clickConfirmPopupOpen}
       cards={cards}
       onCardClick={clickImagePopupOpen}
       onCardLike={handleCardLike}
       >
      </Main> 
      <Footer />

      <ConfirmButtonContext.Provider value={buttonContext} >
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
      </ConfirmButtonContext.Provider>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      >
      </ImagePopup> 

    </CurrentUserContext.Provider>
  );
}

export default App;
