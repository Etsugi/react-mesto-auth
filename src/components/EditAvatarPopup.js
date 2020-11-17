import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { ConfirmButtonContext } from './contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  let buttonContext = React.useContext(ConfirmButtonContext);
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    avatarRef.current.value = '';
    setButtonText('Сохранить');
  }, [buttonContext]); 

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Загрузка...');
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
        name="edit-avatar-profile"
        title="Обновить аватар"
        buttonText={buttonText}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
          <input ref={avatarRef} defaultValue='' type="url" name="avatar" placeholder="Ссылка на картинку"
            className="popup__input popup__input_source" required />
          <span className='popup__input_error' id='avatar-input-error'></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;