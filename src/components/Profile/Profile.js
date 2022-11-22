import React from "react";
import { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
export function Profile({ editProfile, logOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isValid, setIsValid] = React.useState(false);
  const [values, setValues] = React.useState({});
  const isMatch =
    values.name === currentUser.name || values.email === currentUser.email;
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
    console.log(values);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid || isMatch) {
      return;
    }
    editProfile(values);
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
          />
        </div>
      </form>
      <button
        className="profile__edit-btn"
        type="button"
        onClick={handleSubmit}
        disabled={!isValid ? true : false}
      >
        Редактировать
      </button>
      <button className="profile__log-out-btn" type="button" onClick={logOut}>
        Выйти из аккаунта
      </button>
    </section>
  );
}
