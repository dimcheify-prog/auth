import React, {FC, SyntheticEvent, useContext} from 'react';
import {AppContext} from "../../index";
import {observer} from "mobx-react-lite";
import {LoginFormButtonBox, LoginFormStyles, LoginFormTitle} from "./LoginForm.styles";
import {FormInput} from "../UI/Inputs/FormInput.styles";
import {useInput} from "../../hooks/useInput";
import ErrorHandler from "../ErrorHandler/ErroreHandler";
import {LinkedButton} from '../UI/Buttons/LinkedButton.styles';
import { Button } from '../UI/Buttons/Button.styles';
import { useNavigate } from 'react-router-dom';

const LoginForm: FC = () => {
    const email = useInput('', {isEmpty: true, isEmail: false});
    const password = useInput('', {isEmpty: true, minLength: 5});

    const {store} = useContext(AppContext);

    const navigate = useNavigate();

    const handleClick = async (e: SyntheticEvent) => {
        e.preventDefault();
        await store.auth.login(email.value, password.value);
        navigate('/profile');
    };

    return (
        <LoginFormStyles onSubmit={handleClick}>
            <LoginFormTitle>Вход</LoginFormTitle>
            {store.auth.error ? <h1>{store.auth.error}</h1> : null}
            <FormInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.onChange(e)} onBlur={(e: SyntheticEvent) => email.onBlur(e)} value={email.value} type="email" placeholder="Email"/>
            {(email.isDirty && email.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
            {(email.isDirty && email.emailError) && <ErrorHandler error={'Некорректный email'}/>}
            <FormInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => password.onChange(e)} onBlur={(e: SyntheticEvent) => password.onBlur(e)} value={password.value}  type="password" placeholder="Password"/>
            {(password.isDirty && password.isEmpty) && <ErrorHandler error={'Пустое поле'}/>}
            {(password.isDirty && password.minLengthError) && <ErrorHandler error={'Некоректная длина'}/>}
            <LoginFormButtonBox>
                <Button disabled={!email.isValid || !password.isValid} type="submit">Вход</Button>
                <LinkedButton to={'/registration'}>Зарегистрироваться</LinkedButton>
            </LoginFormButtonBox>
        </LoginFormStyles>
    );
};

export default observer(LoginForm);