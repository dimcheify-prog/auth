import React, {FC} from 'react';
import {ErrorHandlerStyles, ErrorText} from "./ErrorHandler.styles";

interface IErrorProps {
    error: string
}

const ErrorHandler: FC<IErrorProps> = ({error}) => {
    return (
        <ErrorHandlerStyles role="alert">
            <ErrorText>{error}</ErrorText>
        </ErrorHandlerStyles>
    );
};

export default ErrorHandler;