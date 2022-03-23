import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {useState, useEffect} from "react";
import Api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =useState(false);

  const [ currentUser, setCurrentUser ] = useState(null);
  const [ cards, setCards ] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cards) => setSelectedCard(cards);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleEditProfile = () => setIsEditProfilePopupOpen(true);

  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  useEffect(() => {
    Api.getUser()
      .then(res => {
        setCurrentUser(res)
      })
      .then(() => {
        Api.getCards()
          .then(card => setCards(card))
          .catch(err => console.log(`Ошибка в App.js при создании карточек ${err}`))
      })
      .catch(err => console.log(`Ошибка в App.js при запросе информации о пользователе ${err}`))
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка в App.js при лайку карточки ${err}`))
  }

  const handleCardDelete = (card) => {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((i) => i._id !== card._id)
        })
      })
      .catch(err => console.log(`Ошибка в App.js при удалении карточки ${err}`))
  }

  const handleUpdateUser = (currentUser) => {

    Api.editProfile({name: currentUser.name, info: currentUser.about})
      .then(user => setCurrentUser(user))
      .catch(err => console.log(`Ошибка в App.js при редактировании информации о user ${err}`))

    setIsEditProfilePopupOpen(false);
  }

  const handleUpdateAvatar = (newAvatar) => {

    Api.editAvatar(newAvatar)
      .then((avatar) => setCurrentUser(avatar))
      .catch(err => console.log(`Ошибка в App.js при редактировании информации о user ${err}`));

    setIsEditAvatarPopupOpen(false);
  }

  const handleAddPlaceSubmit = (obj) => {
    Api.addCard({name: obj.name, link: obj.link})
      .then((newCard) => setCards([newCard, ...cards]))
      .catch(err => console.log(`Ошибка в App.js при добавлении карточки ${err}`))

    setIsAddPlacePopupOpen(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
            <Main
              onEditProfile={handleEditProfile}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
      </CurrentUserContext.Provider>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      {/*<PopupWithForm*/}
      {/*  name='delete-card'*/}
      {/*  title='Вы уверены?'*/}
      {/*  submit='Да'*/}
      {/*/>*/}
    </>
  );
}

export default App;