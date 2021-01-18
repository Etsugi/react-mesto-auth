function PopupWithForm(props) {

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.name}>
      <form onSubmit={props.onSubmit} className="popup__form" name={props.name} noValidate>
        <h2 className="popup__form-heading">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__save-button">{props.buttonText}</button>
        <button type="button" onClick={props.onClose} className="popup__close-button" />
      </form>
      <div onClick={props.onClose} className="popup__overlay"></div>
    </div>
  );
}

export default PopupWithForm;
