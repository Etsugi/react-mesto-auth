import React from 'react';
import api from '../utils/Api.js';
import Card from "./Card.js";
import kusto from '../images/kusto.jpg';

function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription  , setUserDescription] = React.useState("Исследователь океана");
  const [userAvatar, setUserAvatar] = React.useState(kusto);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const initialData = api.getAllData();
    initialData.then((data => {
      const [userData, card] = data;
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      setCards(card);
      })
    )
    .then(() => {
      document.querySelector('.content').classList.remove('content-disabled');
    })
    .catch((err) => {
      alert(err);
    });
  }, [])


  return (
    <main className="content content-disabled">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" alt="Фото профиля" src={userAvatar} />
          <button type="button" onClick={props.onEditAvatar} className="profile__avatar-update-button"></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-group">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" onClick={props.onEditProfile} 
              className="profile__edit-button" id="edit-profile"></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button type="button" onClick={props.onAddPlace} className="profile__add-button" id="add-card"></button>
      </section>
      <section className="elements" id="elements">
        {cards.map(card => 
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            likeCounter={card.likes.length}
            //isLike={isEditProfilePopupOpen}
            //onDelete={closeAllPopups}
          />        
        )}
      </section>
    </main>
  );
}

export default Main;