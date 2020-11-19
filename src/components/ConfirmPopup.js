import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function ConfirmPopup(props) {
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setButtonText('Да');
  }, [props.isOpen]); 

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