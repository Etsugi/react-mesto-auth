import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  const [inMenuHeader, setMenuHeader] = React.useState(false);

  function handleMenu() {
    setMenuHeader(!inMenuHeader)
  }
  function handleSignOut(e) {
    e.preventDefault();
    setMenuHeader(false);
    props.onSignOut();
  }
  return (
    <header className={inMenuHeader ? 'header header_reverse' : 'header'}>
      <div className="header__logo">
        {props.loggedIn === true && 
          (
          <button className={inMenuHeader ? 'header__button-menu header__button-menu_opened' : 'header__button-menu'} type="checkbox" onClick={handleMenu}></button>
          )
        }
      </div>
        
      {props.loggedIn === true && location.pathname === '/' &&
        (
          <div className={inMenuHeader ? 'header__container-opened' : 'header__container header__container-mobile'}>
            <p className={inMenuHeader ? 'header__user_menu-opened' : 'header__user'}>{props.userEmail}</p>
            <button className={inMenuHeader ? 'header__navlink_menu-opened header__navlink_signout' : 'header__navlink header__navlink_signout'} type="submit" 
              onClick={handleSignOut}>Выйти</button>
          </div>
        )
      }
        
      {location.pathname === '/sign-in' &&
        (
          <div className="header__container">
            <NavLink className="header__navlink" to="/sign-up">
              Регистрация
            </NavLink>
          </div>
        )
      }
      {location.pathname === '/sign-up' &&
        (
          <div className="header__container">
            <NavLink className="header__navlink" to="/sign-in">
              Войти
            </NavLink>
          </div>
        )
      }
    </header>
  );
}

export default Header;
