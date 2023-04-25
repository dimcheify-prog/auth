import React, {FC, useState, useContext, SyntheticEvent} from 'react';
import {AppContext} from "../../index";
import {FormInput} from "../UI/Inputs/FormInput.styles";
import {RegisterFormStyles} from "./RegisterForm.styles";
import {LinkedButton} from "../UI/Buttons/LinkedButton.styles";

const RegisterForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(AppContext);

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        store.auth.registration(email, password);
    };

    return (
        <RegisterFormStyles>
            {store.auth.error ? <h2>{store.auth.error}</h2> : null}
            <FormInput onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email"/>
            <FormInput onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password"/>
            <button onClick={handleClick}>Регистрация</button>
        </RegisterFormStyles>
    );
};

export default RegisterForm;