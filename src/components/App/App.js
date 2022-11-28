import React, { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Popup } from "../Popup/Popup";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi.js";
import * as auth from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isOpenPopup, setIsPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const [savedMovies, setSavedMovies] = useState([]);
  const history = useHistory();
  //Автологин
  useEffect(() => {
    handleTokenCheck();
  }, []);

  //Получение данных пользователя
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getProfile()
        .then((res) => setCurrentUser(res))
        .catch((e) => {
          setLoggedIn(false);
          // history.push("/signin");
        });
    }
  }, [loggedIn, history]);
  //Получение сохраненных фильмов
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getSavedFilms()
        .then((moviesData) => {
          const ownSavedMovies = moviesData.filter(
            (movie) => movie.owner === currentUser._id
          );
          
          sessionStorage.setItem("savedMovies", JSON.stringify(ownSavedMovies));
          setSavedMovies(ownSavedMovies);
          console.log(ownSavedMovies)
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser._id, setSavedMovies]);

  const handlePopupClick = () => {
    setIsPopupOpen(!isOpenPopup);
  };
  function signOut() {
    setLoggedIn(false);
    history.push("/");
    mainApi.logOut();
  }
  function handleTokenCheck() {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          // history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }
  function handleUpdateProfile(userData) {
    mainApi
      .editProfile(userData)
      .then((updatedData) => {
        setCurrentUser(updatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleLogin({ email, password }) {
    auth
      .authorize({ email, password })
      .then((res) => {
        if (!res.token) {
          return;
        }
        auth.checkToken();

        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleRegister({ name, email, password }) {
    auth
      .register({ name, email, password })
      .then((res) => {
        if (res) {
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Header
              loggedIn={loggedIn}
              handlePopupClick={handlePopupClick}
              isHeaderMain={true}
            />
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
            <Movies savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
            <SavedMovies
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
            <Profile editProfile={handleUpdateProfile} logOut={signOut} />
          </ProtectedRoute>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <Popup isOpen={isOpenPopup} onClose={handlePopupClick} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
