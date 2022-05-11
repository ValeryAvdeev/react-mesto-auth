import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props){

  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => props.onCardClick(props.card);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `button ${isOwn ? 'button_item_delete' : 'button_item_delete-none'}`
  );

  const handleLikeClick = () => props.onCardLike(props.card);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`button ${ isLiked ? 'button_item_like-active' : 'button_item_like'}`);
  //
  // console.log(props.card._id)
  const handleCardDelete = () => props.onCardDelete(props.card);

  return (
    <div className="place">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleCardDelete}
      ></button>
      <img
        src={props.card.link}
        alt={props.card.name}

        className="place__image"
        onClick={handleClick}
      />
      <div className="place__content">
        <h2 className="place__title">
          {props.card.name}

        </h2>
        <div className="place__like">
          <button
            type="button"
            // className="button button_item_like"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-amount">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card;