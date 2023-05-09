import React, { FC } from 'react';
import { LoginPageStyles } from './LoginPage.styles';
import LoginForm from '../../components/LoginForm/LoginForm';
import { observer } from 'mobx-react-lite';

const LoginPage: FC = () => {
  return (
    <LoginPageStyles>
      <LoginForm/>
    </LoginPageStyles>
  );
};

export default observer(LoginPage);