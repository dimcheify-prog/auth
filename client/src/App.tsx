import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import {Routes, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PageNotFound from "./pages/404/PageNotFound";

const App: FC = () => {
    return (
        <Routes>
            <Route path='/auth' element={<AuthPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    )
}

export default observer(App);
