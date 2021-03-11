import Card from '../components/Card.js'
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main (props) {
  const currentUser = useContext(CurrentUserContext)

  return(
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div className="profile__avatar-overlay" onClick={props.onEditAvatar}></div>
          <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар"/>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__person-name">{currentUser.name}</h1>
            <button type="button" className="profile__btn-edit" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__person-status">{currentUser.about}</p>
        </div>
        <button className="profile__btn-add"  type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {props.cards.map(item => (<Card key={item._id}
        isOpen={props.showImage}
        onCardClick={props.handleCardClick}
        onCardLike={props.handleCardLike}
        onCardDelete={props.handleCardDelete}
        {...item}/>)
        )}
      </section>
    </main>
  )
}

export default Main;