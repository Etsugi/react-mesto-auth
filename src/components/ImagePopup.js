function ImagePopup(props) {
  return (
    <div className={`popup ${props.card && 'popup_opened'}`} id={props.name}>
        <div className="popup__image-container">
          <img className="popup__image" alt={props.card.name} src={`${props.card.link}`} />
          <p className="popup__image-description">{props.card.name}</p>
          <button type="button" onClick={props.onClose} className="popup__close-button"></button>
        </div>
        <div onClick={props.onClose} className="popup__overlay popup__overlay_for-image"></div>
    </div>
  );
}

export default ImagePopup;