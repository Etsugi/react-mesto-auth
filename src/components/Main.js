import React from 'react';
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const user = React.useContext(CurrentUserContext);
  return (
    <main className={props.profile}>
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" alt="Фото профиля" src={`${user.avatar}`} />
          <button type="button" onClick={props.onEditAvatar} className="profile__avatar-update-button" />
        </div>
        <div className="profile__info">
          <div className="profile__info-group">
            <h1 className="profile__name">{user.name}</h1>
            <button type="button" onClick={props.onEditProfile} className="profile__edit-button" id="edit-profile" />
          </div>
          <p className="profile__description">{user.about}</p>
        </div>
        <button type="button" onClick={props.onAddPlace} className="profile__add-button" id="add-card" />
      </section>
      <section className="elements" id="elements">
        {props.cards.map(card => 
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            likeCounter={card.likes.length}
            onCardLike={props.onCardLike}
            onConfirm={props.onConfirm}
          />        
        )}
      </section>
    </main>
  );
}

export default Main;