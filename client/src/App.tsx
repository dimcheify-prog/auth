import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import {Routes, Route} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PageNotFound from "./pages/404/PageNotFound";
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

const App: FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/registration' element={<RegistrationPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    )
}

export default observer(App);
