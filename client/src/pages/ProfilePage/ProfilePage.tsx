import React, {FC, useContext, useEffect, useState} from 'react';
import {AppContext} from "../../index";
import {IUser} from "../../models/IUser";
import {observer} from "mobx-react-lite";
import {Navigate, redirect, useNavigate} from "react-router-dom";
import { Button } from '../../components/UI/Buttons/Button.styles';
import { ProfilePageStyles } from './ProfilePage.styles';

const ProfilePage: FC = () => {
    const {store} = useContext(AppContext);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.auth.checkAuth();
        }
    }, []);

    const handleClick = async () => {
        await store.auth.logout();
        navigate('/login');
    };

    if (!localStorage.getItem('token')) {
        return <Navigate replace to={'/login'}/>;
    } else {
        return (
            <ProfilePageStyles>
                <div>
                    <h1>{store.auth.user.email}</h1>
                </div>
                <Button onClick={handleClick}>Выйти</Button>
            </ProfilePageStyles>
        );
    }
};

export default observer(ProfilePage);