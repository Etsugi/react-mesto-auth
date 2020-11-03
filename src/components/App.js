import React from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');

  function clickEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  function clickEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  function clickAddPlacePopupOpen() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  function clickImagePopupOpen(card) {
    setSelectedCard(card);
  }
  function clickConfirmPopupOpen() {
    //
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard('');
  }
 
  return (
    <>
      <Header />
      <Main
       onEditProfile={clickEditProfilePopupOpen}
       onEditAvatar={clickEditAvatarPopupOpen}
       onAddPlace={clickAddPlacePopupOpen}
       onCardClick={clickImagePopupOpen}
       onConfirm={clickConfirmPopupOpen}
       >
      </Main> 
      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
          <input type="text" name="name" placeholder="Имя" minLength="2" maxLength="40"
            className="popup__input popup__input_name" required />
          <span className='popup__input_error' id='name-input-error'></span>
          <input type="text" name="about" placeholder="Описание" minLength="2" maxLength="200"
            className="popup__input popup__input_description" required />
          <span className='popup__input_error' id='about-input-error'></span>
      </PopupWithForm>
      <PopupWithForm
        name="edit-avatar-profile"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
          <input type="url" name="avatar" placeholder="Ссылка на картинку"
            className="popup__input popup__input_source" required />
          <span className='popup__input_error' id='avatar-input-error'></span>
      </PopupWithForm>
      <PopupWithForm
        name="add-card"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
          <input type="text" name="title" placeholder="Название" minLength="1" maxLength="30"
            className="popup__input popup__input_title" required />
          <span className='popup__input_error' id='title-input-error'></span>
          <input type="url" name="source" placeholder="Ссылка на картинку"
            className="popup__input popup__input_source" required />
          <span className='popup__input_error' id='source-input-error'></span>
      </PopupWithForm>
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
      >
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      >
      </ImagePopup> 

    </>
  );
}

export default App;
