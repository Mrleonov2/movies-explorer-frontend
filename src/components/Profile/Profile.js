
import React from 'react';

export function Profile() {
    return (
            <section className='profile'>
                <h2 className='profile__title'>Привет, Михаил!</h2>
                <div className='profile__container'>
                    <div className='profile__input-container'>
                        <div className='profile__input profile__input_title'>Имя</div>
                        <div className='profile__input'>Михаил</div>
                    </div>
                    <div className='profile__input-container'>
                        <div className='profile__input profile__input_title'>E-mail</div>
                        <div className='profile__input'>mikhail-leonov@yandex.ru</div>
                    </div>
                </div>
                <button className='profile__edit-btn'>Редактировать</button>
                <button className='profile__log-out-btn'>Выйти из аккаунта</button>
            </section>
    );
}