import React from "react";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { emailValid } from "../../utils/constants";
export function Profile({ editProfile, logOut, isLoading, profileMessage }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({});
  const isMatch =
    values.name === currentUser.name && values.email === currentUser.email;
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
  };
  const handleSubmit = (event) => {
    if (isValid && !isMatch) {
      editProfile(values);
    } else {
      return;
    }
  };

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__container" name="profile-form">
        <div className="profile__input-container">
          <div className=" profile__input-title">Имя</div>
          <input
            className="profile__input"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            disabled={isLoading}
            minLength="2"
            maxLength="30"
          />
        </div>
        <div className="profile__input-container">
          <div className="profile__input-title">E-mail</div>
          <input
            className="profile__input"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            pattern={emailValid}
            disabled={isLoading}
          />
        </div>
        {<span className={`profile__message ${profileMessage.status ? 'profile__message_success' : 'profile__message_failed'}`}>{profileMessage.content}</span>}
      </form>
      <button
        className="profile__edit-btn"
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || !isValid || isMatch}
      >
        Редактировать
      </button>
      <button className="profile__log-out-btn" type="button" onClick={logOut}>
        Выйти из аккаунта
      </button>
    </section>
  );
}
