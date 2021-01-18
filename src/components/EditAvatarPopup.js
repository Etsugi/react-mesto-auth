import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    avatarRef.current.value = '';
    setButtonText('Сохранить');
  }, [props.isOpen]); 

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
