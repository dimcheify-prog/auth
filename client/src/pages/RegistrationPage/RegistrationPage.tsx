import React from 'react';
import { RegistrationPageStyles } from './RegistrationPage.styles';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

const RegistrationPage = () => {
  return (
    <RegistrationPageStyles>
      <RegistrationForm/>
    </RegistrationPageStyles>
  );
};

export default RegistrationPage;