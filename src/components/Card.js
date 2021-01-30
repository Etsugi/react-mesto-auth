import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = (props.card.owner._id || props.card.owner) === user._id;
  const cardDeleteButtonClassName = (`element__trash-button ${isOwn ? '' : 'element__trash-button-disabled'}`);
  const isLiked = props.card.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`);  

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onConfirm(props.card);
  }

  return (
    <article className="element">
      <img onClick={handleClick} className="element__image" alt={props.card.name} src={props.card.link} />
      <div className="element__group">
        <p className="element__text">{props.card.name}</p>
        <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}>
          <p className="element__like-counter">{props.likeCounter}</p>
        </button>
      </div>
      <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName}></button>
    </article>
  );
}

export default Card;