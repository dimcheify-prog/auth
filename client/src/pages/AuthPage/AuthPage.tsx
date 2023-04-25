import React, {FC, useContext, useState} from 'react';
import {AppContext} from "../../index";
import LoginForm from "../../components/LoginForm/LoginForm";
import {observer} from "mobx-react-lite";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import {AuthPageStyles, ButtonBox} from "./AuthPage.styles";
import {ChoseButton} from "../../components/UI/Buttons/ChoseButton.styles";

const AuthPage: FC = () => {
    const {store} = useContext(AppContext);

    const [isRegistration, setIsRegistration] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    if (store.auth.isLoading) {
        return <div>Загрузка</div>
    }

    // TODO: переписать
    const toggle = (what: string) : void => {
        if (what === 'login') {
            setIsLogin(true);
            setIsRegistration(false);
        } else if (what === 'register') {
            setIsLogin(false);
            setIsRegistration(true);
        }
    };

    return (
        <AuthPageStyles>
            <button onClick={() => store.auth.logout()}>Выход</button>
            {isLogin ? <LoginForm/> : <RegisterForm/>}
            <ButtonBox>
                <ChoseButton onClick={() => toggle('login')}>Войти</ChoseButton>
                <ChoseButton onClick={() => toggle('register')}>Зарегестрироваться</ChoseButton>
            </ButtonBox>
        </AuthPageStyles>
    );
};

export default observer(AuthPage);