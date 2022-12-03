import React, { useState, useEffect } from "react";
import { Route, useHistory, useLocation, Switch } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState({
    content: "",
    status: true,
  });
  const [errorMessage, setErrorMessage] = useState({
    registerPage: "",
    loginPage: "",
  });
  const history = useHistory();
  let location = useLocation();
  //Автологин
  useEffect(() => {
    handleTokenCheck();
  }, []);
  //Запрет двойной авторизации
  useEffect(() => {
    if (
      loggedIn &&
      (location.pathname === "/signup" || location.pathname === "/signin")
    ) {
      history.push("/movies");
    } else {
      history.push(location.pathname);
    }
  }, [loggedIn, history, location.pathname]);
  //Получение данных пользователя
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getProfile()
        .then((res) => setCurrentUser(res))
        .catch((e) => {
          setLoggedIn(false);
          console.log(e);
          history.push("/");
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
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser._id, setSavedMovies, loggedIn]);
  useEffect(() => {
    setErrorMessage({
      registerPage: "",
      loginPage: "",
    });
    setProfileMessage({ content: "", status: true });
  }, [location.pathname]);
  const handlePopupClick = () => {
    setIsPopupOpen(!isOpenPopup);
  };
  function signOut() {
    setLoggedIn(false);
    history.push("/");
    mainApi.logOut().catch((e) => {
      console.log(e);
    });
    sessionStorage.removeItem("queryData");
    sessionStorage.removeItem("savedMovies");
  }
  function handleTokenCheck() {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        signOut();
      });
  }
  function handleUpdateProfile(userData) {
    setIsLoading(true);
    mainApi
      .editProfile(userData)
      .then((updatedData) => {
        setCurrentUser(updatedData);
        setProfileMessage({ content: "Изменения сохранены", status: true });
      })

      .catch((err) => {
        console.log(err);
        setProfileMessage({ content: err.message, status: false });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleLogin({ email, password }) {
    setIsLoading(true);
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
        setErrorMessage({ registerPage: "", loginPage: err.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage({ registerPage: err.message, loginPage: "" });
      })
      .finally(() => {
        setIsLoading(false);
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
            <Movies
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              logOut={signOut}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
            <SavedMovies
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              logOut={signOut}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
            <Profile
              editProfile={handleUpdateProfile}
              logOut={signOut}
              isLoading={isLoading}
              profileMessage={profileMessage}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />
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
