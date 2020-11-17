import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { ConfirmButtonContext } from './contexts/CurrentUserContext.js';

function AddPlacePopup(props) {
  let buttonContext = React.useContext(ConfirmButtonContext);
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setTitle('');
    setLink('');
    setButtonText('Создать');
  }, [buttonContext]); 

  function handleSetTitle(e) {
    setTitle(e.target.value);
  }
  function handleSetLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Загрузка...');
    props.onAddPlace({
      name: title,
      link
    });
  }


  return (
    <PopupWithForm
        name="add-card"
        title="Новое место"
        buttonText={buttonText}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
          <input onChange={handleSetTitle} value={title} type="text" name="title" placeholder="Название" minLength="1" maxLength="30"
            className="popup__input popup__input_title" required />
          <span className='popup__input_error' id='title-input-error'></span>
          <input onChange={handleSetLink} value={link} type="url" name="link" placeholder="Ссылка на картинку"
            className="popup__input popup__input_source" required />
          <span className='popup__input_error' id='source-input-error'></span>
      </PopupWithForm>
  )
}

export default AddPlacePopup;