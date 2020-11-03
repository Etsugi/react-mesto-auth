function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <article className="element">
      <img onClick={handleClick} className="element__image" alt={props.card.name} src={props.card.link} />
      <div className="element__group">
        <p className="element__text">{props.card.name}</p>
        <button type="button" onClick={props.isLike} className="element__like-button">
          <p className="element__like-counter">{props.likeCounter}</p>
        </button>
      </div>
      <button onClick={props.onDelete} type="button" className="element__trash-button"></button>
    </article>
  );
}

export default Card;