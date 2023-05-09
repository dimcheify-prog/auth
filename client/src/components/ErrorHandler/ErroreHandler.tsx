import React, {FC} from 'react';
import { ErrorText } from './ErrorHandler.styles';


interface IErrorProps {
    error: string
}

const ErrorHandler: FC<IErrorProps> = ({error}) => {
    return (<ErrorText>
        {error}
        </ErrorText>
        
    );
};

export default ErrorHandler;