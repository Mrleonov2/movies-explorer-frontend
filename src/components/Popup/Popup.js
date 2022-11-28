import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export function Popup({isOpen, onClose}) {
    return (
        <div className={`popup ${isOpen && 'popup_visible'}`} >

            <div className='popup__container'>
                <div className='popup__container-logo'>
                    <button onClick={onClose} className='popup__close-btn'></button>
                </div>
                <div className='popup__container-info'>
                    <div className='popup__nav-list'>
                        <NavLink className='popup__link' exact to='/' activeClassName='popup__link_active'>Главная</NavLink>
                        <NavLink className='popup__link' to='/movies' activeClassName='popup__link_active'>Фильмы</NavLink>
                        <NavLink className='popup__link' to='/saved-movies' activeClassName='popup__link_active'>Сохранённые фильмы</NavLink>
                    </div>
                    <div className='popup__account'>
                        <Link to='profile' className='header__email_popup'>Аккаунт</Link>
                        <Link to='profile' className='header__link_auth'></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}