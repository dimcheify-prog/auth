import React, {FC} from 'react';
import {useLocation} from "react-router-dom";
import {PageNotFounndStyles} from "./PageNotFounnd.styles";

const PageNotFound: FC = () => {
    const location = useLocation();
    return (
        <PageNotFounndStyles>
            <h2>
                Сраница {location.pathname} отсутствует
            </h2>
        </PageNotFounndStyles>
    );
};

export default PageNotFound;