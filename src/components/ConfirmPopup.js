import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { ConfirmButtonContext } from './contexts/CurrentUserContext.js';

function ConfirmPopup(props) {
  let buttonContext = React.useContext(ConfirmButtonContext);
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setButtonText('Да');
  }, [buttonContext]); 

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Загрузка...');
    props.onConfirm();
  }


  return (
    <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText={buttonText}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
      </PopupWithForm>
  )
}

export default ConfirmPopup;