import React from 'react';

import tooltipOk from '../images/tooltip-ok.svg'
import tooltipFail from '../images/tooltip-fail.svg'

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup-tooltip__container">
        <img className="popup__icon"
          src={props.tooltipState.state ? tooltipOk : tooltipFail}
          alt={props.tooltipState.alt}
        />
        <h2 className="popup__message">
          {props.tooltipState.text}
        </h2>
        <button type="button" onClick={props.onClose} className="popup-tooltip__close-button" />
      </div>
      <div onClick={props.onClose} className="popup__overlay"></div>
    </div>
  )
}

export default InfoTooltip;