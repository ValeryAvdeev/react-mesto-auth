import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {useState, useEffect} from "react";
import {api, auth} from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import resolve from "../images/resolve.png";
import reject from "../images/reject.png";


function App() {
  const nav = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({isLoggedIn: false});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [popupImage, setPopupImage] = useState('');
  const [popupText, setPopupText] = useState('');
  const [isInfoToolTip, setIsInfoToolTip] = useState(false)

  const handleCardClick = (cards) => setSelectedCard(cards);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfile = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleIsInfoToolTip = () => setIsInfoToolTip(true);


  useEffect(() => {
    if (currentUser.isLoggedIn) {
      api.getUser()
        .then(res => {
          // setCurrentUser(res)
          setCurrentUser((prev) => {
            return {...prev, ...res}
          });
        })
        .then(() => {
          api.getCards()
            .then(card => setCards(card))
            .catch(err => console.log(`Ошибка в App.js при создании карточек ${err}`))
        })
        .catch(err => console.log(`Ошибка в App.js при запросе информации о пользователе ${err}`))
    }
  }, [currentUser.isLoggedIn])

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка в App.js при лайку карточки ${err}`))
  }

  const handleCardDelete = (card) => {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((i) => i._id !== card._id)
        })
      })
      .catch(err => console.log(`Ошибка в App.js при удалении карточки ${err}`))
  }

  const handleUpdateUser = (currentUser) => {

    api.editProfile({name: currentUser.name, info: currentUser.about})
      .then(user => {
        // setCurrentUser(avatar)
        setCurrentUser(prev => {
          return {...prev, ...user};
        })
      })
      .catch(err => console.log(`Ошибка в App.js при редактировании информации о user ${err}`))

    setIsEditProfilePopupOpen(false);
  }

  const handleUpdateAvatar = (newAvatar) => {

    api.editAvatar(newAvatar)
      .then((avatar) => {
        // setCurrentUser(avatar)
        setCurrentUser(prev => {
          return {...prev, ...avatar}
        })
      })
      .catch(err => console.log(`Ошибка в App.js при редактировании информации о user ${err}`));

    setIsEditAvatarPopupOpen(false);
  }

  const handleAddPlaceSubmit = (obj) => {
    api.addCard({name: obj.name, link: obj.link})
      .then((newCard) => setCards([newCard, ...cards]))
      .catch(err => console.log(`Ошибка в App.js при добавлении карточки ${err}`))

    setIsAddPlacePopupOpen(false);
  }

  const onRegister = (email, password) => {
    auth.registerUser(email, password)
      .then(() => {
        setPopupImage(resolve);
        setPopupText('Вы успешно зарегистрировались!');
        nav('/sing-in');
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupText('Что-то пошло не так!\n' +
          'Попробуйте ещё раз.');
      })
      .finally(handleIsInfoToolTip)
  }

  const onLogin = (email, password) => {
    auth.loginUser(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setCurrentUser((prev) => {
          return {...prev, isLoggedIn: true, email};
        });

        nav('/');
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupText('Что-то пошло не так!\n' +
          'Попробуйте ещё раз.');
        handleIsInfoToolTip();
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.getUser()
        .then((res) => {
          setCurrentUser((prev) => {
            return {...prev, ...res.data, isLoggedIn: true};
          });
        })
        .catch((error) => console.log(error));
    }
  }, [])

  const onSingOut = () => {
    setCurrentUser({isLoggedIn: false});
    nav('/sign-in');
    localStorage.removeItem('jwt');
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsInfoToolTip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/sing-in' element={
            <>
              <Header title='Регистрация' route='/sing-up'/>
              <Login onLogin={onLogin}/>
            </>
          }/>
          <Route path='/sing-up' element={
            <>
              <Header title='Вход' route='/sing-in'/>
              <Register onRegister={onRegister}/>
            </>
          }/>
          <Route path='/' element={
            <>
              <Header
                title='Выход'
                route='/sing-in'
                onClick={onSingOut}
              />
              <ProtectedRoute>
                <Main
                  onEditProfile={handleEditProfile}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            </>
          }/>
        </Routes>
        <Footer/>
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

      <InfoTooltip
        image={popupImage}
        text={popupText}
        isOpen={isInfoToolTip}
        isClose={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      {/*<PopupWithForm*/}
      {/*  name='delete-card'*/}
      {/*  title='Вы уверены?'*/}
      {/*  submit='Да'*/}
      {/*/>*/}
    </CurrentUserContext.Provider>
  );
}

export default App;
