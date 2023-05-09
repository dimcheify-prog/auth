import React, {FC, useState, useContext, SyntheticEvent} from 'react';
import {AppContext} from "../../index";
import {FormInput} from "../UI/Inputs/FormInput.styles";
import {RegistrationFormButtonBox, RegistrationFormStyles, RegistrationFormTitle} from './RegistrationForm.styles';
import {LinkedButton} from "../UI/Buttons/LinkedButton.styles";
import {observer} from "mobx-react-lite";
import {useInput} from "../../hooks/useInput";
import ErrorHandler from "../ErrorHandler/ErroreHandler";
import { Button } from '../UI/Buttons/Button.styles';
import { useNavigate } from 'react-router-dom';

const RegisterForm: FC = () => {
    const email = useInput('', {isEmpty: true, isEmail: false});
    const password = useInput('', {isEmpty: true, minLength: 5});

    const {store} = useContext(AppContext);

    const navigate = useNavigate();

    const handleClick = async (e: SyntheticEvent) => {
        e.preventDefault();
        await store.auth.registration(email.value, password.value);
        navigate('/profile');
    };

    return (
        <RegistrationFormStyles>
            <RegistrationFormTitle>Регистрация</RegistrationFormTitle>
            {store.auth.error ? <h2>{store.auth.error}</h2> : null}
            <FormInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.onChange(e)} value={email.value} onBlur={(e: SyntheticEvent) => email.onBlur(e)} type="email" placeholder="Email"/>
            {(email.isDirty && email.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
            {(email.isDirty && email.emailError) && <ErrorHandler error={'Некорректный email'}/>}
            <FormInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => password.onChange(e)} value={password.value} onBlur={(e: SyntheticEvent) => password.onBlur(e)} type="password" placeholder="Password"/>
            {(password.isDirty && password.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
            {(password.isDirty && password.minLengthError) && <ErrorHandler error={'Некоректная длина'}/>}
            <RegistrationFormButtonBox>
                <Button disabled={!email.isValid || !password.isValid} onClick={handleClick}>Регистрация</Button>
                <LinkedButton to={'/login'}>Уже есть аккаунт?</LinkedButton>
            </RegistrationFormButtonBox>

        </RegistrationFormStyles>
    );
};

export default observer(RegisterForm);