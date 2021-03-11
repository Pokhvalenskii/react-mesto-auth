import Header from '../components/Header.js';
import Main from '../components/Main.js'
import Footer from '../components/Footer.js'
import ImagePopup from '../components/ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from './AddPlacePopup.js';
import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, BrowserRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';

import Login from './Login.js';
import Register from './Register.js';
import PopupResponse from './PopupResponse.js';
import * as auth from '../utils/auth.js';

function App() {
  const history = useHistory();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isSuccessPopup, setIsSuccessPopup] = useState(false)
  const [isFailPopup, setIsFailPopup] = useState(false)


  const [selectedCard, setSelectedCard] = useState(false);
  const [cardInfo, setCardInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialUser(), api.getInitialCards()])
    .then(res => {
      const [userData, cards] = res;
      setCurrentUser(userData);
      setCards(cards);
    }).catch(error => console.log(`${error}`));
  }, []);

  const handleUpdateUser = (data) => {
    api.editProfile(data.name, data.about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      }).catch(error => console.log(`${error}`))
  }

  const handleUpdateAvatar = (url) => {
    api.editAvatar(url)
      .then((res) => {
        closeAllPopups();
        // console.log('RES', res)
        setCurrentUser(res);
      }).catch(error => console.log(`${error}`))
  }

  const handleCardClick = (link, name) => {
    setSelectedCard(true);
    setCardInfo({
      link: link,
      name: name})
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsFailPopup(false)
    setIsSuccessPopup(false);
  }

  //////////////////// CARDS //////////////////////

  function handleCardDelete (card) {
    api.deleteCard(card._id)
        .then(() => {
          setCards(cards.filter(item => item._id !== card._id))
        }).catch(error => console.log(`${error}`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if(!isLiked) {
      api.like(card._id)
      .then((newCard) => {
        const newCards = cards.map((item) => item._id === card._id ? newCard : item);
        setCards(newCards);
      }).catch(error => console.log(`${error}`))
    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((item) => item._id === card._id ? newCard : item);
          setCards(newCards)
        }).catch(error => console.log(`${error}`))
    }
  }

  function handleAddCard(card) {
    api.addCard(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups();
      }).catch(error => console.log(`${error}`))
  }

  //////////////////////////////////////////
  const initialData = 'email';

  const [userEmail, setUserEmail] = useState('email');
  const [loggedIn, setLoggedIn] = useState(false);

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        // console.log('RES: ', res)
        setUserEmail(email);
        setIsSuccessPopup(true)
      }).catch(error => console.log(`${error}`))
  }
  function handleAuthorize(email, password) {
    return auth.authorize(email, password)
      .then(res => {
        // console.log('RES authorize: ', res.token)
        setLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem('jwt', res.token);
        // console.log('local storage ', localStorage.getItem('jwt'))
      }).catch(() => {
        setIsFailPopup(true);
      })
  }

  const checkLoggedIn = useCallback(() => {
    const jwt = localStorage.getItem('jwt')
    if(jwt) {
      auth.validityJWT(jwt)
        .then(res => {
          setLoggedIn(true);
          setUserEmail(res.data.email)
          history.push('/');
        }).catch(error => console.log(`${error}`))
    }
  }, [history])

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn])


  function logout() {
    localStorage.removeItem('jwt');
    setUserEmail(initialData);
    setLoggedIn(false);
    history.push('/')
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path='/sign-in'>
            <Login handleAuthorize={handleAuthorize}/>
            <PopupResponse isOpen={isFailPopup} onClose={closeAllPopups}
            name='popup-response'
            title='Что-то пошло не так!
            Попробуйте ещё раз.'
            image='fail'/>
          </Route>
          <Route path='/sign-up'>
            <Register handleRegister={handleRegister}/>
            <PopupResponse isOpen={isSuccessPopup} onClose={closeAllPopups}
            name='popup-response'
            title='Вы успешно зарегистрировались!'
            image='success'/>
          </Route>


          <ProtectedRoute path='/' loggedIn={loggedIn} testProps={userEmail}>
            <div className='root'>
              <Header userEmail={userEmail} logout={logout}/>
              <Main
              cards={cards}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
              handleCardClick={handleCardClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} updateAvatar={handleUpdateAvatar}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} handleAddCard={handleAddCard}/>
              <ImagePopup onClose={closeAllPopups} isOpen={selectedCard} cardData={cardInfo}/>
              <Footer />
            </div>
          </ProtectedRoute>

        </Switch>
      </CurrentUserContext.Provider>
  );
}

export default App;
