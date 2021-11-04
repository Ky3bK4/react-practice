import React, {useContext} from 'react';
import MyInput from "../components/UI/MyInput/MyInput";
import MyButton from "../components/UI/MyButton/MyButton";
import {AuthContext} from "../context";

const Login = () => {
  const {setIsAuth} = useContext(AuthContext)
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }

  return (
    <div>
      <h1>Авторизация</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder={'Введите логин'}/>
        <MyInput type="password" placeholder={'Введите пароль'}/>
        <MyButton type={'submit'}>
          Войти
        </MyButton>
      </form>
    </div>
  );
};

export default Login;