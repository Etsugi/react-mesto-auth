import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user]); 

  React.useEffect(() => {
    setName(user.name);
    setDescription(user.about);
    setButtonText('Сохранить');
  }, [props.isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Загрузка...');
    props.onUpdateUser({
      name,
      about: description,
    });
  }


  return (
    <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonText={buttonText}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
          <input onChange={handleNameChange} value={name || ``} type="text" name="name" placeholder="Имя" minLength="2" maxLength="40"
            className="popup__input popup__input_name" required />
          <span className='popup__input_error' id='name-input-error'></span>
          <input onChange={handleDescriptionChange} value={description || ``} type="text" name="about" placeholder="Описание" minLength="2" maxLength="200"
            className="popup__input popup__input_description" required />
          <span className='popup__input_error' id='about-input-error'></span>
      </PopupWithForm>
  )
}

export default EditProfilePopup;