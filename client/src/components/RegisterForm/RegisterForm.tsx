import React, {FC, useState, useContext, SyntheticEvent} from 'react';
import {AppContext} from "../../index";
import {FormInput} from "../UI/Inputs/FormInput.styles";
import {RegisterFormStyles} from "./RegisterForm.styles";
import {LinkedButton} from "../UI/Buttons/LinkedButton.styles";
import {observer} from "mobx-react-lite";
import {useInput} from "../../hooks/useInput";
import ErrorHandler from "../ErrorHandler/ErroreHandler";

const RegisterForm: FC = () => {
    const email = useInput('', {isEmpty: true, isEmail: false});
    const password = useInput('', {isEmpty: true, minLength: 5});

    const {store} = useContext(AppContext);

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        store.auth.registration(email.value, password.value);
    };

    return (
        <RegisterFormStyles>
            {store.auth.error ? <h2>{store.auth.error}</h2> : null}
            {(email.isDirty && email.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
            {(email.isDirty && email.emailError) && <ErrorHandler error={'Некорректный email'}/>}
            <FormInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.onChange(e)} value={email.value} onBlur={(e: SyntheticEvent) => email.onBlur(e)} type="email" placeholder="Email"/>
            {(password.isDirty && password.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
            {(password.isDirty && password.minLengthError) && <ErrorHandler error={'Некоректная длина'}/>}
            <FormInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => password.onChange(e)} value={password.value} onBlur={(e: SyntheticEvent) => password.onBlur(e)} type="password" placeholder="Password"/>
            <button disabled={!email.isValid || !password.isValid} onClick={handleClick}>Регистрация</button>
        </RegisterFormStyles>
    );
};

export default observer(RegisterForm);