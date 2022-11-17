import React, { useState } from "react";
import { Route, useHistory, Link } from "react-router-dom";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Popup } from "../Popup/Popup";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { Footer } from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from "../../utils/MainApi.js";
import { moviesApi } from "../../utils/MoviesApi.js";
import * as auth from "../../utils/auth.js";
import { searchFilter } from "../../utils/SearchFilter";
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isOpenPopup, setIsPopupOpen] = useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "Михаил",
    email: "leonov2002@mail.ru",
  });
  const [change,setChange]= useState({})
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const history = useHistory();
  React.useEffect(() => {


  }, []);

  function handlePopupClick() {
    setIsPopupOpen(!isOpenPopup);
  }
  function signOut() {
    setLoggedIn(false);
    history.push("/sign-in");
  }
  function handleTokenCheck() {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
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
  function handleLogin() {}
  function handleRegister() {}

  function handleSaveMovie() {}

  function handleSearch(search) {

    moviesApi
      .getMovies()
      .then((res) => {
setChange(search)
    setLoading(true)
        setMovies(searchFilter(res,search.search,JSON.parse(search.isShortFilms)));
        console.log(movies)
  
      }).then(()=>{setLoading(false)})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path="/">
          <Header
            loggedIn={loggedIn}
            handlePopupClick={handlePopupClick}
            isHeaderMain={true}
          />
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path="/movies">
          <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
          <Movies
            movies={movies}
            isLoading={isLoading}
            searchMovie={handleSearch}
            change={change}
          />
        </Route>
        <Route path="/saved-movies">
          <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
          <SavedMovies
            loggedIn={loggedIn}
            isLoading={isLoading}
            movies={savedMovies}
          />
        </Route>
        <Route path="/profile">
          <Header loggedIn={loggedIn} handlePopupClick={handlePopupClick} />
          <Profile editProfile={handleUpdateProfile} logOut={signOut} />
        </Route>
        <Route path="/signin">{<Login onLogin={handleLogin} />}</Route>
        <Route path="/signup">{<Register onRegister={handleRegister} />}</Route>
        {/* <Route path={"/*"}>
          <NotFoundPage />
        </Route> */}
        <Popup isOpen={isOpenPopup} onClose={handlePopupClick}></Popup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
