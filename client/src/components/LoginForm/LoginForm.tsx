import React, {FC, SyntheticEvent, useContext, useState} from 'react';
import {AppContext} from "../../index";
import {observer} from "mobx-react-lite";
import {LoginFormStyles} from "./LoginForm.styles";
import {LinkedButton} from "../UI/Buttons/LinkedButton.styles";
import {FormInput} from "../UI/Inputs/FormInput.styles";

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(AppContext);

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        store.auth.login(email, password);
    };

    return (
        <LoginFormStyles>
            {store.auth.error ? <h2>{store.auth.error}</h2> : null}
            <FormInput onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email"/>
            <FormInput onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password"/>
            <button onClick={handleClick}>Вход</button>
        </LoginFormStyles>
    );
};

export default observer(LoginForm);