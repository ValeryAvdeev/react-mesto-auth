import {useContext} from "react";
import editAvatar from '../images/avatar__edit.png'
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="avatar">
          <img
            src={currentUser?.avatar}
            alt="фотография профиля."
            className="avatar__image"
          />
          <div
            className="avatar__over"
            onClick={props.onEditAvatar}
          >
            <img
              src={editAvatar}
              alt="редактирование аватар"
              className="avatar__edit"
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title profile__title_popup_name">
            {currentUser?.name}
          </h1>
          <button
            type="button"
            aria-label="Кнопка редактирования профиля"
            className="button button_item_edit"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle profile__subtitle_popup_job">
            {currentUser?.about}
          </p>
        </div>
        <button
          type="button"
          aria-label="Кнопка добавления контента"
          className="button button_item_add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places">
        {
          props.cards.map((i) => {
            return (<Card key={i._id}
                  onCardClick={props.onCardClick}
                  card={i}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
            />)
          })
        }
      </section>
    </main>
  )
};

export default Main;