import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./services/UserService";
import {IUser} from "./models/IUser";

const App: FC = () => {
    const [users, setUsers] = useState<IUser[]>();
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);       
        } catch (err) {
            console.log(err);
        }
    }

    if (store.isLoading) {
        return <div>Загрузка</div>
    }

    if (!store.isAuth) {
        return <LoginForm/>
    }

  return (
    <div>
        <h1>{store.isAuth ? `Пользователь ${store.user.email} Авторизован` : 'Пользователь не авторизован'}</h1>
        <button onClick={() => store.loguot()}>Выйти</button>
        <button onClick={() => getUsers()}>ПОлучить список пользователей</button>
        {users?.map((user: IUser) => {
            return <div key={user.email}>{user.email}</div>
        })}
    </div>
  );
}

export default observer(App);
