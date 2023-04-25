import React, {FC, useContext, useEffect, useState} from 'react';
import {AppContext} from "../../index";
import {IUser} from "../../models/IUser";
import {observer} from "mobx-react-lite";
import {Link, redirect} from "react-router-dom";
import {LinkedButton} from "../../components/UI/Buttons/LinkedButton.styles";

const ProfilePage: FC = () => {
    const {store} = useContext(AppContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.auth.checkAuth();
        } else {
            redirect('/auth');
        }
    }, []);

    return (
        <>
            <div>
                <h1>{store.auth.user.email}</h1>
            </div>
            <LinkedButton to={'/auth'} onClick={() => store.auth.logout()}>Выйти</LinkedButton>
        </>
    );
};

export default observer(ProfilePage);