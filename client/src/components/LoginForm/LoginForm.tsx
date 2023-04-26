import React, {FC, SyntheticEvent, useContext, useState} from 'react';
import {AppContext} from "../../index";
import {observer} from "mobx-react-lite";
import {LoginFormStyles} from "./LoginForm.styles";
import {LinkedButton} from "../UI/Buttons/LinkedButton.styles";
import {FormInput} from "../UI/Inputs/FormInput.styles";
import {useInput} from "../../hooks/useInput";
import ErrorHandler from "../ErrorHandler/ErroreHandler";

const LoginForm: FC = () => {
    const email = useInput('', {isEmpty: true, isEmail: false});
    const password = useInput('', {isEmpty: true, minLength: 5});

    const {store} = useContext(AppContext);

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        store.auth.login(email.value, password.value);
    };

    return (
        <>
            <h1>С возвращением!</h1>
            <LoginFormStyles onSubmit={handleClick}>
                {store.auth.isLoading ? <div>Загрузка...</div> : null}
                {(email.isDirty && email.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
                {(email.isDirty && email.emailError) && <ErrorHandler error={'Некорректный email'}/>}
                <FormInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.onChange(e)} onBlur={(e: SyntheticEvent) => email.onBlur(e)} value={email.value} type="email" placeholder="Email"/>
                {(password.isDirty && password.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
                {(password.isDirty && password.minLengthError) && <ErrorHandler error={'Некоректная длина'}/>}
                <FormInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => password.onChange(e)} onBlur={(e: SyntheticEvent) => password.onBlur(e)} value={password.value}  type="password" placeholder="Password"/>
                <button disabled={!email.isValid || !password.isValid} type="submit">Вход</button>
            </LoginFormStyles>
        </>
    );
};

export default observer(LoginForm);