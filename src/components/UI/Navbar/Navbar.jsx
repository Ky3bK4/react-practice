import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../MyButton/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
  const {setIsAuth} = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className="navbar">
      <MyButton onClick={logout}>
        Выйти
      </MyButton>
      <div className="navbarLinks">
        <Link to="/posts">
          Посты
        </Link>
        <Link to="/about">
          О приложении
        </Link>
      </div>
    </div>
  );
};

export default Navbar;