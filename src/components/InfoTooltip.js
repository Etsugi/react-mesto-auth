import React from 'react';

import signImageOk from '../images/sign-ok.svg'
import signImageFail from '../images/sign-fail.svg'

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup-tooltip__container">
        <img className="popup__icon"
          src={props.registrationState ? signImageOk : signImageFail}
          alt={props.registrationState ? 'Иконка успешной регистрации' : 'Иконка неудачной регистрации'}
        />
        <h2 className="popup__message">
          {props.registrationState ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button type="button" onClick={props.onClose} className="popup-tooltip__close-button" />
      </div>
      <div onClick={props.onClose} className="popup__overlay"></div>
    </div>
  )
}

export default InfoTooltip;